import mongoose, { Schema } from "mongoose";
import { Iauthor } from "../interfaces/author.interface";


const authorSchema: Schema = new Schema({
    name: { type: String, require: true },
    biography: { type: String, require: true },
    nationality: { type: String, require: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Admin' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
    // username: { type: String, unique: true },
    // password: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<Iauthor>('Author', authorSchema);