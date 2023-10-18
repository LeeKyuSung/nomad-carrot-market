import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latitude = searchParams.get("latitude");
  const parsedLatitude = latitude ? parseFloat(latitude) : null;
  const longitude = searchParams.get("longitude");
  const parsedLongitude = longitude ? parseFloat(longitude) : null;
  return withAuth(request, async (request) => {
    const posts = await client.post.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            Answer: true,
            Wondering: true,
          },
        },
      },
      where:
        parsedLatitude && parsedLongitude
          ? {
              latitude: {
                gte: parsedLatitude - 0.05,
                lte: parsedLatitude + 0.05,
              },
              longitude: {
                gte: parsedLongitude - 0.05,
                lte: parsedLongitude + 0.05,
              },
            }
          : undefined,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        posts,
      }),
      {
        status: 200,
      }
    );
  });
}

export async function POST(request: Request) {
  return withAuth(request, async (request) => {
    const { question, latitude, longitude } = await request.json();

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: request.session.userId,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        post,
      }),
      {
        status: 200,
      }
    );
  });
}
