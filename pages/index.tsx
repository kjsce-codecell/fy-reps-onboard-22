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
import LegalDocuments from "./components/LegalDocuments";
import SubmitModal from "./components/SubmitModal";
import { submitAPI } from "../config/next.config";

export default function Home() {
	const [currentSlide, setCurrentSlide] = useState<number>(0);

	const changeSlide = (slide: number) => {
		setCurrentSlide(slide);
		localStorage.setItem("slide", JSON.stringify(slide));
	};
	let defaultSlide = 0;
	useEffect(() => {
		defaultSlide = parseInt(localStorage.getItem("slide") || "0");
		changeSlide(defaultSlide || 0);
	}, []);

	const [submitModalVisible, setSubmitModalVisible] = useState<boolean>(false);
	const [entryModalVisible, setEntryModalVisible] = useState<boolean>(false);
	useEffect(() => {
		setSubmitModalVisible(localStorage.getItem("submitted") === "true");
		setEntryModalVisible(localStorage.getItem("visited") !== "true");
	}, []);

	// Main Data
	const [formData, setFormData] = useState<object>({});

	// 3 Sections Data
	const [personalDetailsData, setPersonalDetailsData] = useState<
		object | undefined
	>({});
	const [showUsData, setShowUsData] = useState<object | undefined>({});
	const [motivationData, setMotivationData] = useState<object | undefined>({});
	const [legalDocumentsData, setLegalDocumentsData] = useState<
		object | undefined
	>({});

	const [registrationID, setregistrationID] = useState<number>(0);

	const [personalDetailsDataFilled, setPersonalDetailsDataFilled] =
		useState<boolean>(false);
	const [showUsDataFilled, setShowUsDataFilled] = useState<boolean>(false);
	const [legalDocumentsDataFilled, setLegalDocumentsDataFilled] =
		useState<boolean>(false);
	const [motivationDataFilled, setmotivationDataFilled] =
		useState<boolean>(false);

	const updatePersonalDetailsData = (newData: any) => {
		setPersonalDetailsData(newData);
	};

	const updateShowUsData = (newData: any) => {
		setShowUsData(newData);
	};

	const updateMotivationData = (newData: any) => {
		setMotivationData(newData);
	};

	const updateLegalDocumentsData = (newData: any) => {
		setLegalDocumentsData(newData);
	};

	useEffect(() => {
		setFormData({
			...personalDetailsData,
			...showUsData,
			...legalDocumentsData,
			...motivationData,
		});
	}, [personalDetailsData, showUsData, legalDocumentsData, motivationData]);

	const finalSubmit = async () => {
		if (!personalDetailsDataFilled) {
			changeSlide(0);
		} else if (!showUsDataFilled) {
			changeSlide(1);
		} else if (!legalDocumentsDataFilled) {
			changeSlide(2);
		} else if (!motivationDataFilled) {
			changeSlide(3);
		} else {
			fetch(submitAPI, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Registration ID: " + data.registrationID);
					console.log("Hurrayy!! Applied Successfully");
					setregistrationID(data.registrationID);
					localStorage.setItem("submitted", "true");
					setSubmitModalVisible(true);
				})
				.catch((e) => {
					console.error("API Call for Registration Failed - Error: ", e);
				});
		}
	};

	return (
		<>
			<Head>
				<title>FY Representatives Forms</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				{entryModalVisible && <Modal setVisible={setEntryModalVisible} />}
				{submitModalVisible && <SubmitModal registrationID={registrationID} />}
				<div className={styles.mainContainer}>
					<div className={styles.heading}>
						<a href="https://www.kjscecodecell.com/" target="_blank">
							<img src={CodecellLogo.src} alt="Codecell Logo" />
						</a>
					</div>
					<div className={styles.container}>
						<div className={styles.leftcontainer}>
							<Stepper
								current={currentSlide}
								Change={(n: number) => changeSlide(n)}
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
										title: "Legal Documents",
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
									setCurrentSlide={changeSlide}
									updateForm={updatePersonalDetailsData}
									formState={setPersonalDetailsDataFilled}
								/>
							)}

							{currentSlide === 1 && (
								<Show
									currentSlide={currentSlide}
									setCurrentSlide={changeSlide}
									updateForm={updateShowUsData}
									formState={setShowUsDataFilled}
								/>
							)}

							{currentSlide === 2 && (
								<LegalDocuments
									currentSlide={currentSlide}
									setCurrentSlide={changeSlide}
									updateForm={updateLegalDocumentsData}
									formState={setLegalDocumentsDataFilled}
								/>
							)}

							{currentSlide === 3 && (
								<Motivation
									currentSlide={currentSlide}
									setCurrentSlide={changeSlide}
									updateForm={updateMotivationData}
									formState={setmotivationDataFilled}
									finalSubmit={finalSubmit}
								/>
							)}
						</div>
					</div>
				</div>
			</main>
				<div className={styles.footer}>
				{"Made with ❤️ by CodeCell"}
				</div>
		</>
	);
}
