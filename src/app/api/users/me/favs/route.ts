import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return withAuth(async (session) => {
    const favs = await client.fav.findMany({
      where: {
        userId: session.userId,
      },
      include: {
        product: true,
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        favs,
      })
    );
  });
}
