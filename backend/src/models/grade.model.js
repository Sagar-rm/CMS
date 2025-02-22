import mongoose, {Schema} from "mongoose"

const gradeSchema = new Schema({
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student", 
        required: true
    },
    semester: { 
        type: Number, 
        required: true 
    },
    subjects: [{
        subject: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Subject" 
        },
        appliedCredits: { 
            type: Number, 
            required: true 
        },
        earnedCredits: { 
            type: Number, 
            required: true 
        }
    }],
    sgpa: { 
        type: Number, 
        required: true 
    },
    weightedSgpa: { 
        type: Number, 
        required: true 
    },
    totalCredits: { 
        type: Number, 
        required: true 
    },
    totalWeightedSgpa: { 
        type: Number, 
        required: true 
    },
    cgpa: { 
        type: Number, 
        required: true 
    },
    percentage: { 
        type: Number, 
        required: true 
    }
});

export const Grade = mongoose.model("Grade", gradeSchema);