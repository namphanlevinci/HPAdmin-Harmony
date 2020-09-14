import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
// import NumericInput from "react-numeric-input";
import CurrencyInput from "react-currency-masked-input";
import Grid from "@material-ui/core/Grid";

import "../Staff.styles.scss";
const Salary = ({
  handleCheckBox,
  handleChange,
  handleCurrency,
  validator,
  state: {
    salaryValue,
    salaryIsCheck,
    tipValue,
    tipIsCheck,
    fixValue,
    fixIsCheck,
    commIsCheck,
    commValue,
    prodCommValue,
    prodCommIsCheck,
    cashPercent,
  },
}) => (
  <div className=" Salary">
    <Grid container spacing={1}>
      <Grid item md={6} sm={12} xs={12}>
        <div className="checkbox">
          <Checkbox
            name="salaryIsCheck"
            checked={salaryIsCheck}
            onChange={handleCheckBox("salaryIsCheck")}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Salary per hour</label>
        </div>
        <div className="input-box">
          <CurrencyInput
            type="tel"
            name="salaryValue"
            value={salaryValue}
            onChange={handleCurrency}
            disabled={commIsCheck ? true : false}
          />
          <span className="unit">$</span>
        </div>
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <div className="checkbox">
          <Checkbox
            name="commIsCheck"
            checked={commIsCheck}
            onChange={handleCheckBox("commIsCheck")}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Salary Commission</label>
        </div>

        <div className="input-box">
          <CurrencyInput
            type="tel"
            name="commValue"
            margin="normal"
            onChange={handleCurrency}
            value={commValue}
            disabled={salaryIsCheck ? true : false}
          />
          <span className="unit">%</span>
        </div>
      </Grid>

      {/* PRODUCT SALARY  */}

      <Grid item md={6} sm={12} xs={12}>
        <div className="checkbox">
          <Checkbox
            name="prodCommIsCheck"
            checked={prodCommIsCheck}
            onChange={handleCheckBox("prodCommIsCheck")}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Product Commission</label>
        </div>
        <div>
          <div className="input-box">
            <CurrencyInput
              name="prodCommValue"
              type="number"
              onChange={handleCurrency}
              disabled={prodCommIsCheck ? false : true}
              value={prodCommValue}
            />
            <span className="unit">%</span>
          </div>
        </div>
      </Grid>

      <Grid item md={6} sm={12} xs={12}></Grid>
      {/* TIP FEE */}

      <Grid item md={6} sm={12} xs={12}>
        <div className="checkbox">
          <Checkbox
            name="tipIsCheck"
            checked={tipIsCheck}
            onChange={handleCheckBox("tipIsCheck")}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Tip Percent</label>
        </div>
        <div>
          <div className="input-box">
            <CurrencyInput
              name="tipValue"
              type="number"
              onChange={handleCurrency}
              disabled={fixIsCheck ? true : false}
              value={tipValue}
            />
            <span className="unit">%</span>
          </div>
        </div>
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <div className="checkbox">
          <Checkbox
            name="fixIsCheck"
            checked={fixIsCheck}
            onChange={handleCheckBox("fixIsCheck")}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Tip Fixed Amount</label>
        </div>
        <div className="input-box">
          <CurrencyInput
            name="fixValue"
            type="tel"
            onChange={handleCurrency}
            disabled={tipIsCheck === true ? true : false}
            value={fixValue}
          />
          <span className="unit">$</span>
        </div>
      </Grid>

      <Grid item md={6} sm={12} xs={12}>
        <Checkbox checked />
        <label>Salary pay in Cash</label>
        <div>
          <div className="input-box">
            <CurrencyInput
              name="cashPercent"
              type="tel"
              onChange={handleCurrency}
              value={cashPercent}
              min="0"
              max="100"
            />
            <span className="unit">%</span>
          </div>
        </div>
      </Grid>
    </Grid>
  </div>
);

export default Salary;
