const nodemailer = require('nodemailer');

class MailServices {
    constructor() {
        this.initTransporter();
    }

    initTransporter() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'trantanphat2002@gmail.com',
                pass: 'passss' // Ensure you use a safe method to handle passwords.
            }
        });
    }

    async sendMail(to, subject, text, html) {
        const mailOptions = {
            from: 'trantanphat2002@gmail.com',
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Email sent: %s", info.response);
            return info;
        } catch (error) {
            console.error("Failed to send email: %s", error);
            throw error; // Re-throw the error if you need to handle it further up the call stack
        }
    }
}

const mailServices = new MailServices();
module.exports = mailServices;
