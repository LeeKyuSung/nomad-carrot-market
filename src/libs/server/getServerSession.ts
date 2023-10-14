import { cookies } from "next/headers";
import session from "./session";

export default async function getServerSession() {
  const cookieStore = cookies();
  if (!cookieStore.has("session")) {
    return null;
  }

  const sessionId = Number(cookieStore.get("session")?.value);
  const userSession = await session.read(Number(sessionId));

  return userSession;
}
