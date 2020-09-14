import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import formatPhone from "../../../../../../../../util/formatPhone";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "../../Staff.styles.scss";
export class general extends Component {
  render() {
    const Staff = this.props.Staff;
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="header">
            <h2>General Information</h2>
          </div>
          <div className="row ">
            <div className="col-4">
              <label>First Name*</label>
              <p>{Staff?.firstName}</p>
            </div>
            <div className="col-4">
              <label>Last Name*</label>
              <p>{Staff?.lastName}</p>
            </div>
            <div className="col-4">
              <label>Display Name*</label>
              <p>{Staff?.displayName}</p>
            </div>
            <div className="col-4">
              <label>Address</label>
              <p>{Staff?.address}</p>
            </div>
            <div className="col-4">
              <label>City</label>
              <p>{Staff?.city}</p>
            </div>
            <div className="col-4">
              <label>State</label>
              <p>{Staff?.stateName}</p>
            </div>
            <div className="col-4">
              <label>Zip Code</label>
              <p>{Staff?.zip}</p>
            </div>
            <div className="col-4">
              <label>Cell Phone</label>
              <p>{formatPhone(Staff?.phone)}</p>
            </div>
            <div className="col-4">
              <label>Contact Email</label>
              <p>{Staff?.email}</p>
            </div>
            <div className="col-4">
              <label>Create PIN*</label>
              <p>****</p>
            </div>
            <div className="col-4">
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="true"
                    checked={Staff?.isActive}
                    control={<Checkbox color="primary" />}
                    label="Visible on App"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label>Role</label>
              <p>{Staff?.roleName}</p>
            </div>
            <div className="col-4">
              <label>Status</label>
              <p>{Staff?.isDisabled === 0 ? "Available" : "Not Available"}</p>
            </div>
            <div className="col-8">
              <label>Avatar</label>
              <div
                style={{
                  backgroundImage: `url(${Staff?.imageUrl})`,
                  width: "220px",
                  height: "220px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: "25px" }}>
            <Button
              className="btn btn-green"
              onClick={() =>
                this.props.history.push("/app/merchants/staff/general/edit")
              }
            >
              EDIT
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Staff: state.MerchantReducer.StaffData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(general);
