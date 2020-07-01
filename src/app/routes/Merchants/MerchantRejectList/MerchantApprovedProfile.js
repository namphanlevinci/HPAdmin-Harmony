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
    //render questions
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
    // render staff

    const renderMerchantProfile =
      e.merchantId !== undefined ? (
        <div className="container-fluid PendingList react-transition swipe-right">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantprofile" />}
          />
          <div className="PendingLBody page-heading">
            <div className="PDL-Btn col-12">
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
            <div className="requestStatus">
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
                      .format("MM/DD/YYYY - HH:mm A ")
                  : null}
              </h4>
            </div>
            <hr />
            <div className="content">
              <div>
                <h2 style={styles.h2}>General Information</h2>
                <div className="row justify-content-between">
                  <div className="col-4">
                    <h4>Legal Business Name*</h4>
                    <p>
                      {e.general !== null ? e.general.legalBusinessName : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>Doing Business As* (DBA)</h4>
                    <p>
                      {e.general !== null ? e.general.doBusinessName : null}
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>Federal Tax ID*</h4>
                    <p>{e.taxId}</p>
                  </div>
                  <div className="col-4">
                    <h4>Business Address* (no P.O. Boxes)</h4>
                    <p>{e.address + " " + e.city + " " + e.stateId}</p>
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
    fontWeight: "500",
    margin: "0",
  },
  div: {
    marginLeft: "40%",
    textAlign: "left",
    marginBottom: "10px",
  },
};
