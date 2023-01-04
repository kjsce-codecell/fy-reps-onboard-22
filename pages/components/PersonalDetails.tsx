import { useState } from "react";
import detailsStyles from "../../styles/Details.module.css";

type Props = {
  currentSlide: number,
	setCurrentSlide(c: number): void;
	updateForm(c: object): void
}

const PersonalDetails = (props: Props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");

  const [nameErr, setNameErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [phoneErr, setPhoneErr] = useState<boolean>(false);
  const [branchErr, setBranchErr] = useState<boolean>(false);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };
  const handleBranchChange = (e: any) => {
    setBranch(e.target.value);
  };

  const handleNext = () => {
    setEmailErr(false);
    setPhoneErr(false);
    setNameErr(false);

    if (!email.includes("@") || !email.includes(".") || (email.indexOf("@")+1)>=email.indexOf(".") || email.indexOf("@") === 0 || email.length < 5 || email.indexOf(".") === (email.length-1)) {
      console.log("Wrong Email ID!!");
      setEmailErr(true);
    }
    else if (phone.length!=10) {
      console.log("Wrong Phone Number!!");
      setPhoneErr(true);
    }
    else if (name.length < 2) {
      console.log("Wrong Name!!");
      setNameErr(true);
    }
    else {
      props.updateForm({name, email, phone, branch});
      props.setCurrentSlide(props.currentSlide+1);
    }
  }

  return (
    <div className={detailsStyles.oneSection}>
      <div className={detailsStyles.sectionHeader}>
        <span>Step {props.currentSlide+1}/3</span>
        <h1>Lets start with your Personal Details</h1>
        <p>Please fill in your Name, Email ID, Phone & Branch</p>
      </div>
      <div className={detailsStyles.sectionContent}>
        <div className={detailsStyles.oneField}>
          <label>Enter Your Email ID</label>
          <input type="email" onChange={handleEmailChange}/>
          {emailErr ? `Enter Correct Email ID` : ``}
        </div>
        <div className={detailsStyles.oneField}>
          <label>Enter Your Name</label>
          <input type="text" onChange={handleNameChange}/>
          {nameErr ? `Enter Correct Name` : ``}
        </div>
        <div className={detailsStyles.oneField}>
          <label>Enter Your Phone Number</label>
          <input type="phone" onChange={handlePhoneChange}/>
          {phoneErr ? `Enter Correct Phone Number` : ``}
        </div>
        <div className={detailsStyles.oneField}>
          <label>Enter Your Branch</label>
          <input type="text" onChange={handleBranchChange}/>
          {/* {branchErr ? `Enter Correct Branch` : ``} */}
        </div>
        <div>
          <button type="submit" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails