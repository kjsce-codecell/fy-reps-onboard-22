/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { CodecellLogo } from "../../assets";
import styles from "../../styles/Modal.module.css";

type Props = {};

const Modal = (props: Props) => {
    const [visible,setVisible]=useState(false);
    useEffect(()=>{
        setVisible(localStorage.getItem('visited')!=='true');
    },[])

    const handleClose=()=>{
        setVisible(false);
        localStorage.setItem('visited','true');
    }


	return (
		<>
			{visible && (
				<div className={styles.overlay} onClick={handleClose}>
					<div className={styles.container}>
						<img src={CodecellLogo.src}  alt="CodeCell Logo"/>
						<h3>Hello there 👋</h3>
						<p><big><b>Welcome to KJSCE CodeCell FY Representative Applications Januray 2023</b></big></p>
						<div onClick={handleClose}>Let&apos;s Go</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
