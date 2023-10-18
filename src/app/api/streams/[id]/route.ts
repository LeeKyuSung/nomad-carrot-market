import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export function GET(request: Request, { params }: { params: { id: string } }) {
  return withAuth(async (session) => {
    const stream = await client.stream.findUnique({
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
        stream,
      })
    );
  });
}
