import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (request) => {
    const alreadyWondered = await client.wondering.findFirst({
      where: {
        userId: request.session.userId,
        postId: Number(params.id),
      },
      select: {
        id: true,
      },
    });
    if (alreadyWondered) {
      await client.wondering.delete({
        where: {
          id: alreadyWondered.id,
        },
      });
    } else {
      await client.wondering.create({
        data: {
          user: {
            connect: {
              id: request.session.userId,
            },
          },
          post: {
            connect: {
              id: Number(params.id),
            },
          },
        },
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      {
        status: 200,
      }
    );
  });
}
