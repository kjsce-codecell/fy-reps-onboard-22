/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
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
    active:boolean
};

const Step = (props: Props) => {
	const { title, description, icon, id, current, Change,active } = props;

	const handleOnClick = () => {
		Change(id);
	};

	return (
		<div className={styles.container} onClick={handleOnClick}>
			<div className={styles.leftcontainer}>
				<div className={styles.title}>{title}</div>
				{description && <div className={styles.description}>{description}</div>}
			</div>
			<div className={active?(styles.icon):(styles.activeicon)}>
				<img src={icon.src} alt={title} style={{ height: "2rem"}} />
			</div>
		</div>
	);
};

export default Step;
