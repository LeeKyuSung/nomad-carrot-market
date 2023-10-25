import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export function GET(request: Request, { params }: { params: { id: string } }) {
  return withAuth(async (session) => {
    const stream = await client.stream.findUnique({
      where: {
        id: Number(params.id),
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        cloudflareId: true,
        cloudflareKey: true,
        cloudflareUrl: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
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
    const isOwner = stream?.userId === session.userId;
    if (stream && !isOwner) {
      stream.cloudflareKey = "xxxxx";
      stream.cloudflareUrl = "xxxxx";
    }
    return new Response(
      JSON.stringify({
        ok: true,
        stream,
      })
    );
  });
}
