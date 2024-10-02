import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express"
import { Register } from "./models/register_model.js";
dotenv.config({
    path: "./.env"
})

const app = express();

const dbconnect = async()=>{
    try {
        const connectiondb = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`DATABASE connected SUCCESSFULLY : ${connectiondb.connection.host}`);

        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
        })

    } catch (error) {
        console.log(" DATABASE connection FAILED",error);
    }
}

export default dbconnect;