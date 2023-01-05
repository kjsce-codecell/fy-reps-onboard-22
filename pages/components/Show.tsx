import React, { useRef, useState, useEffect } from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
	formState(c: boolean): void;
};

const fallbackValues = {
	github: "",
	linkedin: "",
	cp: "",
	resume: "",
};

const Show = (props: Props) => {
	const { currentSlide, setCurrentSlide, updateForm } = props;

	let defaultValues = fallbackValues;

	const [github, setGithub] = useState(defaultValues.github);
	const [cp, setCP] = useState(defaultValues.cp);
	const [linkedin, setLinkedin] = useState(defaultValues.linkedin);
	const [resume, setResume] = useState(defaultValues.resume);

	useEffect(() => {
		defaultValues = JSON.parse(
			localStorage.getItem("ShowUs") || JSON.stringify(fallbackValues)
		);
		setGithub(defaultValues.github || "");
		setCP(defaultValues.cp || "");
		setLinkedin(defaultValues.linkedin || "");
		setResume(defaultValues.resume || "");
	}, []);

	const [githubError, setGithubError] = useState<boolean>(false);
	const [linkedinError, setLinkedinError] = useState<boolean>(false);
	const [resumeError, setResumeError] = useState<boolean>(false);

	const handleSubmit = () => {
		let error = false;
		setGithubError(false);
		setLinkedinError(false);
		setResumeError(false);

		localStorage.setItem(
			"ShowUs",
			JSON.stringify({
				github,
				linkedin,
				cp,
				resume,
			})
		);

		if (!github.includes("github.com/") || github === "https://github.com/") {
			setGithubError(true);
			error = true;
		}

		if (!linkedin.includes("linkedin.com/in/") || linkedin === "https://linkedin.com/in/") {
			error = true;
			setLinkedinError(true);
		}

		if (!resume.includes("drive.google.com/")) {
			error = true;
			setResumeError(true);
		}

		if (!error) {
			updateForm({ github, cp, linkedin, resume });
			setCurrentSlide(currentSlide + 1);
			props.formState(true);
		}
	};

	return (
		<div>
			<div className={detailsStyles.oneSection}>
				<div className={detailsStyles.sectionHeader}>
					<span>Step {currentSlide + 1}/4</span>
					<h1>Showcase your Profiles</h1>
					<p>Show us What you got!!</p>
				</div>
				<div className={detailsStyles.sectionContent}>
					<div className={detailsStyles.oneField}>
						<label>GitHub Profile Link</label>
						<input
							type="text"
							value={github}
							onChange={(e) => setGithub(e.target.value)}
							placeholder="https://github.com/"
							onClick={() => setGithub("https://github.com/")}
						/>
						<div>{!githubError ? "" : "Enter Correct GitHub Profile Link"}</div>
					</div>
					<div className={detailsStyles.oneField}>
						<label>CP Platform Profile</label>
						<input
							type="text"
							value={cp}
							onChange={(e) => setCP(e.target.value)}
						/>
					</div>
					<div className={detailsStyles.oneField}>
						<label>LinkedIn Profile Link</label>
						<input
							type="text"
							value={linkedin}
							onChange={(e) => setLinkedin(e.target.value)}
							placeholder="https://linkedin.com/in/"
							onClick={() => setLinkedin("https://linkedin.com/in/")}
						/>
						{!linkedinError ? "" : "Enter Correct Linkedin Profile Link"}
					</div>
					<div className={detailsStyles.oneField}>
						<label>Link to Resume</label>
						<input
							type="text"
							value={resume}
							onChange={(e) => setResume(e.target.value)}
						/>
						{!resumeError ? "" : "Enter Correct Link to Resume"}
					</div>
					<div>
						<button type="submit" onClick={handleSubmit}>
							Save and Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Show;
