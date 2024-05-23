import mongoose from "mongoose";

export interface ICategory {
    category: string,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId
}