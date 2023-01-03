import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import detailsStyles from "../styles/Details.module.css";
import { useState } from "react";
import { Steps, ConfigProvider } from "antd";
const Step = Steps.Step;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const items = [
		{
			id: 1,
			title: "Step 1",
		},
		{
			id: 2,
			title: "Step 2",
		},
		{
			id: 3,
			title: "Step 3",
		},
		{
			id: 4,
			title: "Step 3",
		},
		{
			id: 3,
			title: "Step 3",
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
						<ConfigProvider
							theme={{
								token: {
                  				colorText:"#fff",
									colorPrimaryActive: "#F5222D",
									colorPrimaryTextActive: "#F5222D",
                  
								},
								components: {
									Steps: {
										colorPrimary: "#dc4446",
									},
								},
							}}
						>
							<Steps
								current={currentSlide}
								style={{ height: "100%" }}
								onChange={setCurrentSlide}
								direction="vertical"
							>
								{items.map((item) => (
									<Step title={item.title} key={item.id} />
								))}
							</Steps>
						</ConfigProvider>
					</div>
					<div className={styles.rightcontainer}>
						{currentSlide === 0 && (
							<div className={detailsStyles.oneSection}>
								<div className={detailsStyles.sectionHeader}>
									<span>Step {currentSlide+1}/5</span>
									<h1>Lets start with your Personal Details</h1>
									<p>Please fill in your Name, Branch & Email ID</p>
								</div>
								<div className={detailsStyles.sectionContent}>
									<div className={detailsStyles.oneField}>
										<label>Enter Your Email ID</label>
										<input type="text" />
									</div>
									<div className={detailsStyles.oneField}>
										<label>Enter Your Name</label>
										<input type="text" />
									</div>
									<div className={detailsStyles.oneField}>
										<label>Enter Your Branch</label>
										<input type="text" />
									</div>
									<div>
										<button type="button">Submit</button>
									</div>
								</div>
							</div>
						)}

						{currentSlide === 1 && (
							<div className={detailsStyles.oneSection}>
							<div className={detailsStyles.sectionHeader}>
								<span>Step {currentSlide+1}/5</span>
								<h1>Showcase your Profiles</h1>
								<p>Show us What you got</p>
							</div>
							<div className={detailsStyles.sectionContent}>
								<div className={detailsStyles.oneField}>
									<label>GitHub Profile</label>
									<input type="text" />
								</div>
								<div className={detailsStyles.oneField}>
									<label>CP Platform Profile</label>
									<input type="text" />
								</div>
								<div className={detailsStyles.oneField}>
									<label>LinkedIn Profile</label>
									<input type="text" />
								</div>
								{/* <div className={detailsStyles.oneField}>
									<label>Describe yourself in one line</label>
									<input type="text" />
								</div> */}
								<div>
									<button type="button">Submit</button>
								</div>
							</div>
						</div>
						)}

						{currentSlide === 2 && (
							<h1>HelloWorld 3</h1>
						)}

						{currentSlide === 3 && (
							<h1>HelloWorld 4</h1>
						)}

						{currentSlide === 4 && (
							<h1>HelloWorld 5</h1>
						)}
						
					</div>
				</div>
			</main>
		</>
	);
}
