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
      // Besiness Question
      businessInfo: [],
      // Bank Info
      bankName: "",
      routingNumber: "",
      accountNumber: "",
      fileId: "",
      // Pincipal Info
      principalInfo: [
        {
          firstName: "",
          lastName: "",
          position: "",
          ownership: "",
          homePhone: "",
          mobilePhone: "",
          addressPrincipal: {
            address: "",
            city: "",
            state: "",
            zip: ""
          },
          yearAtThisAddress: "",
          ssn: "",
          dateOfBirth: "",
          email: "",
          driverLicense: "",
          stateIssued: "",
          fileId: "",
          imagePreviewUrl: ""
        }
      ]
    };
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required!" // will override all messages
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
      this.setState({ businessInfo: data });
      // data.map(e => {
      //   const question = "question" + e.questionId;
      //   const isAccept = "isAccept" + e.questionId;
      //   const desc = "des" + e.questionId;
      //   return this.setState({
      //     businessInfo: [
      //       ...this.state.businessInfo,
      //       {
      //         isAccept: false,
      //         desc: "",
      //         question: e.value
      //       }
      //     ]
      //   });
      // });
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
      // case 1:
      //   return (
      //     <Questions
      //       handleChange={this.handleChange}
      //       businessInfo={this.state.businessInfo}
      //       validator={this.validator}
      //     />
      //   );
      case 2:
        return (
          <Bank
            uploadFile={this.uploadFile}
            handleChange={this.handleChange}
            value={this.state}
          />
        );
      case 3:
        return <Principal />;

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
    // const { activeStep, pin, confirmPin } = this.state;
    // if (pin !== confirmPin) {
    //   this.setState({ match: false });
    // } else {
    //   if (this.validator.allValid()) {
    //     this.setState({
    //       activeStep: activeStep + 1
    //     });
    //   }
    //   if (Number(activeStep) === 3) {
    //     this.addStaf();
    //   } else {
    //     this.validator.showMessages();
    //     this.forceUpdate();
    //   }
    // }

    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

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
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
      <div className="react-transition swipe-right add-merchant-container">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.addmerchant" />}
        />
        <div className="MerList" style={{ padding: "30px" }}>
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
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="mr-2"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      // type="submit"
                      onClick={this.handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
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
