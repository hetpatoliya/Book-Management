import mongoose, { Schema } from "mongoose";
import { Iadmin } from '../interfaces/admin.interface'

const adminSchema: Schema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, {
    timestamps: true
});

export default mongoose.model<Iadmin>('Admin', adminSchema);