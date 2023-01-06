import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from "../../services/emailWorking";
import format from '../../templates/appliedEmail';

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

    const email = req.body.email;
    const registrationID = req.body.registrationID;
    const name = req.body.registrationID;
    // console.log(formData);
    try {
        sendEmail({
        from: "codecell.engg@somaiya.edu",
        to: email,
        subject: 'Applied Successfully | KJSCE CodeCell | FY Representatives Applications January 2023',
        text: ``,
        html: format({email, name, registrationID})
        });
        return res.json({code: "success", message: "Email Sent Successfully", flag: 1});
    } catch (e) {
        console.log(e);
        return res.json({code: "fail", message: (e+""), flag: 0});
    }

}

