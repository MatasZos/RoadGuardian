import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getAblyRest } from "@/lib/ablyServer";
import { cleanStringOrEmpty } from "@/lib/utils";
import { buildBikeTaskSummary } from "@/lib/maintenance";

// syncMaintenanceNotifications recalculates which maintenance tasks are overdue or due soon for the given user, then upserts or removes notifications accordingly and pushes Ably events so the bell icon stays accurate
async function syncMaintenanceNotifications(db, userEmail) {
  const notifications = db.collection("notifications");
  const records = await db
    .collection("maintenance")
    .find({ userEmail })
    .sort({ createdAt: -1, _id: -1 })
    .toArray();

  const pendingNotifications = [];
  for (const bike of buildBikeTaskSummary(records)) {
    for (const task of bike.tasks) {
      if (!Number.isFinite(task.remainingKm)) continue;

      let title = "";
      let text = "";
      // classify the notification as overdue or due soon based on remaining kilometres
      if (task.remainingKm < 0) {
        title = "Maintenance overdue";
        text = `${task.type} on ${bike.bike} is overdue. Get checked immediately.`;
      } else if (task.remainingKm <= 1500) {
        title = "Maintenance due soon";
        text = `${task.type} on ${bike.bike} is due in ${task.remainingKm.toLocaleString()} km.`;
      } else {
        continue;
      }

      pendingNotifications.push({
        userEmail,
        title,
        text,
        type: "maintenance",
        read: false,
        sourceType: "maintenanceDue",
        sourceId: `${bike.bike}::${task.type}`,
        motorbike: bike.bike,
        taskType: task.type,
        nextDueKm: task.nextDueKm,
        currentBikeKm: bike.currentKm,
        createdAt: new Date(),
      });
    }
  }

  // Drop any "maintenanceDue" notifications that are no longer in the pending set.
  const pendingSourceIds = pendingNotifications.map((n) => n.sourceId);
  await notifications.deleteMany({
    userEmail,
    sourceType: "maintenanceDue",
    ...(pendingSourceIds.length > 0 ? { sourceId: { $nin: pendingSourceIds } } : {}),
  });

  const ably = getAblyRest();
  for (const notif of pendingNotifications) {
    const existing = await notifications.findOne({
      userEmail,
      sourceType: "maintenanceDue",
      sourceId: notif.sourceId,
    });

    // insert new notifications and publish a creation event so the bell lights up immediately
    if (!existing) {
      const result = await notifications.insertOne(notif);
      try {
        await ably.channels.get(`user:${userEmail}`).publish("notification-created", {
          ...notif,
          _id: String(result.insertedId),
        });
      } catch (err) {
        console.error("ABLY maintenance notification publish error:", err);
      }
      continue;
    }

    // only update existing notifications if the content has changed, to avoid unnecessary writes
    const changed =
      existing.title !== notif.title ||
      existing.text !== notif.text ||
      existing.nextDueKm !== notif.nextDueKm ||
      existing.currentBikeKm !== notif.currentBikeKm;

    if (changed) {
      await notifications.updateOne(
        { _id: existing._id },
        {
          $set: {
            title: notif.title,
            text: notif.text,
            type: notif.type,
            motorbike: notif.motorbike,
            taskType: notif.taskType,
            nextDueKm: notif.nextDueKm,
            currentBikeKm: notif.currentBikeKm,
            createdAt: new Date(),
            read: false,
          },
        }
      );
      try {
        await ably.channels.get(`user:${userEmail}`).publish("notification-refresh", {
          sourceType: "maintenanceDue",
          sourceId: notif.sourceId,
        });
      } catch (err) {
        console.error("ABLY maintenance refresh publish error:", err);
      }
    }
  }
}

// buildMaintenanceDoc sanitises and shapes the request body into the fields stored on a maintenance record
function buildMaintenanceDoc(body) {
  return {
    motorbike: cleanStringOrEmpty(body.motorbike),
    type: Array.isArray(body.type)
      ? body.type.map((t) => cleanStringOrEmpty(t)).filter(Boolean)
      : [],
    date: cleanStringOrEmpty(body.date),
    km: Number(body.km),
    notes: cleanStringOrEmpty(body.notes || ""),
    advisories: cleanStringOrEmpty(body.advisories || ""),
  };
}

// GET returns all maintenance records for the requesting user and syncs their maintenance notifications before responding
export async function GET(req) {
  try {
    const email = req.headers.get("x-user-email");
    if (!email) return NextResponse.json([]);

    const userEmail = cleanStringOrEmpty(email).toLowerCase();
    const client = await clientPromise;
    const db = client.db("login");

    // sync notifications on every GET so the bell count is accurate when the page loads
    await syncMaintenanceNotifications(db, userEmail);

    const records = await db
      .collection("maintenance")
      .find({ userEmail })
      .sort({ createdAt: -1, _id: -1 })
      .toArray();

    return NextResponse.json(records);
  } catch (err) {
    console.error("MAINTENANCE GET ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST inserts a new maintenance record and resyncs the user's maintenance notifications
export async function POST(req) {
  try {
    const body = await req.json();
    const userEmail = cleanStringOrEmpty(body.userEmail).toLowerCase();
    const now = new Date();

    const client = await clientPromise;
    const db = client.db("login");

    await db.collection("maintenance").insertOne({
      userEmail,
      ...buildMaintenanceDoc(body),
      createdAt: now,
      updatedAt: now,
    });

    await syncMaintenanceNotifications(db, userEmail);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MAINTENANCE POST ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT updates an existing maintenance record by id and resyncs the user's maintenance notifications
export async function PUT(req) {
  try {
    const body = await req.json();
    const userEmail = cleanStringOrEmpty(body.userEmail).toLowerCase();

    const client = await clientPromise;
    const db = client.db("login");

    await db.collection("maintenance").updateOne(
      { _id: new ObjectId(body._id) },
      { $set: { ...buildMaintenanceDoc(body), updatedAt: new Date() } }
    );

    await syncMaintenanceNotifications(db, userEmail);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MAINTENANCE PUT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE removes a maintenance record and resyncs notifications so any cleared tasks are removed from the bell
export async function DELETE(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("login");

    // read the record before deleting to get the userEmail needed for the notification sync
    const existing = await db.collection("maintenance").findOne({
      _id: new ObjectId(body._id),
    });
    await db.collection("maintenance").deleteOne({ _id: new ObjectId(body._id) });

    if (existing?.userEmail) {
      await syncMaintenanceNotifications(
        db,
        cleanStringOrEmpty(existing.userEmail).toLowerCase()
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("MAINTENANCE DELETE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
