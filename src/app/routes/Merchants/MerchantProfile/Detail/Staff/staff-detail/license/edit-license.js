import React, { Component } from "react";
import { connect } from "react-redux";
import { VIEW_STAFF } from "../../../../../../../../actions/merchants/actions";

import Button from "@material-ui/core/Button";
import updateStaff from "../updateStaff";

export class EditLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPin: true,
      loading: false,
    };
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    const data = this.props.Staff;
    this.setState(
      {
        driverLicense: data?.driverLicense,
        ssn: data?.ssn,
        professionalLicense: data?.professionalLicense,
      },
      () => this.setState({ loading: true })
    );
  }

  handleUpdateStaff = () => {
    const state = this.state;
    const data = this.props.Staff;
    const ID = this.props.Staff.staffId;
    const MerchantId = this.props.merchantID;
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      isActive: data.isActive,
      cashPercent: data.cashPercent,
      address: {
        street: data.address,
        city: data.city,
        state: data.stateId,
        zip: data.zip,
      },
      cellphone: data.phone,
      email: data.email,
      pin: data.pin,
      fileId: data.fileId,
      confirmPin: data.confirmPin,
      isDisabled: data.isDisabled,
      driverLicense: state.driverLicense,
      socialSecurityNumber: state.ssn,
      professionalLicense: state.professionalLicense,
      workingTime: data.workingTimes,
      tipFee: data.tipFees,
      salary: data.salaries,
      productSalary: data.productSalaries,
      Roles: {
        NameRole: data.roleName,
      },
      MerchantId,
    };

    const path = "/app/merchants/staff/license";
    updateStaff(
      ID,
      body,
      this.props.token,
      this.props.VIEW_STAFF,
      this.props.history,
      path
    );
  };

  render() {
    return (
      <div>
        <div>
          <div className="container-fluid">
            <h2>Licenses</h2>
            {this.state.loading && (
              <div className="row justify-content-between">
                <div className="col-4" style={styles.div}>
                  <label>Driver License</label>
                  <input
                    name="driverLicense"
                    value={this.state.driverLicense}
                    onChange={this.handleChange}
                    maxLength="90"
                  />
                </div>
                <div className="col-4" style={styles.div}>
                  <label>Social Security Number</label>
                  <input
                    name="ssn"
                    value={this.state.ssn}
                    onChange={this.handleChange}
                    maxLength="90"
                  />
                </div>
                <div className="col-4" style={styles.div}>
                  <label>Professional License</label>
                  <input
                    name="professionalLicense"
                    value={this.state.professionalLicense}
                    onChange={this.handleChange}
                    maxLength="90"
                  />
                </div>
              </div>
            )}

            <div
              className="SettingsContent general-content"
              style={{ paddingTop: "200px" }}
            >
              <Button
                className="btn btn-green"
                onClick={this.handleUpdateStaff}
              >
                SAVE
              </Button>
              <Button
                className="btn btn-red"
                onClick={() =>
                  this.props.history.push("/app/merchants/staff/license")
                }
              >
                CANCEL
              </Button>
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

const mapDispatchToProps = (dispatch) => ({
  VIEW_STAFF: (payload) => {
    dispatch(VIEW_STAFF(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLicense);

const styles = {
  div: {
    paddingTop: "10px",
  },
};