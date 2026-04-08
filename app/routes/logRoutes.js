import { Router } from "express"
import { getLogs, getAnalytics } from "../controllers/logController.js"

const router = Router()

router.get("/log", getLogs)
router.get("/analytic", getAnalytics)

export default router
