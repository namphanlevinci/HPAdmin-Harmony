import React, { Component } from "react";
import {
  ViewProfile_Merchants,
  UpdateMerchant_Infor,
  GetMerchant_byID,
} from "../../../../actions/merchants/actions";
import { ViewMerchant_Rejected_Merchants } from "../../../../actions/merchants/actions";
import { connect } from "react-redux";
import { store } from "react-notifications-component";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import SimpleReactValidator from "simple-react-validator";

import PhoneInput from "react-phone-input-2";
import CustomSelect from "../../../../util/getState";
import InputCustom from "../MerchantsList/addMerchant/custom-input";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import "../MerchantProfile/MerchantProfile.css";
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
import "./EditMerchant.css";
import "../MerchantProfile/Detail/Detail.css";
import "react-phone-input-2/lib/high-res.css";

class EditMerchantRejected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      emailContact: "",
      legalBusinessName: "",
      tax: "",
      address: "",
      city: "",
      stateId: "",
      phoneBusiness: "",
      zip: "",
      phoneContact: "",
      firstName: "",
      lastName: "",
      title: "",
      doBusinessName: "",
      stateName: "",
      loading: false,
    };
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required",
      },
    });
  }

  componentDidMount() {
    const data = this.props.MerchantProfile?.general;
    const stateName = this.props.MerchantProfile?.state;

    this.setState({
      emailContact: data.emailContact,
      legalBusinessName: data.legalBusinessName,
      tax: data.tax,
      address: data.address,
      city: data.city,
      stateId: data.stateId,
      phoneBusiness: data.phoneBusiness,
      zip: data.zip,
      phoneContact: data.phoneContact,
      firstName: data.firstName,
      lastName: data.lastName,
      title: data.title,
      doBusinessName: data.doBusinessName,
      stateName: stateName.name,

      dbaAddress: data?.dbaAddress?.Address,
      dbaCity: data?.dbaAddress?.City,
      dbaState: data?.dbaAddress?.State,
      dbaZip: data?.dbaAddress?.Zip,
      loading: true,
    });
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  goBack = () => {
    this.props.history.push("/app/merchants/rejected/profile");
  };
  getStateId = (e) => {
    this.setState({ stateId: e });
  };
  updateGeneral = () => {
    const ID = this.props.MerchantProfile?.general?.generalId;
    const IDMerchant = this.props.MerchantProfile.merchantId;
    const {
      emailContact,
      legalBusinessName,
      doBusinessName,
      tax,
      address,
      city,
      stateId,
      phoneBusiness,
      zip,
      phoneContact,
      firstName,
      lastName,
      title,
      dbaAddress,
      dbaCity,
      dbaState,
      dbaZip,
    } = this.state;

    if (this.validator.allValid()) {
      const payload = {
        ID,
        emailContact,
        dbaAddress: {
          Address: dbaAddress,
          City: dbaCity,
          State: dbaState,
          Zip: dbaZip,
        },
        legalBusinessName,
        doBusinessName,
        tax,
        address,
        city,
        stateId,
        phoneBusiness,
        zip,
        phoneContact,
        firstName,
        lastName,
        title,
      };

      console.log("payload", payload);
      this.props.updateMerchant(payload);
      setTimeout(() => {
        this.props.GetMerchant_byID(IDMerchant);
      }, 1000);

      return true;
    } else {
      this.validator.showMessages();
      this.forceUpdate();

      return false;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.getMerchant !== this.props.getMerchant) {
      this.props.ViewMerchant_Rejected_Merchants(this.props.getMerchant.Data);
      this.props.history.push("/app/merchants/rejected/profile");
    }
  }

  render() {
    const e = this.props.MerchantProfile;
    const renderEdit =
      e.merchantId !== undefined ? (
        <div className="content general-content react-transition swipe-right">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.editRejectedMerchant" />}
          />
          <div className="content-body reject-info page-heading">
            <h2>General Information</h2>
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <TextField
                      name="legalBusinessName"
                      label="Legal Business Name*"
                      margin="normal"
                      type="text"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.legalBusinessName}
                    />
                    {this.validator.message(
                      "legalBusinessName",
                      this.state.legalBusinessName,
                      "required|string"
                    )}
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <TextField
                      name="doBusinessName"
                      label="Doing Business As* (DBA)"
                      type="text"
                      autoComplete="doingBusiness"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.doBusinessName}
                    />
                    {this.validator.message(
                      "doingBusiness",
                      this.state.doBusinessName,
                      "required|string"
                    )}
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <FormControl style={{ width: "100%", marginTop: "16px" }}>
                      <InputLabel htmlFor="formatted-text-mask-input">
                        Federal Tax ID*
                      </InputLabel>
                      <Input
                        value={this.state.tax}
                        onChange={this.handleChange}
                        name="tax"
                        startAdornment
                        inputProps={{
                          block: [2, 7],
                        }}
                        inputComponent={InputCustom}
                      />
                    </FormControl>
                    {this.validator.message(
                      "tax",
                      this.state.tax,
                      "required|string"
                    )}
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <TextField
                      name="address"
                      label="Business Address* (no P.O. Boxes)"
                      margin="normal"
                      type="text"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.address}
                    />
                    {this.validator.message(
                      "address",
                      this.state.address,
                      "required|string"
                    )}
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <TextField
                      name="city"
                      label="City*"
                      type="text"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.city}
                    />
                    {this.validator.message(
                      "city",
                      this.state.city,
                      "required|string"
                    )}
                  </div>
                </div>
                <div className="col-3">
                  <div style={{ marginTop: "16px" }}>
                    {this.state.loading && (
                      <CustomSelect
                        name="state"
                        label="State Issued*"
                        initialValue={this.state.stateId}
                        handleChange={(e) =>
                          this.setState({ stateId: e.target.value })
                        }
                      />
                    )}
                  </div>
                  {this.validator.message(
                    "state",
                    this.state.stateId,
                    "required|integer"
                  )}
                </div>
                <div className="col-2">
                  <div className="form-group">
                    <FormControl style={{ width: "100%", marginTop: "18px" }}>
                      <InputLabel htmlFor="formatted-text-mask-input">
                        Zip Code*
                      </InputLabel>
                      <Input
                        value={this.state.zip}
                        onChange={this.handleChange}
                        name="zip"
                        id="custom-zip-input"
                        startAdornment
                        inputProps={{
                          block: [5],
                          numericOnly: true,
                        }}
                        inputComponent={InputCustom}
                      />
                    </FormControl>

                    {this.validator.message(
                      "zip",
                      this.state.zip,
                      "required|string"
                    )}
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <TextField
                      name="dbaAddress"
                      label="DBA Address*"
                      margin="normal"
                      type="text"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.dbaAddress}
                    />
                    {this.validator.message(
                      "dbaAddress",
                      this.state.dbaAddress,
                      "required|string"
                    )}
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <TextField
                      name="dbaCity"
                      label="City*"
                      type="text"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.dbaCity}
                    />
                    {this.validator.message(
                      "dbaCity",
                      this.state.dbaCity,
                      "required|string"
                    )}
                  </div>
                </div>
                <div className="col-3">
                  <div style={{ marginTop: "16px" }}>
                    {this.state.loading && (
                      <CustomSelect
                        name="dbaState"
                        label="State Issued*"
                        initialValue={this.state.dbaState}
                        handleChange={(e) =>
                          this.setState({ dbaState: e.target.value })
                        }
                      />
                    )}
                  </div>
                  {this.validator.message(
                    "dbaState",
                    this.state.dbaState,
                    "required|integer"
                  )}
                </div>
                <div className="col-2">
                  <div className="form-group">
                    <FormControl style={{ width: "100%", marginTop: "18px" }}>
                      <InputLabel htmlFor="formatted-text-mask-input">
                        Zip Code*
                      </InputLabel>
                      <Input
                        value={this.state.dbaZip}
                        onChange={this.handleChange}
                        name="dbaZip"
                        id="custom-zip2-input"
                        startAdornment
                        inputProps={{
                          block: [5],
                          numericOnly: true,
                        }}
                        inputComponent={InputCustom}
                      />
                    </FormControl>

                    {this.validator.message(
                      "dbaZip",
                      this.state.dbaZip,
                      "required|string"
                    )}
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <TextField
                      name="emailContact"
                      label="Email Contact*"
                      type="email"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.emailContact}
                    />
                    {this.validator.message(
                      "emailContact",
                      this.state.emailContact,
                      "required|string"
                    )}
                  </div>
                </div>
                <div className="col-4">
                  <label>Business Phone Number*</label>
                  {this.state.loading && (
                    <PhoneInput
                      style={{ marginTop: "10px" }}
                      placeholder="Business Phone Number*"
                      name="businessPhone"
                      value={this.state.phoneBusiness}
                      onChange={(phone) =>
                        this.setState({ phoneBusiness: phone })
                      }
                    />
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="form-group">
                    <TextField
                      name="firstName"
                      label="First Name*"
                      type="text"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.firstName}
                    />
                    {this.validator.message(
                      "firstName",
                      this.state.firstName,
                      "required|string"
                    )}
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <TextField
                      name="lastName"
                      label="Last Name*"
                      type="text"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.lastName}
                    />
                    {this.validator.message(
                      "lastName",
                      this.state.lastName,
                      "required|string"
                    )}
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <TextField
                      name="title"
                      label="Title/Position*"
                      type="text"
                      margin="normal"
                      fullWidth
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                    {this.validator.message(
                      "title",
                      this.state.title,
                      "required|string"
                    )}
                  </div>
                </div>

                <div className="col-3">
                  <label>Contact Phone Number*</label>
                  {this.state.loading && (
                    <PhoneInput
                      style={{ marginTop: "10px" }}
                      placeholder="Contact Phone Number"
                      name="phoneContact"
                      value={this.state.phoneContact}
                      onChange={(phone) =>
                        this.setState({ phoneContact: phone })
                      }
                    />
                  )}
                </div>
              </div>
              <div className="SettingsContent general-content">
                <Button className="btn btn-green" onClick={this.updateGeneral}>
                  SAVE
                </Button>
                <Button className="btn btn-red" onClick={this.goBack}>
                  CANCEL
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/merchants/rejected" />
      );

    return <div>{renderEdit}</div>;
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
  UpdateStatus: state.updateMerchant_Infor,
  getMerchant: state.getMerchant,
});
const mapDispatchToProps = (dispatch) => {
  return {
    ViewProfile_Merchants: (payload) => {
      dispatch(ViewProfile_Merchants(payload));
    },
    updateMerchant: (payload) => {
      dispatch(UpdateMerchant_Infor(payload));
    },
    GetMerchant_byID: (ID) => {
      dispatch(GetMerchant_byID(ID));
    },
    ViewMerchant_Rejected_Merchants: (payload) => {
      dispatch(ViewMerchant_Rejected_Merchants(payload));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMerchantRejected);
