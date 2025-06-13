import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import { JWT_SECRET } from "../config/env.js";
 const  authorize = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization && // Check if authorization header exists
      req.headers.authorization.startsWith("Bearer") // Check if it starts with "Bearer" 
    ) {
      token = req.authorization.spilt(" ")[1];
    }
    if (!token) {
      res.status(401).json({ message: "Unauthorized access, token missing" });
    }
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET); // full data of decoded are { }
    const user = User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    req.user = user;
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authorize;