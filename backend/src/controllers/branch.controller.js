import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Branch } from "../models/branch.model.js";

export const addBranch = asyncHandler(async (req, res, next) => {
    const { name, code } = req.body;

    if (!name || !code) {
        return next(new ApiError(400, "Name and code are required"));
    }

    const branchExists = await Branch.findOne({ code });
    if (branchExists) {
        return next(new ApiError(409, "Branch with this code already exists"));
    }

    const branch = new Branch({ name, code });
    await branch.save();

    res.status(201).json(new ApiResponse(201, branch, "Branch created successfully"));
});

// Get all branches
export const getAllBranches = asyncHandler(async (req, res, next) => {
    const branches = await Branch.find().populate("subjects", "name");
    res.json(new ApiResponse(200, branches, "Branches retrieved successfully"));
});

// Get branch by ID
export const getBranchById = asyncHandler(async (req, res, next) => {
    const branch = await Branch.findById(req.params.id).populate("subjects");

    if (!branch) {
        return next(new ApiError(404, "Branch not found"));
    }

    res.json(new ApiResponse(200, branch, "Branch retrieved successfully"));
});

// Delete branch
export const deleteBranch = asyncHandler(async (req, res, next) => {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
        return next(new ApiError(404, "Branch not found"));
    }

    await branch.deleteOne();
    res.json(new ApiResponse(200, null, "Branch deleted successfully"));
});

export const updateBranch = asyncHandler(async (req, res, next) => {
    const { name, code } = req.body;
    const { id } = req.params;

    const branch = await Branch.findById(id);
    if (!branch) {
        return next(new ApiError(404, "Branch not found"));
    }

    // Check for duplicate code if code is being updated
    if (code && code !== branch.code) {
        const existingBranch = await Branch.findOne({ code });
        if (existingBranch) {
            return next(new ApiError(409, "Branch with this code already exists"));
        }
    }

    // Update fields
    branch.name = name || branch.name;
    branch.code = code || branch.code;
    await branch.save();

    res.json(new ApiResponse(200, branch, "Branch updated successfully"));
});

export const branchController = {
    addBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch
};
