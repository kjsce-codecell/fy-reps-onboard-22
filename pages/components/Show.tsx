import React, { useRef, useState } from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
};
const Show = (props: Props) => {
	const { currentSlide, setCurrentSlide } = props;

	const githubRef = useRef<HTMLInputElement>(null);
	const cpRef = useRef<HTMLInputElement>(null);
	const linkedinRef = useRef<HTMLInputElement>(null);

	const [githubError, setGithubError] = useState<boolean>(false);
	const [linkedinError, setLinkedinError] = useState<boolean>(false);

	const handleSubmit = () => {
		let error=false;
		if (!githubRef.current!.value.includes("github.com")) {
			setGithubError(true);
			error=true
		} else {
			
			setGithubError(false);
		}

		if (!linkedinRef.current!.value.includes("linkedin.com")) {
			error=true
			setLinkedinError(true);
		} else {
			setLinkedinError(false);
		}
		if(!error){
			setCurrentSlide(currentSlide+1)
		}
	};

	return (
		<div>
			<div className={detailsStyles.oneSection}>
				<div className={detailsStyles.sectionHeader}>
					<span>Step {currentSlide + 1}/3</span>
					<h1>Showcase your Profiles</h1>
					<p>Show us What you got</p>
				</div>
				<div className={detailsStyles.sectionContent}>
					<div className={detailsStyles.oneField}>
						<label>GitHub Profile</label>
						<input type="text" ref={githubRef} />
						<div>{!githubError ? "" : "Enter correct github ID"}</div>
					</div>
					<div className={detailsStyles.oneField}>
						<label>CP Platform Profile</label>
						<input type="text" ref={cpRef} />
					</div>
					<div className={detailsStyles.oneField}>
						<label>LinkedIn Profile</label>
						<input type="text" ref={linkedinRef} />
						{!linkedinError ? "" : "Enter correct Linkedin profile"}
					</div>
					<div>
						<button type="submit" onClick={handleSubmit}>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Show;
