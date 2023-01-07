// @ts-ignore
import nodemailer from 'nodemailer';
import { SMTP_SERVER, SMTP_PORT, SMTP_AUTH_LOGIN, SMTP_AUTH_PASS } from '../config/next.config';

interface PartialResponse {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
}

export default async function sendEmail (data: PartialResponse) {
    const { from, to, subject, text, html } = data;
    const transporter = nodemailer.createTransport({
        host: SMTP_SERVER,
        port: SMTP_PORT,
        secure: false,
        auth: {
            user: SMTP_AUTH_LOGIN,
            pass: SMTP_AUTH_PASS
        }
    });

    const emailStatus = await transporter.sendMail({
        from: `KJSCE CodeCell <${from}>`, to, subject, text, html 
    }, (err, data) => {
        if (err) console.log(err)
    });
}
