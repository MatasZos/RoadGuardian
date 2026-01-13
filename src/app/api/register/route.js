import { MongoClient } from "mongodb"
import bcrypt from "bcrypt";

const url = "mongodb+srv://admin:<db_password>@roadguardiancluster.kpvvhx4.mongodb.net/?appName=roadguardiancluster";
const dbName = "app"

export async function GET(req, res) {
  console.log("in the register api page")

    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const password = searchParams.get("password")
    const confirmPassword = searchParams.get("confirmPassword")
    const phoneNumber = searchParams.get("phoneNumber")

    console.log(email)
    console.log(password)
    console.log(confirmPassword)
    console.log(phoneNumber)

    if (!email || !password || !confirmPassword || !phoneNumber) {
      return Response.json(
        {
          data: "invalid",
          error: "Email, password, confirm password and phone number are required!"
        },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return Response.json(
        { data: "invalid", error: "Passwords do not match" },
        { status: 400 }
      )
    }

    const client = new MongoClient(url)
    await client.connect()
    console.log("Connected successfully to register")

    const db = client.db(dbName)
    const collection = db.collection("login")

    const existing = await collection.findOne({ email: email })

    if (existing) {
      await client.close()
      console.log("register invalid - user already exists")
      return Response.json(
        { data: "invalid", error: "User already exists" },
        { status: 400 }
      )
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    await collection.insertOne({
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      account_type: "customer",
      created_at: new Date()
    })

    await client.close()
    console.log("register valid - user inserted")

    return Response.json({ data: "valid" })
}


