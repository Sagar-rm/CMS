import mongoose, { Schema } from "mongoose"

const examSchema = new Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    type: { type: String, enum: ['CIE', 'SEE'], required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    maxMarks: { type: Number, required: true },
    scheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true }
});


export const Exam = mongoose.model("Exam", examSchema);