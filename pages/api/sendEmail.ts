import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from "../../services/sendEmail";
import format from '../../templates/appliedEmail';
import NextCors from 'nextjs-cors';

interface PartialResponse {
    code: string,
    message: string,
    flag: number,
}

interface ExtendedNextApiRequest extends NextApiRequest {
    name: string,
    email: string,
    registrationID: number
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<PartialResponse>) {

    await NextCors(req, res, {
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    const email = req.body.email;
    const registrationID = req.body.registrationID;
    const name = req.body.registrationID;
    // console.log(formData);
    try {
        sendEmail({
            from: "join@kjscecodecell.com",
            to: email,
            subject: 'Applied Successfully | KJSCE CodeCell | FY Representatives Applications June 2023',
            text: ``,
            html: format({email, name, registrationID})
        });
        return res.json({code: "success", message: "Email Sent Successfully", flag: 1});
    } catch (e) {
        console.log(e);
        return res.json({code: "fail", message: (e+""), flag: 0});
    }

}

