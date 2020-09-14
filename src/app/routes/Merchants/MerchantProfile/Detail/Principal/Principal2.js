import React, { Component } from "react";
import { connect } from "react-redux";
import { VIEW_PRINCIPAL } from "../../../../../../actions/merchants/actions";
import moment from "moment";
import Button from "@material-ui/core/Button";
import CheckPermissions from "../../../../../../util/checkPermission";
import formatPhone from "../../../../../../util/formatPhone";
import NumberFormat from "react-number-format";

import "./principal.styles.scss";
import "../../MerchantProfile?.css";
import "../../../MerchantsRequest/MerchantReqProfile?.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
class PrincipalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  editPrincipal = (data) => {
    this.props.VIEW_PRINCIPAL(data);
    this.props.history.push("/app/merchants/profile/principal/edit");
  };

  render() {
    const e = this.props.principalData;

    return (
      <div className="react-transition swipe-up principal-container container-fuild">
        <h2 style={styles.h2}>Principal Information</h2>
        <div className="row" key={e?.principalId}>
          <div className="col-4">
            <label>Name*</label>
            <p>{e?.firstName + " " + e?.lastName}</p>
          </div>
          <div className="col-4">
            <label>Title/Position*</label>
            <p>{e?.title}</p>
          </div>
          <div className="col-4">
            <label>Ownership* (%)</label>
            <p>{e?.ownerShip}%</p>
          </div>
          <div className="col-4">
            <label>Home Phone</label>
            <p>{formatPhone(e?.homePhone)}</p>
          </div>
          <div className="col-4">
            <label>Mobile Phone*</label>
            <p>{formatPhone(e?.mobilePhone)}</p>
          </div>
          <div className="col-4">
            <label>Address*</label>
            <p>{e?.address}</p>
          </div>
          <div className="col-4">
            <label>Social Security Number* (SSN)</label>
            <NumberFormat
              value={e?.ssn}
              displayType={"text"}
              thousandSeparator={true}
              p
              format="***-**-####"
              mask="_"
              renderText={(value) => <p>{value}</p>}
            />
          </div>
          <div className="col-4">
            <label>Date of Birth* (mm/dd/yyyy)*</label>
            <p>{moment(e?.birthDate).format("MM/DD/YYYY")}</p>
          </div>
          <div className="col-4">
            <label>Email Address*</label>
            <p>{e?.email}</p>
          </div>
          <div className="col-4">
            <label>Driver License Number*</label>
            <p>{e?.driverNumber}</p>
          </div>
          <div className="col-4">
            <label>State Issued*</label>
            <p>{e?.state !== undefined ? e?.state?.name : null}</p>
          </div>
          <div className="col-6">
            <label>Driver License Picture*</label> <br />
            <img
              style={{
                width: "250px",
                height: "200px",
                marginBottom: "40px",
              }}
              src={`${e?.imageUrl}`}
              alt="void check"
            />
          </div>
        </div>
        <span className="SettingsContent general-content">
          {CheckPermissions(14) && (
            <Button
              className="btn btn-green"
              onClick={() => this.editPrincipal(e)}
            >
              EDIT
            </Button>
          )}

          <Button
            className="btn btn-red"
            onClick={() =>
              this.props.history.push("/app/merchants/profile/pincipal")
            }
          >
            BACK
          </Button>
        </span>
        {e?.arrayOldData !== undefined
          ? e?.arrayOldData.map((e, index) => {
              return (
                <div className="row" key={index}>
                  <hr />
                  <div className="col-4">
                    <label>Home Phone</label>
                    <p>{formatPhone(e?.homePhone)}</p>
                  </div>
                  <div className="col-4">
                    <label>Mobile Phone*</label>
                    <p>{formatPhone(e?.mobilePhone)}</p>
                  </div>
                  <div className="col-4">
                    <label>Address*</label>
                    <p>{e?.address}</p>
                  </div>
                  <div className="col-4">
                    <label>State Issued*</label>
                    <p>{e?.stateName}</p>
                  </div>
                  <div className="col-4">
                    <label>Driver License Number*</label>
                    <p>{e?.driverNumber}</p>
                  </div>{" "}
                  {e?.ImageUrl !== null ? (
                    <div className="col-6">
                      <label>Driver License Picture*</label> <br />
                      <img
                        className="bankVoid"
                        src={`${e?.ImageUrl}`}
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
  principalData: state.MerchantReducer.PrincipalData,
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state?.userReducer.User,
});

const mapDispatchToProps = (dispatch) => {
  return {
    VIEW_PRINCIPAL: (payload) => {
      dispatch(VIEW_PRINCIPAL(payload));
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
