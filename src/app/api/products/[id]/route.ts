import client from "@/libs/server/client";
import getServerSession from "@/libs/server/getServerSession";

export async function GET(
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
