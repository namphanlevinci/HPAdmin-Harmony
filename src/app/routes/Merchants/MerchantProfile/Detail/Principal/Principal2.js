import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_PRINCIPAL } from "../../../../../../actions/merchants/actions";
import moment from "moment";
import Button from "@material-ui/core/Button";

import "./principal.styles.scss";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
class PrincipalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _editPrincipal = (data) => {
    this.props.UPDATE_PRINCIPAL(data);
    this.props.history.push("/app/merchants/profile/pincipal/edit");
  };

  render() {
    const e = this.props.principalInfo;

    return (
      <div className="react-transition swipe-up principal-container container-fuild">
        <h2 style={styles.h2}>Principal Information</h2>
        <div className="row" key={e.principalId}>
          <div className="col-4">
            <label>Name*</label>
            <p>{e.firstName + " " + e.lastName}</p>
          </div>
          <div className="col-4">
            <label>Title/Position*</label>
            <p>{e.title}</p>
          </div>
          <div className="col-4">
            <label>Ownership(%)*</label>
            <p>{e.ownerShip}%</p>
          </div>
          <div className="col-4">
            <label>Home Phone*</label>
            <p>{e.homePhone}</p>
          </div>
          <div className="col-4">
            <label>Mobile Phone*</label>
            <p>{e.mobilePhone}</p>
          </div>
          <div className="col-4">
            <label>Address*</label>
            <p>{e.address}</p>
          </div>
          <div className="col-4">
            <label>Social Security Number (SSN)*</label>
            <p>{e.fullSsn}</p>
          </div>
          <div className="col-4">
            <label>Date of Birth (MM/DD/YYYY)*</label>
            <p>{moment(e.birthDate).format("MM/DD/YYYY")}</p>
          </div>
          <div className="col-4">
            <label>Email Address*</label>
            <p>{e.email}</p>
          </div>
          <div className="col-4">
            <label>Driver License Number*</label>
            <p>{e.driverNumber}</p>
          </div>
          <div className="col-4">
            <label>State Issued*</label>
            <p>{e.state !== undefined ? e.state.name : null}</p>
          </div>
          <div className="col-6">
            <label>Driver License Picture</label> <br />
            <img
              style={{
                width: "250px",
                height: "200px",
                marginBottom: "40px",
              }}
              src={`${e.imageUrl}`}
              alt="void check"
            />
          </div>
        </div>
        <span className="SettingsContent GeneralContent">
          <Button
            className="btn btn-green"
            onClick={() => this._editPrincipal(e)}
          >
            EDIT
          </Button>
          <Button
            className="btn btn-red"
            onClick={() =>
              this.props.history.push("/app/merchants/profile/pincipal")
            }
          >
            BACK
          </Button>
        </span>
        {e.arrayOldData !== undefined
          ? e.arrayOldData.map((e, index) => {
              return (
                <div className="row" key={index}>
                  <hr />
                  <div className="col-4">
                    <label>Home Phone*</label>
                    <p>{e.homePhone !== null ? e.homePhone : null}</p>
                  </div>
                  <div className="col-4">
                    <label>Mobile Phone*</label>
                    <p>{e.mobilePhone !== null ? e.mobilePhone : null}</p>
                  </div>
                  <div className="col-4">
                    <label>Address*</label>
                    <p>{e.address !== null ? e.address : null}</p>
                  </div>
                  <div className="col-4">
                    <label>State*</label>
                    <p>{e.stateName !== null ? e.stateName : null}</p>
                  </div>
                  <div className="col-4">
                    <label>Driver License Number*</label>
                    <p>{e.driverNumber !== null ? e.driverNumber : null}</p>
                  </div>
                  {e.ImageUrl !== null ? (
                    <div className="col-4">
                      <label>Driver License Picture*</label>
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
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  principalInfo: state.viewPrincipal,
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => {
  return {
    UPDATE_PRINCIPAL: (payload) => {
      dispatch(UPDATE_PRINCIPAL(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalInfo);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
  input: {
    marginBottom: "10px",
  },
};
