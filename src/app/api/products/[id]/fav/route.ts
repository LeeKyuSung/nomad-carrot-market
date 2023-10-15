import client from "@/libs/server/client";
import getServerSession from "@/libs/server/getServerSession";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Not logged in",
      }),
      {
        status: 401,
      }
    );
  }

  const alreadyFavorited = await client.favorite.findFirst({
    where: {
      productId: Number(params.id),
      userId: session.userId,
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
            id: session.userId,
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
}
