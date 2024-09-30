import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express"

dotenv.config({
    path: "./.env"
})

const app = express();

const dbConnect = async () => {
    try {
        const connectiondb = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`DATABASE connected SUCCESSFULLY: ${connectiondb.connection.host}`);

        app.listen(process.env.PORT || 8000, () => {
            console.log(`App is listening on port ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.log("DATABASE connection FAILED", error);
    }
};

dbConnect();

export default dbConnect;