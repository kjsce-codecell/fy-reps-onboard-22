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
};

const Step = (props: Props) => {
	const { title, description, icon, id } = props;

	const handleOnClick = () => {
		console.log(id);
	};

	return (
		<div className={styles.container} onClick={handleOnClick}>
			<div className={styles.leftcontainer}>
				<div className={styles.title}>{title}</div>
				{description && <div className={styles.description}>{description}</div>}
			</div>
			<div className={styles.icon}>
				<img src={icon.src} alt={title} style={{ height: "100%" }} />
			</div>
		</div>
	);
};

export default Step;
