import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return withAuth(async (session) => {
    const data = await client.fav.findMany({
      where: {
        userId: session.userId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            _count: {
              select: {
                Fav: true,
              },
            },
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        data,
      })
    );
  });
}
