import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export function GET(request: Request, { params }: { params: { id: string } }) {
  return withAuth(async (session) => {
    const stream = await client.stream.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        Message: {
          select: {
            id: true,
            message: true,
            user: {
              select: {
                avatar: true,
                id: true,
              },
            },
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
