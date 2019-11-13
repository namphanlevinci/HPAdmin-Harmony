import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect } from "react-router-dom";
import { Checkbox } from "@material-ui/core";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
// import "./MerchantProfile.css"
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
import moment from "moment";
import Button from "@material-ui/core/Button";
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
    // console.log("Fix something", e)
    //render questions
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
    // render staff

    const renderMerchantProfile =
      e.merchantId !== undefined ? (
        <div className="container-fluid PendingList react-transition swipe-right">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantprofile" />}
          />
          <div className="PendingLBody">
            <div className="PDL-Btn col-md-12">
              <h3>ID: {e.merchantId}</h3>
              <span>
                <Button
                  style={{ color: "#0764b0", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this._goBack}
                >
                  BACK
                </Button>
              </span>
            </div>
            <hr />
            <div className="container requestStatus">
              <div
                className="title"
                style={{ backgroundColor: "#00FF00", color: "white" }}
              >
                APPROVED
              </div>
              <h4>
                By{" "}
                {e.adminUser !== null
                  ? e.adminUser.first_name + " " + e.adminUser.last_name
                  : null}
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
              <div className="container">
                <h2>General Information</h2>
                <div className="row justify-content-between">
                  <div className="col-md-4">
                    <h4>Legal Business Name*</h4>
                    <p>{e.businessName}</p>
                  </div>
                  <div className="col-md-4">
                    <h4>Doing Business As (DBA)*</h4>
                    <p>
                      {e.general !== null ? e.general.doBusinessName : null}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h4>Federal Tax ID*</h4>
                    <p>{e.taxId}</p>
                  </div>
                  <div className="col-md-4">
                    <h4>DBA Business Address*</h4>
                    <p>{e.address + " " + e.city + " " + e.stateId}</p>
                  </div>
                  <div className="col-md-4">
                    <h4>Zip Code*</h4>
                    <p>{e.zip}</p>
                  </div>
                  <div className="col-md-4">
                    <h4>Business Phone Number*</h4>
                    <p>{e.phone}</p>
                  </div>
                  <div className="col-md-4">
                    <h4>Contact Email Address*</h4>
                    <p>{e.email}</p>
                  </div>
                </div>
                <h2>Representative Information</h2>
                <div className="row">
                  <div className="col-md-4">
                    <h4>Contact Name*</h4>
                    <p>
                      {e.general !== null
                        ? e.general.firstName + " " + e.general.lastName
                        : null}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h4>Title/Position*</h4>
                    <p>{e.general !== null ? e.general.title : null}</p>
                  </div>
                  <div className="col-md-4">
                    <h4>Contact Phone Number*</h4>
                    <p>{e.general !== null ? e.general.phoneContact : null}</p>
                  </div>
                </div>
                <h2>Business Information</h2>
                <div className="row">{renderQuestion}</div>
                <h2>Bank Information</h2>
                <div className="row">
                  <div className="col-md-4">
                    <h4>Bank Name*</h4>
                    <p>
                      {e.businessBank !== null ? e.businessBank.name : null}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h4>ABA Routing Number*</h4>
                    <p>
                      {e.businessBank !== null
                        ? e.businessBank.routingNumber
                        : null}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h4>Checking Account Number (DDA)*</h4>
                    <p>
                      {e.businessBank !== null
                        ? e.businessBank.accountNumber
                        : null}
                    </p>
                  </div>
                  <div className="col-md-4">
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
                <h2>Principal Information</h2>
                {e.principals !== null ? (
                  <div className="row">
                    <div className="col-md-4">
                      <h4>Name*</h4>
                      <p>
                        {e.principals.firstName + " " + e.principals.lastName}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <h4>Title/Position*</h4>
                      <p>{e.principals.title}</p>
                    </div>
                    <div className="col-md-4">
                      <h4>Ownership(%)*</h4>
                      <p>{e.principals.ownerShip}%</p>
                    </div>
                    <div className="col-md-4">
                      <h4>Home Phone*</h4>
                      <p>{e.principals.homePhone}</p>
                    </div>
                    <div className="col-md-4">
                      <h4>Mobile Phone*</h4>
                      <p>{e.principals.mobilePhone}</p>
                    </div>
                    <div className="col-md-4">
                      <h4>Address*</h4>
                      <p>{e.principals.address}</p>
                    </div>
                    {/* <div className="col-md-4">
                      <h4>Years at This Address*</h4>
                      <p>{e.principals.yearAddress}</p>
                    </div> */}
                    <div className="col-md-4">
                      <h4>Social Security Number (SSN)*</h4>
                      <p>{e.principals.ssn}</p>
                    </div>
                    <div className="col-md-4">
                      <h4>Date of Birth (mm/dd/yy)*</h4>
                      <p>
                        {moment(e.principals.birthDate).format("MM/DD/YYYY")}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <h4>Email Address*</h4>
                      <p>
                        {e.general !== null ? e.general.emailContact : null}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <h4>Driver License Number*</h4>
                      <p>{e.principals.driverNumber}</p>
                    </div>
                    <div className="col-md-4">
                      <h4>State Issued*</h4>
                      <p>{e.state !== null ? e.state.name : null}</p>
                    </div>
                    <div className="col-md-6">
                      <h4>Driver License Picture</h4>
                      {e.principals !== null ? (
                        <img
                          style={{ width: "300px" }}
                          src={`${e.principals.imageUrl}`}
                          alt="void check"
                        />
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <h4>&nbsp;- NO PRINCIPAL INFORMATION</h4>
                )}
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
const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default withRouter(connect(mapStateToProps)(MerchantApprovedProfile));
