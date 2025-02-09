import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subject } from "../models/subject.model.js";

// Add a subject
const addSubject = asyncHandler(async (req, res) => {
    const { name, code, branch, semester, credits, type } = req.body;

    if (!name || !code || !branch) {
        throw new ApiError(400, "Subject name, code, and branch are required");
    }

    const subjectExists = await Subject.findOne({ code });
    if (subjectExists) {
        throw new ApiError(409, "Subject with this code already exists");
    }

    const subject = await Subject.create({ name, code, branch, semester, credits, type });

    return res.status(201).json(new ApiResponse(201, subject, "Subject added successfully"));
});

// Get all subjects
const getAllSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({}).populate("branch", "name");
    return res.status(200).json(new ApiResponse(200, subjects, "Subjects fetched successfully"));
});

// Update a subject
const updateSubject = asyncHandler(async (req, res) => {
    const { name, code, branch, semester, credits, type } = req.body;
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    // Check for duplicate code if updating code
    if (code && code !== subject.code) {
        const existingSubject = await Subject.findOne({ code });
        if (existingSubject) {
            throw new ApiError(409, "Subject with this code already exists");
        }
    }

    // Update fields
    subject.name = name || subject.name;
    subject.code = code || subject.code;
    subject.branch = branch || subject.branch;
    subject.semester = semester || subject.semester;
    subject.credits = credits || subject.credits;
    subject.type = type || subject.type;

    await subject.save();

    return res.status(200).json(new ApiResponse(200, subject, "Subject updated successfully"));
});

// Delete a subject
const deleteSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    await subject.deleteOne();

    return res.status(200).json(new ApiResponse(200, null, "Subject deleted successfully"));
});

export const subjectController = {
    addSubject,
    getAllSubjects,
    updateSubject,
    deleteSubject
};
