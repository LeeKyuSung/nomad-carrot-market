import client from "@/libs/server/client";
import withAuth from "@/libs/server/withAuth";

export function GET(request: Request) {
  return withAuth(async (session) => {
    return new Response(
      JSON.stringify({
        ok: true,
        profile: session.user,
      })
    );
  });
}

export function POST(request: Request) {
  return withAuth(async (session) => {
    const { name, email, phone } = await request.json();
    if (email) {
      const alreadyExists = await client.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });
      if (alreadyExists && alreadyExists.id !== session.userId) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: "Email already exists",
          })
        );
      }
    }
    if (phone) {
      const alreadyExists = await client.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      });
      if (alreadyExists && alreadyExists.id !== session.userId) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: "Phone already exists",
          })
        );
      }
    }

    if (
      name !== session.user.name ||
      email !== session.user.email ||
      phone !== session.user.phone
    ) {
      await client.user.update({
        where: {
          id: session.userId,
        },
        data: {
          name:
            name !== session.user.name
              ? name === ""
                ? "Anonymous"
                : name
              : undefined,
          email:
            email !== session.user.email
              ? email === ""
                ? null
                : email
              : undefined,
          phone:
            phone !== session.user.phone
              ? phone === ""
                ? null
                : phone
              : undefined,
        },
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
      })
    );
  });
}
