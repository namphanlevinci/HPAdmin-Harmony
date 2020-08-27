import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

export class license extends Component {
  render() {
    const Staff = this.props.Staff;

    return (
      <div>
        <div className="container-fluid">
          <h2 style={{ paddingBottom: "10px" }}>Licenses</h2>
          <div className="row justify-content-between">
            <div className="col-4">
              <label>Driver License</label>
              <p>{Staff?.driverLicense}</p>
            </div>
            <div className="col-4">
              <label>Social Security Number</label>
              <p>{Staff?.ssn}</p>
            </div>
            <div className="col-4">
              <label>Professional License</label>
              <p>{Staff?.professionalLicense}</p>
            </div>
          </div>
          <div
            className="SettingsContent general-content"
            style={{ marginTop: "200px" }}
          >
            <Button
              className="btn btn-green"
              onClick={() =>
                this.props.history.push("/app/merchants/staff/license/edit")
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

export default connect(mapStateToProps, mapDispatchToProps)(license);

// const styles = {
//   h2: {
//     paddingBottom: "10px",
//   },
//   input: {
//     marginBottom: "10px",
//   },
// };
