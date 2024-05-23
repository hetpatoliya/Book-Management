import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, {
    timestamps: true
});

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password!, process.env.SALT_ROUNDS!);
    next();
})

const Admin = mongoose.model('Admin', adminSchema);

export { Admin };