import type { iUser } from "../schemas/userModel";
import prisma from "../lib/prisma"

export default class userService {
  static async addUser(user: iUser): Promise<void> {
    const exist = await prisma.users.findUnique({
      where: {
        email: user.email
      }
    });

    if (exist) {
      throw new Error("User exists!");
    }

    await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        passkey: user.passkey,
        active: true,
      }
    })
  }

  static async getUser(email: string): Promise<iUser[]> {
    if (email == "All") {
      return await prisma.users.findMany()
    }
    const user = await prisma.users.findMany({
      where: {
        email: email,
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async delUser(email: string): Promise<void> {
    const deletedUser = await prisma.users.delete({
      where: {
        email: email,
      }
    });

    if (!deletedUser) {
      throw new Error("User not found");
    }
  }

  static async upUser(email: string, updateData: Partial<iUser>): Promise<void> {
    const user = await prisma.users.update({
      where: {
        email: email
      },
      data: updateData
    });

    if (!user) {
      throw new Error("User not found");
    }
  }
}