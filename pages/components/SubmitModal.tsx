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
					<h3>Hurrayyyy ð</h3>
					<p><big><b>Let&apos;s sail on this ð¢ to code as you have ð¥ed the floor!!<br />It&apos;s your time to celebrate ð¥
					</b></big></p>
					<p><big><code><b>
					<br />
					<span>Applied Successfully</span><br />
					<span>Registration ID: {props.registrationID!=0 ? props.registrationID : `Processing...`}</span>
					</b></code></big></p>
				</div>
			</div>
		</>
	);
};

export default SubmitModal;
