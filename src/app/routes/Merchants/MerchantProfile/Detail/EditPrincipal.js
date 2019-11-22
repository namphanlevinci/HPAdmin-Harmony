import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import URL from "../../../../../url/url";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  ViewProfile_Merchants,
  GetMerchant_byID
} from "../../../../../actions/merchants/actions";
import StateComponent from "../../../../../util/State";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
class EditPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HomePhone: "",
      MobilePhone: "",
      Address: "",
      StateId: "",
      DriverNumber: "",
      FileId: "",
      Token: "",
      stateName: "",
      email: ""
    };
  }
  _editPrincipal = () => {
    this.props.history.push("/");
  };
  async componentDidMount() {
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
    const data = this.props.principalInfo;
    if (data !== null) {
      this.setState({
        HomePhone: data.homePhone,
        MobilePhone: data.mobilePhone,
        Address: data.address,
        StateId: data.stateId,
        DriverNumber: data.driverNumber,
        FileId: data.fileId,
        stateName: data.state.name,
        email: data.email
      });
    }
  }
  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  _uploadFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    Axios.post(URL + "/file?category=service", formData, config)
      .then(res => {
        this.setState({ FileId: res.data.data.fileId });
      })
      .catch(err => {
        console.log(err);
      });
  };
  _goBack = () => {
    this.props.history.push("/app/merchants/profile/pincipal");
  };
  _update = () => {
    const ID = this.props.principalInfo.principalId;
    const IDMerchant = this.props.MerchantProfile.merchantId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token }
    };
    const {
      Address,
      FileId,
      DriverNumber,
      HomePhone,
      MobilePhone,
      StateId,
      email
    } = this.state;
    Axios.put(
      URL + "/merchant/principal/" + ID,
      { Address, FileId, DriverNumber, HomePhone, MobilePhone, StateId, email },
      config
    )
      .then(res => {
        if (res.data.message === "Update pricipal completed") {
          NotificationManager.success("Success", null, 600);
          setTimeout(() => {
            this.props.GetMerchant_byID(IDMerchant);
          }, 1500);
          setTimeout(() => {
            this.props.ViewProfile_Merchants(this.props.getMerchant.Data);
            this.props.history.push("/app/merchants/profile/pincipal");
          }, 2500);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  getStateId = e => {
    this.setState({ StateId: e });
  };
  render() {
    const e = this.props.principalInfo;
    const renderPrincipal =
      e !== null ? (
        <React.Fragment>
          <div className="row">
            <div className="col-md-4">
              <h4>Name*</h4>
              <input
                name="name"
                value={e.firstName + " " + e.lastName}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Title/Position*</h4>
              <input
                name="Title"
                value={e.title}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Ownership(%)*</h4>
              <input
                name="name"
                value={e.ownerShip}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Home Phone*</h4>
              <input
                name="HomePhone"
                value={this.state.HomePhone}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Mobile Phone*</h4>
              <input
                name="MobilePhone"
                value={this.state.MobilePhone}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Address*</h4>
              <input
                name="Address"
                value={this.state.Address}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Social Security Number (SSN)*</h4>
              <input
                name="ssn"
                value={e.ssn}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Date of Birth (mm/dd/yy)*</h4>
              <input
                name="birthday"
                value={moment(e.birthDate).format("MM/DD/YYYY")}
                onChange={this._handleChange}
                disabled
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Email Address*</h4>
              <input
                name="email"
                value={this.state.email}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Driver License Number*</h4>
              <input
                name="DriverNumber"
                value={this.state.DriverNumber}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>State*</h4>
              {/* <input
                name="StateId"
                value={this.state.StateId}
                onChange={this._handleChange}
              ></input> */}
              <StateComponent
                getStateId={this.getStateId}
                setvalue={this.state.stateName}
              />
            </div>
            <div className="col-md-12">
              <h4>Driver License Picture</h4>
              {/* <img src={require("../../../../../assets/images/driverlicense.jpg")} alt="void check"/> */}
              <img
                className="bankVoid"
                src={`${e.imageUrl}`}
                alt="driver license"
              />
            </div>
          </div>
          <div>
            <label>Upload new Driver license picture:</label>
            <input
              type="file"
              style={{ width: "250px !important", border: "none" }}
              name="image"
              id="file"
              onChange={e => this._uploadFile(e)}
            ></input>
          </div>
          <div className="SettingsContent GeneralContent">
            <Button className="btn btn-green" onClick={this._update}>
              SAVE
            </Button>
            <Button className="btn btn-red" onClick={this._goBack}>
              CANCEL
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <h4>&nbsp;- NO PRINCIPAL INFORMATION</h4>
      );
    return (
      <div className="react-transition swipe-up GeneralContent">
        <NotificationContainer />
        <h2>Principal Information</h2>
        {renderPrincipal}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  principalInfo: state.viewPrincipal,
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  getMerchant: state.getMerchant
});
const mapDispatchToProps = dispatch => ({
  ViewProfile_Merchants: payload => {
    dispatch(ViewProfile_Merchants(payload));
  },
  GetMerchant_byID: ID => {
    dispatch(GetMerchant_byID(ID));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPrincipal);
