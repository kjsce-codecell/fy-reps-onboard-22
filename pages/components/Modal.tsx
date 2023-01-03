/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
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
						<img src="https://picsum.photos/400/300" />
						<h3>Hello There 👋</h3>
						<p>Welcome to KJSCE CodeCell FY Rep Application form </p>
						<div onClick={handleClose}>Let's Go</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
