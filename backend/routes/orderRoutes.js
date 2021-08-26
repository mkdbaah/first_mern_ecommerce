import express from "express"
const router = express.Router()

import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } from "../controllers/orderController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered)

export default router

//// We save just the user id in the database(order) but we will populate it
//// In the postman I used John's token to access Jane's order. Please solve this problem if it is not solved
