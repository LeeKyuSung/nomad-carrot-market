import session from "@/libs/server/session";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  if (!cookieStore.has("session")) {
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

  const sessionId = Number(cookieStore.get("session")?.value);
  const userSession = await session.read(Number(sessionId));

  return new Response(
    JSON.stringify({
      ok: true,
      profile: userSession?.user,
    }),
    {
      status: 200,
    }
  );
}
