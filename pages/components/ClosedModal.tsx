/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { CodecellLogo } from "../../assets";
import styles from "../../styles/Modal.module.css";

type Props = {};

const Modal = (props: Props) => {
	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => {
		let c = new Date("2022-01-16T00:00:00");
		setInterval(() => {
			let d = new Date();
			if (
				d.getHours() >= c.getHours() &&
				d.getDate() >= c.getDate() &&
				d.getMinutes() >= c.getMinutes() &&
				d.getSeconds() >= c.getSeconds()
			) {
				setVisible(true);
			}
		}, 1000);
	}, [visible]);

	return (
		<>
			{visible && (
				<div className={styles.overlay}>
					<div className={styles.container}>
						<img src={CodecellLogo.src} alt="CodeCell Logo" />
						<h3>Error: TLE </h3>
						<p>
							<big>
								<b>The form is now closed</b>
							</big>
						</p>
						{/* <div onClick={handleClose}>Let&apos;s Go</div> */}
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
