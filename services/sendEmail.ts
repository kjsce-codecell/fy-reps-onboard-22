// @ts-ignore
import nodemailer from 'nodemailer';

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
        host: process.env.NEXT_PUBLIC_SMTP_SERVER,
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_SMTP_AUTH_LOGIN,
            pass: process.env.NEXT_PUBLIC_SMTP_AUTH_PASS
        }
    });

    const emailStatus = await transporter.sendMail({
        from: `KJSCE CodeCell <${from}>`, to, subject, text, html 
    }, (err, data) => {
        if (err) console.log(err)
    });
}
