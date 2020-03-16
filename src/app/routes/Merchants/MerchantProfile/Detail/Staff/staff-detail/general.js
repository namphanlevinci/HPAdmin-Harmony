import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

export class general extends Component {
  render() {
    console.log("Staff", this.props.Staff);
    const Staff = this.props.Staff;
    return (
      <div className="content">
        <div className="container">
          <h2>General Information</h2>
          <div className="row justify-content-between">
            <div className="col-4">
              <h4>First Name</h4>
              <p>{Staff?.firstName}</p>
            </div>
            <div className="col-4">
              <h4>Last Name</h4>
              <p>{Staff?.lastName}</p>
            </div>
            <div className="col-4">
              <h4>Dispaly Name</h4>
              <p>{Staff?.displayName}</p>
            </div>
            <div className="col-4">
              <h4>Address</h4>
              <p>{Staff?.address}</p>
            </div>
            <div className="col-4">
              <h4>City</h4>
              <p>{Staff?.city}</p>
            </div>
            <div className="col-4">
              <h4>State</h4>
              <p>{Staff?.stateName}</p>
            </div>
            <div className="col-4">
              <h4>Cell Phone</h4>
              <p>{Staff?.phone}</p>
            </div>
            <div className="col-4">
              <h4>Contact Email</h4>
              <p>{Staff?.email}</p>
            </div>
            <div className="col-4">
              <h4>PIN Code</h4>
              <p>****</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <h4>Role</h4>
              <p>{Staff?.roleName}</p>
            </div>
            <div className="col-4">
              <h4>Status</h4>
              <p>{Staff?.isDisabled === 0 ? "Available" : "Not Available"}</p>
            </div>
          </div>
          {/* <div className="SettingsContent GeneralContent">
            <Button className="btn btn-green" onClick={this._toggleEdit}>
              EDIT
            </Button>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Staff: state.staffDetail
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(general);
