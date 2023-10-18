import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return withAuth(async (session) => {
    const streams = await client.stream.findMany({
      // take: 10,
      // skip: 10,
      orderBy: {
        id: "desc",
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        streams,
      })
    );
  });
}

export async function POST(request: Request) {
  return withAuth(async (session) => {
    const { name, price, description } = await request.json();
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: session.userId,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        stream,
      })
    );
  });
}
