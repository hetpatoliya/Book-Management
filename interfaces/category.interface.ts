import mongoose, { Document } from "mongoose";

export interface Icategory extends Document {
    category: String,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId
}