/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { CodecellLogo } from "../../assets";
import styles from "../../styles/Modal.module.css";

type Props = {
	registrationID: number
};

const SubmitModal = (props: Props) => {
	return (
		<>
			<div className={styles.overlay}>
				<div className={styles.container}>
					<img src={CodecellLogo.src} alt="Codecell logo" />
					<h3>Hurrayyyy 🚀</h3>
					<p><big><b>Lets sail on this 🚢 to code as you have 🔥 your goal!!<br />Its your time to celebrate 🥂</b></big></p>
					<p><big><code><b>
						<span>Applied Successfully</span><br />
						<span>Registration ID: {props.registrationID}</span>
					</b></code></big></p>
				</div>
			</div>
		</>
	);
};

export default SubmitModal;
