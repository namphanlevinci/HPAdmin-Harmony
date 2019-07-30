import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import {
  getAll_Merchants,
  ViewProfile_Merchants
} from "../../../../../actions/merchants/actions";
import axios from "axios";
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
      businessName: "",
      email: "",
      cellphone: "",
      address: "",
      city: "",
      stateId: ""
    };
  }
  _goBack = () => {
    this.props.history.push("/app/merchants/merchant-profile/general");
    this.props.getAll_Merchants();
  };
  _update = () => {
    const ID = this.props.MerchantProfile.merchantId;
    const {
      businessName,
      email,
      cellphone,
      address,
      city,
      stateId
    } = this.state;
    axios
      .put(
        "https://api2.levincidemo.com/api/merchant/" + ID,
        { businessName, email, cellphone, address, city, stateId },
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
          }
        }
      )
      .then(res => {
        if (res.data.message === "Success") {
          NotificationManager.success(res.data.message);
          const UserToken = this.props.InfoUser_Login.User.token;
          axios
            .get("https://api2.levincidemo.com/api/merchant/" + ID, {
              headers: { Authorization: `Bearer ${UserToken}` }
            })
            .then(res => {
              this.props.ViewProfile_Merchants(res.data.data);
              this.props.history.push(
                "/app/merchants/merchant-profile/general"
              );
            });
        } else {
          NotificationManager.error("Something went wrong, please try again.");
        }
      });
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
      businessName: data.businessName,
      email: data.email,
      cellphone: data.cellPhone,
      address: data.address,
      city: data.city,
      stateId: data.stateId
    });
  }
  render() {
    const e = this.props.MerchantProfile;
    return (
      <div className="content GeneralContent">
        <h2>General Information</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>Legal Business Name*</h4>
              <input
                name="businessName"
                value={this.state.businessName}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Doing Business As (DBA)*</h4>
              <input
                name="cellphone"
                value={e.general !== null ? e.general.doBusinessName : null}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Federal Tax ID*</h4>
              <input
                name="cellphone"
                value={e.taxId}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>DBA Business Address*</h4>
              <input
                name="cellphone"
                value={
                  this.state.address +
                  " " +
                  this.state.city +
                  " " +
                  this.state.stateId
                }
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Zip code*</h4>
              <input
                name="cellphone"
                value={e.general.zip}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Phone*</h4>
              <input
                name="cellphone"
                value={this.state.cellphone}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Address*</h4>
              <input
                name="address"
                value={this.state.address}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>City*</h4>
              <input
                name="city"
                value={this.state.city}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>State*</h4>
              <input
                name="stateId"
                value={this.state.stateId}
                onChange={this._handleChange}
              ></input>
            </div>
            {/* <hr /> */}
            <div className="col-md-4">
              <h4>Business Phone Number*</h4>
              <input
                name="email"
                value={e.general.phoneBusiness}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Contact Email Address*</h4>
              <input
                name="email"
                value={this.state.email}
                onChange={this._handleChange}
              ></input>
            </div>
          </div>
          <h2>Representative Information</h2>
          <div className="row">
            <div className="col-md-4">
              <h4>Contact Name*</h4>
              <input
                name="email"
                value={
                  e.principals !== null
                    ? e.principals.firstName + " " + e.principals.lastName
                    : null
                }
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Title/Position*</h4>
              <input
                name="email"
                value={e.principals !== null ? e.principals.title : null}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Contact Phone Number*</h4>
              <input
                name="email"
                value={e.principals !== null ? e.principals.mobilePhone : null}
                onChange={this._handleChange}
                disabled
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
  InfoUser_Login: state.User
});
const mapDispatchToProps = dispatch => ({
  getAll_Merchants: () => {
    dispatch(getAll_Merchants());
  },
  ViewProfile_Merchants: payload => {
    dispatch(ViewProfile_Merchants(payload));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);
