import mongoose, { Schema } from "mongoose";

const marksSchema = new Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    marksObtained: { type: Number, required: true },
    grade: { type: String, enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'], required: true }
});


export const Marks = mongoose.model("Marks", marksSchema);