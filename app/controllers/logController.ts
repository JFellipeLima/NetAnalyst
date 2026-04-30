import logService from "../services/logService"
import type { Request, Response } from 'express'

export default class logController{
  static async getDomains(req: Request, res: Response) {
    try {
      const data = await logService.getDomains()
      res.status(200).json(data)
    } catch {
      res.status(500).json({ message: "Internal server error" })
    }
  }
  static async getLogs(req: Request, res: Response) {
    try {
      const domainName = req.body["domain_name"]
      const data = await logService.getLog(domainName)
      res.status(200).json(data)
    } catch {
      res.status(500).json({ message: "Internal server error"})
    }
  }
}