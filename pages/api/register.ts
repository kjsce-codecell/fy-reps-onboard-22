import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { spreadsheetAPI, emailAPI } from "../../config/next.config";

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

    const formData = req.body;
    // console.log(formData);
    try {
		const email = req.body.email;
        const name = req.body.name;
        if (await checkRegistered(email) === true) {
            res.status(409).json({code: "failed", registrationID: 0, status: "submitted", flag: 0, message: "Document Conflict"});
            return;
        }
		const regRef = doc(db, "FY_2022-23", email);
		const registrationID = Date.now() + Math.round(Math.random() * 10e4);
		const timestamp = new Date(Date.now()).toString();
		const finalData = { registrationID, ...formData, timestamp };

		// Storing finalData in Firestore
		const docRef = await setDoc(regRef, finalData, { merge: true });

		// Passing finalData to Spreadsheet
		const url = spreadsheetAPI;
        const emailURI = emailAPI;

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

            fetch(emailURI, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, name, registrationID}),
            })
            .catch((e) => console.error("Email Not Sent - Error: ", e));

            res.status(200).json({code: "success", registrationID, status: "submitted", flag: 1, message: "celebrate"})
            return;
        })
        .catch((e) => {
            console.error("Registration Failed: Error - ", e);
            res.status(400).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: (e+"")});
            return;
        });
	} catch (e) {
		console.error("Registration Failed: Error adding document - ", e);
        res.status(400).json({code: "failed", registrationID: 0, status: "not-submitted", flag: 0, message: (e+"")})
        return;
	}
}
