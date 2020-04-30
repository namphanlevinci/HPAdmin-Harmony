import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MERCHANT_APPROVAL,
  MERCHANT_REJECT
} from "../../../../actions/merchants/actions";
import { getAll_Merchants } from "../../../../actions/merchants/actions";
import { Checkbox } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter, Redirect } from "react-router-dom";
import { store } from "react-notifications-component";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";

import "./MerchantReqProfile.css";
import "./MerchantsRequest.css";
import "bootstrap/js/src/collapse.js";

class MerchantReqProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAccept: false,
      isOpenReject: false,
      merchantID: "",
      merchantToken: "",
      rejectReason: "",
      discountRate: ""
    };
  }
  _handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
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
            onScreen: true
          },
          width: 250
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
            onScreen: true
          },
          width: 250
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
          onScreen: true
        },
        width: 250
      });
      setTimeout(() => {
        this.props.history.push("/app/merchants/pending");
      }, 1000);
    }
  }
  render() {
    const e = this.props.PendingProfile;
    //! render Principal
    const renderPrincipal =
      e.principals !== undefined ? (
        e.principals.map(e => {
          return (
            <div className="row" key={e.principalId}>
              <div className="col-4">
                <h4>Name*</h4>
                <p>{e.firstName + " " + e.lastName}</p>
              </div>
              <div className="col-4">
                <h4>Title/Position*</h4>
                <p>{e.title}</p>
              </div>
              <div className="col-4">
                <h4>Ownership(%)*</h4>
                <p>{e.ownerShip}%</p>
              </div>
              <div className="col-4">
                <h4>Home Phone</h4>
                <p>{e.homePhone}</p>
              </div>
              <div className="col-4">
                <h4>Mobile Phone*</h4>
                <p>{e.mobilePhone}</p>
              </div>
              <div className="col-4">
                <h4>Address*</h4>
                <p>{e.address}</p>
              </div>
              <div className="col-4">
                <h4>Social Security Number (SSN)*</h4>
                <p>{e.fullSsn}</p>
              </div>
              <div className="col-4">
                <h4>Date of Birth (mm/dd/yy)*</h4>
                <p>{moment(e.birthDate).format("MM/DD/YYYY")}</p>
              </div>
              <div className="col-4">
                <h4>Email Address*</h4>
                <p>{e.email}</p>
              </div>
              <div className="col-4">
                <h4>Driver License Number*</h4>
                <p>{e.driverNumber}</p>
              </div>
              <div className="col-4">
                <h4>State Issued*</h4>
                <p>{e.state !== undefined ? e.state.name : null}</p>
              </div>
              <div className="col-6">
                <h4>Driver License Picture</h4>
                {
                  <img
                    style={{ width: "250px", height: "200px" }}
                    src={`${e.imageUrl}`}
                    alt="void check"
                  />
                }
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <h4>&nbsp;- NO PRINCIPALS INFORMATION</h4>
      );
    //! render question
    const renderQuestion =
      e.business !== undefined ? (
        e.business.map(e => {
          return (
            <div className="col-md-6" key={e.businessId}>
              <h4>{e.question}</h4>
              <Checkbox checked={e.answer === false} />
              No <Checkbox checked={e.answer === true} /> Yes
              <h5>Answer: {e.answerReply} </h5>
            </div>
          );
        })
      ) : (
        <h4>&nbsp;- NO BUSINESS INFORMATION</h4>
      );
    //render profile
    const renderPendingProfile =
      e.merchantId !== undefined ? (
        <div className="container-fluid PendingList ">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.requestDetail" />}
          />
          <div className="PendingLBody page-heading">
            <div className="PDL-Btn col-md-12">
              <h3>{"HP-" + e.merchantId}</h3>
              <span>
                {/* REJECT BTN */}
                <Popup
                  trigger={<Button className="btn btn-red">REJECT</Button>}
                  modal
                  on="click"
                  open={this.state.isOpenReject}
                  onOpen={this.handleOpenReject}
                  closeOnDocumentClick
                >
                  <span>
                    {" "}
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
                                color: "#0764b0",
                                fontWeight: "500",
                                fontSize: "18px"
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
                                COMFIRM
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
                    {" "}
                    <h2 className="title">
                      ARE YOU SURE YOU WANT TO ACCEPT THIS MERCHANT?
                    </h2>
                    <Formik
                      initialValues={{
                        merchantID: "",
                        // merchantToken: "",
                        fee: "",
                        discountRate: ""
                      }}
                      validate={values => {
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
                          discountRate
                        };
                        this.props.sendApproval(data);
                      }}
                    >
                      {({ lol }) => (
                        <Form
                          style={{ textAlign: "center" }}
                          className="InputBox"
                        >
                          <div>
                            <label>MERCHANT ID</label> <br />
                            <Field type="number" name="merchantID" />
                            <ErrorMessage
                              style={{
                                color: "#0764b0",
                                fontWeight: "500",
                                fontSize: "18px"
                              }}
                              name="merchantID"
                              component="div"
                            />
                          </div>
                          {/* <div>
                                                        <label>MERCHANT TOKEN</label> <br/>
                                                        <Field type="text" name="merchantToken" />
                                                        <ErrorMessage style={{color: '#0764b0', fontWeight: '500', fontSize: '18px'}} name="merchantToken" component="div" />
                                                    </div> */}
                          <div>
                            <label>TRANSACTION FEE</label> <br />
                            <Field type="number" name="fee" />
                            <ErrorMessage
                              style={{
                                color: "#0764b0",
                                fontWeight: "500",
                                fontSize: "18px"
                              }}
                              name="fee"
                              component="div"
                            />
                          </div>
                          <div>
                            <label>DISCOUNT RATE</label> <br />
                            <Field type="number" name="discount" />
                            <ErrorMessage
                              style={{
                                color: "#0764b0",
                                fontWeight: "500",
                                fontSize: "18px"
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
              <div className="container-fuild">
                <h2>General Information</h2>
                <div className="row justify-content-between">
                  <div className="col-md-4">
                    <h4>Legal Business Name*</h4>
                    <p>
                      {e.general !== null ? e.general.legalBusinessName : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>Doing Business As (DBA)*</h4>
                    <p>
                      {e.general !== null ? e.general.doBusinessName : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>Federal Tax ID*</h4>
                    <p>{e.taxId}</p>
                  </div>
                  <div className="col-4">
                    <h4>DBA Business Address*</h4>
                    <p>{e.general !== null ? e.general.address : null}</p>
                  </div>
                  <div className="col-4">
                    <h4>Zip Code*</h4>
                    <p>{e.zip}</p>
                  </div>
                  <div className="col-4">
                    <h4>Business Phone Number*</h4>
                    <p>{e.phone}</p>
                  </div>
                  <div className="col-4">
                    <h4>Contact Email Address*</h4>
                    <p>{e.email}</p>
                  </div>
                </div>
                <h2>Representative Information</h2>
                <div className="row">
                  <div className="col-4">
                    <h4>Contact Name*</h4>
                    <p>
                      {e.general !== null
                        ? e.general.firstName + " " + e.general.lastName
                        : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>Title/Position*</h4>
                    <p>{e.general !== null ? e.general.title : null}</p>
                  </div>
                  <div className="col-4">
                    <h4>Contact Phone Number*</h4>
                    <p>{e.general !== null ? e.general.phoneContact : null}</p>
                  </div>
                </div>
                <h2>Business Information</h2>
                <div className="row">{renderQuestion}</div>
                <h2>Bank Information</h2>
                <div className="row">
                  <div className="col-4">
                    <h4>Bank Name*</h4>
                    <p>
                      {e.businessBank !== null ? e.businessBank.name : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>ABA Routing Number*</h4>
                    <p>
                      {e.businessBank !== null
                        ? e.businessBank.routingNumber
                        : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>Checking Account Number (DDA)*</h4>
                    <p>
                      {e.businessBank !== null
                        ? e.businessBank.accountNumber
                        : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>Void Check*</h4>
                    {e.businessBank !== null ? (
                      <img
                        style={{ width: "250px", height: "200px" }}
                        src={`${e.businessBank.imageUrl}`}
                        alt="void check"
                      />
                    ) : null}
                  </div>
                </div>
                <h2>Principal Information</h2>
                {renderPrincipal}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/merchants/pending" />
      );
    return renderPendingProfile;
  }
}

const mapStateToProps = state => ({
  PendingProfile: state.ViewMerchant_Request,
  InfoUser_Login: state.User,
  ApprovalStatus: state.Approval,
  RejectStatus: state.Reject
});
const mapDispatchToProps = dispatch => {
  return {
    sendApproval: payload => {
      dispatch(MERCHANT_APPROVAL(payload));
    },
    getAll_Merchants: payload => {
      dispatch(getAll_Merchants());
    },
    sendReject: payload => {
      dispatch(MERCHANT_REJECT(payload));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantReqProfile)
);
