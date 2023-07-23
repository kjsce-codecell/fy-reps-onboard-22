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

	const [submitActive, setSubmitActive] = useState<boolean>(true);

	const validate=()=>{
		let error = false;
		setOneLineErr(false);
		setPlanErr(false);

		if (getWordCount(oneLine) < 2  || getWordCount(oneLine) > 6) {
			console.log("1st Input Word Count is "+getWordCount(plan));
			setOneLineErr(true);
			error = true;
		}
		if (plan.trim().split(/[\s\n]+/).length < 40 || plan.trim().split(/[\s\n]+/).length > 100) {
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
			setSubmitActive(false);
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
				<h1 style={{marginTop: "5px"}}>Present your Goals</h1>
				<p>Lets stand out</p>
			</div>
			<div className={detailsStyles.sectionContent}>
				<div className={detailsStyles.oneField}>
					<label>Describe yourself in 1 line (2 - 6 Words)</label>
					<input type="text" value={oneLine} onChange={handleOneLineChange} />
					<p className="ErrorMsg">{oneLineErr ? `Enter Proper Answer` : ``}</p>
				</div>
				<div className={detailsStyles.oneField}>
					<span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
						<label>What motivates you to join CodeCell? (40 - 100 Words)</label>
						<label>{plan === "" ? "0" : plan.trim().split(/[\s\n]+/).length} / 100</label>
					</span>
					<textarea value={plan} onChange={handlePlanChange} />
					<p className="ErrorMsg">{planErr ? `Enter Proper Answer` : ``}</p>
				</div>
				<div className={detailsStyles.multiple_buttons} >
					<button type="button" onClick={handleSave} disabled={!submitActive}>
						Save
					</button>
					<button type="button" onClick={submitForm} disabled={!submitActive}>
						{submissionStatus===0 && `Submit`}
						<img src={submissionStatus===1 ? loader.src : `` } style={{width: "13px", transform: "scale(1.8)", marginTop: "4px"}}/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Motivation;
