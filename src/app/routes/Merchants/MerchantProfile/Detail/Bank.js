import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import Button from "@material-ui/core/Button";

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
            <h4>Old Void Check*</h4>
            {e.businessBank.imageUrlOldFiles.map((e, index) => {
              return (
                <img
                  key={index}
                  className="bankVoid"
                  src={`${e.imageUrl}`}
                  alt="void check"
                />
              );
            })}
          </div>
        ) : null
      ) : null;
    return (
      <div className="react-transition swipe-up">
        <h2>Bank Information</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>Bank Name*</h4>
              <p>{e.businessBank !== null ? e.businessBank.name : null}</p>
            </div>
            <div className="col-md-4">
              <h4>ABA Routing Number*</h4>
              <p style={{ maxWidth: "250px", overflowWrap: "break-word" }}>
                {e.businessBank !== null ? e.businessBank.routingNumber : null}
              </p>
            </div>
            <div className="col-md-4">
              <h4>Checking Account Number (DDA)*</h4>
              <p style={{ maxWidth: "250px", overflowWrap: "break-word" }}>
                {e.businessBank !== null ? e.businessBank.accountNumber : null}
              </p>
            </div>
            <div className="col-md-4">
              <h4>Void Check*</h4>
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
        <div className="SettingsContent GeneralContent">
          <Button className="btn btn-green" onClick={this._editBank}>
            EDIT
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default connect(mapStateToProps)(Bank);
