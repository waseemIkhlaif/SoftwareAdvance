const connection = require('../../../../config/db.js');
const nodemailer = require('nodemailer');
const express = require('express');
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
let generatedCode ;
 async function sendMaill(receiver){
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL ,  
        pass: process.env.PASSWORD           
    }
});

const code = generateRandomString(10); 
generatedCode = code;
 const  sendEmailWithRandomCode = await transporter.sendMail({

        from: 'Green Thumb',  
        to: receiver,                  
        subject: 'Password Recovery Code',  
        html: `<p>Your password recovery code is: <strong>${code}</strong></p>` 
});

}


function compareCodes(providedCode) {
    console.log(generatedCode,providedCode);
    return generatedCode == providedCode;
}




module.exports = { sendMaill, compareCodes };