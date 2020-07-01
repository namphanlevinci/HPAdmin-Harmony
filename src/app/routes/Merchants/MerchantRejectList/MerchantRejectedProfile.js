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
import URL from "../../../../url/url";

import "bootstrap/js/src/collapse.js";
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
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
                <h4>Home Phone*</h4>
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
                <p>{e.ssn}</p>
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
    // render questions
    const renderQuestion =
      e.business !== undefined ? (
        e.business.map((e) => {
          return (
            <div className="col-6" key={e.businessId}>
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
    // render rejected list
    const renderPendingProfile =
      e.merchantId !== undefined ? (
        <div className="container-fluid PendingList react-transition swipe-right">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.requestDetail" />}
          />
          <div className="PendingLBody page-heading">
            <div className="PDL-Btn col-12">
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
            <div className="requestStatus">
              <div className="title" style={{ color: "white" }}>
                REJECTED
              </div>
              <h4>
                By{" "}
                <span style={{ fontWeight: 600 }}>
                  {e.adminUser !== null
                    ? e.adminUser.first_name + " " + e.adminUser.last_name
                    : null}
                </span>
              </h4>
              <h4>
                Date/Time:{" "}
                {e.adminUser !== null
                  ? moment
                      .utc(e.adminUser.created_date)
                      .local()
                      .format("MM/DD/YYYY - HH:mm A")
                  : null}
              </h4>
              <h4 style={{ fontWeight: 600 }}>Reason:</h4>
              <p>{e.reason}</p>
            </div>
            <hr />
            <div className="content">
              <div className="container-fuild">
                <h2 style={styles.h2}>General Information</h2>
                <div className="row justify-content-between">
                  <div className="col-4">
                    <h4>Legal Business Name*</h4>
                    <p>{e.general.legalBusinessName}</p>
                  </div>
                  <div className="col-4">
                    <h4>Doing Business As* (DBA)</h4>
                    <p>
                      {e.general !== null ? e.general.doBusinessName : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>Federal Tax ID*</h4>
                    <p>{e.general !== null ? e.general.tax : null}</p>
                  </div>
                  <div className="col-4">
                    <h4>Business Address* (no P.O. Boxes)</h4>
                    <p>{e.addressFull !== null ? e.addressFull : null}</p>
                  </div>
                  <div className="col-4">
                    <h4>Zip Code*</h4>
                    <p>{e.general !== null ? e.general.zip : null}</p>
                  </div>
                  <div className="col-4">
                    <h4>Business Phone Number*</h4>
                    <p>{e.general !== null ? e.general.phoneBusiness : null}</p>
                  </div>
                  <div className="col-4">
                    <h4>Contact Email Address*</h4>
                    <p>{e.general !== null ? e.general.emailContact : null}</p>
                  </div>
                </div>
                <h2 style={styles.h2}>Representative Information</h2>
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
                <h2 style={styles.h2}>Business Information</h2>
                <div className="row">{renderQuestion}</div>
                <h2 style={styles.h2}>Bank Information</h2>
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
                        style={{ width: "300px" }}
                        src={`${e.businessBank.imageUrl}`}
                        alt="void check"
                      />
                    ) : null}
                  </div>
                </div>
                <h2 style={styles.h2}>Principal Information</h2>
                {renderPrincipal}
              </div>
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
    fontWeight: "500",
    margin: "0",
  },
  div: {
    marginLeft: "40%",
    textAlign: "left",
    marginBottom: "10px",
  },
};
