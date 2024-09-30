import dbConnect  from "./db.js";
import { DB_NAME } from "./constants.js";

import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

dbConnect();