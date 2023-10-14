import client from "@/libs/server/client";
import session from "@/libs/server/session";

export async function POST(request: Request) {
  const { token } = await request.json();
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });
  if (!exists) {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }

  const sessionId = await session.create(exists.user.id);
  await client.token.delete({
    where: {
      id: exists.id,
    },
  });

  return new Response(
    JSON.stringify({
      ok: true,
    }),
    {
      status: 200,
      headers: { "Set-Cookie": `session=${sessionId}` },
    }
  );
}
