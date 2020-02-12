import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getAll_Merchants,
  GetMerchant_byID,
  ViewProfile_Merchants
} from "../../../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import Button from "@material-ui/core/Button";
import axios from "axios";
import URL from "../../../../../url/url";
import Popup from "reactjs-popup";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "./Detail.css";
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsFee: "",
      merchantCode: "",
      merchantToken: "",
      totalAmountLimit: "",
      ID: "",
      Token: "",
      discountRate: "",
      isOpenReject: false,
      isOpenAccept: false
    };
  }
  _gotoEdit = () => {
    this.props.history.push("/app/merchants/profile/settings/edit");
  };
  async componentDidMount() {
    const data = this.props.MerchantProfile;
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
    this.setState({
      merchantCode: data.merchantCode,
      merchantToken: data.merchantToken,
      transactionsFee: data.transactionsFee,
      totalAmountLimit: data.totalAmountLimit,
      discountRate: data.discountRate,
      ID: data.merchantId,
      Token: Token
    });
  }
  handleOpenAccept = () => {
    this.setState({ isOpenAccept: true });
  };

  handleCloseAccept = () => {
    this.setState({ isOpenAccept: false });
  };
  handleOpenReject = () => {
    this.setState({ isOpenReject: true });
  };

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };
  _toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };

  _enable = () => {
    const { ID } = this.state;
    let token = JSON.parse(this.state.Token);
    axios
      .put(URL + "/merchant/enable/" + ID, null, {
        headers: { Authorization: `Bearer ${token.token}` }
      })
      .then(res => {
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
        }
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container react-transition swipe-up">
          <h2>Settings</h2>
          <div className="container">
            <div className="SettingsContent">
              <div>
                <h3>The charged percent fee of credit card transactions</h3>
                <div>
                  <label>
                    Transactions Fee:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.transactionsFee}
                    </span>
                  </label>
                </div>
                <div>
                  <label>
                    Merchant ID:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.merchantCode}
                    </span>
                  </label>
                </div>
                <div>
                  <label>
                    Merchant Token:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.merchantToken}
                    </span>
                  </label>
                </div>
                <div>
                  <label>
                    Discount Rate:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.discountRate}
                    </span>
                  </label>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="SettingsContent GeneralContent react-transition swipe-up">
            <Button className="btn btn-green" onClick={this._gotoEdit}>
              EDIT
            </Button>
          </div>
          {this.props.MerchantProfile.isDisabled !== 1 ? (
            <Popup
              trigger={
                <Button
                  style={{
                    color: "#666",
                    backgroundColor: "#eee",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: "12px",
                    padding: "10px 30px",
                    borderRadius: "5px",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    borderBottomWidth: "3px",
                    fontWeight: "900",
                    marginLeft: "0px"
                  }}
                >
                  DISABLE
                </Button>
              }
              modal
              on="click"
              open={this.state.isOpenReject}
              onOpen={this.handleOpenReject}
              closeOnDocumentClick
              style={{ top: "-300px" }}
            >
              <span>
                <Formik
                  initialValues={{ rejectReason: "" }}
                  validate={values => {
                    let errors = {};
                    if (!values.rejectReason) {
                      errors.rejectReason = "Required";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    const reason = values.rejectReason;
                    const { ID } = this.state;
                    let token = JSON.parse(this.state.Token);
                    axios
                      .delete(URL + "/merchant/" + ID, {
                        headers: {
                          Authorization: `Bearer ${token.token}`
                        },
                        data: { reason }
                      })
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
                            this.props.ViewProfile_Merchants(
                              this.props.getMerchant.Data
                            );
                            this.props.history.push(
                              "/app/merchants/profile/settings"
                            );
                          }, 1500);
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
                  }}
                >
                  {({ values, _handleChange, isSubmitting }) => (
                    <div className="rejectInput">
                      <h2 className="title">
                        Are you sure you want to disable this merchant?
                      </h2>
                      <Form>
                        <Field
                          type="textarea"
                          name="rejectReason"
                          component="textarea"
                          placeholder="Please enter your reason."
                        />
                        <ErrorMessage name="rejectReason" component="div" />
                        <div>
                          <Button
                            style={{
                              color: "#666",
                              backgroundColor: "#eee",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                              fontSize: "12px",
                              padding: "10px 30px",
                              borderRadius: "5px",
                              border: "1px solid rgba(0, 0, 0, 0.3)",
                              borderBottomWidth: "3px",
                              fontWeight: "900",
                              marginLeft: "0px"
                            }}
                            type="submit"
                            className="btn btn-red"
                            onClick={this.handleCloseReject}
                          >
                            BACK
                          </Button>
                          <Button
                            style={{
                              color: "white",
                              backgroundColor: "#0074d9",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                              fontSize: "12px",
                              padding: "10px 30px",
                              borderRadius: "5px",
                              border: "1px solid rgba(0, 0, 0, 0.3)",
                              borderBottomWidth: "3px",
                              fontWeight: "900",
                              marginLeft: "0px"
                            }}
                            type="submit"
                            className="btn btn-green"
                            onClick={this.onSubmit}
                          >
                            COMFIRM
                          </Button>
                        </div>
                      </Form>
                    </div>
                  )}
                </Formik>
              </span>
            </Popup>
          ) : (
            <Button
              style={{
                color: "#666",
                backgroundColor: "#eee",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: "12px",
                padding: "10px 30px",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                borderBottomWidth: "3px",
                fontWeight: "900",
                marginLeft: "0px"
              }}
              onClick={this._enable}
            >
              ENABLE
            </Button>
          )}
        </div>
      </React.Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
