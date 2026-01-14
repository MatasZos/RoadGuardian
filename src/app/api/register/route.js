import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, number } = await req.json();

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("login");
    const users = db.collection("user");

    const exists = await users.findOne({ email });
    if (exists) {
      await client.close();
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      number,
      accountType: "user",
      createdAt: new Date(),
    });

    await client.close();

    return NextResponse.json({ message: "Registered" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
