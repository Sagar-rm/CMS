import mongoose, {Schema} from "mongoose";

const examSchema = new Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student", 
        required: true 
    },
    subject: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Subject", 
        required: true 
    },
    internalMarks: { 
        type: Number, 
        required: true 
    }, // Internal exam score
    externalMarks: { 
        type: Number 
    }, // External exam score (null for audit courses)
    totalMarks: { 
        type: Number, 
        required: true 
    },
    passed: { 
        type: Boolean, 
        required: true 
    }
});

export const Exam = mongoose.model("Exam", examSchema);
