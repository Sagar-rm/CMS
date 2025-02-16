import mongoose, { Schema } from "mongoose";

const cieSchema = new Schema({
    name: {
        type: String, 
        required: true 
    }, // Name of CIE (e.g., "CIE-1", "CIE-2", "Practical-1")
    type: { 
        type: String, 
        enum: ["Internal", "Practical"], 
        required: true 
    }, // Differentiates between internal and practical exams
    marks: { 
        type: Number, 
        required: true 
    },
    maxMarks: {
        type: Number,
        required: true
    },
    weightage: {
        type: Number, 
        required: true 
    } // Defines how much this contributes to internalMarks
});

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
    cieExams: [cieSchema], // Stores multiple CIE exams (internals/practicals)
    internalMarks: { 
        type: Number,
        default: 0 
    }, // Calculated from cieExams
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

// Pre-save hook to calculate internalMarks from cieExams
examSchema.pre("save", function (next) {
    this.internalMarks = this.cieExams.reduce((acc, exam) => 
        acc + (exam.marks * exam.weightage) / exam.maxMarks, 0);
    next();
});

// Method to add a new CIE exam
examSchema.methods.addCIEExam = async function (cieExam) {
    this.cieExams.push(cieExam);
    await this.save();
    return this;
};

// Method to update a specific CIE exam by its ObjectId
examSchema.methods.updateCIEExam = async function (cieId, updatedCIE) {
    const cieIndex = this.cieExams.findIndex(cie => cie._id.toString() === cieId);
    if (cieIndex === -1) throw new Error("CIE Exam not found");

    this.cieExams[cieIndex] = { ...this.cieExams[cieIndex]._doc, ...updatedCIE };
    await this.save();
    return this;
};

// Method to delete a specific CIE exam by its ObjectId
examSchema.methods.deleteCIEExam = async function (cieId) {
    const originalLength = this.cieExams.length;
    this.cieExams = this.cieExams.filter(cie => cie._id.toString() !== cieId);

    if (this.cieExams.length === originalLength) {
        throw new Error("CIE Exam not found");
    }

    await this.save();
    return this;
};


export const Exam = mongoose.model("Exam", examSchema);
