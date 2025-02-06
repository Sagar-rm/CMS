import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    code: { 
        type: String,
        required: true, 
        unique: true 
    },
    branch: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Branch", 
        required: true 
    },
    semester: { 
        type: Number, 
        required: true 
    },
    credits: { 
        type: Number, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["Theory", "Practical", "Audit"], 
        required: true 
    }
});

export const Subject = mongoose.model("Subject", subjectSchema);
