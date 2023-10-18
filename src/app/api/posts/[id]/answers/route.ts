import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(async (session) => {
    const post = await client.post.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!post) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Post not found",
        }),
        {
          status: 404,
        }
      );
    }

    const { answer } = await request.json();

    const newAnswer = await client.answer.create({
      data: {
        user: {
          connect: {
            id: session.userId,
          },
        },
        post: {
          connect: {
            id: Number(params.id),
          },
        },
        answer,
      },
    });
    console.log(newAnswer);

    return new Response(
      JSON.stringify({
        ok: true,
        answer: newAnswer,
      }),
      {
        status: 200,
      }
    );
  });
}
