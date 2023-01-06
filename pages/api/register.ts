import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { spreadsheetAPI } from "../../config/next.config";

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
    position: string,
    oneLine: string,
    plan: string,
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<PartialResponse>) {

    const formData = req.body;
    // console.log(formData);
    try {
		let email = req.body.email;
		const regRef = doc(db, "FY_2022-23", email);
		const registrationID = Date.now() + Math.round(Math.random() * 10e4);
		const timestamp = new Date(Date.now()).toString();
		const finalData = { registrationID, ...formData, timestamp };

		// Storing finalData in Firestore
		const docRef = await setDoc(regRef, finalData, { merge: true });

		// Passing finalData to Spreadsheet
		const url = spreadsheetAPI;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(finalData),
		})
        .then((response) => response.json())
        .then((data) => {
            console.log("Registration ID: " + registrationID);
            res.status(200).json({code: "success", registrationID, status: "submitted", flag: 1, message: "celebrate"})
        })
        .catch((e) => {
            console.error("Registration Failed: Error - ", e);
            res.status(400).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: (e+"")});
        });
	} catch (e) {
		console.error("Registration Failed: Error adding document - ", e);
        res.status(400).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: (e+"")})
	}
    res.status(404).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: ("Unknown Error")});
}
