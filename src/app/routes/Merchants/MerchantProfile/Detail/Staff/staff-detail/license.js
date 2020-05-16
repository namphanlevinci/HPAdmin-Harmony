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
              <label>Driver Lincense</label>
              <p>{Staff?.driverLicense}</p>
            </div>
            <div className="col-8">
              <label>Social Security Number</label>
              <p>{Staff?.ssn}</p>
            </div>
            <div className="col-8">
              <label>Professional Lincense</label>
              <p>{Staff?.professionalLicense}</p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(license);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
  input: {
    marginBottom: "10px",
  },
};
