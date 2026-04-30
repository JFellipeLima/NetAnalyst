import { Router } from "express"
import logController from "../controllers/logController"

const router = Router()

router.post("/log", logController.getLogs)
router.get("/domains", logController.getDomains)

export default router
