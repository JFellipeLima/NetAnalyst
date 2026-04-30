import userService from "../services/userServicer"
import type { Request, Response } from "express"

export default class UserController {
  static async addUser(req: Request, res: Response): Promise<void> {
    try {
      await userService.addUser(req.body);
      res.status(201).json({ message: "Successfully created user" });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create user" });
    }
  }

  static async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUser(req.params.email);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const email = req.body["email"];
      await userService.upUser(email, req.body);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delUser(req: Request, res: Response): Promise<void> {
    const { email } = req.params
    if (typeof email !== "string") {
      res.status(500).json({ message: "The type is not string!"})
    
    } else {
      try {
        await userService.delUser(email);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
    }
    
  }
}