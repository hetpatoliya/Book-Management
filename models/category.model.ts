import mongoose, { Schema } from "mongoose";
import { Icategory } from "../interfaces/category.interface";

const categorySchema: Schema = new Schema({
    category: { type: String, require: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Admin' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, {
    timestamps: true
});

export default mongoose.model<Icategory>('Category', categorySchema);