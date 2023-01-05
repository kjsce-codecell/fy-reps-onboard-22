import React, { useState, useEffect } from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
	formState(c: boolean): void;
};

const fallbackValues = {
	cover: "",
	position: "",
};

const LegalDocuments = (props: Props) => {
	const { currentSlide, setCurrentSlide, updateForm } = props;

	let defaultValues = fallbackValues;

	const [cover, setCover] = useState(defaultValues.cover);
	const [position, setPosition] = useState(defaultValues.position);


	useEffect(() => {
		defaultValues = JSON.parse(
			localStorage.getItem("LegalDocuments") || JSON.stringify(fallbackValues)
		);
		setCover(defaultValues.cover || "");
		setPosition(defaultValues.position || "");
	}, []);

	const [coverError, setCoverError] = useState<boolean>(false);
	// const [positionError, setPositionError] = useState<boolean>(false);

	const handleSubmit = () => {
		let error = false;
		setCoverError(false);
		localStorage.setItem(
			"LegalDocuments",
			JSON.stringify({
				cover,
				position,
			})
		);
		// setLinkedinError(false);
		if (!cover.includes("drive.com/")) {
			setCoverError(true);
			error = true;
		}

		if (!error) {
			updateForm({ cover, position });
			setCurrentSlide(currentSlide + 1);
			props.formState(true);
		}
	};

	return (
		<div>
			<div className={detailsStyles.oneSection}>
				<div className={detailsStyles.sectionHeader}>
					<span>Step {currentSlide + 1}/4</span>
					<h1>Lets Practice Legality</h1>
					{/* <p>Show us What you got</p> */}
				</div>
				<div className={detailsStyles.sectionContent}>
					<div className={detailsStyles.oneField}>
						<label>Link to Cover Letter</label>
						<input
							type="text"
							value={cover}
							onChange={(e) => setCover(e.target.value)}
                            placeholder="https://drive.google.com/"
							onClick={() => setCover("https://drive.google.com/")}
						/>
						<div>{!coverError ? "" : "Enter Correct Cover Letter Link"}</div>
						<a href="">Download Cover Letter Format</a>
					</div>
					<div className={detailsStyles.oneField}>
						<label>Position Preference</label>
						<input
							type="text"
							value={position}
							onChange={(e) => setPosition(e.target.value)}
						/>
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

export default LegalDocuments;
