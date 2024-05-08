import { Document } from "mongoose";

export interface Iadmin extends Document {
    username: String,
    password: String
}