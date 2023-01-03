import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Steps, ConfigProvider } from "antd";
import PersonalDetails from "./components/PersonalDetails";
import Show from "./components/Show";
import Motivation from "./components/Motivation";
import Stepper from "./components/Stepper";
import {code, fire, user} from '../assets'
const Step = Steps.Step;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const items = [
		{
			id: 1,
			title: "Personal Details",

		},
		{
			id: 2,
			title: "Show us what you got",
		},
		{
			id: 3,
			title: "Motivation",
		},
	];

	const [currentSlide, setCurrentSlide] = useState<number>(0);

	return (
		<>
			<Head>
				<title>FY Rep Forms</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.container}>
					<div className={styles.leftcontainer}>
						<Stepper
							items={[
								{
									title: "Personal Details",
									description:"Add your detail",
									icon:user
									
								},
								{
									title: "Show us what you got",
									description:"",
									icon:code
								},
								{
									title: "Motivation",
									description:"",
									icon:fire
								},
							]}
						/>
					</div>
					<div className={styles.rightcontainer}>
						{currentSlide === 0 ? (
							<PersonalDetails />
						) : currentSlide === 1 ? (
							<Show />
						) : (
							<Motivation />
						)}
					</div>
				</div>
			</main>
		</>
	);
}
