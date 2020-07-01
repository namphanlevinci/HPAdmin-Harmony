import React, { Component } from "react";
import { connect } from "react-redux";
import { getAll_Merchants } from "../../../../../actions/merchants/actions";
import { Checkbox } from "@material-ui/core";

import Button from "@material-ui/core/Button";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
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
    const renderGeneral = (
      <div className="react-transition swipe-up">
        <div className="container-fluid">
          <h2 style={styles.h2}>General Information</h2>
          <div className="row justify-content-between">
            <div className="col-4">
              <label>Legal Business Name*</label>
              <p>{e.general !== null ? e.general.legalBusinessName : null}</p>
            </div>
            <div className="col-4">
              <label>Doing Business As* (DBA)</label>
              <p>{e.general !== null ? e.general.doBusinessName : null}</p>
            </div>
            <div className="col-4">
              <label>Federal Tax ID*</label>
              <p>{e.general !== null ? e.general.tax : null}</p>
            </div>
            <div className="col-4">
              <label>Business Address* (no P.O. Boxes)</label>
              <p>{e.addressFull}</p>
            </div>
            <div className="col-4">
              <label>Zip code*</label>
              <p>{e.general !== null ? e.general.zip : null}</p>
            </div>
            <div className="col-4">
              <label>Business Phone Number*</label>
              <p>{e.general !== null ? e.general.phoneBusiness : null}</p>
            </div>
            <div className="col-4">
              <label>Contact Email Address*</label>
              <p>{e.general !== null ? e.general.emailContact : null}</p>
            </div>
            <div className="col-4">
              <div className="password">
                <label className="pasword__label">
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
          <h2 style={styles.h2}>Representative Information</h2>
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
        </div>
      </div>
    );

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
    return (
      <div className="content GeneralContent">
        {renderGeneral}

        <div className="container-fluid">
          <h2 style={styles.h2}>Business Information</h2>
          <div className="row justify-content-between">{renderQuestion}</div>
        </div>
        <div className="SettingsContent GeneralContent">
          <Button className="btn btn-green" onClick={this._toggleEdit}>
            EDIT
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  getAll_Merchants: () => {
    dispatch(getAll_Merchants());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(General);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
};
