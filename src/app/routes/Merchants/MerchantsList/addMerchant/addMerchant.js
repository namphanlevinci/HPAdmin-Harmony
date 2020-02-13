import React from "react";
import axios from "axios";
import URL, { upfileUrl } from "../../../../../url/url";
import SimpleReactValidator from "simple-react-validator";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import General from "./General";
import Questions from "./Questions";
import Bank from "./Bank";
import Principal from "./Principal";

import "../merchantsList.css";
import "./add-merchant.styles.scss";
class AddMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // preview Bank image
      imagePreviewUrl: "",
      initialBusinessQuestions: {},

      activeStep: 0,
      // General Info
      businessName: "",
      doingBusiness: "",
      tax: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      businessPhoneCode: "+1",
      businessPhone: "",
      email: "",
      firstName: "",
      lastName: "",
      position: 1,
      contactPhoneCode: "+1",
      contactPhone: "",

      isAccept1: "",
      desc1: "",
      question1: "",

      // Bank Info
      bankName: "",
      routingNumber: "",
      accountNumber: "",
      fileId: ""
    };
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required" // will override all messages
      }
    });
  }

  getSteps = () => {
    return [
      "General Information",
      "Business Information",
      "Bank Information",
      "Principal Information"
    ];
  };

  componentDidMount() {
    axios.get(URL + "/question").then(res => {
      console.log("RES", res.data.data);
      const data = res.data.data;

      this.setState(
        {
          initialBusinessQuestions: data
        },
        () => console.log("THIS STATE", this.state)
      );
    });
  }

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <General
            handleChange={this.handleChange}
            value={this.state}
            validator={this.validator}
          />
        );
      case 1:
        return (
          <Questions
            handleQuestions={this.handleQuestions}
            businessInfo={this.state.initialBusinessQuestions}
            validator={this.validator}
          />
        );
      case 2:
        return (
          <Bank
            uploadFile={this.uploadFile}
            handleChange={this.handleChange}
            value={this.state}
          />
        );
      case 3:
        return (
          <Principal handlePrincipal={this.handlePrincipal} Info={this.state} />
        );

      default:
        return "Uknown stepIndex";
    }
  };

  //handle upload avatar
  uploadFile = event => {
    event.stopPropagation();
    event.preventDefault();

    let reader = new FileReader();

    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    axios
      .post(upfileUrl, formData, config)
      .then(res => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleNext = () => {
    const { activeStep, pin, confirmPin } = this.state;
    // if (pin !== confirmPin) {
    //   this.setState({ match: false });
    // } else {
    //   if (this.validator.allValid()) {
    //     this.setState({
    //       activeStep: activeStep + 1
    //     });
    //   }
    // this.setState(
    //   {
    //     activeStep: activeStep + 1
    //   },
    //   () => console.log("THIS STATE STEP", this.state.activeStep)
    // );
    // if (Number(activeStep) === 3) {
    //   // this.addStaf();
    //   console.log("THIS.STATE =======", this.state);
    // }
    // }
    // else {
    //   this.validator.showMessages();
    //   this.forceUpdate();
    // }

    this.setState({
      activeStep: activeStep + 1
    });
    // }
  };

  // handlePrincipal = value => {
  //   console.log(value);
  //   this.setState(
  //     {
  //       principal: value
  //     },
  //     () => console.log("THIS STATE SUPER", this.state)
  //   );
  // };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };
  handleChange = e => {
    console.log(" HANDLE CHANGE", e);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleQuestions = name => event => {
    // console.log("NAME", name);
    // console.log("NAME", name[0].value);
    // console.log("TARGET CHECKED", event.target.value);
    if (Number(name[1].charAt(8)) === Number(name[0].questionId)) {
      this.setState({
        [name[1]]: event.target.value,
        ["question" + name[0].questionId]: name[0].value
      });
    }
  };
  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
      <div className="react-transition swipe-right add-merchant-container ">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.addmerchant" />}
        />
        <div className="MerList page-heading" style={{ padding: "30px" }}>
          <div className="w-100">
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className="horizontal-stepper-linear"
            >
              {steps.map((label, index) => {
                return (
                  <Step
                    key={label}
                    className={`horizontal-stepper ${
                      index === activeStep ? "active" : ""
                    }`}
                  >
                    <StepLabel className="stepperlabel">{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {this.state.activeStep === steps.length ? (
                <div>
                  <Typography className="my-2">
                    {alert("Coming Soon™")}
                    <h1>Coming Soon™</h1>
                  </Typography>
                  <Button onClick={this.handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  {this.getStepContent(activeStep)}
                  <div style={{ marginTop: "15px" }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="mr-2"
                      style={{ color: "black" }}
                    >
                      Back
                    </Button>
                    {this.state.activeStep === 3 ? null : (
                      <Button
                        variant="contained"
                        // type="submit"
                        onClick={this.handleNext}
                        style={{ backgroundColor: "#0764b0", color: "white" }}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMerchant;
