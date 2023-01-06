import { useEffect, useRef, useState } from "react";
import detailsStyles from "../../styles/Details.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
	formState(c: boolean): void;
};

const fallbackValues = {
	name: "",
	email: "",
	phone: "",
	branch: "NA",
};

let flag = 1;

const PersonalDetails = (props: Props) => {
	let defaultValues = fallbackValues;
	const [name, setName] = useState(defaultValues.name);
	const [email, setEmail] = useState(defaultValues.email);
	const [phone, setPhone] = useState(defaultValues.phone);
	const [branch, setBranch] = useState(defaultValues.branch);

	useEffect(() => {
		defaultValues = JSON.parse(
			localStorage.getItem("PersonalDetails") || JSON.stringify(fallbackValues)
		);
		setName(defaultValues.name || "");
		setEmail(defaultValues.email || "");
		setPhone(defaultValues.phone || "");
		setBranch(defaultValues.branch || "");
		flag = 0;
	}, []);


	const [nameErr, setNameErr] = useState<boolean>(false);
	const [emailErr, setEmailErr] = useState("");
	const [phoneErr, setPhoneErr] = useState<boolean>(false);
	const [branchErr, setBranchErr] = useState<boolean>(false);

	const checkRegistered = async (emailID: string) => {
		const docRef = doc(db, "FY_2022-23", emailID);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Email ID already registered!!");
			return true;
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
		let error = false;
		setEmailErr("");
		setPhoneErr(false);
		setNameErr(false);
		localStorage.setItem(
			"PersonalDetails",
			JSON.stringify({
				name,
				email,
				phone,
				branch,
			})
		);

		if (
			!email.includes("@") ||
			!email.includes(".") ||
			email.indexOf("@") + 1 >= email.indexOf(".") ||
			email.indexOf("@") === 0 ||
			email.length < 5 ||
			email.indexOf(".") === email.length - 1 ||
			email.includes(" ")
		) {
			error = true;
			console.log("Wrong Email ID!!");
			setEmailErr("Wrong Email ID!!");
		}
		if (phone.length != 10) {
			error = true;
			console.log("Wrong Phone Number!!");
			setPhoneErr(true);
		}
		if (name.trim().split(" ").length < 2 || name.length < 4) {
			error = true;
			console.log("Wrong Name!!");
			setNameErr(true);
		}
		if (branch==="NA") {
			error = true;
			console.log("Select Appropriate Branch");
			setBranchErr(true);
		}

		if (!error) {
			if ((await checkRegistered(email)) === true) {
				setEmailErr("Email ID already registered!!");
			} else {
				props.updateForm({ name, email, phone, branch });
				localStorage.setItem("email", email);
				props.setCurrentSlide(props.currentSlide + 1);
			}
			props.formState(true);
		}
	};

	return (
		<div className={detailsStyles.oneSection}>
			<div className={detailsStyles.sectionHeader}>
				<span>Step {props.currentSlide + 1}/4</span>
				<h1>Lets start with your Personal Details</h1>
				<p>Reveal your Identity!!</p>
			</div>
			<div className={detailsStyles.sectionContent}>
				<div className={detailsStyles.oneField}>
					<label>Enter your Email ID</label>
					<input 
						type="email" 
						value={email} 
						onChange={handleEmailChange}
						placeholder="abc@gmail.com" 
					/>
					{emailErr}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter your Name</label>
					<input 
						type="text" 
						value={name} 
						onChange={handleNameChange}
						placeholder="FName LName"
					/>
					{nameErr ? `Enter Correct Name` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter your Phone Number (10 Digits Only)</label>
					<input 
						type="text" 
						value={phone} 
						onChange={handlePhoneChange} 
						placeholder="93XXXXXX06"
					/>
					{phoneErr ? `Enter Correct Phone Number` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter your Branch</label>
					<select id="branch" name="branch" value={branch} onChange={handleBranchChange}>
						<option value="NA">Select Branch</option>
						<option value="Computers">COMPUTERS</option>
						<option value="IT">IT</option>
						<option value="ETRX">ETRX</option>
						<option value="EXTC">EXTC</option>
						<option value="EXCP">EXCP</option>
						<option value="MECH">MECHANICAL</option>
					</select>
					{/* <input type="text" value={branch} onChange={handleBranchChange} /> */}
					{branchErr ? `Select Correct Branch` : ``}
				</div>
				<div>
					<button type="submit" onClick={handleNext}>
						Save and Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PersonalDetails;
