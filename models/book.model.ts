import mongoose, { Schema } from "mongoose";
import { Ibook } from "../interfaces/book.interface";

const bookSchema: Schema = new Schema({
    title: { type: String, require: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', require: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true },
    isbn: { type: Number, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Admin' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, {
    timestamps: true
});

export default mongoose.model<Ibook>('Book', bookSchema);