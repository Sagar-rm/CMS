import { Marks } from "../models/marks.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Create or update a marks `entry`
 */
export const createOrUpdateMarks = asyncHandler(async (req, res, next) => {
    const { student, exam, marksObtained, grade } = req.body;

    // Check if the marks entry already exists for the given student and exam
    const existingMarks = await Marks.findOne({ student, exam });

    if (existingMarks) {
        // If it exists, update the existing entry
        existingMarks.marksObtained = marksObtained;
        existingMarks.grade = grade;
        await existingMarks.save();

        return res.status(200).json(new ApiResponse(200, existingMarks, "Marks entry updated successfully"));
    } else {
        // If it doesn't exist, create a new entry
        const marks = new Marks({ student, exam, marksObtained, grade });
        await marks.save();

        return res.status(201).json(new ApiResponse(201, marks, "Marks entry created successfully"));
    }
});

/**
 * Get all marks entries or filter by exam ID
 */
export const getMarks = asyncHandler(async (req, res, next) => {
    const { examId } = req.query; // Get examId from query parameters
    let marks;

    if (examId) {
        // If examId is provided, filter marks by exam
        marks = await Marks.find({ exam: examId }).populate("student exam");
    } else {
        // If no examId is provided, get all marks
        marks = await Marks.find().populate("student exam");
    }

    res.status(200).json(new ApiResponse(200, marks, "Marks retrieved successfully"));
});

/**
 * Get a single marks entry by ID
 */
export const getMarksById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const marks = await Marks.findById(id).populate("student exam");

    if (!marks) return next(new ApiError(404, "Marks entry not found"));

    res.status(200).json(new ApiResponse(200, marks, "Marks retrieved successfully"));
});

/**
 * Update a marks entry
 */
export const updateMarks = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedMarks = await Marks.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedMarks) return next(new ApiError(404, "Marks entry not found"));

    res.status(200).json(new ApiResponse(200, updatedMarks, "Marks updated successfully"));
});

/**
 * Delete a marks entry
 */
export const deleteMarks = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedMarks = await Marks.findByIdAndDelete(id);

    if (!deletedMarks) return next(new ApiError(404, "Marks entry not found"));

    res.status(200).json(new ApiResponse(200, deletedMarks, "Marks deleted successfully"));
});