import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import { NotificationContainer } from "react-notifications";
import Button from "@material-ui/core/Button";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goToEdit = () => {
    this.props.history.push("/app/consumers/profile/edit-general");
  };

  render() {
    const e = this.props.MerchantProfile;
    console.log("E", e);
    const renderGeneral =
      e.email !== undefined ? (
        <div className="react-transition swipe-right">
          <div className="container">
            <h2>General Information</h2>
            <div className="row">
              <div className="col-md-3">
                <h4>First Name</h4>
                <p>{e.firstName !== null ? e.firstName : null}</p>
              </div>
              <div className="col-md-3">
                <h4>Last Name</h4>
                <p>{e.lastName !== null ? e.lastName : null}</p>
              </div>
              <div className="col-md-3">
                <h4>Phone Number</h4>
                <p>{e.phone !== null ? e.phone : null}</p>
              </div>
              <div className="col-md-3">
                <h4>Email</h4>
                <p>{e.email !== null ? e.email : null}</p>
              </div>
            </div>
            <h2>Daily transactions limit (unit $)</h2>
            <label>
              The HarmonyPay system will alert any user and pervent any use
              involved monetary transfer or transfers that are:
            </label>
            <label>
              a. More than $10,000 in total from either cash-in or cash-out.
            </label>
            <br />
            <label>b. Is conducted by the same person.</label>
            <br />
            <label>c. Is conducted on the same business day.</label>
            <br />
            <div className="input-group">
              <input
                type="text"
                className="col-4 form-control"
                name="totalAmountLimit"
                value={e.limitAmount}
                onChange={this._handleChange}
                disabled
              />
            </div>
          </div>

          <div className="SettingsContent GeneralContent">
            <Button className="btn btn-green" onClick={this._goToEdit}>
              EDIT
            </Button>
          </div>
        </div>
      ) : (
        <Redirect to="/app/consumers/list" />
      );
    return (
      <div className="content GeneralContent">
        {renderGeneral}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default connect(mapStateToProps)(General);
