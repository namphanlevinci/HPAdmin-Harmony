import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "react-notifications-component";
import {
  getAll_Merchants,
  ViewProfile_Merchants,
  UpdateMerchant_Infor,
  GetMerchant_byID,
} from "../../../../../actions/merchants/actions";

import Button from "@material-ui/core/Button";
// import StateComponent from "../../../../../util/State";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import selectState from "../../../../../util/selectState";
import Cleave from "cleave.js/react";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
class General extends Component {
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
  }
  _goBack = () => {
    this.props.getAll_Merchants();
    this.props.history.push("/app/merchants/profile/general");
  };
  Update = () => {
    const ID = this.props.MerchantProfile.general.generalId;
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
  };

  _handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  _toggleEdit = () => {
    this.setState({ edit: true });
  };
  getStateId = (e) => {
    this.setState({ stateId: e });
  };
  componentDidMount() {
    const data = this.props.MerchantProfile;
    this.setState(
      {
        emailContact: data.general.emailContact,
        legalBusinessName: data.general.legalBusinessName,
        tax: data.general.tax,
        address: data.general.address,
        city: data.general.city,
        stateId: data.general.stateId,
        phoneBusiness: data.general.phoneBusiness,
        zip: data.general.zip,
        phoneContact: data.general.phoneContact,
        firstName: data.general.firstName,
        lastName: data.general.lastName,
        title: data.general.title,
        doBusinessName: data.general.doBusinessName,
        stateName: data?.state?.name,
      },
      () => this.setState({ loading: true })
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getMerchant !== this.props.getMerchant) {
      this.props.ViewProfile_Merchants(this.props.getMerchant.Data);
      this.props.history.push("/app/merchants/profile/general");
    }
  }
  render() {
    return (
      <div className="content general-content react-transition swipe-right">
        <div className="container-fluid">
          <h2 style={styles.h2}>General Information</h2>
          <div className="row">
            <div className="col-4">
              <label>Legal Business Name*</label>
              <input
                name="legalBusinessName"
                value={this.state.legalBusinessName}
                onChange={this._handleChange}
                style={styles.input}
              ></input>
            </div>
            <div className="col-4">
              <label>Doing Business As* (DBA)</label>
              <input
                name="doBusinessName"
                value={this.state.doBusinessName}
                onChange={this._handleChange}
                style={styles.input}
              ></input>
            </div>
            <div className="col-4">
              <label>Federal Tax ID*</label>

              <Cleave
                name="tax"
                value={this.state.tax}
                onChange={this._handleChange}
                options={{
                  blocks: [2, 7],
                  delimiter: "-",
                  numericOnly: true,
                }}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Business Address* (no P.O. Boxes)</label>
              <input
                name="address"
                value={this.state.address}
                onChange={this._handleChange}
                style={styles.input}
              ></input>
            </div>
            <div className="col-4">
              <label>City*</label>
              <input
                name="city"
                value={this.state.city}
                onChange={this._handleChange}
                style={styles.input}
              ></input>
            </div>
            <div className="col-4">
              <label>State Issued*</label>
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

            <div className="col-4">
              <label>Zip Code*</label>

              <Cleave
                name="zip"
                onChange={this._handleChange}
                value={this.state.zip}
                options={{
                  blocks: [5],
                  delimiter: "-",
                  numericOnly: true,
                }}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Email Contact*</label>
              <input
                name="emailContact"
                value={this.state.emailContact}
                onChange={this._handleChange}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Business Phone*</label>
              <PhoneInput
                placeholder="Business Phone Number"
                name="businessPhone"
                value={this.state.phoneBusiness}
                onChange={(phone) => this.setState({ phoneBusiness: phone })}
              />
            </div>
          </div>
          <h2 style={styles.h2}>Representative Information</h2>
          <div className="row">
            <div className="col-4">
              <label>Contact Name*</label>
              <input
                name="firstName"
                value={this.state.firstName}
                onChange={this._handleChange}
                placeholder=" First Name"
              ></input>
              <input
                name="lastName"
                value={this.state.lastName}
                onChange={this._handleChange}
                placeholder="Last Name"
              ></input>
            </div>
            <div className="col-4">
              <label>Title/Position*</label>
              <input
                name="title"
                value={this.state.title}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-4">
              <label>Contact Phone Number*</label>
              <PhoneInput
                placeholder="Business Phone Number"
                name="businessPhone"
                value={this.state.phoneContact}
                onChange={(phone) => this.setState({ phoneContact: phone })}
              />
            </div>
          </div>
          <div
            className="SettingsContent general-content"
            style={{ paddingTop: "20px" }}
          >
            <Button className="btn btn-green" onClick={this.Update}>
              SAVE
            </Button>
            <Button className="btn btn-red" onClick={this._goBack}>
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    );
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
    getAll_Merchants: () => {
      dispatch(getAll_Merchants());
    },
    ViewProfile_Merchants: (payload) => {
      dispatch(ViewProfile_Merchants(payload));
    },
    updateMerchant: (payload) => {
      dispatch(UpdateMerchant_Infor(payload));
    },
    GetMerchant_byID: (ID) => {
      dispatch(GetMerchant_byID(ID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(General);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
  input: {
    marginTop: "3px",
    marginBottom: "10px",
  },
};
