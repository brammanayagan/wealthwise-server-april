// Import JWT
import jwt from "jsonwebtoken";

// Generate token function
const generateToken = (id) => {
  try {
    // Create token with payload (user id)
    const token = jwt.sign(
      { id }, // Payload
      process.env.JWT_SECRET, // Secret key
      {
        expiresIn: process.env.JWT_EXPIRE || "7d", // Expiry
      },
    );

    return token;
  } catch (error) {
    // Throw error if token generation fails
    throw new Error("Token generation failed");
  }
};

// Export function
export default generateToken;
