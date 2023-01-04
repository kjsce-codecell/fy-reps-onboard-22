import { useState } from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
	finalSubmit(c: boolean): void
};

const Motivation = (props: Props) => {

	const [oneLine, setOneLine] = useState("");
	const [plan, setPlan] = useState("");

	const [oneLineErr, setOneLineErr] = useState<boolean>(false);
	const [planErr, setPlanErr] = useState<boolean>(false);

	const handleOneLineChange = (e: any) => {
		setOneLine(e.target.value);
	};
	const handlePlanChange = (e: any) => {
		setPlan(e.target.value);
	};

	const submitForm = () => {
		setOneLineErr(false);
		setPlanErr(false);
	
		if (oneLine.trim().length === 0 || oneLine.trim().split(" ").length > 6) {
			setOneLineErr(true);
		}
		if (plan.trim().split(" ").length < 50 || plan.trim().split(" ").length > 120) {
			setPlanErr(true);
		}

		if (!oneLineErr && !planErr) {
			console.log(!oneLineErr, !planErr)
		  props.updateForm({oneLine, plan});
		  console.log("hurrayyyy");
		  props.finalSubmit(true);
		//   props.setCurrentSlide(props.currentSlide+1);
		}
	}

	return (
		<div className={detailsStyles.oneSection}>
			<div className={detailsStyles.sectionHeader}>
				<span>Step {props.currentSlide + 1}/3</span>
				<h1>Showcase your Attitude</h1>
				<p>What motivated you here</p>
			</div>
			<div className={detailsStyles.sectionContent}>
				<div className={detailsStyles.oneField}>
					<label>Describe yourself in 1 line (1 - 6 Words)</label>
					<input type="text" onChange={handleOneLineChange}/>
					{oneLineErr ? `Enter Proper Answer` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>What are you planning to make into CodeCell (50 - 120 Words)</label>
					<textarea onChange={handlePlanChange}/>
					{planErr ? `Enter Proper Answer` : ``}
				</div>
				<div>
					<button type="button" onClick={submitForm}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default Motivation;
