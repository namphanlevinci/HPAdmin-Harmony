import React, { Component } from "react";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SimpleReactValidator from "simple-react-validator";
import General from "./general";
import WorkTime from "./work-time";
import Salary from "./salary";
import License from "./license";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import URL, { upfileUrl } from "../../../../../../url/url";

import "./Staff.styles.scss";
class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      match: true,
      imagePreviewUrl: null,
      // General
      lastName: "",
      firstName: "",
      displayName: "",
      street: "",
      city: "",
      zip: "",
      state: "",
      cellphone: "",
      email: "",
      pin: "",
      confirmPin: "",
      nameRole: "admin",
      isDisabled: 0,
      // Work time
      timeStart2: "10:00 AM",
      timeEnd2: "08:00 PM",
      isCheck2: true,
      timeStart3: "10:00 AM",
      timeEnd3: "08:00 PM",
      isCheck3: true,
      timeStart4: "10:00 AM",
      timeEnd4: "08:00 PM",
      isCheck4: true,
      timeStart5: "10:00 AM",
      timeEnd5: "08:00 PM",
      isCheck5: true,
      timeStart6: "10:00 AM",
      timeEnd6: "08:00 PM",
      isCheck6: true,
      timeStart7: "10:00 AM",
      timeEnd7: "08:00 PM",
      isCheck7: true,
      timeStart8: "10:00 AM",
      timeEnd8: "08:00 PM",
      isCheck8: true,
      // Salary
      tipValue: "",
      tipIsCheck: false,
      fixValue: "",
      fixIsCheck: false,
      // salary
      salaryValue: "",
      salaryIsCheck: false,
      //Commission
      commIsCheck: false,
      commValue: "",
      // Product Commission
      prodCommValue: "",
      prodCommIsCheck: false,
      // License
      driverlicense: "",
      socialSecurityNumber: "",
      professionalLicense: "",
      fileId: 0
    };

    this.validator = new SimpleReactValidator();
  }

  getSteps = () => {
    return ["General Information", "Working time", "Salary", "License"];
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return this.getGeneralInformation();
      case 1:
        return this.getWorkTime();
      case 2:
        return this.getSalary();
      case 3:
        return this.getLicense();

      default:
        return "Uknown stepIndex";
    }
  };

  getGeneralInformation = () => {
    return (
      <General
        handleChange={this.handleChange}
        state={this.state}
        validator={this.validator}
        uploadFile={this.uploadFile}
      />
    );
  };

  getWorkTime = () => {
    return (
      <WorkTime
        handleChange={this.handleChange}
        state={this.state}
        validator={this.validator}
        handleCheckBox={this.handleCheckBox}
      />
    );
  };

  getSalary = () => {
    return (
      <Salary
        handleChange={this.handleChange}
        handleCheckBox={this.handleCheckBox}
        state={this.state}
        validator={this.validator}
      />
    );
  };

  getLicense = () => {
    return (
      <License
        state={this.state}
        validator={this.validator}
        handleChange={this.handleChange}
      />
    );
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

  addStaf = () => {
    const merchantId = this.props.MerchantProfile.merchantId;
    const {
      lastName,
      firstName,
      displayName,
      street,
      city,
      zip,
      state,
      cellphone,
      email,
      pin,
      confirmPin,
      nameRole,
      isDisabled,
      timeStart2,
      timeEnd2,
      isCheck2,
      timeStart3,
      timeEnd3,
      isCheck3,
      timeStart4,
      timeEnd4,
      isCheck4,
      timeStart5,
      timeEnd5,
      isCheck5,
      timeStart6,
      timeEnd6,
      isCheck6,
      timeStart7,
      timeEnd7,
      isCheck7,
      timeStart8,
      timeEnd8,
      isCheck8,
      tipValue,
      tipIsCheck,
      fixValue,
      fixIsCheck,
      salaryValue,
      salaryIsCheck,
      commIsCheck,
      commValue,
      prodCommValue,
      prodCommIsCheck,
      driverlicense,
      socialSecurityNumber,
      professionalLicense,
      fileId
    } = this.state;

    axios
      .post(
        URL + "/staff",
        {
          firstName,
          lastName,
          displayName,
          address: {
            street,
            city,
            state,
            zip
          },
          merchantId,
          cellphone,
          email,
          pin,
          confirmPin,
          roles: {
            nameRole
          },
          driverlicense,
          socialSecurityNumber,
          professionalLicense,
          isDisabled,
          fileId,
          workingTime: {
            Monday: {
              timeStart: timeStart2,
              timeEnd: timeEnd2,
              isCheck: isCheck2
            },
            Tuesday: {
              timeStart: timeStart3,
              timeEnd: timeEnd3,
              isCheck: isCheck3
            },
            Wednesday: {
              timeStart: timeStart4,
              timeEnd: timeEnd4,
              isCheck: isCheck4
            },
            Thursday: {
              timeStart: timeStart5,
              timeEnd: timeEnd5,
              isCheck: isCheck5
            },
            Friday: {
              timeStart: timeStart6,
              timeEnd: timeEnd6,
              isCheck: isCheck6
            },
            Saturday: {
              timeStart: timeStart7,
              timeEnd: timeEnd7,
              isCheck: isCheck7
            },
            Sunday: {
              timeStart: timeStart8,
              timeEnd: timeEnd8,
              isCheck: isCheck8
            }
          },
          tipFee: {
            percent: {
              value: tipValue,
              isCheck: tipIsCheck
            },
            fixedAmount: {
              value: fixValue,
              isCheck: fixIsCheck
            }
          },
          salary: {
            perHour: {
              isCheck: salaryIsCheck,
              value: salaryValue
            },
            commission: {
              isCheck: commIsCheck,
              value: commValue
            }
          },
          productSalaries: {
            commission: {
              value: prodCommValue,
              isCheck: prodCommIsCheck
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
          }
        }
      )
      .then(res => {
        if (res.data.data.message === "Success") {
          NotificationManager.sucess(res.data.data.message, null, 800);
          this.props.history.push("/app/merchants/profile/staff");
        }
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckBox = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleNext = () => {
    const { activeStep, pin, confirmPin } = this.state;
    if (pin !== confirmPin) {
      this.setState({ match: false });
    } else {
      if (this.validator.allValid()) {
        this.setState({
          activeStep: activeStep + 1
        });
      }
      if (Number(activeStep) === 3) {
        this.addStaf();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    }
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

  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className="container-fluid react-transition swipe-right add-staff">
        <NotificationContainer />
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#0764b0" }}>New Staff</h1>
        </div>
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
                    <h1>Complete™</h1>
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
const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});
export default connect(mapStateToProps)(AddStaff);
