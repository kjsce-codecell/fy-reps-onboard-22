import React, { useRef, useState, useEffect } from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
	formState(c: boolean): void;
	page: number;
	setPage(c: number): void;
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

	const handleKeypress = (e: any) => {
		if (e.keyCode === 13) {
			handleSubmit();
		}
	};

	const [githubError, setGithubError] = useState<boolean>(false);
	const [linkedinError, setLinkedinError] = useState<boolean>(false);
	const [resumeError, setResumeError] = useState<boolean>(false);
	const [cpError, setCPError] = useState<boolean>(false);

	const validate = () => {
		let error = false;
		setGithubError(false);
		setLinkedinError(false);
		setResumeError(false);

		if (!github.includes("github.com/") || github === "https://github.com/") {
			setGithubError(true);
			error = true;
		}

		if (
			!linkedin.includes("linkedin.com/in/") ||
			linkedin === "https://linkedin.com/in/"
		) {
			error = true;
			setLinkedinError(true);
		}

		if (!cp.includes("codechef.com/users/") && !cp.includes("codeforces.com/profile/") && !cp.includes("leetcode.com/")) {
			error = true;
			setCPError(true);
		}

		if (!resume.includes("drive.google.com/") || resume === "drive.google.com/") {
			error = true;
			setResumeError(true);
		}
		return error;
	};

	const handleSubmit = () => {
		localStorage.setItem(
			"ShowUs",
			JSON.stringify({
				github,
				linkedin,
				cp,
				resume,
			})
		);
		let error = validate();

		if (!error) {
			updateForm({ github, cp, linkedin, resume });
			setCurrentSlide(currentSlide + 1);
			props.formState(true);
		}
	};

	useEffect(() => {
		if (props.page == 1) {
			validate();
			props.setPage(-1);
		}
	}, [props.page]);

	return (
		<div>
			<div className={detailsStyles.oneSection}>
				<div className={detailsStyles.sectionHeader}>
					<span>Step {currentSlide + 1}/4</span>
					<h1 style={{marginTop: "5px"}}>Show us what you got</h1>
					<p>List your profiles</p>
				</div>
				<div className={detailsStyles.sectionContent}>
					<div className={detailsStyles.oneField}>
						<label>GitHub Profile Link</label>
						<input
							type="text"
							value={github}
							onChange={(e) => setGithub(e.target.value)}
							placeholder="https://github.com/"
							onFocus={() => github==="" ? setGithub("https://github.com/") : ''}
						/>
						<p className="ErrorMsg">{!githubError ? "" : "Enter Correct GitHub Profile Link"}</p>
					</div>
					<div className={detailsStyles.oneField}>
						<label>CodeChef / Codeforces / Leetcode Profile Link</label>
						<input
							type="text"
							value={cp}
							onChange={(e) => setCP(e.target.value)}
						/>
						<p className="ErrorMsg">{!cpError ? "" : "Enter Correct Profile Link"}</p>

					</div>
					<div className={detailsStyles.oneField}>
						<label>LinkedIn Profile Link</label>
						<input
							type="text"
							value={linkedin}
							onChange={(e) => setLinkedin(e.target.value)}
							placeholder="https://linkedin.com/in/"
							onFocus={() => linkedin==="" ? setLinkedin("https://linkedin.com/in/"): ''}
						/>
						<p className="ErrorMsg">{!linkedinError ? "" : "Enter Correct Linkedin Profile Link"}</p>
					</div>
					<div className={detailsStyles.oneField}>
						<label>Link to Resume (PDF)</label>
						<input
							type="text"
							value={resume}
							placeholder="Google Drive Link"
							onChange={(e) => setResume(e.target.value)}
							onKeyDown={handleKeypress}
						/>
						<p className="ErrorMsg">{!resumeError ? "" : "Enter Correct Link to Resume"}</p>
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
