import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAll_Merchants,
  GetMerchant_byID,
  ViewProfile_Merchants
} from "../../../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import axios from "axios";
import Button from "@material-ui/core/Button";
import URL from "../../../../../url/url";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "./Detail.css";
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
      discountRate: "",
      pointRate: ""
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
      discountRate: data.discountRate,
      pointRate: data?.pointRate
    });
  }
  _toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };
  _goBack = () => {
    this.props.getAll_Merchants();
    this.props.history.push("/app/merchants/profile/settings");
  };
  _updateSettings = () => {
    const ID = this.props.MerchantProfile.merchantId;
    const {
      merchantCode,
      merchantToken,
      transactionsFee,
      totalAmountLimit,
      discountRate,
      pointRate
    } = this.state;
    axios
      .put(
        URL + "/merchant/updatesetting/" + ID,
        {
          merchantCode,
          merchantToken,
          transactionsfee: transactionsFee,
          totalAmountLimit,
          discountRate,
          pointRate
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
          }
        }
      )
      .then(async res => {
        if (res.data.message === "Success") {
          store.addNotification({
            title: "SUCCESS!",
            message: `${res.data.message}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            },
            width: 250
          });
          setTimeout(() => {
            this.props.GetMerchant_byID(ID);
          }, 1000);
          setTimeout(() => {
            this.props.ViewProfile_Merchants(this.props.getMerchant.Data);
            this.props.history.push("/app/merchants/profile/settings");
          }, 2000);
        } else {
          store.addNotification({
            title: "ERROR!",
            message: `${res.data.message}`,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            },
            width: 250
          });
        }
      });
  };
  render() {
    return (
      <div className="container-fuild react-transition swipe-up">
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
        <div className="container-fuild">
          <div className="GeneralContent SettingsContent">
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
                  <tr>
                    <td>
                      <label>Point Rate:</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="pointRate"
                        value={this.state.pointRate}
                        onChange={this._handleChange}
                        max={100}
                        min={1}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditSettings);
