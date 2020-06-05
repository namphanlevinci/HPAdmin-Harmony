import React, { Component } from "react";
import { connect } from "react-redux";
import { ViewProfile_Merchants } from "../../../../../actions/merchants/actions";

import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import "../../../Merchants/MerchantProfile/Detail/Detail.css";
class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const e = this.props.MerchantProfile.banks;
    // console.log("BANK INFORMATION", e);
    // console.log("BANK INFORMATION", this.props.MerchantProfile);
    const renderBank =
      e !== undefined ? (
        e.map((i) => {
          return (
            <div className="container" key={i.bankAcountId}>
              <h2>Bank Information</h2>
              <div className="row">
                <div className="col-md-4">
                  <h4>Account Holder Name:</h4>
                  <p>{i.accountHolderName}</p>
                </div>
                <div className="col-md-4">
                  <h4>Routing Number:</h4>
                  <p>{i.routingNumber}</p>
                </div>
                <div className="col-md-4">
                  <h4>Address:</h4>
                  <p>{i.address}</p>
                </div>
                <div className="col-md-4">
                  <h4>State:</h4>
                  {/* STATE TRẢ ID SỬA SAU */}
                  <p>{i.stateName}</p>
                </div>
                <div className="col-md-4">
                  <h4>City:</h4>
                  <p>{i.city}</p>
                </div>
                <div className="col-md-4">
                  <h4>Account Number:</h4>
                  <p>{i.accountNumber}</p>
                </div>
                <div className="col-md-4">
                  <h4>Post Code:</h4>
                  <p>{i.postCode}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2>NO INFORMATION</h2>
      );
    return <div className="content GeneralContent">{renderBank}</div>;
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
});

const mapDispatchToProps = (dispatch) => ({
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Bank);
