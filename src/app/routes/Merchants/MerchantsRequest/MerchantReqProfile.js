import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MERCHANT_APPROVAL,
  MERCHANT_REJECT,
  SET_PENDING_STATUS,
} from "../../../../actions/merchants/actions";
import { Checkbox } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";
import { config } from "../../../../url/url";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";

import NumberFormat from "react-number-format";
import formatPhone from "../../../../util/formatPhone";
import checkPermission from "../../../../util/checkPermission";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  handleChange(event) {
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

  handleSetStatus = (event) => {
    const ID = this.props.PendingProfile.merchantId;
    const status = event.target.value;
    const payload = { ID, status };
    this.props.setStatus(payload);
  };

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
                <label>Ownership* (%)</label>
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
                <label>Social Security Number* (SSN)</label>
                <NumberFormat
                  value={e.ssn}
                  displayType={"text"}
                  thousandSeparator={true}
                  p
                  format="###-##-####"
                  mask="_"
                  renderText={(value) => <p>{value}</p>}
                />
              </div>
              <div className="col-4">
                <label>Date of Birth* (mm/dd/yy)</label>
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
            <h3 style={{ marginBottom: "0px" }}>{"HP-" + e.merchantId}</h3>

            <span>
              <Button className="btn btn-red" onClick={this.goBack}>
                BACK
              </Button>
              {checkPermission(4) && (
                <Button className="btn btn-red" onClick={this.handleEdit}>
                  EDIT
                </Button>
              )}
              {/* REJECT BTN */}
              {checkPermission(5) && (
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
                        this.props.RejectMerchant(data);
                      }}
                    >
                      {({ values, handleChange, isSubmitting }) => (
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
              )}
              {/* ACCEPT BTN */}
              {checkPermission(6) && (
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
                        this.props.ApproveMerchant(data);
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
                            <Field name="merchantID" type="number" />
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
              )}
            </span>
          </div>
          <hr />
          <div className="pending_status ">
            <Select
              value={e.status}
              onChange={this.handleSetStatus}
              displayEmpty
              className="status_select"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Handling</MenuItem>
            </Select>

            <h4>
              By{" "}
              <span style={{ fontWeight: 500 }}>
                {e.handlingActivities[0].waUserName}
              </span>
            </h4>
            <h4>
              Date/Time:{" "}
              {moment(e.handlingActivities[0].createDate).format(
                "MM/DD/YYYY - hh:mm A"
              )}
            </h4>
          </div>
          <hr />
          <div className="content react-transition swipe-right">
            <div className="container-fluid">
              <h2 style={styles.h2}>General Information</h2>
              <div className="row">
                <div className="col-4">
                  <label>Legal Business Name*</label>
                  <p>{e?.general?.legalBusinessName}</p>
                </div>
                <div className="col-4">
                  <label>Doing Business As* (DBA)</label>
                  <p>{e?.general?.doBusinessName}</p>
                </div>
                <div className="col-4">
                  <label>Federal Tax ID*</label>
                  <p>{e?.taxId}</p>
                </div>
                <div className="col-4">
                  <label>Business Address* (no P.O. Boxes)</label>
                  <p>{e?.general?.address}</p>
                </div>
                <div className="col-3">
                  <label>City*</label>
                  <p>{e?.general?.city}</p>
                </div>
                <div className="col-3">
                  <label>State Issued*</label>
                  <p>{e?.state?.name}</p>
                </div>
                <div className="col-2">
                  <label>Zip Code*</label>
                  <p>{e.zip}</p>
                </div>
                {/* DBA ADDRESS */}
                <div className="col-4">
                  <label>DBA Address* </label>
                  <p>{e?.general?.dbaAddress?.Address}</p>
                </div>
                <div className="col-3">
                  <label>City*</label>
                  <p>{e?.general?.dbaAddress?.City}</p>
                </div>
                <div className="col-3">
                  <label>State Issued*</label>
                  <p>{e?.general?.dbaAddress?.StateName}</p>
                </div>
                <div className="col-2">
                  <label>Zip Code*</label>
                  <p>{e?.general?.dbaAddress?.Zip}</p>
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
                  <label> Routing Number* (ABA)</label>
                  <p>
                    {e.businessBank !== null
                      ? e.businessBank.routingNumber
                      : null}
                  </p>
                </div>
                <div className="col-3">
                  <label>Account Number* (DDA)</label>
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
  PendingProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,

  checkPermission: state.userReducer.checkPermission,
});
const mapDispatchToProps = (dispatch) => {
  return {
    ApproveMerchant: (payload) => {
      dispatch(MERCHANT_APPROVAL(payload));
    },
    RejectMerchant: (payload) => {
      dispatch(MERCHANT_REJECT(payload));
    },
    setStatus: (payload) => {
      dispatch(SET_PENDING_STATUS(payload));
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
