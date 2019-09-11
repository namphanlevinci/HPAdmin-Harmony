import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "./Detail.css";
import Button from "@material-ui/core/Button";
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsFee: "",
      merchantCode: "",
      merchantToken: "",
      totalAmountLimit: ""
    };
  }
  _gotoEdit = () => {
    this.props.history.push("/app/merchants/merchant-profile/update-settings");
  };
  componentDidMount() {
    // console.log("this.props.MerchantProfile", this.props.MerchantProfile);
    const data = this.props.MerchantProfile;
    this.setState({
      merchantCode: data.merchantCode,
      merchantToken: data.merchantToken,
      transactionsFee: data.transactionsFee,
      totalAmountLimit: data.totalAmountLimit
    });
  }
  _toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };

  render() {
    return (
      <div className="container react-transition swipe-up">
        <h2>Settings</h2>
        <div className="container">
          <div className="SettingsContent">
            <div>
              <h3>The charged percent fee of credit card transactions</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>Transactions Fee (%):</label>
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
                </tbody>
              </table>
            </div>
            <br />
          </div>
          <h3>Daily transactions limit (unit $)</h3>
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
          </div>
        </div>
        <div className="SettingsContent GeneralContent">
          <Button className="btn btn-green" onClick={this._gotoEdit}>
            EDIT
          </Button>
          <Button className="btn btn-green">DISABLE</Button>
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
