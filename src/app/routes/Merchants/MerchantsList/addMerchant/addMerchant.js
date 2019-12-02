import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../components/ContainerHeader/index";

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

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return this.getGeneralInformation();
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
    return (
      <div>
        <div className="row">
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <label>
                Legal Business Name* (as show on your income tax return)
              </label>
              <TextField
                name="legalBusinessName"
                label="Legal Business Name"
                margin="normal"
                type="text"
                fullWidth
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
                required
              />
            </div>
          </div>
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <label>Doing Business As Name (DBA)</label>
              <TextField
                name="doingBusiness"
                label="DBA"
                type="text"
                autoComplete="doingBusiness"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <label>Frederal Tax ID*</label>
            <div className="form-group">
              <TextField
                name="taxCode"
                label="Tax ID"
                type="text"
                autoComplete="current-password"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label style={{ color: "white" }}>NOOO</label>
              <TextField
                name="taxID"
                label="Tax ID"
                margin="normal"
                type="text"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-9 mx-auto">
            <div className="form-group">
              <label>DBA Business Address* (no P.O. Box)</label>
              <TextField
                name="address"
                label="DBA Address"
                margin="normal"
                type="text"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <div className="form-group">
              <TextField
                name="city"
                label="City"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <TextField
                name="state"
                label="State"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <TextField
                name="zip"
                label="Zip"
                type="number"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <label>Business Phone Number*</label>
            <div className="">
              <select
                style={{ padding: "10px", width: "100%" }}
                onChange={e =>
                  this.setState({ phoneCodeBusiness: e.target.value })
                }
              >
                <option value="+1">+1</option>
                <option value="+84">+84</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <label style={{ color: "white" }}>Business Phone Number*</label>
            <div className="form-group">
              <TextField
                name="phoneNumberBusiness"
                label="Phone number"
                type="number"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-9">
            <label>Contact Email Address*</label>
            <div className="form-group">
              <TextField
                name="email"
                label="Email"
                type="email"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label>Contact Name*</label>
            <div className="form-group">
              <TextField
                name="firstName"
                label="First Name"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-5">
            <label style={{ color: "white" }}>Last Name*</label>
            <div className="form-group">
              <TextField
                name="lastName"
                label="Last Name"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
          <div className="col-md-9">
            <label>Title/Position*</label>
            <div className="form-group">
              <TextField
                name="position"
                label="Position"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <label>Contact Phone Number*</label>
            <div className="">
              <select
                style={{ padding: "10px", width: "100%" }}
                onChange={e =>
                  this.setState({ phoneCodeContact: e.target.value })
                }
              >
                <option value="+1">+1</option>
                <option value="+84">+84</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <label style={{ color: "white" }}>Business Phone Number*</label>
            <div className="form-group">
              <TextField
                name="phoneNumberContact"
                label="Phone number"
                type="number"
                margin="normal"
                fullWidth
                required
                onChange={this.handleChange}
                error={this.state.error}
                helperText={this.state.helperText}
              />
            </div>
          </div>
        </div>
      </div>
    );
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
    console.log("handleUpdateState", this.state);
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className="container-fluid react-transition swipe-right">
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
