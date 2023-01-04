/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import detailsStyles from "../styles/Details.module.css";
import { useEffect, useState } from "react";
import { Steps, ConfigProvider } from "antd";
import PersonalDetails from "./components/PersonalDetails";
import Show from "./components/Show";
import Motivation from "./components/Motivation";
import Stepper from "./components/Stepper";
import { code, CodecellLogo, fire, user } from "../assets";
import Modal from "./components/Modal";
const Step = Steps.Step;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	// console.log(CodecellLogo);

	const [currentSlide, setCurrentSlide] = useState<number>(0);

	// Main Data
	const [formData, setFormData] = useState<object | undefined>({});

	// 3 Sections Data
	const [personalDetailsData, setpersonalDetailsData] = useState<object | undefined>({});
	const [showUsData, setshowUsData] = useState<object | undefined>({});
	const [motivationData, setmotivationData] = useState<object | undefined>({});


	// useEffect(() => {
	// 	console.log(personalDetailsData);
	// }, [personalDetailsData])

	const updatePersonalDetailsData = (newData: any) => {
		setpersonalDetailsData(newData);
	}

	const updateshowUsData = (newData: any) => {
		setshowUsData(newData);
	}

	const updatemotivationData = (newData: any) => {
		setmotivationData(newData);
	}


	useEffect(() => {
		setFormData({...personalDetailsData, ...showUsData, ...motivationData});
	  }, [personalDetailsData, showUsData, motivationData]);

	useEffect(() => {
		console.log(formData);
	}, [formData])

	return (
		<>
			<Head>
				<title>FY Rep Forms</title>
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
									updateForm={updateshowUsData}
								/>
							)}

							{currentSlide === 2 && (
								<Motivation
									currentSlide={currentSlide}
									setCurrentSlide={setCurrentSlide}
									updateForm={updatemotivationData}
								/>
							)}

						</div>
					</div>
				</div>
			</main>
		</>
	);
}