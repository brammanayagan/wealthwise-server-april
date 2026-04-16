import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { error } from "../utils/response.js";

// =========================
// PROTECT ROUTES MIDDLEWARE
// =========================
export const protect = async (req, res, next) => {
  let token;

  try {
    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return error(res, "Not authorized, no token", 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return error(res, "User not found", 401);
    }

    // Attach user to request
    req.user = user;

    // Continue to next middleware/controller
    next();
  } catch (err) {
    return error(res, "Token failed", 401);
  }
};
