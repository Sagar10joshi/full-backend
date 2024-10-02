import dbconnect  from "./db.js";
import express from "express";
import { sendOtp } from "./mail.js";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import session from "express-session"
//import bodyParser from "bodyparser"
import { Register } from "./models/register_model.js";
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: '123', 
    resave: false,
    saveUninitialized: true,
}));


// Determine the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);;

// Set the static files directory
app.use(express.static(join(__dirname, '../views')));

app.get('/',(req, res) => {
    res.sendFile(join(__dirname, '../views', 'index.html'));
});

let otp ;
let otpTimestamp = null; // To store the OTP generation time

app.post('/register',async (req,res)=>{
    const username = req.body.Username;
    const email = req.body.Email;
    const password = req.body.Password;

    req.session.userData = {
        username,
        email,
        password
    };
    
    if (email) {
        try {
            otp = Math.floor(100000 + Math.random() * 900000).toString();
            otpTimestamp = Date.now();
            await sendOtp(email, otp);  // Wait for the OTP to be sent
            res.sendFile(join(__dirname, '../views', 'otp.html'));
            console.log("Otp Sent Successfully!!");
            
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.status(500).send('Error sending OTP');
        }
    } else {
        res.status(400).send('Email is required');
    }
})


app.post('/otp',async(req,res)=>{

    try {
        const code = req.body.otp;
        const currentTime = Date.now();

        const userData = req.session.userData;

        if(code===otp && currentTime - otpTimestamp < 60000){

            const registerUser = new Register({
                username : userData.username,
                email: userData.email,
                password: userData.password
            })            

            const registered = await registerUser.save();

            res.sendFile(join(__dirname, '../views', 'index.html'));
        }
        else{
            res.send("invalid otp");
        }
    } catch (error) {
        res.status(500).send('Sorry,User cannot be registered at this moment');
    }
})












app.listen(process.env.PORT , ()=>{
    console.log(`App is listning on port ${process.env.PORT}`)
})

dbconnect();
