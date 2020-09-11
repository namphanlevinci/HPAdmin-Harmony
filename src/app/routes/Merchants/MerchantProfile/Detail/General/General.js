import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import formatPhone from "../../../../../../util/formatPhone";
import CheckPermissions from "../../../../../../util/checkPermission";

import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "../Detail.css";
class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      businessName: "",
      email: "",
      cellphone: "",
      address: "",
      city: "",
      stateId: "",
      showP: false,
    };
  }
  _toggleEdit = () => {
    this.props.history.push("/app/merchants/profile/general/edit");
  };

  render() {
    const e = this.props.MerchantProfile;
    console.log("e", e);

    const renderGeneral = (
      <div className="container-fluid">
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
          {/* Business Address */}
          <div className="col-4">
            <label>Business Address* (no P.O. Boxes)</label>
            <p>{e?.address}</p>
          </div>
          <div className="col-3">
            <label>City*</label>
            <p>{e?.general?.city}</p>
          </div>
          <div className="col-3">
            <label>State*</label>
            <p>{e?.state?.name}</p>
          </div>
          <div className="col-2">
            <label>Zip Code*</label>
            <p>{e?.general?.zip}</p>
          </div>
          {/* DBA Address */}
          <div className="col-4">
            <label>DBA Address*</label>
            <p>{e?.general?.dbaAddress?.Address}</p>
          </div>
          <div className="col-3">
            <label>City*</label>
            <p>{e?.general?.dbaAddress?.City}</p>
          </div>
          <div className="col-3">
            <label>State*</label>
            <p>{e?.general?.dbaAddress?.StateName}</p>
          </div>
          <div className="col-2">
            <label>Zip Code*</label>
            <p>{e?.general?.dbaAddress?.Zip}</p>
          </div>

          <div className="col-4">
            <label>Contact Email Address*</label>
            <p>{e?.general?.emailContact}</p>
          </div>
          <div className="col-4">
            <label>Business Phone Number*</label>
            <p>{formatPhone(e?.general?.phoneBusiness)}</p>
          </div>

          <div className="col-4">
            <div className="password">
              <label className="password__label">
                Password
                <input
                  type={this.state.showP ? "text" : "password"}
                  value={e?.password}
                  disabled
                />
                <span
                  className="password-trigger"
                  onClick={() => this.setState({ showP: !this.state.showP })}
                >
                  {this.state.showP ? "Hide" : "Show"}
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* <h2 style={styles.h2}>Representative Information</h2> */}
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
            <p>{formatPhone(e?.general?.phoneContact)}</p>
          </div>
        </div>
      </div>
    );

    const renderQuestion =
      e.business !== undefined ? (
        e.business.map((e) => {
          return (
            <div className="col-6" key={e.businessId}>
              <label>{e.question}</label> <br />
              <Checkbox checked={e.answer === false} />
              No <Checkbox checked={e.answer === true} /> Yes
              <h5 style={{ marginLeft: "25%" }}>Answer: {e.answerReply} </h5>
            </div>
          );
        })
      ) : (
        <label>&nbsp;- NO BUSINESS INFORMATION</label>
      );
    return (
      <div className="content general-content react-transition swipe-up">
        {renderGeneral}

        <div className="container-fluid">
          <h2 style={styles.h2}>Business Information</h2>
          <div className="row justify-content-between">{renderQuestion}</div>
        </div>
        <div className="SettingsContent general-content">
          {CheckPermissions(14) && (
            <Button className="btn btn-green" onClick={this._toggleEdit}>
              EDIT
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(General);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
};
