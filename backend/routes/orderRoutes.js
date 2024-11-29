import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, userOrder, vertifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", vertifyOrder)
orderRouter.post("/userorders", authMiddleware, userOrder)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus )



export default orderRouter;