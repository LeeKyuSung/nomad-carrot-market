import client from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { phone, email } = await request.json();
  const payload = phone ? { phone: Number(phone) } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "Anonymous",
      ...payload,
    },
    update: {},
  });
  console.log(user);
  return NextResponse.json(user);
}
