import { type iUser, User } from "../schemas/userModel";

export default class userService {
  static async addUser(user: iUser): Promise<void> {
    const exist = await User.findOne({
      email: user.email,
    });

    if (exist) {
      throw new Error("User exists!");
    }

    await User.create(user);
  }

  static async getUser(email: string): Promise<iUser> {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async delUser(email: string): Promise<void> {
    const deletedUser = await User.findOneAndDelete({
      email: email,
    });

    if (!deletedUser) {
      throw new Error("User not found");
    }
  }

  static async upUser(email: string, updateData: Partial<iUser>): Promise<void> {
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }
  }
}