import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const url = "mongodb+srv://admin:pass@roadguardiancluster.kpvvhx4.mongodb.net/roadguardian?";
const dbName = "app";

export async function GET(req) {
  try {
    console.log("in the login api page");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (!email || !password) {
      return Response.json(
        { data: "invalid", error: "Email or password missing" },
        { status: 400 }
      );
    }

    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("login");

    const user = await collection.findOne({ email });

    if (!user) {
      await client.close();
      return Response.json({ data: "invalid" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    await client.close();

    if (!isValid) {
      return Response.json({ data: "invalid" });
    }

    return Response.json({
      data: "valid",
      account_type: user.account_type || "customer",
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
