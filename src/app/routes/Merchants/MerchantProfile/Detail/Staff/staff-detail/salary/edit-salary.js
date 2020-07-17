import React, { Component } from "react";
import { connect } from "react-redux";
import { VIEW_STAFF } from "../../../../../../../../actions/merchants/actions";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import updateStaff from "../updateStaff";

class EditSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const Salary = this.props.Staff;
    const salaries = Salary?.salaries;
    const tipFees = Salary?.tipFees;
    const productSalaries = Salary?.productSalaries;

    this.setState({
      salaryValue: Number(salaries?.perHour?.value).toFixed(2),
      salaryIsCheck: salaries?.perHour?.isCheck,
      commIsCheck: salaries?.commission?.isCheck,
      commValue: Number(salaries?.commission?.value).toFixed(2),
      tipValue: tipFees?.percent?.value,
      tipIsCheck: tipFees?.percent?.isCheck,
      fixValue: Number(tipFees?.fixedAmount?.value).toFixed(2),
      fixIsCheck: tipFees?.fixedAmount?.isCheck,
      prodCommValue: productSalaries?.commission?.value,
      prodCommIsCheck: productSalaries?.commission?.isCheck,
      cashPercent: Salary?.cashPercent,
      loading: true,
    });
  }

  handleCheckBox = (name) => (event) => {
    const value = event.target.checked;
    this.setState({ ...this.state, [name]: value });
    if (name === "salaryIsCheck" && value === true) {
      this.setState({ commIsCheck: false, commValue: 0 });
    }
    if (name === "commIsCheck" && value === true) {
      this.setState({ salaryIsCheck: false, salaryValue: 0 });
    }
    if (name === "tipIsCheck" && value === true) {
      this.setState({ fixIsCheck: false, fixValue: 0 });
    }
    if (name === "fixIsCheck" && value === true) {
      this.setState({ tipIsCheck: false, tipValue: 0 });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleUpdateStaff = () => {
    const {
      salaryValue,
      salaryIsCheck,
      commIsCheck,
      commValue,
      tipValue,
      tipIsCheck,
      fixValue,
      fixIsCheck,
      prodCommValue,
      prodCommIsCheck,
      cashPercent,
    } = this.state;
    const data = this.props.Staff;
    const ID = this.props.Staff.staffId;
    const MerchantId = this.props.merchantID;

    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      cashPercent,
      isActive: data.isActive,
      address: {
        street: data.address,
        city: data.city,
        state: data.stateId,
        zip: data.zip,
      },
      cellphone: data.phone,
      email: data.email,
      pin: data.pin,
      confirmPin: data.pin,
      fileId: data.fileId,
      isDisabled: Number(data.isDisabled),
      driverLicense: data.driverLicense,
      socialSecurityNumber: data.socialSecurityNumber,
      professionalLicense: data?.professionalLicense,
      workingTime: data.workingTimes,
      tipFee: {
        fixedAmount: {
          isCheck: fixIsCheck,
          value: fixValue,
        },
        percent: {
          isCheck: tipIsCheck,
          value: tipValue,
        },
      },
      salary: {
        commission: {
          isCheck: commIsCheck,
          value: commValue,
        },
        perHour: {
          isCheck: salaryIsCheck,
          value: salaryValue,
        },
      },
      productSalary: {
        commission: {
          isCheck: prodCommIsCheck,
          value: prodCommValue,
        },
      },
      Roles: {
        NameRole: data.roleName,
      },
      MerchantId,
    };

    const path = "/app/merchants/staff/salary";
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
    const {
      salaryValue,
      salaryIsCheck,
      commIsCheck,
      commValue,
      tipValue,
      tipIsCheck,
      fixValue,
      fixIsCheck,
      prodCommValue,
      prodCommIsCheck,
      cashPercent,
    } = this.state;
    return (
      <div>
        <div className="container Salary">
          <h2>Salary</h2>
          {this.state.loading && (
            <React.Fragment>
              <div className="row">
                <div className="col-6">
                  <div className="checkbox">
                    <Checkbox
                      name="salaryIsCheck"
                      checked={salaryIsCheck}
                      // disabled={commIsCheck ? true : false}
                      onChange={this.handleCheckBox("salaryIsCheck")}
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                    />
                    <label>Salary per hour</label>
                  </div>
                  <div className="input-box">
                    <input
                      type="number"
                      name="salaryValue"
                      value={salaryValue}
                      disabled={commIsCheck ? true : false}
                      onChange={this.handleChange}
                    />
                    <span className="unit">$</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <Checkbox
                      name="commIsCheck"
                      checked={commIsCheck}
                      // disabled={salaryIsCheck ? true : false}
                      onChange={this.handleCheckBox("commIsCheck")}
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                    />
                    <label>Salary Commission</label>
                  </div>
                  <div className="input-box">
                    <input
                      type="number"
                      name="commValue"
                      value={commValue}
                      disabled={salaryIsCheck ? true : false}
                      onChange={this.handleChange}
                    />
                    <span className="unit">$</span>
                  </div>
                </div>
                <br />
              </div>
              <div className="row justify-content-center">
                <div className="col-6">
                  <div className="checkbox">
                    <Checkbox
                      name="tipIsCheck"
                      checked={tipIsCheck}
                      // disabled={fixIsCheck ? true : false}
                      onChange={this.handleCheckBox("tipIsCheck")}
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                    />
                    <label>Tip Percent</label>
                  </div>
                  <div className="input-box">
                    <input
                      type="number"
                      name="tipValue"
                      value={tipValue}
                      disabled={fixIsCheck ? true : false}
                      onChange={this.handleChange}
                    />
                    <span className="unit">%</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkbox">
                    <Checkbox
                      name="fixIsCheck"
                      checked={fixIsCheck}
                      // disabled={tipIsCheck ? true : false}
                      onChange={this.handleCheckBox("fixIsCheck")}
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                    />
                    <label>Tip Fixed Amount</label>
                  </div>
                  <div className="input-box">
                    <input
                      type="number"
                      name="fixValue"
                      value={fixValue}
                      disabled={tipIsCheck ? true : false}
                      onChange={this.handleChange}
                    />
                    <span className="unit">$</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="checkbox">
                    <Checkbox
                      name="prodCommIsCheck"
                      checked={prodCommIsCheck}
                      onChange={this.handleCheckBox("prodCommIsCheck")}
                      value="true"
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                    />
                    <label>Product Commission</label>
                  </div>
                  <div className="input-box">
                    <input
                      type="number"
                      name="prodCommValue"
                      value={prodCommValue}
                      disabled={prodCommIsCheck ? false : true}
                      onChange={this.handleChange}
                    />
                    <span className="unit">%</span>
                  </div>
                </div>

                <div className="col-6">
                  <label style={{ paddingTop: "10px " }}>
                    Salary pay in Cash
                  </label>
                  <div>
                    <div className="input-box">
                      <input
                        style={{ marginTop: "7px" }}
                        name="cashPercent"
                        type="tel"
                        value={cashPercent}
                        onChange={this.handleChange}
                        min="0"
                        max="100"
                      />
                      <span className="unit">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}

          <div className="SettingsContent general-content" style={styles.div}>
            <Button className="btn btn-green" onClick={this.handleUpdateStaff}>
              SAVE
            </Button>
            <Button
              className="btn btn-red"
              onClick={() =>
                this.props.history.push("/app/merchants/staff/general")
              }
            >
              CANCEL
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

const mapDispatchToProps = (dispatch) => ({
  VIEW_STAFF: (payload) => {
    dispatch(VIEW_STAFF(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSalary);

const styles = {
  div: {
    paddingTop: "20px",
  },
  input: {
    width: "50%",
  },
  icon: {
    cursor: "pointer",
  },
};
