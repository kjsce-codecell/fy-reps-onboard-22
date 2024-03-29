/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import PersonalDetails from "./components/PersonalDetails";
import Show from "./components/Show";
import Motivation from "./components/Motivation";
import Stepper from "./components/Stepper";
import {
  code,
  CodecellLogo,
  fire,
  user,
  legal,
  codecellFavicon,
} from "../assets";
import Modal from "./components/Modal";
import LegalDocuments from "./components/LegalDocuments";
import SubmitModal from "./components/SubmitModal";
import aesjs from "aes-js";
import ClosedModal from "./components/ClosedModal";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [registrationID, setregistrationID] = useState<number>(0);

  const changeSlide = (slide: number) => {
    setCurrentSlide(slide);
    localStorage.setItem("slide", JSON.stringify(slide));
  };
  let defaultSlide = 0;
  useEffect(() => {
    defaultSlide = parseInt(localStorage.getItem("slide") || "0");
    changeSlide(defaultSlide || 0);
  }, []);

  const [submitModalVisible, setSubmitModalVisible] = useState<boolean>(false);
  const [entryModalVisible, setEntryModalVisible] = useState<boolean>(false);
  useEffect(() => {
    console.log("Do not paste any code or script here");
    console.log("Hacker can use this to hack the connection!!");
    if (localStorage.getItem("submitted-jun-2023") === "true") {
      setregistrationID(
        parseInt(localStorage.getItem("registrationID") || "0")
      );
      setSubmitModalVisible(true);
    } else setEntryModalVisible(localStorage.getItem("visited") !== "true");
  }, []);

  // Main Data
  const [formData, setFormData] = useState<object>({});
  const formRef = useRef({});

  // 3 Sections Data
  const [personalDetailsData, setPersonalDetailsData] = useState<
    object | undefined
  >({});
  const [showUsData, setShowUsData] = useState<object | undefined>({});
  const [motivationData, setMotivationData] = useState<object | undefined>({});
  const [legalDocumentsData, setLegalDocumentsData] = useState<
    object | undefined
  >({});
  formRef.current = formData;

  //   year state
  const [mainYear, setMainYear] = useState("NA");

  const [personalDetailsDataFilled, setPersonalDetailsDataFilled] =
    useState<boolean>(false);
  const [showUsDataFilled, setShowUsDataFilled] = useState<boolean>(false);
  const [legalDocumentsDataFilled, setLegalDocumentsDataFilled] =
    useState<boolean>(false);
  const [motivationDataFilled, setmotivationDataFilled] =
    useState<boolean>(false);

  useEffect(() => {
    setFormData({
      ...personalDetailsData,
      ...showUsData,
      ...legalDocumentsData,
      ...motivationData,
    });
  }, [personalDetailsData, showUsData, legalDocumentsData, motivationData]);

  const [currEmail, setCurrEmail] = useState<string>("noreply");
  const [page, SetPage] = useState(-1);
  const finalSubmit = async () => {
    if (!personalDetailsDataFilled) {
      SetPage(0);
      changeSlide(0);
    } else if (!showUsDataFilled) {
      SetPage(1);
      changeSlide(1);
    } else if (!legalDocumentsDataFilled) {
      SetPage(2);
      changeSlide(2);
    } else {
      setTimeout(async () => {
        const KEY = process.env.NEXT_PUBLIC_KEY || "";
        let superKey: Array<number> = [];
        for (let i = 0; i < KEY.length; ++i) {
          superKey.push(KEY.charCodeAt(i));
        }
        var textBytes = aesjs.utils.utf8.toBytes(
          process.env.NEXT_PUBLIC_secretKEY + currEmail
        );
        var aesCtr = new aesjs.ModeOfOperation.ctr(
          superKey,
          new aesjs.Counter(3)
        );
        var encryptedBytes = aesCtr.encrypt(textBytes);
        const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        SetPage(-1);
        fetch(process.env.NEXT_PUBLIC_HOST + "/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formRef.current,
            ciphertext: encryptedHex,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Registration ID: " + data.registrationID);
            console.log("Hurrayy!! Applied Successfully");
            setregistrationID(data.registrationID);
            localStorage.setItem("submitted-jun-2023", "true");
            localStorage.setItem("registrationID", data.registrationID);
            setSubmitModalVisible(true);
          })
          .catch((e) => {
            console.error("API Call for Registration Failed - Error: ", e);
          });
      }, 250);
    }
  };
  //   useEffect(() => {
  //     console.log(formData);
  //   }, [formData]);

  return (
    <>
      <Head>
        <title>CodeCell SY/TY Applications 2023-24 | KJSCE</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={codecellFavicon.src} />
      </Head>
      <main className={styles.main}>
        <ClosedModal />
        {entryModalVisible && <Modal setVisible={setEntryModalVisible} />}
        {submitModalVisible && <SubmitModal registrationID={registrationID} />}
        <div className={styles.mainContainer}>
          <div className={styles.heading}>
            <a
              href="https://www.kjscecodecell.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={CodecellLogo.src} alt="Codecell Logo" />
            </a>
          </div>
          <div className={styles.container}>
            <div className={styles.leftcontainer}>
              <Stepper
                current={currentSlide}
                Change={(n: number) => changeSlide(n)}
                items={[
                  {
                    title: "Identity",
                    description: "",
                    icon: user,
                  },
                  {
                    title: "Unveil",
                    description: "",
                    icon: code,
                  },
                  {
                    title: "Officials",
                    description: "",
                    icon: legal,
                  },
                  {
                    title: "Drive",
                    description: "",
                    icon: fire,
                  },
                ]}
              />
            </div>

            <div className={styles.rightcontainer}>
              {currentSlide === 0 && (
                <PersonalDetails
                  currentSlide={currentSlide}
                  setCurrentSlide={changeSlide}
                  updateForm={setPersonalDetailsData}
                  formState={setPersonalDetailsDataFilled}
                  updateEmail={setCurrEmail}
                  page={page}
                  setPage={SetPage}
                  setMainYear={setMainYear}
                />
              )}

              {currentSlide === 1 && (
                <Show
                  currentSlide={currentSlide}
                  setCurrentSlide={changeSlide}
                  updateForm={setShowUsData}
                  formState={setShowUsDataFilled}
                  page={page}
                  setPage={SetPage}
                />
              )}

              {currentSlide === 2 && (
                <LegalDocuments
                  currentSlide={currentSlide}
                  setCurrentSlide={changeSlide}
                  updateForm={setLegalDocumentsData}
                  formState={setLegalDocumentsDataFilled}
                  page={page}
                  setPage={SetPage}
                  year={mainYear}
                />
              )}

              {currentSlide === 3 && (
                <Motivation
                  currentSlide={currentSlide}
                  setCurrentSlide={changeSlide}
                  updateForm={setMotivationData}
                  formState={setmotivationDataFilled}
                  finalSubmit={finalSubmit}
                  page={page}
                  setPage={SetPage}
                />
              )}
            </div>
          </div>
          <div className={styles.footer}>
            {/* {"Made with ❤️ by CodeCell"} */}
            Made with 💖 by{" "}
            <a
              className={styles.footerlink}
              href="https://www.kjscecodecell.com/"
              rel="noreferrer"
              target="_blank"
            >
              <b>KJSCE CodeCell</b>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

// To open the form -
// 1) Update closing date in components/ClosedModal.tsx in line 13
// 2) Enable Register API in api/register.ts by commenting out line 52
// 3) Comment out line 54 in components/PersonalDetails.tsx
// 4) Include all required configurations in .env.local file, Keeping NEXT_PUBLIC as preifix for every Secret Key
