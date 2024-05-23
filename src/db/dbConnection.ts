import mongoose from "mongoose";
import { constants } from "../utils/constants";

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI!)
    .then(() => console.log(constants.DB_CONNECTED))
    .catch(() => console.log(constants.DB_ERROR))

export default mongoose.connection;

// mongodb://localhost:27017/bookmanagement