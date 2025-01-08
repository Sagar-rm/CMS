import mongoose, {Schema} from "mongoose";

const branchSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    establishedYear: {
        type: Date
    }
  }, { timestamps: true });

export const Branch = mongoose.model("Branch", branchSchema)