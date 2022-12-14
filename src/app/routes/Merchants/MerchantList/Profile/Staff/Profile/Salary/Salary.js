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

class Salary extends Component {
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
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
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
                value={salaries?.perHour?.value}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />{" "}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} style={{ paddingTop: 10 }}>
              <div className="checkbox">
                <Checkbox
                  name="commIsCheck"
                  checked={salaries?.commission?.isCheck}
                  inputProps={{
                    "aria-label": "primary checkbox",
                  }}
                />
                <label>Salary By Incomes</label>
              </div>
            </Grid>
          </Grid>

          {salaries?.commission?.value.map((item, index) => (
            <Grid
              container
              spacing={3}
              className={index !== 0 && "salary_padding"}
            >
              <Grid item xs={4}>
                <TextField
                  type="text"
                  style={styles.input}
                  value={item?.from}
                  disabled
                  label="From"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="text"
                  style={styles.input}
                  value={item?.to}
                  disabled
                  label="To"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="text"
                  style={styles.input}
                  value={item?.commission}
                  disabled
                  label="Salary percented (%)"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          ))}

          <br />
          <Grid item xs={12}>
            <CustomTitle value="Product Salary" styles={styles.title} />
          </Grid>
          {/* PRODUCT SALARY  */}
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
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
          </Grid>
          <Grid item xs={12}>
            <CustomTitle value="Tip Fee" styles={styles.title} />
          </Grid>
          {/* TIP FEE */}
          <Grid item xs={12} sm={6} md={4}>
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
              label="Percent"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
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
              label="Amount"
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

          <Grid item xs={12}>
            <CustomTitle value="Payout by Cash" styles={styles.title} />
          </Grid>
          {/* PAYOUT BY CASH */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="text"
              label="Percent"
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
  Staff: state.staffById.data,
});

export default connect(mapStateToProps)(Salary);

const styles = {
  input: {
    width: "90%",
    float: "right",
  },
  title: {
    margin: "20px 0px 10px 0px",
  },
};
