import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : String,
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password:{
            type: String,
            select: false,
        },
        createdAt :{
            type: Date,
            default: Date.now,
        },
    }
) 

export const user = mongoose.model("User",userSchema);