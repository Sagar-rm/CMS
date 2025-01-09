import mongoose, {Schema} from "mongoose";

const branchSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    establishedYear: {
        type: String
    }
  }, { timestamps: true });

export const Branch = mongoose.model("Branch", branchSchema)