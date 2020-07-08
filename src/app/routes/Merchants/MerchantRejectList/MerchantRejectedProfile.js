import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAll_Rejected_Merchants,
  ViewProfile_Merchants,
} from "../../../../actions/merchants/actions";
import { Checkbox } from "@material-ui/core";
import { withRouter, Redirect } from "react-router-dom";
import { store } from "react-notifications-component";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { config } from "../../../../url/url";

import "bootstrap/js/src/collapse.js";
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";

const URL = config.url.URL;
class MerchantRejectedProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupAccept: false,
      showPopupReject: false,
      merchantID: "",
      merchantToken: "",
      rejectReason: "",
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

  _goRevert = () => {
    this.props.getAll_Rejected_Merchants();
    const ID = this.props.RejectedProfile.merchantId;
    axios
      .put(URL + "/merchant/restorepending/" + ID, null, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
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
        } else {
          store.addNotification({
            title: "ERROR!",
            message: "Something went wrong, please try again.",
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
  };
  _Edit = (merchantInfo) => {
    this.props.ViewProfile_Merchants(merchantInfo);
    this.props.history.push("/app/merchants/rejected/profile/edit");
  };
  _goBack = () => {
    this.props.getAll_Rejected_Merchants();
    this.props.history.push("/app/merchants/rejected");
  };
  _togglePopupAccept = () => {
    this.setState({
      showPopupAccept: !this.state.showPopupAccept,
    });
  };
  _togglePopupReject = () => {
    this.setState({
      showPopupReject: !this.state.showPopupReject,
    });
  };
  render() {
    const e = this.props.RejectedProfile;
    let principalLength = this.props.RejectedProfile?.principals?.length;
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
                <label>Home Phone*</label>
                <p>{e.homePhone}</p>
              </div>
              <div className="col-4">
                <label>Mobile Phone*</label>
                <p>{e.mobilePhone}</p>
              </div>
              <div className="col-4">
                <label>Address*</label>
                <p>{e.address}</p>
              </div>
              <div className="col-4">
                <label>Social Security Number (SSN)*</label>
                <p>{e.ssn}</p>
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
                <p>{e.state !== undefined ? e.state.name : null}</p>
              </div>
              <div className="col-6">
                <label>Driver License Picture</label>
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
        <label>&nbsp;- NO PRINCIPALS INFORMATION</label>
      );
    // render questions
    const renderQuestion =
      e.business !== undefined ? (
        e.business.map((e) => {
          return (
            <div className="col-6" key={e.businessId}>
              <label>{e.question}</label>
              <Checkbox checked={e.answer === false} />
              No <Checkbox checked={e.answer === true} /> Yes
              <h5>Answer: {e.answerReply} </h5>
            </div>
          );
        })
      ) : (
        <label>&nbsp;- NO BUSINESS INFORMATION</label>
      );
    // render rejected list
    const renderPendingProfile =
      e.merchantId !== undefined ? (
        <div className="container-fluid content-list react-transition swipe-right">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.requestDetail" />}
          />
          <div className="content-body page-heading">
            <div className="header col-12">
              <h2 style={{ fontWeight: 500 }}>ID: {e.merchantId}</h2>
              <span>
                <Button
                  style={{ color: "#4251af", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={() => this._Edit(e)}
                >
                  EDIT
                </Button>
                <Button
                  style={{ color: "#4251af", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this._goRevert}
                >
                  REVERT
                </Button>
                <Button
                  style={{ color: "#4251af", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this._goBack}
                >
                  BACK
                </Button>
              </span>
            </div>
            <hr />
            <div className="request-status">
              <div className="title" style={{ color: "white" }}>
                REJECTED
              </div>
              <h4>
                By{" "}
                <span style={{ fontWeight: 600 }}>
                  {e?.adminUser?.first_name + " " + e?.adminUser?.last_name}
                </span>
              </h4>
              <h4 style={{ color: "black" }}>
                Date/Time:{" "}
                {moment
                  .utc(e?.adminUser?.created_date)
                  .local()
                  .format("MM/DD/YYYY - hh:mm A")}
              </h4>
              <h4 style={{ fontWeight: 600, color: "black" }}>Reason:</h4>
              <p>{e?.reason}</p>
            </div>
            <hr />
            <div className="content">
              <h2 style={styles.h2}>General Information</h2>
              <div className="row justify-content-between">
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
                  <p>{e?.general?.tax}</p>
                </div>
                <div className="col-4">
                  <label>Business Address* (no P.O. Boxes)</label>
                  <p>{e?.addressFull}</p>
                </div>
                <div className="col-4">
                  <label>Zip Code*</label>
                  <p>{e?.general?.zip}</p>
                </div>
                <div className="col-4">
                  <label>Business Phone Number*</label>
                  <p>{e?.general?.phoneBusiness}</p>
                </div>
                <div className="col-4">
                  <label>Contact Email Address*</label>
                  <p>{e?.general?.emailContact}</p>
                </div>
              </div>
              <h2 style={styles.h2}>Representative Information</h2>
              <div className="row">
                <div className="col-4">
                  <label>Contact Name*</label>
                  <p>{e?.general?.firstName + " " + e?.general?.lastName}</p>
                </div>
                <div className="col-4">
                  <label>Title/Position*</label>
                  <p>{e?.general?.title}</p>
                </div>
                <div className="col-4">
                  <label>Contact Phone Number*</label>
                  <p>{e?.general?.phoneContact}</p>
                </div>
              </div>
              <h2 style={styles.h2}>Business Information</h2>
              <div className="row">{renderQuestion}</div>
              <h2 style={styles.h2}>Bank Information</h2>
              <div className="row">
                <div className="col-4">
                  <label>Bank Name*</label>
                  <p>{e?.businessBank?.name}</p>
                </div>
                <div className="col-4">
                  <label>Routing Number(ABA)*</label>
                  <p>{e?.businessBank?.routingNumber}</p>
                </div>
                <div className="col-4">
                  <label>Account Number (DDA)*</label>
                  <p>{e?.businessBank?.accountNumber}</p>
                </div>
                <div className="col-4">
                  <label>Void Check*</label>
                  <a href={`${URL}/file/${e?.businessBank?.fileId}`}>
                    <img
                      style={{ width: "300px" }}
                      src={`${e?.businessBank?.imageUrl}`}
                      alt="void check"
                    />
                  </a>
                </div>
              </div>
              <h2 style={styles.h2}>Principal Information</h2>
              {renderPrincipal}
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/merchants/rejected" />
      );
    return renderPendingProfile;
  }
}

const mapStateToProps = (state) => ({
  RejectedProfile: state.ViewProfile_Rejected,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  getAll_Rejected_Merchants: () => {
    dispatch(getAll_Rejected_Merchants());
  },
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantRejectedProfile)
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
