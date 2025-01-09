import jwt from "jsonwebtoken"
import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// JWT Verification Middleware
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log("Decoded Token:", decodedToken); // Debugging log

        const { _id: userId } = decodedToken;

        // Check for user in Student and Faculty collections
        let user = await Student.findById(userId).select("-password -refreshToken");
        if (!user) {
            user = await Faculty.findById(userId).select("-password -refreshToken");
        }

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user; // Attach user data to `req`
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error); // Debugging log
        throw new ApiError(401, error.message || "Invalid access token");
    }
});

export const authorizeAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.isHod !== true) {
      throw new ApiError(403, "Access denied. Admin rights required.");
    }
    next();
  });
