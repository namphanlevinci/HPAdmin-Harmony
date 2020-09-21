import React, { Component } from "react";
import { connect } from "react-redux";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../../../../../../../actions/notifications/actions";
import { Formik, Form } from "formik";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import SimpleReactValidator from "simple-react-validator";
import General from "./Form/General";
import WorkTime from "./Form/WorkTime";
import Salary from "./Form/Salary";
import License from "./Form/License";
import axios from "axios";
import { config } from "../../../../../../../url/url";

import validationSchema from "./FormModel/validationSchema";
import formInitialValues from "./FormModel/formInitialValues";

import "../Staff.styles.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 2,
      match: true,
      imagePreviewUrl: "",
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
      isActive: true,
      nameRole: "admin",
      isDisabled: 0,
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

    this.validator = new SimpleReactValidator({
      messages: {
        email: "That is not an email.",
        // OR
        default: "Required!", // will override all messages
      },
    });
  }

  getSteps = () => {
    return ["General Information", "Working time", "Salary", "License"];
  };

  handleShowPin = () => {
    this.setState({ showPin: !this.state.showPin });
  };
  handleConfirmPin = () => {
    this.setState({ showConfirmPin: !this.state.showConfirmPin });
  };

  getStepContent = (stepIndex, values, handleChange, setFieldValue) => {
    switch (stepIndex) {
      case 0:
        return (
          <General
            uploadFile={this.uploadFile}
            imagePreviewUrl={this.state.imagePreviewUrl}
            showPin={this.state.showPin}
            handleShowPin={this.handleShowPin}
            showConfirmPin={this.state.showConfirmPin}
            handleConfirmPin={this.handleConfirmPin}
            initValue={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        );
      case 1:
        return <WorkTime initValue={values} setFieldValue={setFieldValue} />;
      case 2:
        return <Salary initValue={values} setFieldValue={setFieldValue} />;
      case 3:
        return this.getLicense();

      default:
        return "Unknown stepIndex";
    }
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
  uploadFile = (event, setFieldValue) => {
    console.log("setFieldValue", setFieldValue);
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
        setFieldValue("fileId", res.data.data.fileId);
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

  _submitForm = (values, actions) => {
    const { activeStep } = this.state;

    // await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    this.setState({
      activeStep: activeStep + 1,
    });
  };

  _handleSubmit = (values, actions) => {
    const { activeStep } = this.state;
    const steps = this.getSteps();
    const isLastStep = activeStep === steps.length - 1;
    if (isLastStep) {
      this._submitForm(values, actions);
    } else {
      this.setState({
        activeStep: activeStep + 1,
      });
      actions.setTouched({});
      actions.setSubmitting(false);
    }
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

    const nameRole = this.state.nameRole;
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
          cellphone: cellphone,
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
          productSalary: {
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
          this.props.FailureNotification(res.data.message);

          this.setState({ activeStep: 0 });
        }
        if (Number(res.data.codeNumber) === 200) {
          this.props.SuccessNotification(res.data.message);

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

  toggleVisibility = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  // handleCheckBox = (name) => (event) => {
  //   const value = event.target.checked;
  //   this.setState({ ...this.state, [name]: value });
  //   if (name === "salaryIsCheck" && value === true) {
  //     this.setState({ commIsCheck: false, commValue: 0 });
  //   }
  //   if (name === "commIsCheck" && value === true) {
  //     this.setState({ salaryIsCheck: false, salaryValue: 0 });
  //   }
  //   if (name === "tipIsCheck" && value === true) {
  //     this.setState({ fixIsCheck: false, fixValue: 0 });
  //   }
  //   if (name === "fixIsCheck" && value === true) {
  //     this.setState({ tipIsCheck: false, tipValue: 0 });
  //   }
  // };

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
    const currentValidationSchema = validationSchema[activeStep];

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
              {this.state.activeStep === steps.length ? null : ( // </div> //   </Button> //     Reset //   <Button className="btn btn-green" onClick={this.handleReset}> //   </Typography> //     <h1>Complete™</h1> //   <Typography className="my-2"> // <div>
                <div>
                  <Formik
                    initialValues={formInitialValues}
                    validationSchema={currentValidationSchema}
                    onSubmit={this._handleSubmit}
                  >
                    {({
                      values,
                      isSubmitting,
                      handleChange,
                      setFieldValue,
                    }) => (
                      <Form noValidate>
                        {this.getStepContent(
                          activeStep,
                          values,
                          handleChange,
                          setFieldValue
                        )}
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
                              type="submit"
                              className="btn btn-green"
                            >
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
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
                        </div>{" "}
                      </Form>
                    )}
                  </Formik>
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
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  SuccessNotification: (payload) => {
    dispatch(SUCCESS_NOTIFICATION(payload));
  },
  FailureNotification: (payload) => {
    dispatch(FAILURE_NOTIFICATION(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
