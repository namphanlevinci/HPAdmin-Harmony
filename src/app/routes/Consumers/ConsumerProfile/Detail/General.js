import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ViewProfile_Merchants } from "../../../../../actions/merchants/actions";
import Popup from "reactjs-popup";
import axios from "axios";
import URL from "../../../../../url/url";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Token: "",
      isOpenReject: false,
      isOpenAccept: false
    };
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
  _goToEdit = () => {
    this.props.history.push("/app/consumers/profile/general/edit");
  };
  _enable = () => {
    const ID = this.props.MerchantProfile.userId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token }
    };
    axios.put(URL + "/user/restore/" + ID, null, config).then(res => {
      if (res.data.message === "Success") {
        NotificationManager.success(res.data.message, null, 800);
        setTimeout(() => {
          axios.get(URL + "/user/" + ID, config).then(res => {
            if (res.data.data !== null) {
              this.props.ViewProfile_Merchants(res.data.data);
              this.props.history.push("/app/consumers/profile/general");
            }
          });
        }, 1500);
      }
    });
  };
  async componentDidMount() {
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
  }
  render() {
    const e = this.props.MerchantProfile;
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
        </div>
      ) : (
        <Redirect to="/app/consumers/list" />
      );
    return (
      <div className="content ">
        {renderGeneral}
        <NotificationContainer />
        <div className="SettingsContent GeneralContent">
          <Button className="btn btn-green" onClick={this._goToEdit}>
            EDIT
          </Button>
          {e.isDisabled !== 1 ? (
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
                    const ID = this.props.MerchantProfile.userId;
                    let token = JSON.parse(this.state.Token);
                    const config = {
                      headers: { Authorization: "bearer " + token.token }
                    };
                    axios
                      .delete(URL + "/user/" + ID, {
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
                            axios.get(URL + "/user/" + ID, config).then(res => {
                              if (res.data.data !== null) {
                                this.props.ViewProfile_Merchants(res.data.data);
                                this.props.history.push(
                                  "/app/consumers/profile/general"
                                );
                              }
                            });
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
                        Are you sure you want to disable this user?
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
            <Button
              type="submit"
              className="btn btn-green"
              onClick={this._enable}
            >
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
const mapDispatchToProps = dispatch => ({
  ViewProfile_Merchants: payload => {
    dispatch(ViewProfile_Merchants(payload));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);
