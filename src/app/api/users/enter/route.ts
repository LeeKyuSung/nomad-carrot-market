import client from "@/libs/server/client";

export async function POST(request: Request) {
  const { phone, email } = await request.json();
  const user = phone ? { phone: Number(phone) } : email ? { email } : null;
  if (!user)
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  const payload = String(Math.floor(100000 + Math.random() * 900000));
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    await fetch(`${process.env.SMS_API_URL!}/${phone}`, {
      method: "POST",
      body: `인증번호는 ${payload}입니다.`,
    });
  } else {
    await fetch(`${process.env.SMS_API_URL!}/01045219320`, {
      method: "POST",
      body: `인증번호는 ${payload}입니다.`,
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
    }),
    {
      status: 200,
    }
  );
}
