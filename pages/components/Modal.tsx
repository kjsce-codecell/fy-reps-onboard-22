/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { CodecellLogo } from "../../assets";
import styles from "../../styles/Modal.module.css";

type Props = {
	setVisible(c: boolean): void;
};

const Modal = (props: Props) => {
	const { setVisible } = props;

	const handleClose = () => {
		setVisible(false);
		localStorage.setItem("visited", "true");
	};

	return (
		<>
			<div className={styles.overlay} onClick={handleClose}>
				<div className={styles.container}>
					<img src={CodecellLogo.src} alt="CodeCell Logo" />
					<h3>Hello There 👋</h3>
					<p>
						Welcome to KJSCE CodeCell FY Representative Application Form Januray
						2023{" "}
					</p>
					<div onClick={handleClose}>Let&apos;s Go</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
