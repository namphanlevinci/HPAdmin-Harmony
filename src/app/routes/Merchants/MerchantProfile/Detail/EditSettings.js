import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "./Detail.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  getAll_Merchants,
  GetMerchant_byID,
  ViewProfile_Merchants
} from "../../../../../actions/merchants/actions";
import Button from "@material-ui/core/Button";
import URL from "../../../../../url/url";

class EditSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsFee: "",
      merchantCode: "",
      merchantToken: "",
      totalAmountLimit: "",
      limit: "10000",
      update: false,
      discountRate: ""
    };
  }
  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  componentDidMount() {
    const data = this.props.MerchantProfile;
    // console.log("DATA", data);
    this.setState({
      merchantCode: data.merchantCode,
      merchantToken: data.merchantToken,
      transactionsFee: data.transactionsFee,
      totalAmountLimit: data.totalAmountLimit,
      discountRate: data.discountRate
    });
  }
  _toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };
  _goBack = () => {
    this.props.getAll_Merchants();
    this.props.history.push(
      "/app/merchants/merchant-profile/merchant-settings"
    );
  };
  _updateSettings = () => {
    const ID = this.props.MerchantProfile.merchantId;
    const {
      merchantCode,
      merchantToken,
      transactionsFee,
      totalAmountLimit,
      discountRate
    } = this.state;
    axios
      .put(
        URL + "/merchant/updatesetting/" + ID,
        {
          merchantCode,
          merchantToken,
          transactionsfee: transactionsFee,
          totalAmountLimit,
          discountRate
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
          }
        }
      )
      .then(async res => {
        if (res.data.message === "Success") {
          NotificationManager.success(res.data.message, null, 600);
          setTimeout(() => {
            this.props.GetMerchant_byID(ID);
          }, 1000);
          setTimeout(() => {
            this.props.ViewProfile_Merchants(this.props.getMerchant.Data);
            this.props.history.push(
              "/app/merchants/merchant-profile/merchant-settings"
            );
          }, 1500);
        } else {
          NotificationManager.error("Something went wrong, please try again.");
        }
      });
  };
  render() {
    return (
      <div className="container react-transition swipe-up">
        <NotificationContainer />
        {this.state.update !== false ? (
          <div className="POPUP">
            <div className="POPUP-INNER2 SettingsPopup2">
              <div className="SettingsInner2">
                <h3>Confirmation</h3>
              </div>
              <div className="settingText">
                <h4>
                  Do you want to change the charged percent fee of credit card
                  for this merchant?
                </h4>
              </div>
              <Button className="btn btn-red" onClick={this._toggleConfirm}>
                NO
              </Button>
              <Button className="btn btn-green" onClick={this._updateSettings}>
                YES
              </Button>
            </div>
          </div>
        ) : null}
        <h2>Settings</h2>
        <div className="container">
          <div className="SettingsContent">
            <div>
              <h3>The charged percent fee of credit card transactions</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>Transactions Fee:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="transactionsFee"
                        value={this.state.transactionsFee}
                        onChange={this._handleChange}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Merchant ID:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="merchantCode"
                        value={this.state.merchantCode}
                        onChange={this._handleChange}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Merchant Token:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="merchantToken"
                        value={this.state.merchantToken}
                        onChange={this._handleChange}
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
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div> */}
            {/* <Button className="btn btn-green" onClick={this._toggleConfirm}>
                UPDATE
              </Button> */}
            {/* </div> */}
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
              type="number"
              className="col-4 form-control"
              name="totalAmountLimit"
              value={this.state.totalAmountLimit}
              onChange={this._handleChange}
            />
          </div> */}
        </div>
        <div className="SettingsContent GeneralContent">
          <Button className="btn btn-green" onClick={this._updateSettings}>
            SAVE
          </Button>
          <Button className="btn btn-red" onClick={this._goBack}>
            CANCEL
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
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
    GetMerchant_byID: ID => {
      dispatch(GetMerchant_byID(ID));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSettings);
