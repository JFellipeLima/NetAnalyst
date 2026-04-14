import { Router } from "express"
import { getLogs, getAnalytics, getDomains} from "../controllers/logController.js"

const router = Router()

router.post("/log", getLogs)
router.post("/analytic", getAnalytics)
router.post("/domains", getDomains)

export default router
