import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: { type: String, require: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Admin' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export { Category };