import mongoose, {Schema} from "mongoose";

const branchSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    }, 
    code: { 
        type: String, 
        required: true, 
        unique: true 
    },
    subjects: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Subject" 
    }]
});

export const Branch = mongoose.model("Branch", branchSchema);
