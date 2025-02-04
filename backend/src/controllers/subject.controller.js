import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subject } from "../models/subject.model.js";

const addSubject = asyncHandler(async (req, res) => {
    const { name, code, branch, semester, credits, type } = req.body;

    if (!name || !code || !branch) {
        throw new ApiError(400, "Subject name, code, and branch are required");
    }

    const subject = await Subject.create({ name, code, branch, semester, credits, type });

    return res.status(201).json(new ApiResponse(201, subject, "Subject added successfully"));
});

const getAllSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({}).populate("branch", "name");
    return res.status(200).json(new ApiResponse(200, subjects, "Subjects fetched successfully"));
});


export const subjectController = {
    addSubject,
    getAllSubjects
};