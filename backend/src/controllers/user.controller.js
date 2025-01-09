import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Faculty } from "../models/faculty.model.js";
import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId, Model) => {
    try {
        const user = await Model.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
};

const registerUser = (Model, requiredFields) => asyncHandler(async (req, res) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length) {
        throw new ApiError(400, `Missing fields: ${missingFields.join(", ")}`);
    }

    const existingUser = await Model.findOne({ email: req.body.email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const profileLocalPath = req.file?.path;
    if (!profileLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }


    const user = await Model.create({
        ...req.body,
        profile: profile.url,
    });

    const createdUser = await Model.findById(user._id).select("-password -refreshToken");
    res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = (Model) => asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await Model.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id, Model);

    res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", refreshToken).json(new ApiResponse(200, { user, accessToken }, "Login successful"));
});

const logoutUser = (Model) => asyncHandler(async (req, res) => {
    await Model.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
    res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json(new ApiResponse(200, {}, "Logout successful"));
});

const refreshAccessToken = (Model) => asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await Model.findById(decoded._id);

        if (!user || user.refreshToken !== refreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id, Model);
        res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", newRefreshToken).json(new ApiResponse(200, { accessToken }, "Token refreshed"));
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }
});

const getCurrentUser = (Model) => asyncHandler(async (req, res) => {
    const user = await Model.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User data retrieved"));
});

export const studentController = {
    register: registerUser(Student, ["name", "email", "password", "enrollmentNumber"]),
    login: loginUser(Student),
    logout: logoutUser(Student),
    refresh: refreshAccessToken(Student),
    getCurrentUser: getCurrentUser(Student)
};

export const facultyController = {
    register: registerUser(Faculty, ["name", "email", "password", "department"]),
    login: loginUser(Faculty),
    logout: logoutUser(Faculty),
    refresh: refreshAccessToken(Faculty),
    getCurrentUser: getCurrentUser(Faculty)
};
