import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

export const connectToDb = async () => {
    try {
        const uri = process.env.MONGO_URI;
        // console.log(uri);
        if (!uri) throw new Error("MONGO_URI is undefined");
        await mongoose.connect(uri);
        console.log("MongoDB connected...");

    } catch (error) {
        console.error("Db error: " + error.message);
        process.exit(1);
    }
}