import mongoose, { Document } from "mongoose";

export interface Ibook extends Document {
    title: String,
    author: String,
    category: String,
    isbn: Number,
    description: String,
    price: Number,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy?: mongoose.Schema.Types.ObjectId
}