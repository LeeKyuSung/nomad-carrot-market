import client from "@/libs/server/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log(res);
  return NextResponse.json(res);
}
