import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { config } from "../../../../../url/url.js";
import CheckPermissions from "../../../../../util/checkPermission";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";

const URL = config.url.URL;

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleBank = () => {
    this.props.history.push("/app/merchants/profile/bank/edit");
  };

  render() {
    const e = this.props.MerchantProfile;
    const renderOldImg =
      e !== null ? (
        e?.businessBank?.imageUrlOldFiles !== null ? (
          <div className="col-12" style={{ paddingTop: "10px" }}>
            <label>Old Void Check*</label>
            <br />
            {e.businessBank?.imageUrlOldFiles.map((e, index) => {
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
        <div className="container-fluid">
          <h2 style={styles.h2}>Bank Information</h2>

          <div className="row">
            <div className="col-3">
              <label>Account Holder Name*</label>
              <p style={{ maxWidth: "250px", overflowWrap: "break-word" }}>
                {e?.businessBank?.accountHolderName}
              </p>
            </div>
            <div className="col-3">
              <label>Bank Name*</label>
              <p>{e?.businessBank?.name}</p>
            </div>

            <div className="col-3">
              <label> Routing Number* (ABA)</label>
              <p style={{ maxWidth: "250px", overflowWrap: "break-word" }}>
                {e?.businessBank?.routingNumber}
              </p>
            </div>
            <div className="col-3">
              <label>Account Number* (DDA)</label>
              <p style={{ maxWidth: "250px", overflowWrap: "break-word" }}>
                {e?.businessBank?.accountNumber}
              </p>
            </div>
            <div className="col-4">
              <label>Void Check*</label>
              <br />
              {/* <a
                href={`${URL}/file/${e?.businessBank?.fileId}?fileName=VoidCheck-${e?.general?.doBusinessName}`}
                download
              > */}
              <img
                className="bankVoid"
                src={`${e?.businessBank?.imageUrl}`}
                alt="void check"
              />
              {/* </a> */}
            </div>
            <br />
            {renderOldImg}
          </div>
          <div
            className="SettingsContent general-content"
            style={{ paddingTop: "15px" }}
          >
            {CheckPermissions(14) && (
              <Button className="btn btn-green" onClick={this.handleBank}>
                EDIT
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});

export default connect(mapStateToProps)(Bank);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
};
