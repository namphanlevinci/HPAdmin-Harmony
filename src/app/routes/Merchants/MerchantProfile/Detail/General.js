import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import { getAll_Merchants } from "../../../../../actions/merchants/actions";
import { NotificationContainer } from "react-notifications";
import Button from "@material-ui/core/Button";

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
      stateId: ""
    };
  }
  _toggleEdit = () => {
    this.props.history.push("/app/merchants/merchant-profile/edit-general");
  };

  render() {
    const e = this.props.MerchantProfile;
    const renderGeneral =
      e.general !== undefined ? (
        <div>
          <h2>General Information</h2>
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-4">
                <h4>Legal Business Name*</h4>
                <p>{e.businessName}</p>
              </div>
              <div className="col-md-4">
                <h4>Doing Business As (DBA)*</h4>
                <p>{e.general !== null ? e.general.doBusinessName : null}</p>
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
                <h4>Zip code*</h4>
                <p>{e.general !== null ? e.general.zip : null}</p>
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
                  {e.principals !== null
                    ? e.principals.firstName + " " + e.principals.lastName
                    : null}
                </p>
              </div>
              <div className="col-md-4">
                <h4>Title/Position*</h4>
                <p>{e.principals !== null ? e.principals.title : null}</p>
              </div>
              <div className="col-md-4">
                <h4>Contact Phone Number*</h4>
                <p>{e.principals !== null ? e.principals.mobilePhone : null}</p>
              </div>
            </div>
            <div className="SettingsContent GeneralContent">
              <Button className="btn btn-green" onClick={this._toggleEdit}>
                EDIT
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/merchants/list" />
      );
    return (
      <div className="content GeneralContent">
        {renderGeneral}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});
const mapDispatchToProps = dispatch => ({
  getAll_Merchants: () => {
    dispatch(getAll_Merchants());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);
