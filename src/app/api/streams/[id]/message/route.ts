import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export function POST(request: Request, { params }: { params: { id: string } }) {
  return withAuth(async (session) => {
    const body = await request.json();
    const message = await client.message.create({
      data: {
        message: body.message,
        stream: {
          connect: {
            id: Number(params.id),
          },
        },
        user: {
          connect: {
            id: session.userId,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        message,
      })
    );
  });
}
