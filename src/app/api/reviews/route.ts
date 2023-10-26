import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return withAuth(async (session) => {
    const reviews = await client.review.findMany({
      where: {
        createdForId: session.userId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        reviews,
      })
    );
  });
}
