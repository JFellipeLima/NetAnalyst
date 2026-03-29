import { Router} from "express"
import getLogs from "../controllers/netController.js"

const router = Router()

router.get("/", getLogs)

export default router
