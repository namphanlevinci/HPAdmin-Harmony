import React, { Component } from "react";
import { connect } from "react-redux";

export class license extends Component {
  render() {
    const Staff = this.props.Staff;

    return (
      <div>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-8">
              <h4>Driver Lincense</h4>
              <p>{Staff?.driverLicense}</p>
            </div>
            <div className="col-8">
              <h4>Social Security Number</h4>
              <p>{Staff?.ssn}</p>
            </div>
            <div className="col-8">
              <h4>Professional Lincense</h4>
              <p>{Staff?.professionalLicense}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Staff: state.staffDetail
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(license);
