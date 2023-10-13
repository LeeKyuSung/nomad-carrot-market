import client from "@/libs/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await client.user.create({
    data: {
      email: "hi",
      name: "hi",
    },
  });
  return NextResponse.json({
    ok: true,
  });
}
