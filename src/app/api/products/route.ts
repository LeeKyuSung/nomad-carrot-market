import client from "@/libs/server/client";
import getServerSession from "@/libs/server/getServerSession";

export async function GET(request: Request) {
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
}

export async function POST(request: Request) {
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

  const { name, price, description } = await request.json();
  const product = await client.product.create({
    data: {
      name,
      price: Number(price),
      description,
      image: "xxxx",
      user: {
        connect: {
          id: session.user.id,
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
}
