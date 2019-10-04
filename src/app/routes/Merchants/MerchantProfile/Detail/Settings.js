import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "./Detail.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import URL from "../../../../../url/url";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsFee: "",
      merchantCode: "",
      merchantToken: "",
      totalAmountLimit: "",
      ID: "",
      User: "",
      discountRate: ""
    };
  }
  _gotoEdit = () => {
    this.props.history.push("/app/merchants/merchant-profile/update-settings");
  };
  componentDidMount() {
    const data = this.props.MerchantProfile;
    const User = localStorage.getItem("User_login");
    this.setState({
      merchantCode: data.merchantCode,
      merchantToken: data.merchantToken,
      transactionsFee: data.transactionsFee,
      totalAmountLimit: data.totalAmountLimit,
      discountRate: data.discountRate,
      ID: data.merchantId,
      User: User
    });
  }
  _toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };
  _disable = () => {
    const { ID } = this.state;
    let data = JSON.parse(this.state.User);
    const UserToken = data.token;
    axios
      .delete(URL + "/merchant/" + ID, {
        headers: { Authorization: `Bearer ${UserToken}` }
      })
      .then(res => {
        NotificationManager.success(res.data.message);
      });
  };

  _enable = () => {
    const { ID } = this.state;
    let data = JSON.parse(this.state.User);
    const UserToken = data.token;
    axios
      .put(URL + "/merchant/enable/" + ID, null, {
        headers: { Authorization: `Bearer ${UserToken}` }
      })
      .then(res => {
        NotificationManager.success(res.data.message);
      });
  };
  render() {
    return (
      <div className="container react-transition swipe-up">
        <NotificationContainer />
        <h2>Settings</h2>
        <div className="container">
          <div className="SettingsContent">
            <div>
              <h3>The charged percent fee of credit card transactions</h3>
              <table className="settingTable">
                <tbody>
                  <tr>
                    <td>
                      <label>Transactions Fee:</label>
                    </td>
                    <td>
                      <input
                        name="transactionsFee"
                        value={this.state.transactionsFee}
                        onChange={this._handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Merchant ID:</label>
                    </td>
                    <td>
                      <input
                        type="password"
                        name="merchantCode"
                        value={this.state.merchantCode}
                        onChange={this._handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Merchant Token:</label>
                    </td>
                    <td>
                      <input
                        type="password"
                        name="merchantToken"
                        value={this.state.merchantToken}
                        onChange={this._handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Discount Rate:</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="discountRate"
                        value={this.state.discountRate}
                        onChange={this._handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </div>
          {/* <h3>Daily transactions limit (unit $)</h3>
          <label>
            The HarmonyPay system will alert any user and pervent any use
            involved monetary transfer or transfers that are:
          </label>
          <label>
            a) More than $10,000 in total from either cash-in or cash-out.
          </label>
          <br />
          <label>b) Is conducted by the same person.</label>
          <br />
          <label>c) Is conducted on the same business day.</label>
          <br />
          <div className="input-group">
            <input
              type="text"
              className="col-4 form-control"
              name="totalAmountLimit"
              value={this.state.totalAmountLimit}
              onChange={this._handleChange}
              disabled
            />
          </div> */}
        </div>
        <div className="SettingsContent GeneralContent">
          <Button className="btn btn-green" onClick={this._gotoEdit}>
            EDIT
          </Button>

          {this.props.MerchantProfile.isDisabled === 0 ? (
            <Button className="btn btn-green" onClick={this._disable}>
              DISABLE
            </Button>
          ) : (
            <Button className="btn btn-green" onClick={this._enable}>
              ENABLE
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default connect(mapStateToProps)(Settings);
