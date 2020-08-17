import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "react-notifications-component";

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
import { config } from "../../../../../../../url/url";

import "../Staff.styles.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

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
      countryCode: { value: "+1", label: "+1" },
      cellphone: "",
      email: "",
      pin: "",
      confirmPin: "",
      isActive: true,
      nameRole: { value: "admin", label: "Admin" },
      isDisabled: { value: "0", label: "Active" },
      // Work time
      timeStart2: { value: "09:30 AM", label: "09:30 AM" },
      timeEnd2: { value: "07:00 PM", label: "07:00 PM" },
      isCheck2: true,
      timeStart3: { value: "09:30 AM", label: "09:30 AM" },
      timeEnd3: { value: "07:00 PM", label: "07:00 PM" },
      isCheck3: true,
      timeStart4: { value: "09:30 AM", label: "09:30 AM" },
      timeEnd4: { value: "07:00 PM", label: "07:00 PM" },
      isCheck4: true,
      timeStart5: { value: "09:30 AM", label: "09:30 AM" },
      timeEnd5: { value: "07:00 PM", label: "07:00 PM" },
      isCheck5: true,
      timeStart6: { value: "09:30 AM", label: "09:30 AM" },
      timeEnd6: { value: "07:00 PM", label: "07:00 PM" },
      isCheck6: true,
      timeStart7: { value: "09:30 AM", label: "09:30 AM" },
      timeEnd7: { value: "07:00 PM", label: "07:00 PM" },
      isCheck7: true,
      timeStart8: { value: "09:30 AM", label: "09:30 AM" },
      timeEnd8: { value: "07:00 PM", label: "07:00 PM" },
      isCheck8: true,
      // Salary
      tipValue: 0,
      tipIsCheck: false,
      fixValue: 0,
      fixIsCheck: false,
      // salary
      salaryValue: 0,
      salaryIsCheck: false,
      //Commission
      commIsCheck: false,
      commValue: 0,
      // Product Commission
      prodCommValue: 0,
      prodCommIsCheck: false,
      // Salary pay in cash
      cashPercent: 0,
      // License
      driverlicense: "",
      socialSecurityNumber: "",
      professionalLicense: "",
      fileId: 0,

      showPin: false,
      showConfirmPin: false,
      progressLoading: false,
    };

    this.validator = new SimpleReactValidator();
  }

  getSteps = () => {
    return ["General Information", "Working time", "Salary", "License"];
  };

  getStepContent = (stepIndex) => {
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
        handlePhone={this.handlePhone}
        state={this.state}
        validator={this.validator}
        uploadFile={this.uploadFile}
        handleSelect={this.handleSelect}
        toggleVisibility={this.toggleVisibility}
        handleCheckBox={this.handleCheckBox}
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
        handleSelect={this.handleSelect}
      />
    );
  };

  getSalary = () => {
    return (
      <Salary
        handleCurrency={this.handleCurrency}
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
  uploadFile = (event) => {
    event.stopPropagation();
    event.preventDefault();

    this.setState({ progressLoading: true });
    const file = event.target.files[0];

    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFile, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
        let reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result,
            progressLoading: false,
          });
        };
        reader.readAsDataURL(file);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addStaff = () => {
    const merchantId = this.props.MerchantProfile.merchantId;
    const {
      lastName,
      firstName,
      displayName,
      street,
      city,
      zip,
      pin,
      confirmPin,
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
      cashPercent,
      fileId,
      isCheck2,
      isCheck3,
      isCheck4,
      isCheck5,
      isCheck6,
      isCheck7,
      isCheck8,
      email,
      isActive,
    } = this.state;

    const nameRole = this.state.nameRole.value;
    const isDisabled = Number(this.state.isDisabled.value);
    const state = this.state.state.value;
    const timeStart2 = this.state.timeStart2.value;
    const timeEnd2 = this.state.timeEnd2.value;
    const timeStart3 = this.state.timeStart3.value;
    const timeEnd3 = this.state.timeEnd3.value;
    const timeStart4 = this.state.timeStart4.value;
    const timeEnd4 = this.state.timeEnd4.value;
    const timeStart5 = this.state.timeStart5.value;
    const timeEnd5 = this.state.timeEnd5.value;
    const timeStart6 = this.state.timeStart6.value;
    const timeEnd6 = this.state.timeEnd6.value;
    const timeStart7 = this.state.timeStart7.value;
    const timeEnd7 = this.state.timeEnd7.value;
    const timeStart8 = this.state.timeStart8.value;
    const timeEnd8 = this.state.timeEnd8.value;
    const cellphone = this.state.cellphone;

    axios
      .post(
        URL + "/staff",
        {
          firstName,
          lastName,
          displayName,
          isActive,
          address: {
            street,
            city,
            state,
            zip,
          },
          merchantId,
          cellphone: cellphone.replace(/(\d{4})(\d{3})(\d{4})/, "+$1-$2-$3"),
          email,
          pin,
          confirmPin,
          cashPercent: Number(cashPercent),
          roles: {
            nameRole,
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
              isCheck: isCheck2,
            },
            Tuesday: {
              timeStart: timeStart3,
              timeEnd: timeEnd3,
              isCheck: isCheck3,
            },
            Wednesday: {
              timeStart: timeStart4,
              timeEnd: timeEnd4,
              isCheck: isCheck4,
            },
            Thursday: {
              timeStart: timeStart5,
              timeEnd: timeEnd5,
              isCheck: isCheck5,
            },
            Friday: {
              timeStart: timeStart6,
              timeEnd: timeEnd6,
              isCheck: isCheck6,
            },
            Saturday: {
              timeStart: timeStart7,
              timeEnd: timeEnd7,
              isCheck: isCheck7,
            },
            Sunday: {
              timeStart: timeStart8,
              timeEnd: timeEnd8,
              isCheck: isCheck8,
            },
          },
          tipFee: {
            percent: {
              value: tipValue,
              isCheck: tipIsCheck,
            },
            fixedAmount: {
              value: fixValue,
              isCheck: fixIsCheck,
            },
          },
          salary: {
            perHour: {
              isCheck: salaryIsCheck,
              value: salaryValue,
            },
            commission: {
              isCheck: commIsCheck,
              value: commValue,
            },
          },
          productSalaries: {
            commission: {
              value: prodCommValue,
              isCheck: prodCommIsCheck,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.userLogin.token}`,
          },
        }
      )
      .then((res) => {
        if (Number(res.data.codeNumber) === 204) {
          store.addNotification({
            title: "ERROR!",
            message: `${res.data.message}`,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          this.setState({ activeStep: 0 });
        }
        if (Number(res.data.codeNumber) === 200) {
          store.addNotification({
            title: "SUCCESS!",
            message: `${res.data.message}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          this.props.history.push("/app/merchants/profile/staff");
        }
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCurrency = (event, masked) => {
    const { name } = event.target;
    this.setState({ [name]: masked });
  };

  handlePhone = (e) => {
    this.setState({ cellphone: e });
  };

  toggleVisibility = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleCheckBox = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleSelect = (selectedOption, Inputname) => {
    const { name } = Inputname;
    this.setState({ [name]: selectedOption });
  };

  handleNext = () => {
    const { activeStep, pin, confirmPin } = this.state;
    if (pin !== confirmPin) {
      this.setState({ match: false });
    } else {
      if (this.validator.allValid()) {
        this.setState({
          activeStep: activeStep + 1,
        });
      }

      if (Number(activeStep) === 3) {
        this.addStaff();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    }
  };

  handleBack = () => {
    this.validator.purgeFields();
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className="container-fluid react-transition swipe-right add-staff">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#4251af" }}>New Staff</h1>
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
                  <Button className="btn btn-green" onClick={this.handleReset}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  {this.getStepContent(activeStep)}
                  <div
                    style={{
                      paddingTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className="btn btn-red"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className="btn btn-green"
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </span>
                    <span>
                      <Button
                        onClick={() =>
                          this.props.history.push(
                            "/app/merchants/profile/staff"
                          )
                        }
                        className="btn btn-red"
                      >
                        Cancel
                      </Button>
                    </span>
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
const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});
export default connect(mapStateToProps)(AddStaff);
