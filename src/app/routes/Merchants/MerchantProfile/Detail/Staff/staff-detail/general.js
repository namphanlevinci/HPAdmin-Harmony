import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import "../Staff.styles.scss";
export class general extends Component {
  render() {
    const Staff = this.props.Staff;
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="header">
            <h2>General Information</h2>
          </div>
          <div className="row justify-content-between">
            <div className="col-4">
              <label>First Name</label>
              <p>{Staff?.firstName}</p>
            </div>
            <div className="col-4">
              <label>Last Name</label>
              <p>{Staff?.lastName}</p>
            </div>
            <div className="col-4">
              <label>Display Name</label>
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
              <label>Cell Phone</label>
              <p>{Staff?.phone}</p>
            </div>
            <div className="col-4">
              <label>Contact Email</label>
              <p>{Staff?.email}</p>
            </div>
            <div className="col-4">
              <label>PIN Code</label>
              <p>****</p>
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
          </div>
          <div className="SettingsContent general-content">
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
  Staff: state.staffDetail,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(general);
