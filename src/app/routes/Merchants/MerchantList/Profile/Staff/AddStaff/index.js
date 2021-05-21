import React, { Component } from "react";
import { connect } from "react-redux";
import { WARNING_NOTIFICATION } from "../../../../../../../constants/notificationConstants";
import { Formik, Form } from "formik";
import { config } from "../../../../../../../url/url";
import { AddMerchantStaffById } from "../../../../../../../actions/merchantActions";

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
import { isEmpty } from 'lodash';

import "../Staff.styles.scss";

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
    this.refForm = React.createRef();
  }

  componentDidMount() {
    const { MerchantProfile } = this.props;
    const businessHour = MerchantProfile?.businessHour || null;
    if (businessHour) {
      this.refForm.current.setFieldValue('workingTime', businessHour);
    }
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
    const { MerchantProfile , merchantState} = this.props;
    switch (stepIndex) {
      case 0:
        return (
          <General
            uploadImage={this.uploadImage}
            imagePreviewUrl={this.state.imagePreviewUrl}
            showPin={this.state.showPin}
            handleShowPin={this.handleShowPin}
            showConfirmPin={this.state.showConfirmPin}
            handleConfirmPin={this.handleConfirmPin}
            initValue={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            merchantState={merchantState}
          />
        );
      case 1:
        return <WorkTime initValue={values} setFieldValue={setFieldValue} MerchantProfile={MerchantProfile} />;
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

  uploadImage = (event, setFieldValue) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      setFieldValue(`isUpload`, true);
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
            setFieldValue(`isUpload`, false);
          };
          reader.readAsDataURL(file);
        })
        .catch((err) => {
          console.log(err);
          setFieldValue(`isUpload`, false);
        });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  submitForm = async(values, actions) => {
    const merchantId = this.props.MerchantProfile.merchantId;
    const { activeStep } = this.state;
    const path = "/app/merchants/profile/staff";
    const payload = await {
      ...values,
      merchantId,
      path,
      salary: {
        commission: {
          isCheck : values.salary.commission.isCheck,
          value: this.checkComission(values.salary.commission.value)
        },
        perHour :  values.salary.perHour
      }
    };
    this.props.addStaff(payload);
    actions.setSubmitting(false);
    this.setState({ activeStep: activeStep + 1 });
  };

  checkComission = (comission = []) => {
    let arrTemp = JSON.parse(JSON.stringify(comission));
    arrTemp = arrTemp.filter(obj => obj);
    return arrTemp
  }


  handleSubmit = (values, actions) => {
    const { activeStep } = this.state;
    const steps = this.getSteps();
    const isLastStep = activeStep === steps.length - 1;
    if (isLastStep) {
      this.submitForm(values, actions);
    } else {
      this.setState({
        activeStep: activeStep + 1,
      });
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  toggleVisibility = (name, value) => {
    this.setState({ [name]: value });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1, });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;
    const currentValidationSchema = validationSchema[activeStep];

    return (
      <div className="container-fluid react-transition swipe-right add-staff">
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#0764B0" }}>New Staff</h1>
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
                    className={`horizontal-stepper ${index === activeStep ? "active" : ""}`}
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
                      onSubmit={this.handleSubmit}
                      innerRef={this.refForm}
                    >
                      {({ values, isSubmitting, handleChange, setFieldValue, }) => (
                        <Form noValidate>
                          {this.getStepContent(activeStep, values, handleChange, setFieldValue)}
                          <div className="container-button-addStadd">
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
                                {
                                  activeStep === steps.length - 1
                                    ? "Finish"
                                    : "Next"
                                }
                              </Button>
                            </span>
                            <span>
                              <Button
                                onClick={() => this.props.history.push("/app/merchants/profile/staff")}
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
  MerchantProfile: state.merchant.merchant,
  merchantState : state.merchantState.data
});

const mapDispatchToProps = (dispatch) => ({
  addStaff: (payload) => {
    dispatch(AddMerchantStaffById(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
