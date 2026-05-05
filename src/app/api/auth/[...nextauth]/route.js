import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth catch-all route that handles all /api/auth/* requests including sign-in, sign-out and session callbacks
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
