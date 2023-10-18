import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export async function GET(request: Request) {
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
