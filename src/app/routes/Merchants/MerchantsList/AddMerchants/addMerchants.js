import React from "react";
import { config } from "../../../../../url/url";
import { store } from "react-notifications-component";
import { Formik, Form, Field } from "formik";
import { compose, withState, withHandlers } from "recompose";

import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../components/ContainerHeader/index";
import formatPhone from "../../../../../util/formatPhone";
// import General from "./General";
// import Questions from "./Questions";
// import Bank from "./Bank";
// import Principal from "./Principal";
// import PricingPlan from "./PricingPlan";

// import "../merchantsList.css";
// import "./add-merchant.styles.scss";

const URL = config.url.URL;
const upFile = config.url.upFile;

const initialState = {
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
  position: "",
  contactPhoneCode: "+1",
  contactPhone: "",

  sameAsBA: false,
  dbaAddress: "",
  dbaCity: "",
  dbaState: "",
  dbaZip: "",

  desc1: "",
  question1: "",
  isAccept1: false,
  isAccept2: false,
  isAccept3: false,
  isAccept4: false,
  isAccept5: false,
  // Bank Info
  bankName: "",
  routingNumber: "",
  accountNumber: "",
  accountHolderName: "",
  fileId: "",
  valuePricingPlane: "1",
  principalInfo: {
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
      zip: "",
    },
    yearAtThisAddress: 0,
    ssn: "",
    dateOfBirth: null,
    email: "",
    driverLicense: "",
    stateIssued: "",
    fileId: "",
    progress: false,
  },

  //
  isSubmitting: false,
  progress: false,
};

class AddMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required",
      },
    });
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

  componentDidMount() {
    axios.get(URL + "/question").then((res) => {
      const data = res.data.data;

      this.setState({
        initialBusinessQuestions: data,
      });
    });
  }

  navigateToMerchantList() {
    this.props.history.push("/app/merchants/list");
  }

  setDataPrincipal = (info, fileId) => {
    this.setState({ principalInfo: info });
  };

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <h1>1</h1>
          //   <General
          //     handleChange={this.handleChange}
          //     handleCheckBox={this.handleCheckBox}
          //     handleSelect={this.handleSelect}
          //     value={this.state}
          //     handlePhone={this.handlePhone}
          //     handleCountryCode={this.handleCountryCode}
          //     validator={this.validator}
          //   />
        );
      case 1:
        return (
          <h1>2</h1>
          //   <Questions
          //     handleQuestions={this.handleQuestions}
          //     handleChange={this.handleChange}
          //     businessInfo={this.state.initialBusinessQuestions}
          //     validator={this.validator}
          //   />
        );
      case 2:
        return (
          <h1>3</h1>
          //   <Bank
          //     uploadFile={this.uploadFile}
          //     handleChange={this.handleChange}
          //     value={this.state}
          //     validator={this.validator}
          //   />
        );
      case 3:
        return (
          <h1>4</h1>
          //   <Principal
          //     setDataPrincipal={this.setDataPrincipal}
          //     handleNext={this.handleNext}
          //     handlePrincipal={this.handlePrincipal}
          //     Info={this.state}
          //     handleBack={this.handleBack}
          //     cancelMerchant={this.props.history}
          //   />
        );
      case 4:
        return (
          <h1>5</h1>
          //   <PricingPlan
          //     value={this.state.valuePricingPlane}
          //     handleChangePricingPlan={this.handleChangePricingPlan}
          //   />
        );

      default:
        return "Unknown stepIndex";
    }
  };

  //handle upload avatar
  uploadFile = (event) => {
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
        this.setState({ fileId: res.data.data.fileId });
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result,
            progress: false,
          });
        };
      })
      .catch((err) => {
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
    //       activeStep: activeStep + 1,
    //     });
    //   } else {
    //     this.validator.showMessages();
    //     this.forceUpdate();
    //   }
    // }
    this.setState({
      activeStep: activeStep + 1,
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
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCountryCode = ({ value }, { name }) => {
    this.setState({ [name]: value });
  };

  handlePhone = (value, name) => {
    this.setState({ [name]: value });
  };

  handleChangeNumber = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelect = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCheckBox = (e) => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
    this.setState({
      dbaAddress: "",
      dbaCity: "",
      dbaState: "",
      dbaZip: "",
    });
    if (checked) {
      this.setState({
        dbaAddress: this.state.address,
        dbaCity: this.state.city,
        dbaState: this.state.state,
        dbaZip: this.state.zip,
      });
    } else {
      this.setState({
        dbaAddress: "",
        dbaCity: "",
        dbaState: "",
        dbaZip: "",
      });
    }
  };

  handleQuestions = (event, value, name) => {
    this.setState({
      [name]: value,
      [`question${event?.questionId}`]: event?.value,
    });
  };

  submitAddMerchant = () => {
    this.setState({ isSubmitting: true });
    const data = this.state;
    const body = {
      generalInfo: {
        businessName: data?.businessName,
        doingBusiness: data?.doingBusiness,
        tax: data?.tax,
        businessAddress: {
          address: data?.address,
          city: data?.city,
          state: data?.state,
          zip: data?.zip,
        },
        dbaAddress: {
          address: data?.sameAsBA ? data?.address : data?.dbaAddress,
          city: data?.sameAsBA ? data?.city : data?.dbaCity,
          state: data?.sameAsBA ? data?.state : data?.dbaState,
          zip: data?.sameAsBA ? data?.zip : data?.dbaZip,
        },

        businessPhone: formatPhone(data?.businessPhone),
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        position: data?.position,
        contactPhone: formatPhone(data?.contactPhone),
      },
      businessInfo: {
        question1: {
          isAccept: data?.isAccept1,
          desc: data?.isAnswer1,
          question: data?.question1,
        },
        question2: {
          isAccept: data?.isAccept2,
          desc: data?.isAnswer2,
          question: data?.question2,
        },
        question3: {
          isAccept: data?.isAccept3,
          desc: data?.isAnswer3,
          question: data?.question3,
        },
        question4: {
          isAccept: data?.isAccept4,
          desc: data?.isAnswer4,
          question: data?.question4,
        },
        question5: {
          isAccept: data?.isAccept5,
          desc: data?.isAnswer5,
          question: data?.question5,
        },
      },
      bankInfo: {
        bankName: data?.bankName,
        routingNumber: data?.routingNumber,
        accountNumber: data?.accountNumber,
        fileId: data.fileId ? data.fileId : 0,
        accountHolderName: data?.accountHolderName,
      },
      principalInfo: data.principalInfo,
      packagePricing: Number(data.valuePricingPlane),
    };

    axios
      .post(URL + "/merchant", body)
      .then((res) => {
        if ((res.status = 200)) {
          store.addNotification({
            title: "Success!",
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
            width: 250,
          });
          setTimeout(() => {
            this.navigateToMerchantList();
          }, 1500);
        } else {
          store.addNotification({
            title: "ERROR!",
            message: "Something went wrong",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });
        }
        this.setState({ isSubmitting: false });
      })
      .catch((error) => {
        console.log(error);
      });
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
                <Formik
                //   initialValues={}
                //   validationSchema={}
                //   onSubmit={_handleSubmit}
                >
                  <Form id={formId}>
                    {this.getStepContent(activeStep)}

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
                            onClick={() => {
                              if (activeStep === steps.length - 1)
                                this.submitAddMerchant();
                              else this.handleNext();
                            }}
                            style={{
                              backgroundColor: "#4251af",
                              color: "white",
                            }}
                            disabled={
                              this.state.isSubmitting || this.state.progress
                                ? true
                                : false
                            }
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
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMerchant;
