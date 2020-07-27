import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";

const Questions = ({ handleQuestions, businessInfo, handleChange }) => {
  // console.log("value", businessInfo);
  const mapQuestion = businessInfo.map((data, index) => {
    return (
      <div className="col-6" key={data.questionId}>
        <h4>{data.value}</h4>
        <div style={{ display: "flex" }}>
          <RadioGroup
            aria-label={`isAccept${data.questionId}`}
            name={`isAccept${data.questionId}`}
            onChange={(e) =>
              handleQuestions(
                data,
                e.target.value,
                `isAccept${data.questionId}`
              )
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
          <br />
        </div>
        <TextField
          style={{ marginTop: "0px", width: "82%", float: "right" }}
          name={`isAnswer${data.questionId}`}
          type="text"
          margin="normal"
          fullWidth
          onChange={(e) => handleChange(e)}
        />
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
