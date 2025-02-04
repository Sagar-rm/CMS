import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Exam } from "../models/exam.model.js";

const addExamResult = asyncHandler(async (req, res) => {
    const { student, subject, internalMarks, externalMarks, totalMarks, passed } = req.body;

    if (!student || !subject || totalMarks === undefined) {
        throw new ApiError(400, "Student, subject, and total marks are required");
    }

    const exam = await Exam.create({ student, subject, internalMarks, externalMarks, totalMarks, passed });

    return res.status(201).json(new ApiResponse(201, exam, "Exam result added successfully"));
});

const getAllExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find({})
        .populate("student", "fullName")
        .populate("subject", "name");

    return res.status(200).json(new ApiResponse(200, exams, "Exams fetched successfully"));
});


export const examController = {
    addExamResult,
    getAllExams
};