import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../../FormFields/InputField";

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

import "./Question.css";

export default function Question(props) {
  const {
    values: {
      businessInfo: { question1, question2, question3, question4, question5 },
    },
    setFieldValue,
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Business Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            {question1.question}
          </Typography>
          <RadioGroup
            value={question1.isAccept}
            row
            name={`businessInfo.question1.isAccept`}
            onChange={(e) => [
              console.log("e", e.target.value),
              setFieldValue("businessInfo.question1.isAccept", e.target.value),
            ]}
          >
            <FormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="No"
            />
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Yes (if yes, who was the processor)"
            />
          </RadioGroup>

          <InputField
            style={{ marginTop: "0px", width: "90%", float: "right" }}
            name={`businessInfo.question1.desc`}
            type="text"
            margin="normal"
            fullWidth
            placeholder="Processor"
            onChange={(e) =>
              setFieldValue("businessInfo.question1.desc", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            {question2.question}
          </Typography>
          <RadioGroup
            value={question2.isAccept}
            row
            name={`businessInfo.question2.isAccept`}
            onChange={(e) =>
              setFieldValue("businessInfo.question2.isAccept", e.target.value)
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
              label="Yes (if yes, who was the processor)"
            />
          </RadioGroup>

          <InputField
            style={{ marginTop: "0px", width: "90%", float: "right" }}
            name={`businessInfo.question2.desc`}
            type="text"
            margin="normal"
            fullWidth
            placeholder="Processor"
            onChange={(e) =>
              setFieldValue("businessInfo.question2.desc", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            {question3.question}
          </Typography>
          <RadioGroup
            value={question3.isAccept}
            row
            name={`businessInfo.question3.isAccept`}
            onChange={(e) =>
              setFieldValue("businessInfo.question3.isAccept", e.target.value)
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            {question4.question}
          </Typography>
          <RadioGroup
            value={question4.isAccept}
            row
            name={`businessInfo.question4.isAccept`}
            onChange={(e) =>
              setFieldValue("businessInfo.question4.isAccept", e.target.value)
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
              label="Yes (if yes, what was program and when)"
            />
          </RadioGroup>

          <InputField
            style={{ marginTop: "0px", width: "90%", float: "right" }}
            name={`businessInfo.question4.desc`}
            type="text"
            margin="normal"
            fullWidth
            placeholder="Program and when"
            onChange={(e) =>
              setFieldValue("businessInfo.question4.desc", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            {question5.question}
          </Typography>
          <RadioGroup
            value={question5.isAccept}
            row
            name={`businessInfo.question5.isAccept`}
            onChange={(e) =>
              setFieldValue("businessInfo.question5.isAccept", e.target.value)
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
              label="Yes (if yes, date filed)"
            />
          </RadioGroup>

          <InputField
            style={{ marginTop: "0px", width: "90%", float: "right" }}
            name={`businessInfo.question5.desc`}
            type="text"
            margin="normal"
            fullWidth
            onChange={(e) =>
              setFieldValue("businessInfo.question5.desc", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
