// Import dependencies
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { success, error } from "../utils/response.js"; // ✅ ADD THIS

// =========================
// REGISTER USER
// =========================
export const register = async (req, res) => {
  try {
    // Extract data
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return error(res, "All fields are required", 400); // ✅ FIXED
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return error(res, "User already exists", 400); // ✅ FIXED
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token (OPTIONAL but recommended)
    const token = generateToken(user._id);

    // Send response
    return success(
      res,
      {
        token, // ✅ added for consistency with login
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      "User registered successfully",
    );
  } catch (err) {
    return error(res, err.message || "Server Error", 500); // ✅ FIXED
  }
};

// =========================
// LOGIN USER
// =========================
export const login = async (req, res) => {
  try {
    // Extract data
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return error(res, "Email and password required", 400); // ✅ FIXED
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return error(res, "Invalid credentials", 401); // ✅ FIXED
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return error(res, "Invalid credentials", 401); // ✅ FIXED
    }

    // Generate token
    const token = generateToken(user._id);

    // Send success response
    return success(
      res,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      "Login successful",
    );
  } catch (err) {
    return error(res, err.message || "Server Error", 500); // ✅ FIXED
  }
};
