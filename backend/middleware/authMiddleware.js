import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

import User from "../models/userModel.js"

/// this is for users with token because minus the token this will fail
const protect = asyncHandler(async (req, res, next) => {
  let token

  // console.log(req.headers.authorization)
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // we will now have access to the user in all of our protect routes
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
    /// this works because we are first passing the protect middleware and this already decodes the token and therefore this understands req.user
  } else {
    res.status(401)
    throw new Error("Not authorized as an admin")
  }
}

export { protect, admin }
