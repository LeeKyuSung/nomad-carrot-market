export async function POST(request: Request) {
  const { token } = await request.json();
  console.log(token);

  return new Response(
    JSON.stringify({
      ok: true,
    }),
    {
      status: 200,
    }
  );
}
