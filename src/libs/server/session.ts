import client from "./client";

class Session {
  async create(userId: number) {
    const result = await client.session.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return result.id;
  }
  async read(id: number) {
    const result = await client.session.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    return result;
  }
  async delete(id: number) {
    const result = await client.session.delete({
      where: {
        id,
      },
    });
    return result.id;
  }
  async deleteByUserId(userId: number) {
    const result = await client.session.deleteMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return result.count;
  }
}
const session = new Session();
export default session;
