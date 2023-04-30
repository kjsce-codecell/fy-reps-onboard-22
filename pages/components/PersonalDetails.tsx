import { useEffect, useState } from 'react';
import detailsStyles from '../../styles/Details.module.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/connectFirestore';

type Props = {
  currentSlide: number;
  setCurrentSlide(c: number): void;
  updateForm(c: object): void;
  formState(c: boolean): void;
  page: number;
  setPage(c: number): void;
  updateEmail(c: string): void;
  setMainYear(c: string): void;
};

const fallbackValues = {
  name: '',
  email: '',
  phone: '',
  branch: 'NA',
  year: 'NA',
};

let flag = 1;

const PersonalDetails = (props: Props) => {
  let defaultValues = fallbackValues;
  const [name, setName] = useState(defaultValues.name);
  const [email, setEmail] = useState(defaultValues.email);
  const [phone, setPhone] = useState(defaultValues.phone);
  const [branch, setBranch] = useState(defaultValues.branch);
  const [year, setYear] = useState(defaultValues.year);

  useEffect(() => {
    defaultValues = JSON.parse(
      localStorage.getItem('PersonalDetails') || JSON.stringify(fallbackValues)
    );
    setName(defaultValues.name || '');
    setEmail(defaultValues.email || '');
    setPhone(defaultValues.phone || '');
    setBranch(defaultValues.branch || '');
	setYear(defaultValues.year || '');
    flag = 0;
  }, []);

  const [nameErr, setNameErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState('');
  const [phoneErr, setPhoneErr] = useState<boolean>(false);
  const [branchErr, setBranchErr] = useState<boolean>(false);
  const [yearErr, setYearErr] = useState<boolean>(false);

  const checkRegistered = async (emailID: string) => {
    return false;
    const docRef = doc(db, 'SY_TY_2023-24', emailID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Email ID already registered!!');
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
  const handleYearChange = (e: any) => {
    setYear(e.target.value);
    props.setMainYear(e.target.value);
  };

  const validate = () => {
    let error = false;
    setEmailErr('');
    setPhoneErr(false);
    setNameErr(false);

    if (
      !email.includes('@somaiya.edu') ||
      email.indexOf('@') === 0 ||
      email.includes(' ')
    ) {
      error = true;
      setEmailErr('Enter Correct Email ID');
    }
    if (phone.length != 10 || isNaN(parseInt(phone))) {
      error = true;
      setPhoneErr(true);
    }
    if (name.trim().split(' ').length < 2 || name.length < 4) {
      error = true;
      setNameErr(true);
    }
    if (branch === 'NA') {
      error = true;
      setBranchErr(true);
    }
    if (year === 'NA') {
      error = true;
      setYearErr(true);
    }
    return error;
  };

  const handleNext = async () => {
    localStorage.setItem(
      'PersonalDetails',
      JSON.stringify({
        name,
        email,
        phone,
        branch,
        year,
      })
    );
    props.updateEmail(email);
    let error = validate();

    if (!error) {
      if ((await checkRegistered(email)) === true) {
        setEmailErr('Email ID already registered');
      } else {
        props.updateForm({ name, email, phone, branch, year });
        localStorage.setItem('email', email);
        props.setCurrentSlide(props.currentSlide + 1);
      }
      props.formState(true);
    }
  };

  useEffect(() => {
    if (props.page == 0) {
      validate();
      props.setPage(-1);
    }
  }, [props.page]);

  return (
    <div className={detailsStyles.oneSection}>
      <div className={detailsStyles.sectionHeader}>
        <span>Step {props.currentSlide + 1}/4</span>
        <h1 style={{ marginTop: '5px' }}>Envice yourself</h1>
        <p>Reveal your Identity</p>
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
          <p className="ErrorMsg">{emailErr}</p>
        </div>
        <div className={detailsStyles.oneField}>
          <label>Enter your Full Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="First-Name Last-Name"
          />
          <p className="ErrorMsg">{nameErr ? `Enter Correct Full Name` : ``}</p>
        </div>
        <div className={detailsStyles.oneField}>
          <label>Enter your Phone Number (10 Digits)</label>
          <input
            type="number"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="93XXXXXX06"
          />
          <p className="ErrorMsg">
            {phoneErr ? `Enter Correct Phone Number` : ``}
          </p>
        </div>
        <div className={detailsStyles.oneField}>
          <label>Enter your Year</label>
          <select
            id="year"
            name="year"
            value={year}
            onChange={handleYearChange}
          >
            <option value="NA">Select Year</option>
            <option value="SY">SY</option>
            <option value="TY">TY</option>
          </select>
          <p className="ErrorMsg">{yearErr ? `Select Correct Year` : ``}</p>
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
            <option value="EXCP">Electronics Engineering</option>
            <option value="EXTC">
              Electronics & Telecommunication Engineering
            </option>
            <option value="MECH">Mechanical Engineering</option>
          </select>
          <p className="ErrorMsg">{branchErr ? `Select Correct Branch` : ``}</p>
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
