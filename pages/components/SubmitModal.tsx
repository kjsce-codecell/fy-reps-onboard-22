/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { CodecellLogo } from "../../assets";
import styles from "../../styles/Modal.module.css";

type Props = {};

const SubmitModal = (props: Props) => {
	return (
		<>
			<div className={styles.overlay}>
				<div className={styles.container}>
					<img src={CodecellLogo.src} alt="Codecell logo" />
					<h3>Hurrayyyyyy 🚀</h3>
					<p>Thanks for submitting</p>
				</div>
			</div>
		</>
	);
};

export default SubmitModal;
