import { Marks } from "../models/marks.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Exam } from "../models/exam.model.js";

/**
 * Function to determine grade based on percentage
 */
const getGrade = (percentage) => {
    if (percentage >= 91) return "A+";
    if (percentage >= 81) return "A";
    if (percentage >= 71) return "B+";
    if (percentage >= 61) return "B";
    if (percentage >= 51) return "C+";
    if (percentage >= 45) return "C";
    if (percentage >= 40) return "D";
    return "F";
};

/**
 * Create or update a marks entry
 */
export const createOrUpdateMarks = asyncHandler(async (req, res, next) => {
    const { student, exam, marksObtained } = req.body;

    // Fetch the exam to get maxMarks
    const examDetails = await Exam.findById(exam);
    if (!examDetails) {
        return next(new ApiError(404, "Exam not found"));
    }

    const maxMarks = examDetails.maxMarks; // Get max marks for the exam
    console.log("maxMarks: ", maxMarks)
    const percentage = (marksObtained / maxMarks) * 100; // Convert marks to percentage
    console.log("percentage: ", percentage)
    const grade = getGrade(percentage); // Get the grade

    // Check if the marks entry already exists
    const existingMarks = await Marks.findOne({ student, exam });

    if (existingMarks) {
        // Update the entry
        existingMarks.marksObtained = marksObtained;
        existingMarks.grade = grade;
        await existingMarks.save();

        return res.status(200).json(new ApiResponse(200, existingMarks, "Marks updated successfully"));
    } else {
        // Create a new entry
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