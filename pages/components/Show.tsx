import React from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void
};
const Show = (props: Props) => {
	const { currentSlide, setCurrentSlide } = props;
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
		</div>
	);
};

export default Show;
