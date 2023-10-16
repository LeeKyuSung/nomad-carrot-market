import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export async function GET(request: Request) {
  return withAuth(request, async (request) => {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: { Favorite: true },
        },
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        products,
      }),
      {
        status: 200,
      }
    );
  });
}

export async function POST(request: Request) {
  return withAuth(request, async (request) => {
    const { name, price, description } = await request.json();
    const product = await client.product.create({
      data: {
        name,
        price: Number(price),
        description,
        image: "xxxx",
        user: {
          connect: {
            id: request.session.user.id,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        product,
      }),
      {
        status: 200,
      }
    );
  });
}
