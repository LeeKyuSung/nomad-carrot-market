import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (request) => {
    const alreadyFavorited = await client.favorite.findFirst({
      where: {
        productId: Number(params.id),
        userId: request.session.userId,
      },
    });
    if (alreadyFavorited) {
      await client.favorite.delete({
        where: {
          id: alreadyFavorited.id,
        },
      });
    } else {
      await client.favorite.create({
        data: {
          user: {
            connect: {
              id: request.session.userId,
            },
          },
          product: {
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
