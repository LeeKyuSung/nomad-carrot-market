import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export async function POST(request: Request) {
  return withAuth(request, async (request) => {
    const { question } = await request.json();

    const post = await client.post.create({
      data: {
        question,
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
