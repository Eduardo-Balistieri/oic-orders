import { Router } from "express"
import multer from "multer"
import OrdersController from "../controllers/OrdersController.cjs"

const upload = multer({ dest: "uploads/" })

const router = Router()
router.post(
  "/pedido/importacao", 
  upload.single("payload"), OrdersController.orderImport
)

export default router