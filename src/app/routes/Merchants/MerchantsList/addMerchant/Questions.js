import React, { Component } from "react";
import axios from "axios";
import URL from "../../../../../url/url";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      check1: true,
      check2: true,
      check3: true,
      check4: true,
      check5: true
    };
  }
  componentDidMount() {
    axios.get(URL + "/question").then(res => {
      this.setState({ questions: res.data.data });
    });
  }

  handleChange = event => {
    console.log("EVENT TARGET", event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  render() {
    const { questions } = this.state;
    console.log("QUESTIONS", questions);
    const mapQuestions = questions.reverse().map(e => (
      <div className="col-md-9 mx-auto" key={e.questionId}>
        <FormControl component="fieldset">
          <label>
            {`${e.questionId}`}. {`${e.value}`}
          </label>
          <RadioGroup
            aria-label="position"
            name="position"
            value=""
            onChange={this.handleChange}
            row
          >
            <div>
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="No"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Yes"
                labelPlacement="bottom"
              />
            </div>
          </RadioGroup>
        </FormControl>
        <TextField
          name="lastName"
          label="Answer"
          type="text"
          margin="normal"
          fullWidth
          onChange={this.handleChange}
          error={this.state.error}
          helperText={this.state.helperText}
        />
      </div>
    ));
    return <div className="row">{mapQuestions}</div>;
  }
}

export default Questions;
