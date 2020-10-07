import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomTitle } from "../../../../../../../../util/CustomText";

import {
  InputAdornment,
  TextField,
  Grid,
  Checkbox,
  Button,
} from "@material-ui/core";

export class salary extends Component {
  render() {
    const Salary = this.props.Staff;
    const salaries = Salary?.salaries;
    const tipFees = Salary?.tipFees;
    const productSalaries = Salary?.productSalaries;
    const cashPercent = Salary?.cashPercent;

    return (
      <div className="container Salary">
        <CustomTitle value="Salary" />
        <Grid container spacing={1} style={{ paddingTop: "10px" }}>
          <Grid item md={6} sm={12} xs={12}>
            <div className="checkbox">
              <Checkbox
                name="salaryIsCheck"
                checked={salaries?.perHour?.isCheck}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Salary Per Hour</label>
            </div>
            <TextField
              type="text"
              style={styles.input}
              value={Number(salaries?.perHour?.value)?.toFixed(2)}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <div className="checkbox">
              <Checkbox
                name="commIsCheck"
                checked={salaries?.commission?.isCheck}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Salary Commission</label>
            </div>

            <TextField
              type="text"
              style={styles.input}
              value={salaries?.commission?.value}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </Grid>
          <br />

          {/* PRODUCT SALARY  */}
          <Grid item md={6} sm={12} xs={12}>
            <div className="checkbox">
              <Checkbox
                name="prodCommIsCheck"
                checked={productSalaries?.commission?.isCheck}
                value="true"
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Product Commission</label>
            </div>

            <TextField
              type="text"
              style={styles.input}
              value={productSalaries?.commission?.value}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}></Grid>
          {/* TIP FEE */}
          <Grid item md={6} sm={12} xs={12}>
            <div className="checkbox">
              <Checkbox
                name="tipIsCheck"
                checked={tipFees?.percent?.isCheck}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Tip Percent</label>
            </div>

            <TextField
              type="text"
              style={styles.input}
              value={tipFees?.percent?.value}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <div className="checkbox">
              <Checkbox
                name="fixIsCheck"
                checked={tipFees?.fixedAmount?.isCheck}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Tip Fixed Amount</label>
            </div>

            <TextField
              type="text"
              style={styles.input}
              value={Number(tipFees?.fixedAmount?.value)?.toFixed(2)}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* PAYOUT BY CASH */}
          <Grid item md={6} sm={12} xs={12}>
            <div className="checkbox">
              <Checkbox checked />
              <label>Payout with Cash </label>
            </div>

            <TextField
              type="text"
              style={styles.input}
              value={cashPercent}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <div style={{ paddingTop: "20px" }}>
          <Button
            className="btn btn-green"
            onClick={() =>
              this.props.history.push("/app/merchants/staff/salary/edit")
            }
          >
            EDIT
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Staff: state.MerchantReducer.StaffData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(salary);

const styles = {
  input: {
    width: "90%",
    float: "right",
  },
};
