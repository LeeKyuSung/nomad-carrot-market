import withAuth from "@/libs/server/withAuth";

export function GET(request: Request) {
  return withAuth(async (session) => {
    return new Response(
      JSON.stringify({
        ok: true,
        profile: session.user,
      })
    );
  });
}
