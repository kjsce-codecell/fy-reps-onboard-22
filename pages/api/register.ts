import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../services/connectFirestore";
import aesjs from 'aes-js';
import NextCors from 'nextjs-cors';

interface PartialResponse {
    code: string,
    registrationID: number,
    status: string,
    flag: number,
    message: string
}

interface ExtendedNextApiRequest extends NextApiRequest {
    name: string,
    email: string,
    phone: string,
    branch: string,
    github: string,
    linkedin: string,
    cp: string,
    resumeLink: string,
    cover: string,
    position1: string,
    position2: string,
    oneLine: string,
    plan: string,
    ciphertext: string
}

const checkRegistered = async (emailID: string) => {
    const docRef = doc(db, "FY_2022-23", emailID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Email ID already registered!!");
        return true;
    }
    return false;
};

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<PartialResponse>) {

    await NextCors(req, res, {

        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200,
     });

     return res.status(404).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: "applications not accepted"});

    const formData = req.body;
    // console.log(formData);
    const email = req.body.email;
    const name = req.body.name;
    const ciphertext = req.body.ciphertext;

    let code="failed";
    let status="not-submitted";
    let flag=0;
    let message="Internal Server Error";
    let statusCode=500;
    let registrationID=0;

    const timestamp = new Date(Date.now()).toString();
    try {

        let superKey: Array<number> = [];
        let KEY = process.env.NEXT_PUBLIC_KEY || "";
        for (let i=0; i<KEY.length; ++i) {
            superKey.push(KEY.charCodeAt(i));
        }
        var encryptedBytes = aesjs.utils.hex.toBytes(ciphertext);

        var aesCtr = new aesjs.ModeOfOperation.ctr(superKey, new aesjs.Counter(3));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        if (decryptedText != (process.env.NEXT_PUBLIC_secretKEY+email)) {
            return res.status(400).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: "Invalid Request"});
        }

        delete formData.ciphertext;

        if (await checkRegistered(email) === true) {
            return res.status(409).json({code: "failed", registrationID: 0, status: "submitted", flag: 0, message: "Document Conflict"});
        }

		const regRef = doc(db, "FY_2022-23", email);
        registrationID=Math.round((Date.now())/10e5) + Math.round(Math.random() * 10e3);
		const finalData = { registrationID, ...formData, timestamp };

		// Storing finalData in Firestore
		const docRef = await setDoc(regRef, finalData, { merge: true });

		// Passing finalData to Spreadsheet
		const sURI = process.env.NEXT_PUBLIC_spreadsheetAPI || "";

		await fetch(sURI, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(finalData),
		})
        .then((response) => response.json())
        .then(async (data) => {
            console.log("Registration ID: " + registrationID);

            await fetch(process.env.NEXT_PUBLIC_HOST+"/api/sendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, name, registrationID}),
            })
            
            .catch((e) => console.error("Email Not Sent (From Server) - Error: ", e));

            code="success";
            status="submitted";
            flag= 1;
            message="celebrate";
            statusCode=200;

            // res.status(200).json({code: "success", registrationID, status: "submitted", flag: 1, message: "celebrate"})
        })
        .catch((e) => {
            console.error("Registration Failed: Error - ", e);

            code="failed";
            status="not-submitted";
            flag= 0;
            message=e+"";
            statusCode=400;
            registrationID=0;

            // res.status(400).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: (e+"")});
        });
	} catch (e) {
		console.error("Registration Failed: Error adding document - ", e);
        code="failed";
        status="not-submitted";
        flag= 0;
        message=e+"";
        statusCode=400;
        registrationID=0;

        // res.status(400).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: (e+"")});
	}
    return res.status(statusCode).json({code, registrationID, status, flag, message})
}
