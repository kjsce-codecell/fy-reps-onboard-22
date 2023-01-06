import { useState, useEffect } from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
	finalSubmit(): void;
	formState(c: boolean): void;
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

	const submitForm = () => {
		let error = false;
		setOneLineErr(false);
		setPlanErr(false);

		if (getWordCount(oneLine) === 0 || getWordCount(oneLine) > 6) {
			console.log("1st Input Word Count is "+getWordCount(plan));
			setOneLineErr(true);
			error = true;
		}
		if (getWordCount(plan) < 50 || getWordCount(plan) > 120) {
			console.log("2nd Input Word Count is "+getWordCount(plan));
			setPlanErr(true);
			error = true;
		}

		if (!error) {
			props.updateForm({ oneLine, plan });
			props.formState(true);
			props.finalSubmit();
		}
	};

	return (
		<div className={detailsStyles.oneSection}>
			<div className={detailsStyles.sectionHeader}>
				<span>Step {props.currentSlide + 1}/4</span>
				<h1>Present your Goals</h1>
				<p>What motivates you ??</p>
			</div>
			<div className={detailsStyles.sectionContent}>
				<div className={detailsStyles.oneField}>
					<label>Describe yourself in 1 line (1 - 6 Words)</label>
					<input type="text" value={oneLine} onChange={handleOneLineChange} />
					{oneLineErr ? `Enter Proper Answer` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>
						What are you planning to make into CodeCell (50 - 120 Words)
					</label>
					<textarea value={plan} onChange={handlePlanChange} />
					{planErr ? `Enter Proper Answer` : ``}
				</div>
				<div className={detailsStyles.multiple_buttons}>
					<button type="button" onClick={handleSave}>
						Save
					</button>
					<button type="button" onClick={submitForm}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default Motivation;
