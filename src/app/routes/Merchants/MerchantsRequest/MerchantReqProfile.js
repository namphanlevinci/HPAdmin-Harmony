import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MERCHANT_APPROVAL,
  MERCHANT_REJECT,
} from "../../../../actions/merchants/actions";
import { getAll_Merchants } from "../../../../actions/merchants/actions";
import { Checkbox } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";
import { store } from "react-notifications-component";
import { config } from "../../../../url/url";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";
import NumberFormat from "react-number-format";
import formatPhone from "../../../../util/formatPhone";

import "./MerchantReqProfile.css";
import "./MerchantsRequest.css";
import "bootstrap/js/src/collapse.js";

const URL = config.url.URL;

// PENDING MERCHANT PROFILE
class MerchantReqProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAccept: false,
      isOpenReject: false,
      merchantID: "",
      merchantToken: "",
      rejectReason: "",
      discountRate: "",
    };
  }
  _handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  goBack = () => {
    this.props.history.push("/app/merchants/pending");
  };
  handleEdit = () => {
    this.props.history.push("/app/merchants/pending/profile/edit");
  };

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
  componentWillReceiveProps(nextProps) {
    if (nextProps.ApprovalStatus !== this.props.ApprovalStatus) {
      this.props.getAll_Merchants();
      if (nextProps.ApprovalStatus.message === "Merchant code is exist!") {
        store.addNotification({
          title: "WARNING!",
          message: "MERCHANT ID IS ALREADY EXIST!",
          type: "warning",
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
      } else {
        this.setState({ showPopupAccept: false });
        store.addNotification({
          title: "SUCCESS!",
          message: "SUCCESS",
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
          this.props.history.push("/app/merchants/pending");
        }, 1000);
      }
    }
    if (nextProps.RejectStatus !== this.props.RejectStatus) {
      this.props.getAll_Merchants();
      this.setState({ showPopupReject: false });
      store.addNotification({
        title: "SUCCESS!",
        message: "SUCCESS",
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
        this.props.history.push("/app/merchants/pending");
      }, 1000);
    }
  }
  render() {
    const e = this.props.PendingProfile;
    let principalLength = this.props.PendingProfile?.principals?.length;

    // render Principal
    const renderPrincipal =
      e.principals !== undefined ? (
        e.principals.map((e, index) => {
          return (
            <div className="row" key={e.principalId}>
              {Number(principalLength) >= 2 ? (
                <div className="col-12">
                  <h3 style={{ color: "#4251af", fontWeight: "500" }}>
                    Principal {index + 1}
                  </h3>
                </div>
              ) : null}
              <div className="col-4">
                <label>Name*</label>
                <p>{e.firstName + " " + e.lastName}</p>
              </div>
              <div className="col-4">
                <label>Title/Position*</label>
                <p>{e.title}</p>
              </div>
              <div className="col-4">
                <label>Ownership(%)*</label>
                <p>{e.ownerShip}%</p>
              </div>
              <div className="col-4">
                <label>Home Phone</label>
                <p>{formatPhone(e.homePhone)}</p>
              </div>
              <div className="col-4">
                <label>Mobile Phone*</label>
                <p>{formatPhone(e.mobilePhone)}</p>
              </div>
              <div className="col-4">
                <label>Address*</label>
                <p>{e.address}</p>
              </div>
              <div className="col-4">
                <label>Social Security Number (SSN)*</label>
                <NumberFormat
                  value={e.fullSsn}
                  displayType={"text"}
                  thousandSeparator={true}
                  p
                  format="###-##-####"
                  mask="_"
                  renderText={(value) => <p>{value}</p>}
                />
              </div>
              <div className="col-4">
                <label>Date of Birth (mm/dd/yy)*</label>
                <p>{moment(e.birthDate).format("MM/DD/YYYY")}</p>
              </div>
              <div className="col-4">
                <label>Email Address*</label>
                <p>{e.email}</p>
              </div>
              <div className="col-4">
                <label>Driver License Number*</label>
                <p>{e.driverNumber}</p>
              </div>
              <div className="col-4">
                <label>State Issued*</label>
                <p>{e?.state?.name}</p>
              </div>
              <div className="col-6">
                <label>Driver License Picture*</label> <br />
                {
                  <a
                    href={`${URL}/file/${e?.fileId}?fileName=DriverLicense-${this.props.PendingProfile?.general?.doBusinessName}`}
                    download
                  >
                    <img
                      className="pending-image"
                      src={`${e?.imageUrl}`}
                      alt="driver license"
                    />
                  </a>
                }
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <label>&nbsp;- NO PRINCIPALS INFORMATION</label>
      );
    // render question
    const renderQuestion =
      e.business !== undefined ? (
        e.business.map((e) => {
          return (
            <div className="col-6" key={e.businessId}>
              <label>{e.question}</label> <br />
              <Checkbox checked={e.answer === false} />
              No
              <span className={e.answer ? "checked-red" : ""}>
                <Checkbox checked={e.answer === true} />
                Yes
              </span>
              <h5>Answer: {e.answerReply} </h5>
            </div>
          );
        })
      ) : (
        <label>&nbsp;- NO BUSINESS INFORMATION</label>
      );
    //render profile

    return (
      <div className="container-fluid content-list ">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.requestDetail" />}
          disableBreadcrumb={true}
        />
        <div className="content-body page-heading">
          <div className="header col-md-12">
            <h3>{"HP-" + e.merchantId}</h3>

            <span>
              <Button className="btn btn-red" onClick={this.goBack}>
                BACK
              </Button>

              <Button className="btn btn-red" onClick={this.handleEdit}>
                EDIT
              </Button>
              {/* REJECT BTN */}
              <Popup
                trigger={<Button className="btn btn-red">REJECT</Button>}
                modal
                on="click"
                open={this.state.isOpenReject}
                onOpen={this.handleOpenReject}
                closeOnDocumentClick
              >
                <a className="close" onClick={this.handleCloseReject}>
                  &times;
                </a>
                <div
                  style={{
                    backgroundColor: "#4251af",
                    height: "50px",
                    padding: "10px",
                    zIndex: "999",
                    color: "white",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "22px", textAlign: "center" }}>
                    Confirmation
                  </p>
                </div>
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
                      const ID = this.props.PendingProfile.merchantId;
                      const data = { reason, ID };
                      this.props.sendReject(data);
                    }}
                  >
                    {({ values, _handleChange, isSubmitting }) => (
                      <div className="rejectInput">
                        <h2 className="title">REASONS FOR REJECTION</h2>
                        <Form>
                          <Field
                            type="textarea"
                            name="rejectReason"
                            component="textarea"
                            placeholder="Please enter your reason."
                          />
                          <ErrorMessage
                            style={{
                              color: "#4251af",
                              fontWeight: "400",
                              fontSize: "18px",
                            }}
                            name="rejectReason"
                            component="div"
                          />
                          <div>
                            <Button
                              type="submit"
                              className="btn btn-red"
                              onClick={this.handleCloseReject}
                            >
                              BACK
                            </Button>
                            <Button type="submit" className="btn btn-green">
                              CONFIRM
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}
                  </Formik>
                </span>
              </Popup>
              {/* ACCEPT BTN */}

              <Popup
                trigger={<Button className="btn btn-green"> ACCEPT </Button>}
                modal
                on="click"
                open={this.state.isOpenAccept}
                onOpen={this.handleOpenAccept}
                closeOnDocumentClick
              >
                <span>
                  <a className="close" onClick={this.handleCloseAccept}>
                    &times;
                  </a>
                  <div
                    style={{
                      backgroundColor: "#4251af",
                      height: "50px",
                      padding: "10px",
                      zIndex: "999",
                      color: "white",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "22px", textAlign: "center" }}>
                      Confirmation
                    </p>
                  </div>
                  <h3 className="title">
                    ARE YOU SURE YOU WANT TO ACCEPT THIS MERCHANT?
                  </h3>
                  <Formik
                    initialValues={{
                      merchantID: "",
                      // merchantToken: "",
                      fee: "",
                      discountRate: "",
                    }}
                    validate={(values) => {
                      let errors = {};
                      if (!values.merchantID) {
                        errors.merchantID = "Required";
                      }
                      // } else if (!values.merchantToken) {
                      // errors.merchantToken = 'Required';
                      // }
                      else if (!values.fee) {
                        errors.fee = "Required";
                      } else if (!values.discount) {
                        errors.discount = "Required";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      const ID = this.props.PendingProfile.merchantId;
                      const merchantCode = values.merchantID;
                      // const merchantToken = values.merchantToken;
                      const transactionsFee = values.fee;
                      const discountRate = values.discount;
                      const data = {
                        transactionsFee,
                        merchantCode,
                        ID,
                        discountRate,
                      };
                      this.props.sendApproval(data);
                    }}
                  >
                    {({ lol }) => (
                      <Form
                        style={{ textAlign: "center" }}
                        className="InputBox"
                      >
                        <div style={styles.div}>
                          <label>Merchant ID</label>
                          <br />
                          <Field type="number" name="merchantID" />
                          <ErrorMessage
                            style={{
                              color: "#4251af",
                              fontWeight: "400",
                              fontSize: "18px",
                            }}
                            name="merchantID"
                            component="div"
                          />
                        </div>
                        <div style={styles.div}>
                          <label>Transaction Fee</label> <br />
                          <Field type="number" name="fee" />
                          <ErrorMessage
                            style={{
                              color: "#4251af",
                              fontWeight: "400",
                              fontSize: "18px",
                            }}
                            name="fee"
                            component="div"
                          />
                        </div>
                        <div style={styles.div}>
                          <label>Discount Rate</label> <br />
                          <Field type="number" name="discount" />
                          <ErrorMessage
                            style={{
                              color: "#4251af",
                              fontWeight: "400",
                              fontSize: "18px",
                            }}
                            name="discount"
                            component="div"
                          />
                        </div>
                        <br />
                        <div
                          style={{ textAlign: "center", paddingTop: "10px" }}
                        >
                          <Button
                            type="submit"
                            className="btn btn-red"
                            onClick={this.handleCloseAccept}
                          >
                            NO
                          </Button>
                          <Button type="submit" className="btn btn-green">
                            YES
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </span>
              </Popup>
            </span>
          </div>
          <hr />
          <div className="content react-transition swipe-right">
            <div className="container-fluid">
              <h2 style={styles.h2}>General Information</h2>
              <div className="row justify-content-between">
                <div className="col-4">
                  <label>Legal Business Name*</label>
                  <p>
                    {e.general !== null ? e.general.legalBusinessName : null}
                  </p>
                </div>
                <div className="col-4">
                  <label>Doing Business As* (DBA)</label>
                  <p>{e.general !== null ? e.general.doBusinessName : null}</p>
                </div>
                <div className="col-4">
                  <label>Federal Tax ID*</label>
                  <p>{e.taxId}</p>
                </div>
                <div className="col-4">
                  <label>Business Address* (no P.O. Boxes)</label>
                  <p>{e.general !== null ? e.general.address : null}</p>
                </div>
                <div className="col-4">
                  <label>Zip Code*</label>
                  <p>{e.zip}</p>
                </div>
                <div className="col-4">
                  <label>Business Phone Number*</label>
                  <p>{e.phone}</p>
                </div>
                <div className="col-4">
                  <label>Contact Email Address*</label>
                  <p>{e.email}</p>
                </div>
              </div>
              {/* <h2 style={styles.h2}>Representative Information</h2> */}
              <div className="row">
                <div className="col-4">
                  <label>Contact Name*</label>
                  <p>
                    {e.general !== null
                      ? e.general.firstName + " " + e.general.lastName
                      : null}
                  </p>
                </div>
                <div className="col-4">
                  <label>Title/Position*</label>
                  <p>{e.general !== null ? e.general.title : null}</p>
                </div>
                <div className="col-4">
                  <label>Contact Phone Number*</label>
                  <p>{e.general !== null ? e.general.phoneContact : null}</p>
                </div>
              </div>
              <h2 style={styles.h2}>Business Information</h2>
              <div className="row">{renderQuestion}</div>
              <h2 style={styles.h2}>Bank Information</h2>
              <div className="row">
                <div className="col-3">
                  <label>Account Holder Name*</label>
                  <p>{e?.businessBank?.accountHolderName}</p>
                </div>
                <div className="col-3">
                  <label>Bank Name*</label>
                  <p>{e?.businessBank?.name}</p>
                </div>
                <div className="col-3">
                  <label>Routing Number(ABA)*</label>
                  <p>
                    {e.businessBank !== null
                      ? e.businessBank.routingNumber
                      : null}
                  </p>
                </div>
                <div className="col-3">
                  <label>Account Number (DDA)*</label>
                  <p>
                    {e.businessBank !== null
                      ? e.businessBank.accountNumber
                      : null}
                  </p>
                </div>
                <div className="col-4">
                  <label>Void Check*</label>

                  {e.businessBank !== null ? (
                    <a
                      href={`${URL}/file/${
                        e?.businessBank?.fileId
                      }?fileName=VoidCheck-${(e?.general?.doBusinessName).trim()}`}
                      download
                    >
                      <img
                        className="pending-image"
                        src={`${e.businessBank.imageUrl}`}
                        alt="void check"
                      />
                    </a>
                  ) : null}
                </div>
              </div>
              <h2 style={styles.h2}>Principal Information</h2>
              {renderPrincipal}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  PendingProfile: state.ViewMerchant_Request,
  userLogin: state.userReducer.User,
  ApprovalStatus: state.Approval,
  RejectStatus: state.Reject,
  checkPermission: state.userReducer.checkPermission,
});
const mapDispatchToProps = (dispatch) => {
  return {
    sendApproval: (payload) => {
      dispatch(MERCHANT_APPROVAL(payload));
    },
    getAll_Merchants: (payload) => {
      dispatch(getAll_Merchants());
    },
    sendReject: (payload) => {
      dispatch(MERCHANT_REJECT(payload));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantReqProfile)
);

const styles = {
  h2: {
    padding: "10px 0px",
    color: "#4251af",
    fontWeight: "400",
    margin: "0",
  },
  div: {
    marginLeft: "40%",
    textAlign: "left",
    marginBottom: "10px",
  },
};
