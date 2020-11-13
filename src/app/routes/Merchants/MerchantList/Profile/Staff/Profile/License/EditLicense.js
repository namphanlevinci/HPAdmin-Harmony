import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStaffByID } from "../../../../../../../../actions/merchantActions";

import { Button, Grid, TextField } from "@material-ui/core";
import { CustomTitle } from "../../../../../../../../util/CustomText";

import InputCustom from "../../../../../../../../util/CustomInput";

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
    const StaffID = this.props.Staff.staffId;
    const MerchantID = this.props.MerchantData.merchantId;
    const payload = {
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
      MerchantID,
      StaffID,
      path: "/app/merchants/staff/license",
    };

    this.props.updateStaffByID(payload);
  };

  render() {
    return (
      <div>
        <div>
          <div className="container-fluid">
            <CustomTitle value="Licenses" />
            {this.state.loading && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    margin="normal"
                    label="Driver License"
                    name="driverLicense"
                    value={this.state.driverLicense}
                    onChange={this.handleChange}
                    fullWidth
                    inputProps={{
                      maxLength: 20,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    label="Social Security Number"
                    name="ssn"
                    value={this.state.ssn}
                    onChange={this.handleChange}
                    fullWidth
                    InputProps={{
                      inputComponent: InputCustom,
                    }}
                    inputProps={{
                      block: [3, 2, 4],
                      delimiter: "-",
                      numericOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    margin="normal"
                    label="Professional License"
                    name="professionalLicense"
                    value={this.state.professionalLicense}
                    onChange={this.handleChange}
                    fullWidth
                    inputProps={{
                      maxLength: 20,
                    }}
                  />
                </Grid>
              </Grid>
            )}

            <div style={{ paddingTop: "200px" }}>
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
  Staff: state.staffById.data,
  MerchantData: state.merchant.merchant,
});

const mapDispatchToProps = (dispatch) => ({
  updateStaffByID: (payload) => {
    dispatch(updateStaffByID(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLicense);
