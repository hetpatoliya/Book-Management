import mongoose from "mongoose";

export interface IBook {
    title: string,
    author: string,
    category: string,
    isbn: number,
    description: string,
    price: number,
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy?: mongoose.Schema.Types.ObjectId
}