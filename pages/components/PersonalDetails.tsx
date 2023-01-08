import { useEffect, useState } from "react";
import detailsStyles from "../../styles/Details.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/connectFirestore";

type Props = {
	currentSlide: number;
	setCurrentSlide(c: number): void;
	updateForm(c: object): void;
	formState(c: boolean): void;
	page: number;
	setPage(c: number): void;
	updateEmail(c: string): void;
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

	const validate = () => {
		let error = false;
		setEmailErr("");
		setPhoneErr(false);
		setNameErr(false);

		if (
			!email.includes("@somaiya.edu") ||
			email.indexOf("@") === 0 ||
			email.includes(" ")
		) {
			error = true;
			console.log("Wrong Email ID!!");
			setEmailErr("Enter Correct Email ID!!");
		}
		if (phone.length != 10 || isNaN(parseInt(phone))) {
			error = true;
			console.log("Wrong Phone Number!!");
			setPhoneErr(true);
		}
		if (name.trim().split(" ").length < 2 || name.length < 4) {
			error = true;
			console.log("Wrong Name!!");
			setNameErr(true);
		}
		if (branch === "NA") {
			error = true;
			console.log("Select Appropriate Branch");
			setBranchErr(true);
		}
		return error;
	};

	const handleNext = async () => {
		localStorage.setItem(
			"PersonalDetails",
			JSON.stringify({
				name,
				email,
				phone,
				branch,
			})
		);
		props.updateEmail(email);
		let error = validate();

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

	useEffect(() => {
		if (props.page == 0) {
			validate();
			props.setPage(-1)
		}
	}, [props.page]);

	return (
		<div className={detailsStyles.oneSection}>
			<div className={detailsStyles.sectionHeader}>
				<span>Step {props.currentSlide + 1}/4</span>
				<h1 style={{marginTop: "5px"}}>Envice yourself</h1>
				<p>Reveal your Identity!!</p>
			</div>
			<div className={detailsStyles.sectionContent}>
				<div className={detailsStyles.oneField}>
					<label>Enter your Email ID (somaiya.edu)</label>
					<input 
						type="email" 
						value={email} 
						onChange={handleEmailChange}
						placeholder="abc@somaiya.edu" 
					/>
					{emailErr}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter your Full Name</label>
					<input
						type="text"
						value={name}
						onChange={handleNameChange}
						placeholder="First-Name Last-Name"
					/>
					{nameErr ? `Enter Correct Full Name` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter your Phone Number (10 Digits Only)</label>
					<input
						type="number"
						value={phone}
						onChange={handlePhoneChange}
						placeholder="93XXXXXX06"
					/>
					{phoneErr ? `Enter Correct Phone Number` : ``}
				</div>
				<div className={detailsStyles.oneField}>
					<label>Enter your Branch</label>
					<select
						id="branch"
						name="branch"
						value={branch}
						onChange={handleBranchChange}
					>
						<option value="NA">Select Branch</option>
						<option value="ComputerEngg">Computer Engineering</option>
						<option value="IT">Information Technology</option>
						<option value="EXCP">Electronics & Computer Engineering</option>
						<option value="EXTC">Electronics & Telecommunication Engineering</option>
						<option value="ETRX">Electronics Engineering</option>
						<option value="MECH">Mechanical Engineering</option>
					</select>
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
