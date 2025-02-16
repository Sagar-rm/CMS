import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Exam } from "../models/exam.model.js";

// Helper function to calculate internal marks
const calculateInternalMarks = (cieExams) => {
    return cieExams.reduce((acc, exam) => acc + (exam.marks * exam.weightage) / exam.maxMarks, 0);
};

// Add an exam result
const addExamResult = asyncHandler(async (req, res) => {
    const { student, subject, cieExams, externalMarks } = req.body;

    if (!student || !subject || !cieExams || !Array.isArray(cieExams)) {
        throw new ApiError(400, "Student, subject, and CIE exams are required");
    }

    // Calculate internal marks
    const internalMarks = calculateInternalMarks(cieExams);

    // Ensure externalMarks is properly handled (null for audit courses)
    const external = externalMarks !== undefined ? externalMarks : null;

    // Calculate total marks
    const totalMarks = internalMarks + (external || 0);

    // Determine pass/fail status
    const passed = totalMarks >= 48 && internalMarks > 0 && (external === null || external > 0);

    // Save exam result
    const exam = await Exam.create({ student, subject, cieExams, internalMarks, externalMarks: external, totalMarks, passed });

    return res.status(201).json(new ApiResponse(201, exam, "Exam result added successfully"));
});

// Get all exams
const getAllExams = asyncHandler(async (req, res) => {
    const exams = await Exam.find({})
        .populate("student", "fullName")
        .populate("subject", "name");

    return res.status(200).json(new ApiResponse(200, exams, "Exams fetched successfully"));
});

const updateExamResult = asyncHandler(async (req, res) => {
    const { cieExams, externalMarks } = req.body;
    const { id } = req.params;

    const exam = await Exam.findById(id);
    if (!exam) {
        throw new ApiError(404, "Exam result not found");
    }

    // Append new CIEs to the existing array instead of replacing
    if (cieExams && Array.isArray(cieExams)) {
        exam.cieExams.push(...cieExams);
    }

    // Update external marks if provided
    if (externalMarks !== undefined) {
        exam.externalMarks = externalMarks;
    }

    // Recalculate internal marks
    exam.internalMarks = exam.cieExams.reduce((sum, cie) => sum + cie.marks, 0);

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

export const updateCIEExam = async (req, res) => {
    const { id, cieId } = req.params;
    console.log("Received Exam ID:", id);
    console.log("Received CIE ID:", cieId);

    const exam = await Exam.findById(id);
    if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
    }

    const cie = exam.cieExams.id(cieId);
    if (!cie) {
        return res.status(404).json({ message: "CIE Exam not found" });
    }

    // If it reaches here, it means both exist.
    cie.set(req.body);
    await exam.save();
    res.status(200).json({ message: "CIE Exam updated successfully", exam });
};


const deleteCIEExam = asyncHandler(async (req, res) => {
    const { id, cieId } = req.params;

    const exam = await Exam.findById(id);
    if (!exam) throw new ApiError(404, "Exam not found");

    await exam.deleteCIEExam(cieId);
    return res.status(200).json(new ApiResponse(200, exam, "CIE Exam deleted successfully"));
});

const addCIEExam = asyncHandler(async (req, res) => {
    const { id } = req.params;  // Exam ID
    const newCIE = req.body;  // CIE Data

    const exam = await Exam.findById(id);
    if (!exam) throw new ApiError(404, "Exam not found");

    exam.cieExams.push(newCIE);
    await exam.save();

    return res.status(201).json(new ApiResponse(201, exam, "CIE Exam added successfully"));
});


export const examController = {
    addExamResult,
    getAllExams,
    updateExamResult,
    deleteExamResult,
    updateCIEExam,
    deleteCIEExam,
    addCIEExam
};
