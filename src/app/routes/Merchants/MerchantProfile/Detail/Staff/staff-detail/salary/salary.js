import React, { Component } from "react";
import { connect } from "react-redux";

import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
export class salary extends Component {
  render() {
    const Salary = this.props.Staff;
    const salaries = Salary?.salaries;
    const tipFees = Salary?.tipFees;
    const productSalaries = Salary?.productSalaries;
    const cashPercent = Salary?.cashPercent;

    return (
      <div className="container Salary">
        <h2>Salary</h2>
        <div className="row">
          <div className="col-6">
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
            <div className="input-box">
              <input
                type="text"
                value={Number(salaries?.perHour?.value)?.toFixed(2)}
                disabled
              />
              <span className="unit">$</span>
            </div>
          </div>
          <div className="col-6">
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
            <div className="input-box">
              <input type="text" value={salaries?.commission?.value} disabled />
              <span className="unit">$</span>
            </div>
          </div>
          <br />
        </div>
        {/* TIP FEE */}
        <div className="row justify-content-center">
          <div className="col-6">
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
            <div className="input-box">
              <input type="text" value={tipFees?.percent?.value} disabled />
              <span className="unit">%</span>
            </div>
          </div>
          <div className="col-6">
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
            <div className="input-box">
              <input
                type="text"
                value={Number(tipFees?.fixedAmount?.value)?.toFixed(2)}
                disabled
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
                checked={productSalaries?.commission?.isCheck}
                value="true"
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Product Commission</label>
            </div>
            <div className="input-box">
              <input type="text" value={productSalaries?.commission?.value} />
              <span className="unit">%</span>
            </div>
          </div>
          {/* PAYOUT BY CASH */}
          <div className="col-6">
            <div className="checkbox">
              <Checkbox style={{ color: "white" }} />
              <label>Salary Pay in Cash</label>
            </div>

            <div>
              <div className="input-box">
                <input
                  name="cashPercent"
                  type="tel"
                  value={cashPercent}
                  min="0"
                  max="100"
                  disabled
                />
                <span className="unit">%</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="SettingsContent general-content"
          style={{ paddingTop: "20px" }}
        >
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
  Staff: state.staffDetail,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(salary);
