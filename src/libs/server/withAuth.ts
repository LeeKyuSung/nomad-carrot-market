import { Session, User } from "@prisma/client";
import getServerSession from "./getServerSession";
import { NextResponse } from "next/server";

interface SessionWithUser extends Session {
  user: User;
}

export default async function withAuth(
  handler: (session: SessionWithUser) => Promise<Response | NextResponse>
) {
  const session = await getServerSession();
  if (!session) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Not logged in",
      }),
      {
        status: 401,
      }
    );
  }

  return handler(session);
}
