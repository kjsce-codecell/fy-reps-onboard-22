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
  const [branch, setBranch] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handleBranchChange = (e: any) => {
    setBranch(e.target.value);
  };

  const handleNext = () => {
    props.updateForm({name, email, branch});
    props.setCurrentSlide(props.currentSlide+1);
  }

  return (
    <div className={detailsStyles.oneSection}>
      <div className={detailsStyles.sectionHeader}>
        <span>Step {props.currentSlide+1}/5</span>
        <h1>Lets start with your Personal Details</h1>
        <p>Please fill in your Name, Branch & Email ID</p>
      </div>
      <div className={detailsStyles.sectionContent}>
        <div className={detailsStyles.oneField}>
          <label>Enter Your Email ID</label>
          <input type="text" onChange={handleNameChange}/>
        </div>
        <div className={detailsStyles.oneField}>
          <label>Enter Your Name</label>
          <input type="text" onChange={handleEmailChange}/>
        </div>
        <div className={detailsStyles.oneField}>
          <label>Enter Your Branch</label>
          <input type="text" onChange={handleBranchChange}/>
        </div>
        <div>
          <button type="button" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails