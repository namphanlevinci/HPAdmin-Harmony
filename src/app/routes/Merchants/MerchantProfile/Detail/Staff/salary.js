import React from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import "./Staff.styles.scss";
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
    prodCommIsCheck
  }
}) => (
  <div className="container Salary">
    <div className="row justify-content-center">
      <div className="col-4 salary-box">
        <Checkbox
          name="salaryIsCheck"
          disabled={commIsCheck === true ? true : false}
          onChange={handleCheckBox("salaryIsCheck")}
          value="true"
          inputProps={{
            "aria-label": "primary checkbox"
          }}
        />
        <div>
          <TextField
            name="salaryValue"
            label="Salary Per Hour ($)"
            margin="normal"
            type="number"
            fullWidth
            onChange={handleChange}
            required
            disabled={commIsCheck === true ? true : false}
            value={salaryValue}
          />
          {validator.message("salaryValue", salaryValue, "required|numeric")}
        </div>
      </div>
      <div className="col-4 salary-box">
        <Checkbox
          name="commIsCheck"
          disabled={salaryIsCheck === true ? true : false}
          onChange={handleCheckBox("commIsCheck")}
          value="true"
          inputProps={{
            "aria-label": "primary checkbox"
          }}
        />
        <div>
          <TextField
            name="commValue"
            label="Salary Commission (%)"
            margin="normal"
            type="number"
            fullWidth
            onChange={handleChange}
            required
            disabled={salaryIsCheck === true ? true : false}
            value={commValue}
          />
          {validator.message("commValue", commValue, "required|numeric")}
        </div>
      </div>
    </div>
    {/* TIP FEE */}
    <div className="row justify-content-center">
      <div className="col-4 salary-box">
        <Checkbox
          name="tipIsCheck"
          disabled={fixIsCheck === true ? true : false}
          onChange={handleCheckBox("tipIsCheck")}
          value="true"
          inputProps={{
            "aria-label": "primary checkbox"
          }}
        />
        <div>
          <TextField
            name="tipValue"
            label="Tip Percent ($)"
            margin="normal"
            type="number"
            fullWidth
            onChange={handleChange}
            required
            disabled={fixIsCheck === true ? true : false}
            value={tipValue}
          />
          {validator.message("tipValue", tipValue, "required|numeric")}
        </div>
      </div>
      <div className="col-4 salary-box">
        <Checkbox
          name="fixIsCheck"
          disabled={tipIsCheck === true ? true : false}
          onChange={handleCheckBox("fixIsCheck")}
          value="true"
          inputProps={{
            "aria-label": "primary checkbox"
          }}
        />
        <div>
          <TextField
            name="fixValue"
            label="Tip Fixed Amount (%)"
            margin="normal"
            type="number"
            fullWidth
            onChange={handleChange}
            required
            disabled={tipIsCheck === true ? true : false}
            value={fixValue}
          />
          {validator.message("fixValue", fixValue, "required|numeric")}
        </div>
      </div>
    </div>
    {/* PRODUCT SALARY  */}
    <div className="row justify-content-center">
      <div className="col-8 salary-box">
        <Checkbox
          name="prodCommIsCheck"
          checked={prodCommIsCheck}
          onChange={handleCheckBox("prodCommIsCheck")}
          value="true"
          inputProps={{
            "aria-label": "primary checkbox"
          }}
        />
        <div>
          <TextField
            name="prodCommValue"
            label="Product Comission (%)"
            margin="normal"
            type="number"
            fullWidth
            onChange={handleChange}
            required
            value={prodCommValue}
          />
          {validator.message(
            "prodCommValue",
            prodCommValue,
            "required|numeric"
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Salary;
