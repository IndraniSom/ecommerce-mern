
import jwt from "jsonwebtoken";
import User from "../models/auth.js";

// Middleware to authenticate and authorize users
const auth = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-Auth-Token");

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const jwtSecretKey = process.env.JWT_SECRET;
    if (!jwtSecretKey) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const decoded = jwt.verify(token, jwtSecretKey);

    // Check if the token is expired
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }

    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Detailed error logging
    console.error("Error in authentication middleware:", error);

    // Check for specific error types
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid auth token." });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    } else {
      return res.status(500).json({ message: "Internal server error." });
    }
  }
};

export default auth;
