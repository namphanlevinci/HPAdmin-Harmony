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
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getAll_Merchants,
  GetMerchant_byID,
  ViewProfile_Merchants
} from "../../../../../actions/merchants/actions";
import Popup from "reactjs-popup";
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
          NotificationManager.success(res.data.message, null, 800);
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
          <NotificationContainer />
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
        <div className="SettingsContent GeneralContent react-transition swipe-up">
          <Button className="btn btn-green" onClick={this._gotoEdit}>
            EDIT
          </Button>

          {this.props.MerchantProfile.isDisabled !== 1 ? (
            <Popup
              trigger={<Button className="btn btn-red">DISABLE</Button>}
              modal
              on="click"
              open={this.state.isOpenReject}
              onOpen={this.handleOpenReject}
              closeOnDocumentClick
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
                          NotificationManager.success(
                            res.data.message,
                            null,
                            800
                          );
                          setTimeout(() => {
                            this.props.GetMerchant_byID(ID);
                          }, 1000);
                          setTimeout(() => {
                            this.props.ViewProfile_Merchants(
                              this.props.getMerchant.Data
                            );
                            this.props.history.push(
                              "/app/merchants/profile/merchant-settings"
                            );
                          }, 1500);
                        } else {
                          NotificationManager.error(
                            res.data.message,
                            null,
                            800
                          );
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
                            type="submit"
                            className="btn btn-red"
                            onClick={this.handleCloseReject}
                          >
                            BACK
                          </Button>
                          <Button
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
            <Button className="btn btn-green" onClick={this._enable}>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
