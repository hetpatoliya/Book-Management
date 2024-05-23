import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
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

const Book = mongoose.model('Book', bookSchema);

export { Book };