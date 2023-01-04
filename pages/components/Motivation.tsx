import React from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void
};

const Motivation = (props: Props) => {
	const { currentSlide, setCurrentSlide } = props;
	return (
		<div className={detailsStyles.oneSection}>
			<div className={detailsStyles.sectionHeader}>
				<span>Step {currentSlide + 1}/5</span>
				<h1>Showcase your Profiles</h1>
				<p>Show us What you got</p>
			</div>
			<div className={detailsStyles.sectionContent}>
				<div className={detailsStyles.oneField}>
					<label>Describe yourself in 1 line</label>
					<input type="text" />
				</div>
				<div className={detailsStyles.oneField}>
					<label>What are you planning to make into CodeCell</label>
					<input type="text" />
				</div>
				<div>
					<button type="button">Submit</button>
				</div>
			</div>
		</div>
	);
};

export default Motivation;
