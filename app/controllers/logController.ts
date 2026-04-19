import { analyticService } from "../services/analyticService"
import logService from "../services/logService"
import type { Request, Response } from 'express'

export async function getDomains(req: Request, res: Response) {
  try {
    const data = await logService.getDomains()
    res.status(200).json(data)
  } catch {
    res.status(500).json({ message: "Internal server error" })
  }
}
export async function getLogs(req: Request, res: Response) {
  try {
    const domainName = req.body["domain_name"]
    const data = await logService.getLog(domainName)
    res.status(200).json(data)
  } catch {
    res.status(500).json({ message: "Internal server error"})
  }
}

export async function getAnalytics(req: Request, res: Response) {
  try {
    const domainName = req.body["domain_name"]
    const data = await analyticService.getAnalytic(domainName)
    res.status(200).json(data)

  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
}
