import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ViewProfile_Merchants } from "../../../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";
import axios from "axios";
import CheckPermissions from "../../../../../util/checkPermission";

import { config } from "../../../../../url/url";

import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import "./Consumer.css";

const URL = config.url.URL;
const upFile = config.url.upFile;

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Token: "",
      isOpenReject: false,
      isOpenAccept: false,
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
    const ID = this.props.MerchantProfile?.userId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token },
    };
    axios.put(URL + "/user/restore/" + ID, null, config).then((res) => {
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
            onScreen: true,
          },
          width: 250,
        });
        setTimeout(() => {
          axios.get(URL + "/user/" + ID, config).then((res) => {
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
    const renderGeneral = (
      // e.email !== undefined ? (
      <div className="react-transition swipe-right">
        <div className="container-fluid">
          <h2 style={{ paddingBottom: "10px" }}>General Information</h2>

          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-sm-4 col-md-2">
              <label>First Name</label>
              <p style={styles.p}>
                {e.firstName !== null ? e.firstName : null}
              </p>
            </div>
            <div className="col-sm-4 col-md-2">
              <label>Last Name</label>
              <p style={styles.p}>{e.lastName !== null ? e.lastName : null}</p>
            </div>
            <div className="col-sm-4  col-md-2">
              <label>Phone Number</label>
              <p style={styles.p}>{e.phone !== null ? e.phone : null}</p>
            </div>
            <div className="col-sm-12 col-md-6">
              <label>Email</label>
              <p style={styles.p}>{e.email !== null ? e.email : null}</p>
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
              className="col-4 "
              name="totalAmountLimit"
              value={e.limitAmount}
              onChange={this._handleChange}
              disabled
            />
          </div>
        </div>
      </div>
    );

    return (
      <div className="content ">
        {renderGeneral}
        <div
          className="SettingsContent general-content"
          style={{ marginTop: "20px" }}
        >
          {CheckPermissions(32) && (
            <Button className="btn btn-green" onClick={this._goToEdit}>
              EDIT
            </Button>
          )}

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
                  validate={(values) => {
                    let errors = {};
                    if (!values.rejectReason) {
                      errors.rejectReason = "Required";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    const reason = values.rejectReason;
                    const ID = this.props.MerchantProfile?._original?.userId;
                    let token = JSON.parse(this.state.Token);
                    const config = {
                      headers: { Authorization: "bearer " + token.token },
                    };
                    axios
                      .delete(URL + "/user/" + ID, {
                        headers: {
                          Authorization: `Bearer ${token.token}`,
                        },
                        data: { reason },
                      })
                      .then(async (res) => {
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
                              onScreen: true,
                            },
                            width: 250,
                          });
                          setTimeout(() => {
                            axios
                              .get(URL + "/user/" + ID, config)
                              .then((res) => {
                                if (res.data.data !== null) {
                                  this.props.ViewProfile_Merchants(
                                    res.data.data
                                  );
                                  this.props.history.push(
                                    "/app/consumers/profile/general"
                                  );
                                }
                              });
                          }, 1500);
                        } else {
                          store.addNotification({
                            title: "ERROR!",
                            message: `${res.data.message}`,
                            type: "danger",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                              duration: 5000,
                              onScreen: true,
                            },
                            width: 250,
                          });
                        }
                      });
                  }}
                >
                  {({ values, _handleChange, isSubmitting }) => (
                    <div className="rejectInput">
                      <p className="close" onClick={this.handleCloseReject}>
                        &times;
                      </p>
                      <div
                        className="header"
                        style={{
                          backgroundColor: "#4251af",
                          height: "50px",
                          padding: "10px",
                          zIndex: "999",
                          color: "white",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "22px",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "400",
                          }}
                        >
                          Warning!
                        </p>
                      </div>
                      <Form style={styles.Form}>
                        <h2 style={{ color: "black" }}>
                          Are you sure you want to disable this consumer?
                        </h2>
                        <Field
                          type="textarea"
                          name="rejectReason"
                          component="textarea"
                          placeholder="Please enter your reason."
                        />
                        <ErrorMessage name="rejectReason" component="div" />
                        <div style={styles.btnDiv}>
                          <Button
                            type="submit"
                            className="btn btn-green"
                            onClick={this.onSubmit}
                          >
                            CONFIRM
                          </Button>

                          <Button
                            type="submit"
                            className="btn btn-red"
                            onClick={this.handleCloseReject}
                          >
                            CANCEL
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

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(General);

const styles = {
  p: { fontWeight: 400, color: "black" },
  Form: {
    marginTop: "10px",
  },
  btnDiv: {
    marginTop: "10px",
  },
};
