import { useState, useEffect } from 'react';
import detailsStyles from '../../styles/Details.module.css';

type Props = {
  currentSlide: number;
  setCurrentSlide(c: number): void;
  updateForm(c: object): void;
  formState(c: boolean): void;
  page: number;
  setPage(c: number): void;
  year: string;
};

const fallbackValues = {
  cover: '',
  position1: 'NA',
  position2: 'NA',
};

const LegalDocuments = (props: Props) => {
  const { currentSlide, setCurrentSlide, updateForm, year } = props;

  let defaultValues = fallbackValues;

  const [cover, setCover] = useState(defaultValues.cover);
  const [position1, setPosition1] = useState(defaultValues.position1);
  const [position2, setPosition2] = useState(defaultValues.position2);

  useEffect(() => {
    defaultValues = JSON.parse(
      localStorage.getItem('LegalDocuments') || JSON.stringify(fallbackValues)
    );
    setTimeout(() => {
      setCover(defaultValues.cover || '');
      setPosition1(defaultValues.position1 || 'NA');
      setPosition2(defaultValues.position2 || 'NA');
    }, 150);
  }, []);

  const [coverError, setCoverError] = useState<boolean>(false);
  const [positionError1, setPositionError1] = useState<boolean>(false);
  const [positionError2, setPositionError2] = useState<boolean>(false);

  const validate = () => {
    let error = false;
    setCoverError(false);

    if (!cover.includes('drive.google.com/') || cover === "drive.google.com/") {
      setCoverError(true);
      error = true;
    }
    if (position1 === 'NA' || position2 === 'NA') {
      error = true;
      if (position1 === 'NA') setPositionError1(true);
      else setPositionError2(true);
    }
    return error;
  };

  const handleSubmit = () => {
    localStorage.setItem(
      'LegalDocuments',
      JSON.stringify({
        cover,
        position1,
        position2,
      })
    );

    let error = validate();

    if (!error) {
      updateForm({ cover, position1, position2 });
      setCurrentSlide(currentSlide + 1);
      props.formState(true);
    }
  };

  useEffect(() => {
    if (props.page == 2) {
      validate();
      props.setPage(-1);
    }
  }, [props.page]);

  return (
    <div>
      <div className={detailsStyles.oneSection}>
        <div className={detailsStyles.sectionHeader}>
          <span>Step {currentSlide + 1}/4</span>
          <h1 style={{ marginTop: '5px' }}>Lets Practice Legality</h1>
        </div>
        <div className={detailsStyles.sectionContent}>
          <div className={detailsStyles.oneField}>
            <label>Link to Cover Letter (PDF)</label>
            <input
              type="text"
              value={cover}
              placeholder="Google Drive Link"
              onChange={(e) => setCover(e.target.value)}
            />
            <p className="ErrorMsg">
              {!coverError ? '' : 'Enter Correct Cover Letter Link'}
            </p>
            <a href="https://docs.google.com/document/u/1/export?format=docx&id=1e-YPRefmTm1yudBOWABCcOmeJQXUWaFQ&token=AC4w5Vg2bT7B2-A2nikZEZBNVhCskrDTdw:1673004153091&ouid=115299860843869653843">
              <big>Download Cover Letter Format</big>
            </a>
          </div>
          <div className={detailsStyles.oneField}>
            <label>Position Preference 1</label>
            <select
              id="position1"
              name="position"
              value={position1}
              onChange={(e) => setPosition1(e.target.value)}
            >
              <option value="NA">Select Position</option>
              {year === 'TY' && position2 != 'CommitteeHead' && (
                <option value="CommitteeHead">Committee Head</option>
              )}
              {year === 'TY' && position2 != 'TechnicalHead' && (
                <option value="TechnicalHead">Technical Head</option>
              )}

              {year === 'TY' && position2 != 'CreativeHead' && (
                <option value="CreativeHead">Creative Head</option>
              )}
              {year === 'TY' && position2 != 'MarketingHead' && (
                <option value="MarketingHead">Marketing Head</option>
              )}
              {position2 != 'TechnicalTeam' && (
                <option value="TechnicalTeam">Technical Team</option>
              )}
              {position2 != 'CreativeTeam' && (
                <option value="CreativeTeam">Creative Team</option>
              )}
              {position2 != 'MarketingTeam' && (
                <option value="MarketingTeam">Marketing Team</option>
              )}
            </select>
            <p className="ErrorMsg">
              {positionError1 ? `Select Position Preference` : ``}
            </p>
          </div>
          <div className={detailsStyles.oneField}>
            <label>Position Preference 2</label>
            <select
              id="position2"
              name="position"
              value={position2}
              onChange={(e) => setPosition2(e.target.value)}
            >
              <option value="NA">Select Position</option>
              {year === 'TY' && position1 != 'CommitteeHead' && (
                <option value="CommitteeHead">Committee Head</option>
              )}
              {year === 'TY' && position1 != 'TechnicalHead' && (
                <option value="TechnicalHead">Technical Head</option>
              )}

              {year === 'TY' && position1 != 'CreativeHead' && (
                <option value="CreativeHead">Creative Head</option>
              )}
              {year === 'TY' && position1 != 'MarketingHead' && (
                <option value="MarketingHead">Marketing Head</option>
              )}
              {position1 != 'TechnicalTeam' && (
                <option value="TechnicalTeam">Technical Team</option>
              )}
              {position1 != 'CreativeTeam' && (
                <option value="CreativeTeam">Creative Team</option>
              )}
              {position1 != 'MarketingTeam' && (
                <option value="MarketingTeam">Marketing Team</option>
              )}
            </select>
            <p className="ErrorMsg">
              {positionError2 ? `Select Position Preference` : ``}
            </p>
          </div>
          <div className={detailsStyles.emptyField}></div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              Save and Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocuments;
