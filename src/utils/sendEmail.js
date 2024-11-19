require('dotenv').config();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

async function sendEmail(to, subject, variables) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io', 
            port: 2525,                      
            auth: {
                user: 'b79ad0f8df59db',     
                pass: '7efe675fc587fe'       
            }
        });

        const templatePath = path.join(__dirname, '../../template/forgot-password.ejs');
        const htmlContent = await ejs.renderFile(templatePath, variables);

        const mailOptions = {
            from: '"Muhammad Adib Najwan" <adibnajwan@gmail.com>',
            to, 
            subject, 
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error while sending email:', error.message);
        throw error; 
    }
}

module.exports = { sendEmail };