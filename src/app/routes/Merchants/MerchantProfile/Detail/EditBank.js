import React, { Component } from "react";
import { connect } from "react-redux";
// import Button from "@material-ui/core/Button";
// import axios from "axios";
// import URL from "../../../../../url/url";
// import ImageUploader from "react-images-upload";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";

// /TEST
// import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

class EditBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        {
          source: null,
          options: {
            type: "local"
          }
        }
      ]
    };
  }
  handleInit = () => {
    console.log("FilePond instance has initialised", this.pond);
  };
  render() {
    const e = this.props.MerchantProfile;
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default connect(mapStateToProps)(EditBank);
