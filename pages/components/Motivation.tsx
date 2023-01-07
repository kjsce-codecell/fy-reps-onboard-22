/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import detailsStyles from "../../styles/Details.module.css";
import { loader } from "../../assets";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
	finalSubmit(): void;
	formState(c: boolean): void;
	page: number;
	setPage(c: number): void;
};

const fallbackValues = {
	oneLine: "",
	plan: "",
};

function getWordCount(str: string) {
	return str.split(" ").filter(function (n) {
		return n != "";
	}).length;
}

const Motivation = (props: Props) => {
	let defaultValues = fallbackValues;
	const [oneLine, setOneLine] = useState(defaultValues.oneLine);
	const [plan, setPlan] = useState(defaultValues.plan);
	const [submissionStatus, setsubmissionStatus] = useState<number>(0);

	useEffect(() => {
		defaultValues = JSON.parse(
			localStorage.getItem("Motivation") || JSON.stringify(fallbackValues)
		);
		setOneLine(defaultValues.oneLine || "");
		setPlan(defaultValues.plan || "");
	}, []);

	const handleSave = () => {
		localStorage.setItem(
			"Motivation",
			JSON.stringify({
				oneLine,
				plan,
			})
		);
	};

	const [oneLineErr, setOneLineErr] = useState<boolean>(false);
	const [planErr, setPlanErr] = useState<boolean>(false);

	const handleOneLineChange = (e: any) => {
		setOneLine(e.target.value);
	};
	const handlePlanChange = (e: any) => {
		setPlan(e.target.value);
	};

	const validate=()=>{
		let error = false;
		setOneLineErr(false);
		setPlanErr(false);

		if (getWordCount(oneLine) < 2  || getWordCount(oneLine) > 6) {
			console.log("1st Input Word Count is "+getWordCount(plan));
			setOneLineErr(true);
			error = true;
		}
		if (getWordCount(plan) < 35 || getWordCount(plan) > 100) {
			console.log("2nd Input Word Count is "+getWordCount(plan));
			setPlanErr(true);
			error = true;
		}
		return error
	}

	const submitForm = () => {
		handleSave()
		let error=validate()
		if (!error) {
			setsubmissionStatus(1);
			props.updateForm({ oneLine, plan });
			props.formState(true);
			props.finalSubmit();
			setTimeout(() => {
				setsubmissionStatus(0);
			}, 8000)
		}
	};

	useEffect(() => {
		if (props.page == 3) {
			validate();
			props.setPage(-1);
		}
	}, [props.page]);

	return (
		<div className={detailsStyles.oneSection}>
			<div className={detailsStyles.sectionHeader}>
				<span>Step {props.currentSlide + 1}/4</span>
				<h1>Present your Goals</h1>
				<p>What motivates you ??</p>
			</div>
			<div className={detailsStyles.sectionContent}>
				<div className={detailsStyles.oneField}>
					<label>Describe yourself in 1 line (2 - 6 Words)</label>
					<input type="text" value={oneLine} onChange={handleOneLineChange} />
					{oneLineErr ? `Enter Proper Answer` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>
						What are you planning to make into CodeCell (35 - 100 Words)
					</label>
					<textarea value={plan} onChange={handlePlanChange} />
					{planErr ? `Enter Proper Answer` : ``}
				</div>
				<div className={detailsStyles.multiple_buttons}>
					<button type="button" onClick={handleSave}>
						Save
					</button>
					<button type="button" onClick={submitForm}>
						{submissionStatus===0 && `Submit`}
						<img src={submissionStatus===1 ? loader.src : `` } style={{width: "13.5px", transform: "scale(1.8)", marginTop: "4px"}}/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Motivation;
