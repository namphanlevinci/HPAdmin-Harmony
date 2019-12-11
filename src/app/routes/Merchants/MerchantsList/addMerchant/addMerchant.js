import React from "react";
import { Formik } from "formik";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import * as Yup from "yup";
import General from "./General";
import Questions from "./Questions";
import Bank from "./Bank";
import Principal from "./Principal";

import "../merchantsList.css";
class AddMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      //~ tax seri + phoneCode
      taxCode: "",
      taxID: "",
      phoneCodeBusiness: "+1",
      phoneNumberBusiness: "",
      phoneCodeContact: "+1",
      phoneNumberContact: "",
      //~ general
      legalBusinessName: "",
      doingBusiness: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      firstName: "",
      lastName: "",
      position: "",
      //~ validate
      helperText: "",
      error: false
    };
  }

  getSteps = () => {
    return [
      "General Information",
      "Business Information",
      "Bank Information",
      "Principal Information"
    ];
  };

  getStepContent = (
    stepIndex,
    handleChange,
    touched,
    handleBlur,
    values,
    errors
  ) => {
    switch (stepIndex) {
      case 0:
        return (
          <General
            handleChange={handleChange}
            touched={touched}
            handleBlur={handleBlur}
            errors={errors}
            values={values}
          />
        );
      case 1:
        return this.getBusinessInformation();
      case 2:
        return this.getBankInformation();
      case 3:
        return this.getPrincipalInformation();

      default:
        return "Uknown stepIndex";
    }
  };

  getGeneralInformation = () => {
    // return <General />;
  };

  getBusinessInformation = () => {
    return <Questions />;
  };

  getBankInformation = () => {
    return <Bank handleUpdateState={this.handleUpdateState} />;
  };

  getPrincipalInformation = () => {
    return <Principal />;
  };

  handleUpdateState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleChange = event => {
    if (event.target.value.length > 2) {
      const { name, value } = event.target;
      this.setState({ helperText: "", error: false, [name]: value });
    } else {
      this.setState({ helperText: "Invalid Format", error: true });
    }
  };

  handleNext = () => {
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

  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className="react-transition swipe-right">
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
                  {/* FORMIK BRUH */}
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={values => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="container">
                          {this.getStepContent(
                            activeStep,
                            handleChange,
                            errors,
                            values,
                            handleBlur,
                            touched
                          )}
                        </div>
                      </form>
                    )}
                  </Formik>

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

export default AddMerchant;
