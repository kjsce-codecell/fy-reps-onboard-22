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
	position1: "NA",
	position2: "NA",
};

const LegalDocuments = (props: Props) => {
	const { currentSlide, setCurrentSlide, updateForm } = props;

	let defaultValues = fallbackValues;

	const [cover, setCover] = useState(defaultValues.cover);
	const [position1, setPosition1] = useState(defaultValues.position1);
	const [position2, setPosition2] = useState(defaultValues.position2);


	useEffect(() => {
		defaultValues = JSON.parse(
			localStorage.getItem("LegalDocuments") || JSON.stringify(fallbackValues)
		);
		setCover(defaultValues.cover || "");
		setPosition1(defaultValues.position1 || "");
		setPosition2(defaultValues.position2 || "");
	}, []);

	const [coverError, setCoverError] = useState<boolean>(false);
	const [positionError1, setPositionError1] = useState<boolean>(false);
	const [positionError2, setPositionError2] = useState<boolean>(false);

	const handleSubmit = () => {
		let error = false;
		setCoverError(false);
		localStorage.setItem(
			"LegalDocuments",
			JSON.stringify({
				cover,
				position1,
				position2
			})
		);

		if (!cover.includes("drive.google.com/")) {
			setCoverError(true);
			error = true;
		}
		if (position1==="NA" || position2==="NA") {
			console.log(position1);
			console.log(position2);
			error = true;
			console.log("Select Position Preference/s !!");
			if (position1==="NA") setPositionError1(true);
			else setPositionError2(true);
		}

		if (!error) {
			console.log(position1)
			console.log(position2)
			updateForm({ cover, position1, position2 });
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
				</div>
				<div className={detailsStyles.sectionContent}>
					<div className={detailsStyles.oneField}>
						<label>Link to Cover Letter</label>
						<input
							type="text"
							value={cover}
							onChange={(e) => setCover(e.target.value)}
						/>
						<div>{!coverError ? "" : "Enter Correct Cover Letter Link"}</div>
						<a href="">Download Cover Letter Format</a>
					</div>
					<div className={detailsStyles.oneField}>
						<label>Position Preference 1</label>
						<select id="position1" name="position" value={position1} onChange={(e) => setPosition1(e.target.value)}>
							<option value="NA">Select Position</option>
							{position2!="Technical Team" && <option value="Technical Team">Technical Team</option>}
							{position2!="Creative Team" && <option value="Creative Team">Creative Team</option>}
							{position2!="Co-ordinator/Marketing" && <option value="Co-ordinator/Marketing">Co-ordinator/Marketing</option>}
						</select>
						{positionError1 ? `Select Position Preference` : ``}
					</div>
					<div className={detailsStyles.oneField}>
						<label>Position Preference 2</label>
						<select id="position2" name="position" value={position2} onChange={(e) => setPosition2(e.target.value)}>
						<option value="NA">Select Position</option>
							{position1!="Technical Team" && <option value="Technical Team">Technical Team</option>}
							{position1!="Creative Team" && <option value="Creative Team">Creative Team</option>}
							{position1!="Co-ordinator/Marketing" && <option value="Co-ordinator/Marketing">Co-ordinator/Marketing</option> }
						</select>
						{positionError2 ? `Select Position Preference` : ``}
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
