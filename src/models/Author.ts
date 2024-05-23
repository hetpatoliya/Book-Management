import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
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

const Author = mongoose.model('Author', authorSchema);

export { Author };