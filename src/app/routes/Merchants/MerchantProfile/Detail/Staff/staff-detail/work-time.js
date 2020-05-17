import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import Time from "../time";
import Select from "react-select";
import Button from "@material-ui/core/Button";

import "../Staff.styles.scss";
export class workTime extends Component {
  render() {
    console.log("Staff", this.props.Staff);
    const Time = this.props.Staff?.workingTimes;
    return (
      <div>
        <div className="container-fluid Staff">
          {/* Monday */}
          <div className="row justify-content-center">
            <div className="col-6">
              <Checkbox
                name="isCheck2"
                checked={Time?.Monday?.isCheck}
                value="false"
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Monday</label>
              <div className="time-select">
                <label>From</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Monday?.timeStart }}
                  isDisabled
                />
              </div>
            </div>
            <div className="col-6">
              <div className="time-select pad-down">
                <label>To</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Monday?.timeEnd }}
                  isDisabled
                />
              </div>
            </div>
          </div>
          {/* Tuesday */}
          <div className="row justify-content-center">
            <div className="col-6">
              <Checkbox
                name="isCheck3"
                checked={Time?.Tuesday?.isCheck}
                value="false"
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Tuesday</label>
              <div className="time-select">
                <label>From</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Tuesday?.timeEnd }}
                  isDisabled
                />
              </div>
            </div>
            <div className="col-6">
              <div className="time-select pad-down">
                <label>To</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Tuesday?.timeEnd }}
                  isDisabled
                />
              </div>
            </div>
          </div>
          {/* Wednesday */}
          <div className="row justify-content-center">
            <div className="col-6">
              <Checkbox
                checked={Time?.Wednesday?.isCheck}
                value="false"
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Wednesday</label>
              <div className="time-select">
                <label>From</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Wednesday?.timeStart }}
                  isDisabled
                />
              </div>
            </div>
            <div className="col-6">
              <div className="time-select pad-down">
                <label>To</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Wednesday?.timeEnd }}
                  isDisabled
                />
              </div>
            </div>
          </div>
          {/* Thursday */}
          <div className="row justify-content-center">
            <div className="col-6">
              <Checkbox
                checked={Time?.Thursday?.isCheck}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Thurday</label>
              <div className="time-select">
                <label>From</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Thursday?.timeStart }}
                  isDisabled
                />
              </div>
            </div>
            <div className="col-6">
              <div className="time-select pad-down">
                <label>To</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Thursday?.timeEnd }}
                  isDisabled
                />
              </div>
            </div>
          </div>
          {/* Friday */}
          <div className="row justify-content-center">
            <div className="col-6">
              <Checkbox
                name="isCheck6"
                checked={Time?.Friday?.isCheck}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Friday</label>
              <div className="time-select">
                <label>From</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Friday?.timeStart }}
                  isDisabled
                />
              </div>
            </div>
            <div className="col-6">
              <div className="time-select pad-down">
                <label>To</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Friday?.timeEnd }}
                  isDisabled
                />
              </div>
            </div>
          </div>
          {/* Saturday */}
          <div className="row justify-content-center">
            <div className="col-6">
              <Checkbox
                checked={Time?.Saturday?.isCheck}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Saturday</label>
              <div className="time-select">
                <label>From</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Saturday?.timeStart }}
                  isDisabled
                />
              </div>
            </div>
            <div className="col-6">
              <div className="time-select pad-down">
                <label>To</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Saturday?.timeEnd }}
                  isDisabled
                />
              </div>
            </div>
          </div>
          {/* Sunday */}
          <div className="row justify-content-center">
            <div className="col-6">
              <Checkbox
                checked={Time?.Sunday?.isCheck}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <label>Sunday</label>
              <div className="time-select">
                <label>From</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Sunday?.timeStart }}
                  isDisabled
                />
              </div>
            </div>
            <div className="col-6">
              <div className="time-select pad-down">
                <label>To</label> <br />
                <Select
                  options={Time}
                  defaultValue={{ label: Time?.Sunday?.timeEnd }}
                  isDisabled
                />
              </div>
            </div>
          </div>
          <div
            className="SettingsContent GeneralContent"
            style={{ paddingTop: "10px" }}
          >
            <Button
              className="btn btn-green"
              onClick={() =>
                this.props.history.push("/app/merchants/staff/time/edit")
              }
            >
              EDIT
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(workTime);
