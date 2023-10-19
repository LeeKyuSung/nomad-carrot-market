import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return withAuth(async (session) => {
    const sales = await client.sale.findMany({
      where: {
        userId: session.userId,
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        sales,
      })
    );
  });
}
