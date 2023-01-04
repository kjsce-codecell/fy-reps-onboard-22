import React from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
};

const PersonalDetails = (props: Props) => {
	const { currentSlide, setCurrentSlide } = props;
	return (
		<div className={detailsStyles.oneSection}>
			<div className={detailsStyles.sectionHeader}>
				<span>Step {currentSlide + 1}/3</span>
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
					<button
						type="button"
						onClick={() => {
							setCurrentSlide(currentSlide + 1);
						}}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PersonalDetails;
