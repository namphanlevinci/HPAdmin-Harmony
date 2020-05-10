import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

const Questions = ({ handleQuestions, businessInfo }) => {
  // console.log("value", businessInfo);
  const mapQuestion = businessInfo.map((e, index) => {
    return (
      <div className="col-6" key={e.questionId}>
        <h4>{e.value}</h4>
        <div style={{ display: "flex" }}>
          <RadioGroup
            aria-label={`isAccept${e.questionId}`}
            name={`isAccept${e.questionId}`}
            // value={`isAccept${e.questionId}`}
            onChange={
              ((e) => console.log("TARGET", e.target.checked),
              handleQuestions([e, `isAccept${e.questionId}`]))
            }
          >
            <FormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="No"
            />
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Yes"
            />
          </RadioGroup>
        </div>
      </div>
    );
  });
  return (
    <div className="general-container Questions">
      <h1>Business Information</h1>
      <div className="row">{mapQuestion}</div>
    </div>
  );
};

export default Questions;
