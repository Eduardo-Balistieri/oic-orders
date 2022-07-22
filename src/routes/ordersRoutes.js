import { Router } from "express"
import OrdersController from "../controllers/OrdersController.js"

const router = Router()
router.post("/pedido/importacao", OrdersController.orderImport)

export default router