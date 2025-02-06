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

    // Check for profile image, use default if not provided
    const profileLocalPath = req.files?.profile?.[0]?.path || "public/temp/RisingSun-CP-111.jpg";
    
    const user = await Model.create({
        ...req.body,
        profile: profileLocalPath,
    });

    const createdUser = await Model.findById(user._id).select("-password -refreshToken");
    res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const getAllFaculty = asyncHandler(async (req, res) => {
    const faculty = await Faculty.find().populate('department', 'name'); // Populate department name if needed
    res.status(200).json(new ApiResponse(200, faculty, "Faculty members retrieved successfully"));
});


const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().populate('branch', 'name'); // Populate the branch name (optional)
    res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
});


const loginStudent = asyncHandler(async (req, res) => {
    const { registerNumber, password } = req.body;
    if (!registerNumber || !password) {
        throw new ApiError(400, "Register number and password are required");
    }

    const student = await Student.findOne({ registerNumber });
    if (!student || !(await student.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(student._id, Student);

    res.status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .json(new ApiResponse(200, { user: student, accessToken }, "Login successful"));
});

const loginFaculty = asyncHandler(async (req, res) => {
    const { kgId, password } = req.body;
    if (!kgId || !password) {
        throw new ApiError(400, "KG ID and password are required");
    }

    const faculty = await Faculty.findOne({ kgId });
    if (!faculty || !(await faculty.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(faculty._id, Faculty);

    res.status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .json(new ApiResponse(200, { user: faculty, accessToken }, "Login successful"));
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

const deleteUser = (Model) => asyncHandler(async (req, res) => {
    const user = await Model.findByIdAndDelete(req.params.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

const updateUser = (Model, allowedFields) => asyncHandler(async (req, res) => {
    const updates = {};
    Object.keys(req.body).forEach((key) => {
        if (allowedFields.includes(key)) {
            updates[key] = req.body[key];
        }
    });

    const user = await Model.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
});

export const studentController = {
    register: registerUser(Student, ["registerNumber","fullName", "email","phoneNumber", "password", "semester", "branch", "gender"]),
    login: loginStudent,
    logout: logoutUser(Student),
    refresh: refreshAccessToken(Student),
    getCurrentUser: getCurrentUser(Student),
    getAllStudents, // Added function
    deleteUser: deleteUser(Student), 
    updateUser: updateUser(Student, ["fullName", "email", "phoneNumber", "semester", "branch", "gender"])
};

export const facultyController = {
    register: registerUser(Faculty, ["fullName", "email", "password", "department"]),
    login: loginFaculty,
    logout: logoutUser(Faculty),
    refresh: refreshAccessToken(Faculty),
    getCurrentUser: getCurrentUser(Faculty),
    getAllFaculty,
    deleteUser: deleteUser(Faculty),
    updateUser: updateUser(Faculty, ["fullName", "email", "department"])
};
