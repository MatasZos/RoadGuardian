import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// default settings applied when a user has no saved preferences in the database
const DEFAULT_SETTINGS = {
  emailReminders: true,
  documentReminders: true,
  maintenanceReminders: true,
  emergencyLocation: true,
  compactMode: false,
};

// GET returns the signed-in user's saved settings, merged over the defaults so any new keys always have a fallback value
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email.toLowerCase();

    const client = await clientPromise;
    const db = client.db("login");
    const users = db.collection("user");

    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // merge saved settings over defaults so any newly added keys have a value
    const settings = { ...DEFAULT_SETTINGS, ...(user.settings || {}) };

    return NextResponse.json({ settings });
  } catch (err) {
    console.error("Settings GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT updates the signed-in user's settings, stripping unknown keys to only persist the allowed boolean preferences
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email.toLowerCase();
    const body = await req.json();

    // coerce each field to a boolean to prevent any unexpected values being stored
    const safe = {
      emailReminders: !!body.emailReminders,
      documentReminders: !!body.documentReminders,
      maintenanceReminders: !!body.maintenanceReminders,
      emergencyLocation: !!body.emergencyLocation,
      compactMode: !!body.compactMode,
    };

    const client = await clientPromise;
    const db = client.db("login");
    const users = db.collection("user");

    const result = await users.updateOne(
      { email },
      { $set: { settings: safe } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (err) {
    console.error("Settings PUT error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
