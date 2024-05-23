import mongoose from "mongoose";

export interface IAuthor {
    name: string,
    biography: string,
    nationality: string,
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedby?: mongoose.Schema.Types.ObjectId;
}