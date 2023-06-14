/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { CodecellLogo } from "../../assets";
import styles from "../../styles/Modal.module.css";

type Props = {};

const Modal = (props: Props) => {
	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => {
		let c = new Date("2023-06-16T00:00:00");
		setInterval(() => {
			let d = new Date(Date.now());
			if (d >= c) {
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
						<h3>Applications not accepted 📫</h3>
						<p>
							<big>
								<b>The form is closed for now 🤘</b><br />
								<b>But don't loose hopes!! You will soon get an Email from us when we start inviting applications for next season... <br />Till then,<br /> Happy Hacking <br />KJSCE CodeCell</b>
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
