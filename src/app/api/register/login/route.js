import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("login");
    const users = db.collection("user");

    const user = await users.findOne({ email });
    if (!user) {
      await client.close();
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      await client.close();
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    await client.close();

    return NextResponse.json(
      { message: "Login successful", user: { email: user.email, name: user.name } },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}

