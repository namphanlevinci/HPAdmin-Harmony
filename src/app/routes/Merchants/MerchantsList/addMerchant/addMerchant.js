import React from "react";
import URL, { upFileUrl } from "../../../../../url/url";
import { store } from "react-notifications-component";

import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
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
import PricingPlan from "./PricingPlan";

import "../merchantsList.css";
import "./add-merchant.styles.scss";

const initialState = {
  imagePreviewUrl: "",
  initialBusinessQuestions: {},

  activeStep: 3,
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

  isAccept1: "",
  desc1: "",
  question1: "",

  // Bank Info
  bankName: "",
  routingNumber: "",
  accountNumber: "",
  accountHolderName: "",
  fileId: "",
  valuePricingPlane: "1",
  principalInfo: "",
};

class AddMerchant extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required", // will override all messages
      },
    });
  }

  handleChangePricingPlan = (e) => {
    this.setState({ valuePricingPlane: e.target.value });
  };

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
    // const principalInfo = { ...info };
    this.setState({ principalInfo: info });
  };

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <General
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            value={this.state}
            handleNumber={this.handleChangeNumber}
            handlePhone={this.handlePhone}
            handleCountryCode={this.handleCountryCode}
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
            validator={this.validator}
          />
        );
      case 3:
        return (
          <Principal
            setDataPrincipal={this.setDataPrincipal}
            handleNext={this.handleNext}
            handlePrincipal={this.handlePrincipal}
            Info={this.state}
            handleBack={this.handleBack}
          />
        );
      case 4:
        return (
          <PricingPlan
            value={this.state.valuePricingPlane}
            handleChangePricingPlan={this.handleChangePricingPlan}
          />
        );

      default:
        return "Unknown stepIndex";
    }
  };

  //handle upload avatar
  uploadFile = (event) => {
    event.stopPropagation();
    event.preventDefault();

    let reader = new FileReader();

    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFileUrl, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
      });
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
      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
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

  handleSelect = (value, name) => {
    let stateName = name.name;
    this.setState({ [stateName]: value.value });
  };

  handleQuestions = (name) => (event) => {
    if (Number(name[1].charAt(8)) === Number(name[0].questionId)) {
      this.setState({
        [name[1]]: event.target.value,
        ["question" + name[0].questionId]: name[0].value,
      });
    }
  };

  ssnFormat = (ssn) => {
    return ssn
      .replace(/[{( )}]/g, "")
      .replace(/(\d{4})\-?(\d{3})\-?(\d{4})/, "+$1-$2-$3");
  };

  formatPhone = (Phone) => {
    if (Phone.startsWith("1")) {
      return Phone.replace(/[{( )}]/g, "").replace(
        /(\d{4})\-?(\d{3})\-?(\d{4})/,
        "+$1-$2-$3"
      );
    }
    if (Phone.startsWith("84"))
      return Phone.replace(/[{( )}]/g, "").replace(
        /(\d{5})\-?(\d{3})\-?(\d{4})/,
        "+$1-$2-$3"
      );
  };

  submitAddMerchant = () => {
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
        businessPhone: this.formatPhone(data?.businessPhone),
        email: data?.email,
        firstName: data?.firstName,
        lastName: data?.lastName,
        position: data?.position,
        contactPhone: this.formatPhone(data?.contactPhone),
      },
      businessInfo: {
        question1: {
          isAccept: data?.isAccept1,
          desc: "",
          question: data?.question1,
        },
        question2: {
          isAccept: data?.isAccept2,
          desc: "",
          question: data?.question2,
        },
        question3: {
          isAccept: data?.isAccept3,
          desc: "",
          question: data?.question3,
        },
        question4: {
          isAccept: data?.isAccept4,
          desc: "",
          question: data?.question4,
        },
        question5: {
          isAccept: data?.isAccept5,
          desc: "",
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
                <div>
                  {this.getStepContent(activeStep)}

                  {this.state.activeStep === 3 ? null : (
                    <div style={{ marginTop: "15px" }}>
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
                        style={{ backgroundColor: "#4251af", color: "white" }}
                      >
                        {activeStep === steps.length - 1 ? "Submit" : "Next"}
                      </Button>
                    </div>
                  )}
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
