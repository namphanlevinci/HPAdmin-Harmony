import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Checkbox } from "@material-ui/core";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import Button from "@material-ui/core/Button";

import "bootstrap/js/src/collapse.js";
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
class MerchantApprovedProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goBack = () => {
    this.props.history.push("/app/merchants/approved");
  };
  render() {
    const e = this.props.MerchantProfile;
    let principalLength = this.props.MerchantProfile?.principals?.length;

    //render Principal
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
                <p>{e?.firstName + " " + e?.lastName}</p>
              </div>
              <div className="col-4">
                <label>Title/Position*</label>
                <p>{e?.title}</p>
              </div>
              <div className="col-4">
                <label>Ownership(%)*</label>
                <p>{e?.ownerShip}%</p>
              </div>
              <div className="col-4">
                <label>Home Phone*</label>
                <p>{e?.homePhone}</p>
              </div>
              <div className="col-4">
                <label>Mobile Phone*</label>
                <p>{e?.mobilePhone}</p>
              </div>
              <div className="col-4">
                <label>Address*</label>
                <p>{e?.address}</p>
              </div>
              <div className="col-4">
                <label>Social Security Number (SSN)*</label>
                <p>{e?.fullSsn}</p>
              </div>
              <div className="col-4">
                <label>Date of Birth (mm/dd/yy)*</label>
                <p>{moment(e.birthDate).format("MM/DD/YYYY")}</p>
              </div>
              <div className="col-4">
                <label>Email Address*</label>
                <p>{e?.email}</p>
              </div>
              <div className="col-4">
                <label>Driver License Number*</label>
                <p>{e?.driverNumber}</p>
              </div>
              <div className="col-4">
                <label>State Issued*</label>
                <p>{e?.state?.name}</p>
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
    //render questions
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
    // render staff

    const renderMerchantProfile =
      e.merchantId !== undefined ? (
        <div className="container-fluid content-list react-transition swipe-right">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantProfile" />}
            disableBreadcrumb={true}
          />
          <div className="content-body page-heading">
            <div className="header col-12">
              <h2 style={{ fontWeight: 500 }}>ID: {e.merchantId}</h2>
              <span>
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
              <div
                className="title"
                style={{
                  backgroundColor: "#01be52",
                  color: "white",
                }}
              >
                APPROVED
              </div>
              <h4>
                By{" "}
                <span style={{ fontWeight: 600 }}>
                  {e.adminUser.first_name + " " + e.adminUser.last_name}
                </span>
              </h4>
              <h4 style={{ color: "black" }}>
                Date/Time:{" "}
                {moment
                  .utc(e.adminUser.created_date)
                  .local()
                  .format("MM/DD/YYYY - hh:mm A ")}
              </h4>
            </div>
            <hr />
            <div className="content">
              <div>
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
                    <p>{e?.taxId}</p>
                  </div>
                  <div className="col-4">
                    <label>Business Address* (no P.O. Boxes)</label>
                    <p>{e?.address}</p>
                  </div>
                  <div className="col-4">
                    <label>Zip Code*</label>
                    <p>{e?.zip}</p>
                  </div>
                  <div className="col-4">
                    <label>Business Phone Number*</label>
                    <p>{e?.phone}</p>
                  </div>
                  <div className="col-4">
                    <label>Contact Email Address*</label>
                    <p>{e?.email}</p>
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

                    <img
                      style={{ width: "300px" }}
                      src={`${e?.businessBank?.imageUrl}`}
                      alt="void check"
                    />
                  </div>
                </div>
                <h2 style={styles.h2}>Principal Information</h2>
                {renderPrincipal}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/merchants/approved" />
      );
    return renderMerchantProfile;
  }
}
const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});

export default withRouter(connect(mapStateToProps)(MerchantApprovedProfile));

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
