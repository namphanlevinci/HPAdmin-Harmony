import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";
import Button from "@material-ui/core/Button";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _editPrincipal = () => {
    this.props.history.push("/app/merchants/profile/pincipal/edit");
  };
  render() {
    const e = this.props.MerchantProfile;
    const renderPrincipal =
      e.principals !== null ? (
        <React.Fragment>
          <div className="row">
            <div className="col-md-4">
              <h4>Name*</h4>
              <p>{e.principals.firstName + " " + e.principals.lastName}</p>
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
            <div className="col-md-4">
              <h4>Social Security Number (SSN)*</h4>
              <p>{e.principals.ssn}</p>
            </div>
            <div className="col-md-4">
              <h4>Date of Birth (mm/dd/yy)*</h4>
              <p>{moment(e.principals.birthDate).format("MM/DD/YYYY")}</p>
            </div>
            {/* <div className="col-md-4">
              <h4>Email Address*</h4>
              <p>{e.general !== null ? e.general.emailContact : null}</p>
            </div> */}
            <div className="col-md-4">
              <h4>Driver License Number*</h4>
              <p>{e.principals.driverNumber}</p>
            </div>
            <div className="col-md-4">
              <h4>State Issued*</h4>
              <p>
                {e.principals.state !== null ? e.principals.state.name : null}
              </p>
            </div>
            <div className="col-md-12">
              <h4>Driver License Picture</h4>
              {/* <img src={require("../../../../../assets/images/driverlicense.jpg")} alt="void check"/> */}
              <img
                className="bankVoid"
                src={`${e.principals.imageUrl}`}
                alt="driver license"
              />
            </div>
          </div>
          <div className="SettingsContent GeneralContent">
            <Button className="btn btn-green" onClick={this._editPrincipal}>
              EDIT
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <h4>&nbsp;- NO PRINCIPAL INFORMATION</h4>
      );
    const renderOldInfo =
      e.principals.arrayOldData !== null
        ? e.principals.arrayOldData.map((e, index) => {
            return (
              <div className="row" key={index}>
                <hr />
                <div className="col-md-4">
                  <h4>Home Phone*</h4>
                  <p>{e.homePhone !== null ? e.homePhone : null}</p>
                </div>
                <div className="col-md-4">
                  <h4>Mobile Phone*</h4>
                  <p>{e.mobilePhone !== null ? e.mobilePhone : null}</p>
                </div>
                <div className="col-md-4">
                  <h4>Address*</h4>
                  <p>{e.address !== null ? e.address : null}</p>
                </div>
                <div className="col-md-4">
                  <h4>State*</h4>
                  <p>{e.stateName !== null ? e.stateName : null}</p>
                </div>
                <div className="col-md-4">
                  <h4>Driver License Number*</h4>
                  <p>{e.driverNumber !== null ? e.driverNumber : null}</p>
                </div>
                {e.ImageUrl !== null ? (
                  <div className="col-md-4">
                    <h4>Driver License Picture*</h4>
                    <img
                      className="bankVoid"
                      src={`${e.ImageUrl}`}
                      alt="driver license"
                    />
                  </div>
                ) : null}
              </div>
            );
          })
        : null;

    return (
      <div className="react-transition swipe-up">
        <h2>Principal Information</h2>
        {renderPrincipal}

        {e.principals.arrayOldData.length !== 0 ? (
          <React.Fragment>
            <h2 style={{ paddingTop: "20px" }}>Old Information</h2>
            {renderOldInfo}
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default connect(mapStateToProps)(Principal);
