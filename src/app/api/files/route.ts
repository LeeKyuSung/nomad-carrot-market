import withAuth from "@/libs/server/withAuth";

export function GET(request: Request) {
  return withAuth(async (session) => {
    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
    ).json();
    return new Response(
      JSON.stringify({
        ok: true,
        ...response.result,
      })
    );
  });
}
