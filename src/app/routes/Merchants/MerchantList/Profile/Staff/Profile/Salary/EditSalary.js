import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_STAFF } from "../../../../../../../../actions/merchants/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomTitle } from "../../../../../../../../util/CustomText";

import CustomCurrencyInput from "../../../../../../../../util/CustomCurrencyInput";

import {
  InputAdornment,
  Grid,
  Checkbox,
  Button,
  Input,
} from "@material-ui/core";

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

    this.setState(
      {
        salaryValue: salaries?.perHour?.value,
        salaryIsCheck: salaries?.perHour?.isCheck,
        commIsCheck: salaries?.commission?.isCheck,
        commValue: salaries?.commission?.value,
        tipValue: tipFees?.percent?.value,
        tipIsCheck: tipFees?.percent?.isCheck,
        fixValue: tipFees?.fixedAmount?.value,
        fixIsCheck: tipFees?.fixedAmount?.isCheck,
        prodCommValue: productSalaries?.commission?.value,
        prodCommIsCheck: productSalaries?.commission?.isCheck,
        cashPercent: Salary?.cashPercent,
        loading: true,
      },
      () => console.log("THIS STATE", this.state)
    );
  }

  handleCheckBox = (name) => (event) => {
    const value = event.target.checked;
    this.setState({ ...this.state, [name]: value });
    if (name === "salaryIsCheck" && value === true) {
      this.setState({ commIsCheck: false, commValue: (0).toFixed(2) });
    }
    if (name === "commIsCheck" && value === true) {
      this.setState({ salaryIsCheck: false, salaryValue: (0).toFixed(2) });
    }
    if (name === "tipIsCheck" && value === true) {
      this.setState({ fixIsCheck: false, fixValue: (0).toFixed(2) });
    }
    if (name === "fixIsCheck" && value === true) {
      this.setState({ tipIsCheck: false, tipValue: (0).toFixed(2) });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCurrency = (event, masked) => {
    const { name } = event.target;
    this.setState({ [name]: masked });
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
    const staffId = this.props.Staff.staffId;
    const MerchantId = this.props.MerchantData.merchantId;

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

    const payload = {
      body,
      staffId,
      MerchantId,
      path: "/app/merchants/staff/salary",
    };
    this.props.UPDATE_STAFF(payload);
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
        <Formik
          initialValues={this.state}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="container Salary">
                <CustomTitle value="Salary" />

                <Grid container spacing={1} style={{ paddingTop: "10px" }}>
                  <Grid container>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="checkbox">
                        <Checkbox
                          name="salaryIsCheck"
                          checked={salaryIsCheck}
                          onChange={this.handleCheckBox("salaryIsCheck")}
                          inputProps={{
                            "aria-label": "primary checkbox",
                          }}
                        />
                        <label>Salary Per Hour</label>
                      </div>
                      <Input
                        name="salaryValue"
                        type="tel"
                        separator="."
                        style={styles.input}
                        value={salaryValue}
                        disabled={commIsCheck ? true : false}
                        onChange={this.handleCurrency}
                        inputComponent={CustomCurrencyInput}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="checkbox">
                        <Checkbox
                          name="commIsCheck"
                          checked={commIsCheck}
                          onChange={this.handleCheckBox("commIsCheck")}
                          inputProps={{
                            "aria-label": "primary checkbox",
                          }}
                        />
                        <label>Salary Commission</label>
                      </div>
                    </Grid>
                    {/* <Input
                      name="commValue"
                      type="tel"
                      separator="."
                      value={commValue}
                      style={styles.input}
                      disabled={salaryIsCheck ? true : false}
                      onChange={this.handleCurrency}
                      inputComponent={CustomCurrencyInput}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    /> */}
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="commValue"
                      type="tel"
                      label="From"
                      separator="."
                      // value={commValue}
                      style={styles.input}
                      disabled={salaryIsCheck ? true : false}
                      onChange={this.handleCurrency}
                      inputComponent={CustomCurrencyInput}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      name="commValue"
                      type="tel"
                      separator="."
                      // value={commValue}
                      style={styles.input}
                      disabled={salaryIsCheck ? true : false}
                      onChange={this.handleCurrency}
                      inputComponent={CustomCurrencyInput}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Input
                      name="commValue"
                      type="tel"
                      separator="."
                      // value={commValue}
                      style={styles.input}
                      disabled={salaryIsCheck ? true : false}
                      onChange={this.handleCurrency}
                      inputComponent={CustomCurrencyInput}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
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

                    <Input
                      type="tel"
                      name="prodCommValue"
                      value={prodCommValue}
                      separator="."
                      style={styles.input}
                      disabled={prodCommIsCheck ? false : true}
                      onChange={this.handleCurrency}
                      inputComponent={CustomCurrencyInput}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}></Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <div className="checkbox">
                      <Checkbox
                        name="tipIsCheck"
                        checked={tipIsCheck}
                        onChange={this.handleCheckBox("tipIsCheck")}
                        inputProps={{
                          "aria-label": "primary checkbox",
                        }}
                      />
                      <label>Tip Percent</label>
                    </div>

                    <Input
                      type="tel"
                      name="tipValue"
                      value={tipValue}
                      style={styles.input}
                      separator="."
                      disabled={fixIsCheck ? true : false}
                      onChange={this.handleCurrency}
                      inputComponent={CustomCurrencyInput}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="checkbox">
                      <Checkbox
                        name="fixIsCheck"
                        checked={fixIsCheck}
                        onChange={this.handleCheckBox("fixIsCheck")}
                        inputProps={{
                          "aria-label": "primary checkbox",
                        }}
                      />
                      <label>Tip Fixed Amount</label>
                    </div>

                    <Input
                      style={styles.input}
                      name="fixValue"
                      type="tel"
                      separator="."
                      value={fixValue}
                      disabled={tipIsCheck ? true : false}
                      onChange={this.handleCurrency}
                      inputComponent={CustomCurrencyInput}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <div className="checkbox">
                      <Checkbox checked />
                      <label>Payout with Cash </label>
                    </div>

                    <Input
                      style={styles.input}
                      name="cashPercent"
                      value={cashPercent}
                      onChange={this.handleCurrency}
                      min="0"
                      max="100"
                      type="tel"
                      separator="."
                      inputComponent={CustomCurrencyInput}
                      startAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>

                <div style={styles.div}>
                  <Button
                    className="btn btn-green"
                    type="submit"
                    // onClick={this.handleUpdateStaff}
                  >
                    SAVE
                  </Button>
                  <Button
                    className="btn btn-red"
                    onClick={() =>
                      this.props.history.push("/app/merchants/staff/salary")
                    }
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  Staff: state.staffById.data,
  MerchantData: state.MerchantReducer.MerchantData,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_STAFF: (payload) => {
    dispatch(UPDATE_STAFF(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSalary);

const styles = {
  div: {
    paddingTop: "20px",
  },
  input: {
    width: "90%",
    float: "right",
  },
  icon: {
    cursor: "pointer",
  },
};
