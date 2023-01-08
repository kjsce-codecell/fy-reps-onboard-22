/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../styles/Step.module.css";

type Props = {
	title: string;
	description: string;
	icon: {
		src: string;
		height: number;
		width: number;
	};
	id: number;

	current: number;
	Change(n: number): void;
	active: boolean;
	prev: boolean;
};

const Step = (props: Props) => {
	const { title, description, icon, id, current, Change, active, prev } = props;

	const handleOnClick = () => {
		Change(id);
	};

	return (
		<div className={styles.container}>
			<div className={styles.leftcontainer}>
				<div className={styles.title} onClick={handleOnClick} >{title}</div>
				{description && <div className={styles.description}>{description}</div>}
			</div>
			<div
				className={
					active ? styles.activeicon : prev ? styles.previcon : styles.icon
				}
			>
				{icon && <img src={icon.src} alt={title} style={{ height: "2rem" }} onClick={handleOnClick}/>}
			</div>
		</div>
	);
};

export default Step;
