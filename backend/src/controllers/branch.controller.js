import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Branch } from "../models/branch.model.js";

export const addBranch = asyncHandler(async (req, res) => {
    try {
        const { name, code } = req.body;
        const branch = new Branch({ name, code });
        await branch.save();
        res.status(201).json({ message: "Branch created successfully", branch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }});


// Get all branches
export const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find().populate("subjects", "name");
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get branch by ID
export const getBranchById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id).populate("subjects");
        if (!branch) return res.status(404).json({ message: "Branch not found" });

        res.json(branch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete branch
export const deleteBranch = async (req, res) => {
    try {
        await Branch.findByIdAndDelete(req.params.id);
        res.json({ message: "Branch deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

