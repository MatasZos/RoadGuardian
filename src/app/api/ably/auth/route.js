import { NextResponse } from "next/server";
import Ably from "ably";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET issues a short-lived Ably token tied to the signed-in user's email so the
// browser can subscribe to channels without ever seeing our root API key.
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // create a token request scoped to the user's email as the clientId so Ably can identify who is subscribing
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequest = await client.auth.createTokenRequest({
      clientId: session.user.email,
    });

    return NextResponse.json(tokenRequest);
  } catch (err) {
    console.error("ABLY AUTH ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
