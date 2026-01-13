import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const url = "mongodb+srv://admin:pass@roadguardiancluster.kpvvhx4.mongodb.net/roadguardian?";
const dbName = "app";

export async function GET(req) {
  try {
    console.log("in the register api page");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const confirmPassword = searchParams.get("confirmPassword");
    const phoneNumber = searchParams.get("phoneNumber");

    if (!email || !password || !confirmPassword || !phoneNumber) {
      return Response.json(
        { data: "invalid", error: "Missing fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        { data: "invalid", error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("login");

    const existing = await collection.findOne({ email });

    if (existing) {
      await client.close();
      return Response.json(
        { data: "invalid", error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await collection.insertOne({
      email,
      password: hashedPassword,
      phoneNumber,
      account_type: "customer",
      created_at: new Date(),
    });

    await client.close();

    return Response.json({ data: "valid" });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
