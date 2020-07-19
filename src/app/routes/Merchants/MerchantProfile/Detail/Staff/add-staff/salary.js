import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
// import NumericInput from "react-numeric-input";

import "../Staff.styles.scss";
const Salary = ({
  handleCheckBox,
  handleChange,
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
  <div className="container Salary">
    <div className="row justify-content-center">
      <div className="col-6 ">
        <div className="checkbox">
          <Checkbox
            name="salaryIsCheck"
            disabled={commIsCheck ? true : false}
            onChange={handleCheckBox("salaryIsCheck")}
            value="true"
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
            onChange={handleChange}
            disabled={commIsCheck ? true : false}
          />
          <span className="unit">$</span>
        </div>
      </div>
      <div className="col-6">
        <div className="checkbox">
          <Checkbox
            name="commIsCheck"
            disabled={salaryIsCheck ? true : false}
            onChange={handleCheckBox("commIsCheck")}
            value="true"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Salary Commission</label>
        </div>

        <div className="input-box">
          <input
            name="commValue"
            margin="normal"
            onChange={handleChange}
            value={commValue}
            disabled={salaryIsCheck ? true : false}
          />
          <span className="unit">$</span>
        </div>
      </div>
    </div>
    {/* TIP FEE */}
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="checkbox">
          <Checkbox
            name="tipIsCheck"
            disabled={fixIsCheck ? true : false}
            onChange={handleCheckBox("tipIsCheck")}
            value="true"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Tip Percent</label>
        </div>
        <div>
          <div className="input-box">
            <input
              name="tipValue"
              type="number"
              onChange={handleChange}
              disabled={fixIsCheck ? true : false}
              value={tipValue}
            />
            <span className="unit">%</span>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="checkbox">
          <Checkbox
            name="fixIsCheck"
            disabled={tipIsCheck ? true : false}
            onChange={handleCheckBox("fixIsCheck")}
            value="true"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Tip Fixed Amount</label>
        </div>
        <div className="input-box">
          <input
            name="fixValue"
            type="number"
            onChange={handleChange}
            disabled={tipIsCheck === true ? true : false}
            value={fixValue}
          />
          <span className="unit">$</span>
        </div>
      </div>
    </div>
    {/* PRODUCT SALARY  */}
    <div className="row">
      <div className="col-6">
        <div className="checkbox">
          <Checkbox
            name="prodCommIsCheck"
            checked={prodCommIsCheck}
            onChange={handleCheckBox("prodCommIsCheck")}
            value="true"
            inputProps={{
              "aria-label": "primary checkbox",
            }}
          />
          <label>Product Commission</label>
        </div>
        <div>
          <div className="input-box">
            <input
              name="prodCommValue"
              type="number"
              onChange={handleChange}
              disabled={prodCommIsCheck ? false : true}
              value={prodCommValue}
            />
            <span className="unit">%</span>
          </div>
        </div>
      </div>
      <div className="col-6">
        <label style={{ paddingTop: "10px " }}>Salary pay in Cash</label>
        <div>
          <div className="input-box">
            <input
              style={{ marginTop: "7px" }}
              name="cashPercent"
              type="tel"
              onChange={handleChange}
              value={cashPercent}
              min="0"
              max="100"
            />
            {/* <NumericInput
              className="form-control"
              name="cashPercent"
              onChange={(e) => console.log(e)}
              value={cashPercent}
              min="0"
              max="100"
            /> */}
            <span className="unit">%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Salary;