// Voir https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee
import nodemail from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

export const transporter = nodemail.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
    },
    secure: true
})