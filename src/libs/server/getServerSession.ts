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
// TODO middleware를 이용하던 뭐를 이요하던, session 호출하는 부분 한곳에서 관리하도록 수정하기
