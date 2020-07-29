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
import StateComponent from "../../../../util/State";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import PendingInput from "../MerchantsRequest/pendingInput";
import SimpleReactValidator from "simple-react-validator";
import Cleave from "cleave.js/react";
import Select from "react-select";
import selectState from "../../../../util/selectState";
import PhoneInput from "react-phone-input-2";

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
    } = this.state;

    if (this.validator.allValid()) {
      const payload = {
        ID,
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
      };
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
    if (nextProps.UpdateStatus !== this.props.UpdateStatus) {
      store.addNotification({
        title: "SUCCESS!",
        message: `${this.props.UpdateStatus.Data.message}`,
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
    }
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
                <PendingInput
                  label="Legal Business Name*"
                  name="legalBusinessName"
                  initValue={this.state.legalBusinessName}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />

                <PendingInput
                  label="Doing Business As* (DBA)"
                  name="doBusinessName"
                  initValue={this.state.doBusinessName}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />

                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>Federal Tax ID*</label>
                  <Cleave
                    options={{
                      blocks: [2, 7],
                      delimiter: "-",
                    }}
                    label="Federal Tax ID*"
                    name="tax"
                    value={this.state.tax}
                    onChange={this.handleChange}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "400px",
                    }}
                  >
                    {this.validator?.message("tax", this.state.tax, "required")}
                  </span>
                </div>

                <PendingInput
                  label="Business Address* (no P.O. Boxes)"
                  name="address"
                  initValue={this.state.address}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />

                <PendingInput
                  label="City*"
                  name="city"
                  initValue={this.state.city}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                />

                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>State Issued*</label>
                  <div>
                    {this.state.loading ? (
                      <Select
                        onChange={(e) => this.setState({ stateId: e.value })}
                        defaultValue={{
                          label: `${this.state.stateName}`,
                          value: this.state.stateId,
                        }}
                        name="state"
                        options={selectState}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="col-4" style={{ paddingTop: "10px" }}>
                  <label>Zip Code*</label>
                  <Cleave
                    options={{
                      blocks: [5],
                      numericOnly: true,
                    }}
                    label="Zip Code*"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.handleChange}
                    className="inputPadding"
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "400px",
                    }}
                  >
                    {this.validator?.message("zip", this.state.zip, "required")}
                  </span>
                </div>

                <PendingInput
                  label="Email Contact*"
                  name="emailContact"
                  initValue={this.state.emailContact}
                  onChangeInput={this.handleChange}
                  validator={this.validator}
                  inputStyles="inputPadding"
                />

                <div className="col-4" style={{ paddingTop: "10px" }}>
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
                <PendingInput
                  styles="col-3"
                  label="First Name*"
                  name="firstName"
                  initValue={this.state.firstName}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  validator={this.validator}
                />
                <PendingInput
                  styles="col-3"
                  label="Last Name*"
                  name="lastName"
                  initValue={this.state.lastName}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  validator={this.validator}
                />
                <PendingInput
                  styles="col-3"
                  label="Title/Position*"
                  name="title"
                  initValue={this.state.title}
                  onChangeInput={this.handleChange}
                  inputStyles="inputPadding"
                  validator={this.validator}
                />

                <div className="col-3" style={{ paddingTop: "10px" }}>
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
