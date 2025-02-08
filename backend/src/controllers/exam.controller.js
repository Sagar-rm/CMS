import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Exam } from "../models/exam.model.js";

// Add an exam result
const addExamResult = asyncHandler(async (req, res) => {
    const { student, subject, internalMarks, externalMarks } = req.body;

    if (!student || !subject || internalMarks === undefined || externalMarks === undefined) {
        throw new ApiError(400, "Student, subject, internal marks, and external marks are required");
    }

    // Calculate total marks
    const totalMarks = internalMarks + externalMarks;

    if (totalMarks > 100) {
        throw new ApiError(400, "Total marks cannot exceed 100");
    }

    // Determine pass/fail status
    const passed = totalMarks >= 48 && internalMarks > 0 && externalMarks > 0;

    // Save exam result
    const exam = await Exam.create({ student, subject, internalMarks, externalMarks, totalMarks, passed });

    return res.status(201).json(new ApiResponse(201, exam, "Exam result added successfully"));
});

// Get all exams
const getAllExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find({})
        .populate("student", "fullName")
        .populate("subject", "name");

    return res.status(200).json(new ApiResponse(200, exams, "Exams fetched successfully"));
});

// Update an exam result
const updateExamResult = asyncHandler(async (req, res) => {
    const { student, subject, internalMarks, externalMarks } = req.body;
    const { id } = req.params;

    const exam = await Exam.findById(id);
    if (!exam) {
        throw new ApiError(404, "Exam result not found");
    }

    // Update fields
    exam.student = student || exam.student;
    exam.subject = subject || exam.subject;
    exam.internalMarks = internalMarks !== undefined ? internalMarks : exam.internalMarks;
    exam.externalMarks = externalMarks !== undefined ? externalMarks : exam.externalMarks;

    // Recalculate total marks
    exam.totalMarks = exam.internalMarks + exam.externalMarks;

    if (exam.totalMarks > 100) {
        throw new ApiError(400, "Total marks cannot exceed 100");
    }

    // Determine pass/fail status
    exam.passed = exam.totalMarks >= 48 && exam.internalMarks > 0 && exam.externalMarks > 0;

    await exam.save();

    return res.status(200).json(new ApiResponse(200, exam, "Exam result updated successfully"));
});

// Delete an exam result
const deleteExamResult = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const exam = await Exam.findById(id);
    if (!exam) {
        throw new ApiError(404, "Exam result not found");
    }

    await exam.deleteOne();

    return res.status(200).json(new ApiResponse(200, null, "Exam result deleted successfully"));
});

export const examController = {
    addExamResult,
    getAllExams,
    updateExamResult,
    deleteExamResult
};
