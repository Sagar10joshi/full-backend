export const DB_NAME = "Full_Backend"

/*
import express from "express";
const apps = express();

import sendMail from './controlers/Mail.js'

apps.use(express.json()); // to parse JSON bodies
apps.use(express.urlencoded({ extended: false }));

apps.get('/otp',sendMail)

const form = document.querySelector('form')
form.addEventListener('submit', function (e) {

    apps.post('/otp', async (req, res) => {
        const email = req.body.Email;
        console.log(req.body.Email);
        
        let otp = Math.floor(100000 + Math.random() * 900000).toString();
        try {
            await sendMail(email, otp); // Assuming sendMail is an async function
            //res.status(200).json({ message: "OTP sent successfully!!" });
            console.log("OTP sent successfully!!");
            alert('OTP Send Successfully');
    
        } catch (error) {
            console.error("Error sending OTP:", error);
            res.status(500).json({ error: 'Failed to send OTP' });
        }
    
    
    });
    
});*/