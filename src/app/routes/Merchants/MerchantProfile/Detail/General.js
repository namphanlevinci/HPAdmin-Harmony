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
      stateId: ""
    };
  }
  _toggleEdit = () => {
    this.props.history.push("/app/merchants/profile/general/edit");
  };

  render() {
    const e = this.props.MerchantProfile;
    const renderGeneral = (
      // e.general !== undefined ? (
      <div className="react-transition swipe-up">
        <div className="container-fuild">
          <h2>General Information</h2>
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h4>Legal Business Name*</h4>
              <p>{e.general !== null ? e.general.legalBusinessName : null}</p>
            </div>
            <div className="col-md-4">
              <h4>Doing Business As (DBA)*</h4>
              <p>{e.general !== null ? e.general.doBusinessName : null}</p>
            </div>
            <div className="col-md-4">
              <h4>Federal Tax ID*</h4>
              <p>{e.general !== null ? e.general.tax : null}</p>
            </div>
            <div className="col-md-4">
              <h4>DBA Business Address*</h4>
              <p>{e.addressFull}</p>
            </div>
            <div className="col-md-4">
              <h4>Zip code*</h4>
              <p>{e.general !== null ? e.general.zip : null}</p>
            </div>
            <div className="col-md-4">
              <h4>Business Phone Number*</h4>
              <p>{e.general !== null ? e.general.phoneBusiness : null}</p>
            </div>
            <div className="col-md-4">
              <h4>Contact Email Address*</h4>
              <p>{e.general !== null ? e.general.emailContact : null}</p>
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
        </div>
      </div>
    );

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
    return (
      <div className="content GeneralContent">
        {renderGeneral}

        <div className="container-fuild">
          <h2>Business Information</h2>
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

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});
const mapDispatchToProps = dispatch => ({
  getAll_Merchants: () => {
    dispatch(getAll_Merchants());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(General);
