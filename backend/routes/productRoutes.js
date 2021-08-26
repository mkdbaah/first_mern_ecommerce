import express from "express"
const router = express.Router()

import { createProduct, createProductReview, deleteProduct, fortest, getProductById, getProducts, getTopProducts, updateProduct } from "../controllers/productController.js"

import { protect, admin } from "../middleware/authMiddleware.js"

//// the arrangements of this file messed me up a little so please be careful
router.route("/").get(getProducts).post(protect, admin, createProduct)
router.route("/:id/reviews").post(protect, createProductReview)
router.get("/top", getTopProducts)
router.get("/fortest", fortest)
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
export default router

// if mongodb were a real database like any changes made on the backend code will not need reloading but since it is not a real time database we need to reload the react front end in order to see the error and reloading of products
/// if you want to change what is required you can do it in the models
/// if postman what you actually res.json() is what will come back so take note
