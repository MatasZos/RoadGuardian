import { MongoClient } from "mongodb"
import bcrypt from "bcrypt";

const url = "mongodb+srv://admin:<db_password>@roadguardiancluster.kpvvhx4.mongodb.net/?appName=roadguardiancluster";
const dbName = "app"

export async function GET(req, res) {

  console.log("in the login api page")

    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const password = searchParams.get("password")

    console.log("email:", email)
    console.log("password:", password)

    if (!email || !password) {
      return Response.json(
        { data: "invalid", error: "Email or password missing" },
        { status: 400 }
      );
    }

    const client = new MongoClient(url)
    await client.connect()
    console.log("Connected successfully")

    const db = client.db(dbName);
    const collection = db.collection("login")

    const user = await collection.findOne({ email: email })

    if (!user) {
      await client.close()
      console.log("user not found")
      return Response.json({ data: "invalid" })
    }

    const hashResult = bcrypt.compareSync(password, user.password)
    console.log("Hash Comparison Result:" , hashResult)

    await client.close()

    if (!hashResult) {
      console.log("wrong password")
      return Response.json({ data: "invalid" })
    }

    console.log("login valid")

    return Response.json({
      data: "valid",
      account_type: user.account_type || "customer"
    })
}
