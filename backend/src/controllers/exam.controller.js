import { Exam } from "../models/exam.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Create a new exam
 */
export const createExam = asyncHandler(async (req, res, next) => {
    const { subject, type, date, duration, maxMarks, scheduledBy } = req.body;

    const exam = new Exam({ subject, type, date, duration, maxMarks, scheduledBy });
    await exam.save();

    res.status(201).json(new ApiResponse(201, exam, "Exam created successfully"));
});

/**
 * Get all exams
 */
export const getExams = asyncHandler(async (req, res, next) => {
    const exams = await Exam.find().populate("subject scheduledBy");
    res.status(200).json(new ApiResponse(200, exams, "Exams retrieved successfully"));
});

/**
 * Get a single exam by ID
 */
export const getExamById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const exam = await Exam.findById(id).populate("subject scheduledBy");

    if (!exam) return next(new ApiError(404, "Exam not found"));

    res.status(200).json(new ApiResponse(200, exam, "Exam retrieved successfully"));
});

/**
 * Update an exam
 */
export const updateExam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedExam = await Exam.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedExam) return next(new ApiError(404, "Exam not found"));

    res.status(200).json(new ApiResponse(200, updatedExam, "Exam updated successfully"));
});

/**
 * Delete an exam
 */
export const deleteExam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedExam = await Exam.findByIdAndDelete(id);

    if (!deletedExam) return next(new ApiError(404, "Exam not found"));

    res.status(200).json(new ApiResponse(200, deletedExam, "Exam deleted successfully"));
});
