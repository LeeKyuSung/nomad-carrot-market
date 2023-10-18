import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return withAuth(async (session) => {
    const product = await client.product.findUnique({
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
      },
    });

    const isFavorited = await client.favorite.findFirst({
      where: {
        productId: Number(params.id),
        userId: session.userId,
      },
    });

    const terms = product?.name.split(" ").map((word) => ({
      name: {
        contains: word,
      },
    }));
    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        NOT: {
          id: product?.id,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        product,
        isFav: Boolean(isFavorited),
        relatedProducts,
      })
    );
  });
}
