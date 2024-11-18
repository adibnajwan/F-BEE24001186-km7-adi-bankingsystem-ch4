require('dotenv').config(); 
const nodemailer = require('nodemailer');

async function sendEmail() {
    try {
        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io', 
            port: 2525,                      
            auth: {
                user: 'b79ad0f8df59db',     
                pass: '7efe675fc587fe'       
            }
        });
     
        const mailOptions = {
            from: '"Muhammad Adib Najwan" <adibnajwan@gmail.com>', 
            to: 'adibnajwan@students.amikom.ac.id', 
            subject: 'Testing Send Email', 
            text: 'Saya suka saya suka' 
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error while sending email:', error.message);
    }
}

sendEmail();