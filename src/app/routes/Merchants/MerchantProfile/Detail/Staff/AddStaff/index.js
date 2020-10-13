import React, { Component } from "react";
import { connect } from "react-redux";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
  WARNING_NOTIFICATION,
} from "../../../../../../../actions/notifications/actions";
import { ADD_STAFF } from "../../../../../../../actions/merchants/actions";
import { Formik, Form } from "formik";
import { config } from "../../../../../../../url/url";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import General from "./Form/General";
import WorkTime from "./Form/WorkTime";
import Salary from "./Form/Salary";
import License from "./Form/License";

import validationSchema from "./FormModel/validationSchema";
import formInitialValues from "./FormModel/formInitialValues";

import "../Staff.styles.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      imagePreviewUrl: "",
      fileId: 0,
      showPin: false,
      showConfirmPin: false,
      progressLoading: false,
    };
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
        return (
          <License
            initValue={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
          />
        );

      default:
        return "Please try again";
    }
  };

  //handle upload avatar
  uploadFile = (event, setFieldValue) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event?.target?.files[0];

    if (file?.name.match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      this.setState({ progressLoading: true });

      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          let reader = new FileReader();
          reader.onloadend = () => {
            setFieldValue("fileId", res.data.data.fileId);
            setFieldValue("staffAvatar", reader.result);
            this.setState({
              progressLoading: false,
            });
          };
          reader.readAsDataURL(file);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  _submitForm = (values, actions) => {
    const merchantId = this.props.MerchantProfile.merchantId;
    const { activeStep } = this.state;

    axios
      .post(
        URL + "/staff",
        {
          ...values,
          merchantId,
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

  toggleVisibility = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleBack = () => {
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
              {this.state.activeStep === steps.length ? (
                <div style={{ textAlign: "center", padding: "20px " }}>
                  <CircularProgress size={50} />
                </div>
              ) : (
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
  ADD_STAFF: (payload) => {
    dispatch(ADD_STAFF(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
