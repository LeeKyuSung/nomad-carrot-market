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

    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
        }
      )
    ).json();
    console.log(response);

    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        cloudflareId: "uid",
        cloudflareKey: "streamKey",
        cloudflareUrl: "url",
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
