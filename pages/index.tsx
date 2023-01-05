/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import PersonalDetails from "./components/PersonalDetails";
import Show from "./components/Show";
import Motivation from "./components/Motivation";
import Stepper from "./components/Stepper";
import { code, CodecellLogo, fire, user } from "../assets";
import Modal from "./components/Modal";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const registerStudent = async(formData: object) => {
	try {
		console.log(formData)
		let email = localStorage.getItem("email") || "no-email";
		// console.log(email)
		const regRef = doc(db, 'FY_2022-23', email);
		const registrationID = Date.now()+Math.round(Math.random()*10e4);
		const timestamp = serverTimestamp();
		const finalData = {registrationID, ...formData, timestamp}
		const docRef = await setDoc(regRef, finalData, { merge: true });
		var url = 'https://sheet2api.com/v1/eS8TBq7Q1Czp/fy-registrations-jan-2023/Sheet1';
		fetch(url, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(finalData),
		})
		.then(response => response.json())
		.then(data => {
			console.log("Registration ID: "+registrationID);
			console.log(data)
		})
		.catch((error) => {
		  console.error('Registration Failed: Error - ', error);
		});
		console.log("Registration ID: "+registrationID);
	} catch (e) {
		console.error("Registration Failed: Error adding document - ", e);
	}
}

export default function Home() {
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	useEffect(() => {
		const defaultSlide=localStorage.getItem("slide") || '0';

		setCurrentSlide(parseInt(defaultSlide));
	}, []);

	useEffect(()=>{
		localStorage.setItem('slide', currentSlide.toString())
	},[currentSlide])
	
	// Main Data
	const [formData, setFormData] = useState<object>({});

	// 3 Sections Data
	const [personalDetailsData, setPersonalDetailsData] = useState<object | undefined>({});
	const [showUsData, setShowUsData] = useState<object | undefined>({});
	const [motivationData, setMotivationData] = useState<object | undefined>({});

	// useEffect(() => {
	// 	console.log(personalDetailsData);
	// }, [personalDetailsData])

	const updatePersonalDetailsData = (newData: any) => {
		setPersonalDetailsData(newData);
	};

	const updateShowUsData = (newData: any) => {
		setShowUsData(newData);
	};

	const updateMotivationData = (newData: any) => {
		setMotivationData(newData);
	};

	useEffect(() => {
		setFormData({ ...personalDetailsData, ...showUsData, ...motivationData });
	}, [personalDetailsData, showUsData, motivationData]);

	const [requestAPI, setRequestAPI] = useState<boolean>(false);

	useEffect(() => {
		setRequestAPI(requestAPI);
	}, [requestAPI])

	useEffect(() => {
		setFormData(formData);
		if (requestAPI === true) {
			// console.log(formData);
			registerStudent(formData)
			.then(() => console.log("Applied successfully"))
		}
	}, [formData])

	return (
		<>
			<Head>
				<title>FY Representatives Forms</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<Modal />
				<div className={styles.mainContainer}>
					<div className={styles.heading}>
						{/* <h1>KJSCE CodeCell</h1> */}
						<img src={CodecellLogo.src} alt="Codecell Logo" />
					</div>
					<div className={styles.container}>
						<div className={styles.leftcontainer}>
							<Stepper
								current={currentSlide}
								Change={(n: number) => setCurrentSlide(n)}
								items={[
									{
										title: "Personal Details",
										description: "",
										icon: user,
									},
									{
										title: "Show us what you got",
										description: "",
										icon: code,
									},
									{
										title: "Motivation",
										description: "",
										icon: fire,
									},
								]}
							/>
						</div>

						<div className={styles.rightcontainer}>
							{currentSlide === 0 && (
								<PersonalDetails
									currentSlide={currentSlide}
									setCurrentSlide={setCurrentSlide}
									updateForm={updatePersonalDetailsData}
								/>
							)}

							{currentSlide === 1 && (
								<Show
									currentSlide={currentSlide}
									setCurrentSlide={setCurrentSlide}
									updateForm={updateShowUsData}
								/>
							)}

							{currentSlide === 2 && (
								<Motivation
									currentSlide={currentSlide}
									setCurrentSlide={setCurrentSlide}
									updateForm={updateMotivationData}
									finalSubmit={setRequestAPI}
								/>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

// https://sheet2api.com/v1/eS8TBq7Q1Czp/fy-registrations-jan-2023