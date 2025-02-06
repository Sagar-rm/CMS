import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Grade } from "../models/grade.model.js";

const addGrade = asyncHandler(async (req, res) => {
    const { student, semester, subjects, sgpa, weightedSgpa, totalCredits, totalWeightedSgpa, cgpa, percentage } = req.body;

    if (!student || !semester || !subjects || subjects.length === 0) {
        throw new ApiError(400, "Student, semester, and subjects are required");
    }

    const grade = await Grade.create({
        student, semester, subjects, sgpa, weightedSgpa, totalCredits, totalWeightedSgpa, cgpa, percentage
    });

    return res.status(201).json(new ApiResponse(201, grade, "Grade added successfully"));
});

const getAllGrades = asyncHandler(async (req, res) => {
    const grades = await Grade.find({})
        .populate("student", "fullName")
        .populate("subjects.subject", "name");

    return res.status(200).json(new ApiResponse(200, grades, "Grades fetched successfully"));
});


export const gradeController = {
    addGrade,
    getAllGrades
};