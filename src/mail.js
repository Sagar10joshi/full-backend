import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

async function sendOtp(email, otp) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Use the app password here
        }
    });

    let mailOptions = {
        from: `"OTP Service" <${process.env.EMAIL}>`,
        to: `${email}`,
        // to: 'joshisagar0596@gmail.com',
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp} ,do not share your otp with anyone`,//you can type your message here
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export {sendOtp};
