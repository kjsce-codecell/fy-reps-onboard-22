import React from "react";
import styles from "../../../styles/Stepper.module.css";
import Step from "./Step";

type Props = {
	items: {
		title: string;
		description: string;
		icon: {
			src: string;
			height: number;
			width: number;
		};
	}[];
	current: number;
	Change(n: number): void;
};

const Stepper = (props: Props) => {
	const { items,Change,current } = props;
	return (
		<div className={styles.container}>
			{items && items.map((item, index) => (
				<Step
                    Change={Change}
                    current={current}
					title={item.title}
					description={item.description}
					key={item.title}
					icon={item.icon}
					id={index}
                    active={current==index}
					prev={current>index}
				/>
			))}
		</div>
	);
};

export default Stepper;
