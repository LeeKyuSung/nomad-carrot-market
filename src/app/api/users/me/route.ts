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

  return new Response(
    JSON.stringify({
      ok: true,
      profile: session.user,
    }),
    {
      status: 200,
    }
  );
}
