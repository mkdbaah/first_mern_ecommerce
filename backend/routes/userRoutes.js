import express from "express"
const router = express.Router()

import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router

//// the route is just api/users/:id whether it is delete or edit it will tell
