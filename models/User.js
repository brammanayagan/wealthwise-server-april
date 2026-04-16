// Import mongoose
import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema(
  {
    // User name
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    // User email
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Prevent duplicate users
      lowercase: true, // Store email in lowercase
      trim: true, // Remove extra spaces
    },

    // User password (hashed)
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6, // Minimum password length
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
  },
);

// Create model from schema
const User = mongoose.model("User", userSchema);

// Export model
export default User;
