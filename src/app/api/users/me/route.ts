import withAuth from "@/libs/server/withAuth";

export async function GET(request: Request) {
  return withAuth(request, async (request) => {
    return new Response(
      JSON.stringify({
        ok: true,
        profile: request.session.user,
      }),
      {
        status: 200,
      }
    );
  });
}
