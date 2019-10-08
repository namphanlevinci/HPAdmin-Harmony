import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import {
  getAll_Merchants,
  ViewProfile_Merchants,
  UpdateMerchant_Infor,
  GetMerchant_byID
} from "../../../../../actions/merchants/actions";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Button from "@material-ui/core/Button";

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
      doBusinessName: ""
    };
  }
  _goBack = () => {
    this.props.getAll_Merchants();
    this.props.history.push("/app/merchants/merchant-profile/general");
  };
  _update = () => {
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
      title
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
      title
    };
    this.props.updateMerchant(payload);
    setTimeout(() => {
      this.props.GetMerchant_byID(IDMerchant);
    }, 1000);
  };
  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  _toggleEdit = () => {
    this.setState({ edit: true });
  };
  componentDidMount() {
    const data = this.props.MerchantProfile;
    this.setState({
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
      doBusinessName: data.general.doBusinessName
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UpdateStatus !== this.props.UpdateStatus) {
      NotificationManager.success(this.props.UpdateStatus.Data.message);
    }
    if (nextProps.getMerchant !== this.props.getMerchant) {
      this.props.ViewProfile_Merchants(this.props.getMerchant.Data);
      this.props.history.push("/app/merchants/merchant-profile/general");
    }
  }
  render() {
    // const e = this.props.MerchantProfile;
    return (
      <div className="content GeneralContent react-transition swipe-right">
        <div className="container">
          <h2>General Information</h2>
          <div className="row">
            <div className="col-md-4">
              <h4>Legal Business Name*</h4>
              <input
                name="legalBusinessName"
                value={this.state.legalBusinessName}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Doing Business As (DBA)*</h4>
              <input
                name="doBusinessName"
                value={this.state.doBusinessName}
                onChange={this._handleChange}
                // disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Federal Tax ID*</h4>
              <input
                name="tax"
                value={this.state.tax}
                onChange={this._handleChange}
                // disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Address*</h4>
              <input
                name="address"
                value={this.state.address}
                onChange={this._handleChange}
                // disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>City*</h4>
              <input
                name="city"
                value={this.state.city}
                onChange={this._handleChange}
                // disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>State ID*</h4>
              <input
                name="stateId"
                value={this.state.stateId}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Business Phone*</h4>
              <input
                name="phoneBusiness"
                value={this.state.phoneBusiness}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Zip*</h4>
              <input
                name="zip"
                value={this.state.zip}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Email Contact*</h4>
              <input
                name="emailContact"
                value={this.state.emailContact}
                onChange={this._handleChange}
              ></input>
            </div>
            {/* <hr /> */}
            {/* <div className="col-md-4">
              <h4>Business Phone Number*</h4>
              <input
                name="cellphone"
                value={e.general.phoneBusiness}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Contact Email Address*</h4>
              <input
                name="email"
                value={this.state.email}
                onChange={this._handleChange}
              ></input>
            </div> */}
          </div>
          <h2>Representative Information</h2>
          <div className="row">
            <div className="col-md-4">
              <h4>Contact Name*</h4>
              <input
                name="firstName"
                value={this.state.firstName}
                onChange={this._handleChange}
                placeholder="First name"
              ></input>
              <input
                name="lastName"
                value={this.state.lastName}
                onChange={this._handleChange}
                placeholder="Last name"
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Title/Position*</h4>
              <input
                name="title"
                value={this.state.title}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Contact Phone Number*</h4>
              <input
                name="email"
                value={this.state.phoneContact}
                onChange={this._handleChange}
              ></input>
            </div>
          </div>
          <div className="SettingsContent GeneralContent">
            <Button className="btn btn-green" onClick={this._update}>
              SAVE
            </Button>
            <Button className="btn btn-red" onClick={this._goBack}>
              CANCEL
            </Button>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  UpdateStatus: state.updateMerchant_Infor,
  getMerchant: state.getMerchant
});
const mapDispatchToProps = dispatch => {
  return {
    getAll_Merchants: () => {
      dispatch(getAll_Merchants());
    },
    ViewProfile_Merchants: payload => {
      dispatch(ViewProfile_Merchants(payload));
    },
    updateMerchant: payload => {
      dispatch(UpdateMerchant_Infor(payload));
    },
    GetMerchant_byID: ID => {
      dispatch(GetMerchant_byID(ID));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);
