import { useEffect, useRef, useState } from "react";
import detailsStyles from "../../styles/Details.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
};

const fallbackValues = {
	name: "",
	email: "",
	phone: "",
	branch: "",
};

const PersonalDetails = (props: Props) => {
	let defaultValues = fallbackValues;
	const [name, setName] = useState(defaultValues.name);
	const [email, setEmail] = useState(defaultValues.email);
	const [phone, setPhone] = useState(defaultValues.phone);
	const [branch, setBranch] = useState(defaultValues.branch);

	useEffect(() => {
		setTimeout(() => {
			localStorage.setItem(
				"PersonalDetails",
				JSON.stringify({
					name,
					email,
					phone,
					branch,
				})
			);
		}, 2000);
	}, [name, email, phone, branch]);

	useEffect(() => {
		defaultValues = JSON.parse(
			localStorage.getItem("PersonalDetails") || JSON.stringify(fallbackValues)
		); 
    setName(defaultValues.name || "")
    setEmail(defaultValues.email || "")
    setPhone(defaultValues.phone || "")
    setBranch(defaultValues.branch || "")
	}, []);

	const [nameErr, setNameErr] = useState<boolean>(false);
	const [emailErr, setEmailErr] = useState("");
	const [phoneErr, setPhoneErr] = useState<boolean>(false);
	// const [branchErr, setBranchErr] = useState<boolean>(false);

	const checkRegistered = async (emailID: string) => {
		const docRef = doc(db, "FY_2022-23", emailID);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return true;
		} else {
			// console.log("No such document!");
		}
		return false;
	};

	const handleNameChange = (e: any) => {
		setName(e.target.value);
	};
	const handleEmailChange = (e: any) => {
		setEmail(e.target.value.toLowerCase());
	};
	const handlePhoneChange = (e: any) => {
		setPhone(e.target.value);
	};
	const handleBranchChange = (e: any) => {
		setBranch(e.target.value);
	};

	const handleNext = async () => {
		setEmailErr("");
		setPhoneErr(false);
		setNameErr(false);

		if (
			!email.includes("@") ||
			!email.includes(".") ||
			email.indexOf("@") + 1 >= email.indexOf(".") ||
			email.indexOf("@") === 0 ||
			email.length < 5 ||
			email.indexOf(".") === email.length - 1 ||
			email.includes(" ")
		) {
			if ((await checkRegistered(email)) === true) {
				setEmailErr("Email ID already registered!!");
			} else {
				console.log("Wrong Email ID!!");
				setEmailErr("Wrong Email ID!!");
			}
		}
		if (phone.length != 10) {
			console.log("Wrong Phone Number!!");
			setPhoneErr(true);
		}
		if (name.length < 2) {
			console.log("Wrong Name!!");
			setNameErr(true);
		}

    if (emailErr.length===0 && !phoneErr && !nameErr)  {
      if (await checkRegistered(email)===true) {
        setEmailErr("Email ID already registered!!");
      }
      else {
        props.updateForm({name, email, phone, branch});
        localStorage.setItem("email", email);
        props.setCurrentSlide(props.currentSlide+1);
      }
    }
  }

	return (
		<div className={detailsStyles.oneSection}>
			<div className={detailsStyles.sectionHeader}>
				<span>Step {props.currentSlide + 1}/3</span>
				<h1>Lets start with your Personal Details</h1>
				<p>Please fill in your Name, Email ID, Phone & Branch</p>
			</div>
			<div className={detailsStyles.sectionContent}>
				<div className={detailsStyles.oneField}>
					<label>Enter Your Email ID</label>
					<input type="email" value={email} onChange={handleEmailChange} />
					{emailErr}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter Your Name</label>
					<input type="text" value={name} onChange={handleNameChange} />
					{nameErr ? `Enter Correct Name` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter Your Phone Number</label>
					<input type="phone" value={phone} onChange={handlePhoneChange} />
					{phoneErr ? `Enter Correct Phone Number` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter Your Branch</label>
					<input type="text" value={branch} onChange={handleBranchChange} />
					{/* {branchErr ? `Enter Correct Branch` : ``} */}
				</div>
				<div>
					<button type="submit" onClick={handleNext}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PersonalDetails;
