import mongoose, { Document } from "mongoose";

export interface Iauthor extends Document {
    name: String,
    biography: String,
    nationality: String,
    createdby: mongoose.Schema.Types.ObjectId;
    updatedby?: mongoose.Schema.Types.ObjectId;
}