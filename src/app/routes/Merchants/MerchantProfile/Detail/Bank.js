import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _editBank = () => {
    this.props.history.push("/app/merchants/profile/bank/edit");
  };
  render() {
    const e = this.props.MerchantProfile;
    const renderOldImg =
      e.businessBank !== null ? (
        e.businessBank.imageUrlOldFiles !== null ? (
          <div className="col-md-12" style={{ paddingTop: "10px" }}>
            <label>Old Void Check*</label>
            <br />
            {e.businessBank.imageUrlOldFiles.map((e, index) => {
              return (
                <img
                  key={index}
                  className="bankVoid"
                  src={`${e}`}
                  alt="void check"
                  style={{ padding: "10px" }}
                />
              );
            })}
          </div>
        ) : null
      ) : null;
    return (
      <div className="react-transition swipe-up">
        <h2 style={styles.h2}>Bank Information</h2>
        <div className="container-fuild">
          <div className="row">
            <div className="col-3">
              <label>Bank Name*</label>
              <p>{e.businessBank !== null ? e.businessBank.name : null}</p>
            </div>
            <div className="col-4">
              <label>ABA Routing Number*</label>
              <p style={{ maxWidth: "250px", overflowWrap: "break-word" }}>
                {e.businessBank !== null ? e.businessBank.routingNumber : null}
              </p>
            </div>
            <div className="col-5">
              <label>Checking Account Number (DDA)*</label>
              <p style={{ maxWidth: "250px", overflowWrap: "break-word" }}>
                {e.businessBank !== null ? e.businessBank.accountNumber : null}
              </p>
            </div>
            <div className="col-4">
              <label>Void Check*</label>
              {e.businessBank !== null ? (
                <img
                  className="bankVoid"
                  src={`${e.businessBank.imageUrl}`}
                  alt="void check"
                />
              ) : null}
            </div>
            <br />
            {renderOldImg}
          </div>
        </div>
        <div
          className="SettingsContent GeneralContent"
          style={{ paddingTop: "40px" }}
        >
          <Button className="btn btn-green" onClick={this._editBank}>
            EDIT
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
});

export default connect(mapStateToProps)(Bank);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
};
