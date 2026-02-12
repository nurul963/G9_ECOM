import { GMAIL_ID, GOOGLE_APP_PASSWORD } from "./constant.js";
import nodemailer from 'nodemailer';
export const sendMail=async(inputText,email,subject)=>{
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_ID,
        pass: GOOGLE_APP_PASSWORD // The 16-character App Password
        },
    });
    let message={
        from:`ADMIN <${GMAIL_ID}>`,
        to:`ADMIN <${email}`,
        subject:subject,
        text:inputText
    }
    let info = await transporter.sendMail(message);
    return info;

}