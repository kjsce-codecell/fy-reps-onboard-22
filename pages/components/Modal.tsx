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
          <h3>Hello there 👋</h3>
          <p>
            <big>
              <b>Welcome to KJSCE CodeCell SY/TY Applications June 2023</b>
            </big>
          </p>
          <div onClick={handleClose}>Let&apos;s Go</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
