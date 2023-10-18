import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (request) => {
    const post = await client.post.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        Answer: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
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
