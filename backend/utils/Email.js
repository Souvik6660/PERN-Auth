import { Verification_Email_Template } from "../EmailTemplate/EmailTemplate.js";
import { transporter } from "./Email.config.js";

export const sendVerificationEmail=async(email,verificationCode)=>{
    try {
     const response=   await transporter.sendMail({
            from: '"PERN APP" <msujoy863@gmail.com>',

            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
        })
        console.log('Email send Successfully',response);
        return true; 
        
    } catch (error) {
        console.log('Email error',error);
        return false; // Indicate failure
    }
}