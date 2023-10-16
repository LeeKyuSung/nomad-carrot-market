import { Session, User } from "@prisma/client";
import getServerSession from "./getServerSession";

interface SessionWithUser extends Session {
  user: User;
}
interface RequestWithSession extends Request {
  session: SessionWithUser;
}

export default async function withAuth(
  request: Request,
  handler: (request: RequestWithSession) => Promise<Response>
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

  const requestWithSession = request as RequestWithSession;
  requestWithSession.session = session;

  return handler(requestWithSession);
}
