import React from "react";
import { config } from "../../../../../url/url";
import { Formik, Form } from "formik";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../../../../../actions/notifications/actions";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../components/ContainerHeader/index";

import General from "./Steps/General/General";
import Question from "./Steps/Question/Question";
import Bank from "./Steps/Bank/Bank";
import Principal from "./Steps/Principal/Principal";
import PricingPlan from "./Steps/PricingPlan/PricingPlan";

import validationSchema from "./FormModel/validationSchema";
import formInitialValues from "./FormModel/formInitialValues";

const URL = config.url.URL;
const upFile = config.url.upFile;

class AddMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      imagePreviewUrl: "",

      progress: false,
      isSubmitting: false,
    };
  }

  getSteps = () => {
    return [
      "General Information",
      "Business Information",
      "Bank Information",
      "Principal Information",
      "Pricing Plan",
    ];
  };

  // componentDidMount() {
  //   axios.get(URL + "/question").then((res) => {
  //     const data = res.data.data;

  //     this.setState({
  //       initialBusinessQuestions: data,
  //     });
  //   });
  // }

  navigateToMerchantList() {
    this.props.history.push("/app/merchants/list");
  }

  getStepContent = (
    stepIndex,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    handleBlur
  ) => {
    switch (stepIndex) {
      case 0:
        return (
          <General
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
          />
        );
      case 1:
        return (
          <Question
            values={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
          />
        );
      case 2:
        return (
          <Bank
            values={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            uploadFile={this.uploadFile}
          />
        );
      case 3:
        return (
          <Principal
            values={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            uploadFile={this.uploadFile}
            handleBack={this.handleBack}
          />
        );
      case 4:
        return (
          <PricingPlan
            values={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
          />
        );

      default:
        return "Unknown stepIndex";
    }
  };

  //handle upload avatar
  uploadFile = (event, imageUrl, setFieldValue) => {
    const { name } = event.target;

    event.stopPropagation();
    event.preventDefault();
    this.setState({ progress: true });

    const file = event.target.files[0];

    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFile, formData, config)
      .then((res) => {
        setFieldValue(`${name}`, res.data.data.fileId);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFieldValue(`${imageUrl}`, reader.result);
          this.setState({
            progress: false,
          });
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _submitForm = (values, actions) => {
    const { activeStep } = this.state;

    axios
      .post(URL + "/merchant", { ...values })
      .then((res) => {
        console.log("res", res);
        if ((res.status = 200)) {
          this.props.SuccessNotification(res.data.message);

          setTimeout(() => {
            this.navigateToMerchantList();
          }, 1500);
        } else {
          this.props.FailureNotification(res.data.message);
        }
        this.setState({ isSubmitting: false });
      })
      .catch((error) => {
        console.log(error);
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
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <CircularProgress size={45} />
                </div>
              ) : (
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
                    errors,
                    touched,
                    handleBlur,
                  }) => (
                    <Form>
                      {this.getStepContent(
                        activeStep,
                        values,
                        handleChange,
                        setFieldValue,
                        errors,
                        touched,
                        handleBlur
                      )}

                      {this.state.activeStep === 3 ? null : (
                        <div
                          style={{
                            marginTop: "15px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={this.handleBack}
                              className="btn btn-red"
                              style={{ color: "black" }}
                            >
                              Back
                            </Button>

                            <Button
                              className="btn btn-red"
                              type="submit"
                              style={{
                                backgroundColor: "#4251af",
                                color: "white",
                              }}
                              disabled={isSubmitting}
                            >
                              {activeStep === steps.length - 1
                                ? "Submit"
                                : "Next"}
                            </Button>
                          </div>

                          <div>
                            <Button
                              onClick={() =>
                                this.props.history.push("/app/merchants/list")
                              }
                              className="btn btn-red"
                              style={{ color: "black" }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  SuccessNotification: (payload) => {
    dispatch(SUCCESS_NOTIFICATION(payload));
  },
  FailureNotification: (payload) => {
    dispatch(FAILURE_NOTIFICATION(payload));
  },
});

export default connect(null, mapDispatchToProps)(AddMerchant);
