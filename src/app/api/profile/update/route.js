import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cleanString, cleanEmail } from "@/lib/utils";

// POST updates one or more profile fields (fullName, motorbike, phone, password) for the user identified by email in the body
export async function POST(req) {
  try {
    const body = await req.json();

    const email = cleanEmail(body.email);
    const fullName = cleanString(body.fullName);
    const motorbike = cleanString(body.motorbike);
    const phone = cleanString(body.phone);
    const password = cleanString(body.password);

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    // only include fields that were actually provided in the request
    const updateDoc = {};

    if (fullName) {
      updateDoc.fullName = fullName;
    }

    if (motorbike) {
      updateDoc.motorbike = motorbike;
    }

    if (phone) {
      updateDoc.phone = phone;
    }

    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }

      // hash the new password before storing it
      updateDoc.passwordHash = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateDoc).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const client = await clientPromise;
    const result = await client
      .db("login")
      .collection("user")
      .updateOne({ email }, { $set: updateDoc });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated",
      updated: {
        fullName: updateDoc.fullName || undefined,
        motorbike: updateDoc.motorbike || undefined,
        phone: updateDoc.phone || undefined,
        passwordChanged: Boolean(updateDoc.passwordHash),
      },
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
