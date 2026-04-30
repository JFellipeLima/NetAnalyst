import { Router } from "express"
import userController from "../controllers/userController"

const router = Router()

router.get("/get/:email", userController.getUser)
router.post("/add", userController.addUser)
router.put("/up", userController.updateUser)
router.delete("/del/:email", userController.delUser)

export default router