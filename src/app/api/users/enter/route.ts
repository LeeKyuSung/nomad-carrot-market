import client from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { phone, email } = await request.json();
  const payload = phone ? { phone: Number(phone) } : { email };
  const token = await client.token.create({
    data: {
      payload: "1234",
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "Anonymous",
            ...payload,
          },
        },
      },
    },
  });

  return NextResponse.json(token);
}
