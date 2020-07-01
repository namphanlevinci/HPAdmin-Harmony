import React, { Component } from "react";
import { VIEW_STAFF } from "../../../../../../../actions/merchants/actions";
import { connect } from "react-redux";

import Checkbox from "@material-ui/core/Checkbox";
import Time from "../time";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import updateStaff from "./updateStaff";

import "../Staff.styles.scss";
export class EditWorkTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPin: true,
      loading: false,
    };
  }

  componentDidMount() {
    const time = this.props.Staff.workingTimes;
    this.setState(
      {
        timeStart2: time?.Monday?.timeStart,
        timeEnd2: time?.Monday?.timeEnd,
        isCheck2: time?.Monday?.isCheck,
        timeStart3: time?.Tuesday?.timeStart,
        timeEnd3: time?.Tuesday?.timeEnd,
        isCheck3: time?.Tuesday?.isCheck,
        timeStart4: time?.Wednesday?.timeStart,
        timeEnd4: time?.Wednesday?.timeEnd,
        isCheck4: time?.Wednesday?.isCheck,
        timeStart5: time?.Thursday?.timeStart,
        timeEnd5: time?.Thursday?.timeEnd,
        isCheck5: time?.Thursday?.isCheck,
        timeStart6: time?.Friday?.timeStart,
        timeEnd6: time?.Friday?.timeEnd,
        isCheck6: time?.Friday?.isCheck,
        timeStart7: time?.Saturday?.timeStart,
        timeEnd7: time?.Saturday?.timeEnd,
        isCheck7: time?.Saturday?.isCheck,
        timeStart8: time?.Sunday?.timeStart,
        timeEnd8: time?.Sunday?.timeEnd,
        isCheck8: time?.Sunday?.isCheck,
      },
      () => this.setState({ loading: true })
    );
  }

  handleSelect = (selectedOption, inputName) => {
    const { name } = inputName;
    this.setState({ [name]: selectedOption.value });
  };

  handleCheckBox = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleUpdateStaff = () => {
    const state = this.state;
    const data = this.props.Staff;
    const ID = this.props.Staff.staffId;
    const MerchantId = this.props.merchantID;
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      address: {
        street: data.address,
        city: data.city,
        state: data.stateId,
      },
      cellphone: data.phone,
      email: data.email,
      pin: data.pin,
      confirmPin: data.confirmPin,
      isDisabled: data.isDisabled,
      driverLicense: data.driverLicense,
      socialSecurityNumber: data.socialSecurityNumber,
      professionalLicense: data.professionalLicense,
      tipFee: data.tipFees,
      salary: data.salaries,
      productSalary: data.productSalaries,
      Roles: {
        NameRole: data.roleName,
      },
      MerchantId,

      WorkingTime: {
        Monday: {
          timeStart: state.timeStart2,
          timeEnd: state.timeEnd2,
          isCheck: state.isCheck2,
        },
        Tuesday: {
          timeStart: state.timeStart3,
          timeEnd: state.timeEnd3,
          isCheck: state.isCheck3,
        },
        Wednesday: {
          timeStart: state.timeStart4,
          timeEnd: state.timeEnd4,
          isCheck: state.isCheck4,
        },
        Thursday: {
          timeStart: state.timeStart5,
          timeEnd: state.timeEnd5,
          isCheck: state.isCheck5,
        },
        Friday: {
          timeStart: state.timeStart6,
          timeEnd: state.timeEnd6,
          isCheck: state.isCheck6,
        },
        Saturday: {
          timeStart: state.timeStart7,
          timeEnd: state.timeEnd7,
          isCheck: state.isCheck7,
        },
        Sunday: {
          timeStart: state.timeStart8,
          timeEnd: state.timeEnd8,
          isCheck: state.isCheck8,
        },
      },
    };

    const path = "/app/merchants/staff/time";
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
    return (
      <div>
        <div className="container Staff">
          {this.state.loading && (
            <React.Fragment>
              <div className="header">
                <h2>Working Time</h2>
              </div>

              <div
                className="row justify-content-center"
                style={{ paddingBottom: "10px" }}
              >
                <div className="col-2">
                  <label style={{ color: "#4251af" }}>Date</label>
                </div>
                <div className="col-5">
                  <label>Shift Start</label>
                </div>
                <div className="col-5">
                  <label>Shift End</label>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-2" style={style.col2}>
                  <Checkbox
                    name="isCheck2"
                    checked={this.state.isCheck2}
                    onChange={this.handleCheckBox("isCheck2")}
                    value="false"
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                  <label>Monday</label>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeStart2"
                      defaultValue={{ label: this.state.timeStart2 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeEnd2"
                      defaultValue={{ label: this.state.timeEnd2 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-2" style={style.col2}>
                  <Checkbox
                    name="isCheck3"
                    checked={this.state.isCheck3}
                    onChange={this.handleCheckBox("isCheck3")}
                    value="false"
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                  <label>Tuesday</label>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeStart3"
                      defaultValue={{ label: this.state.timeStart3 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeEnd3"
                      defaultValue={{ label: this.state.timeEnd3 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-2" style={style.col2}>
                  <Checkbox
                    name="isCheck4"
                    checked={this.state.isCheck4}
                    onChange={this.handleCheckBox("isCheck4")}
                    value="false"
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                  <label>Wednesday</label>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeStart4"
                      defaultValue={{ label: this.state.timeStart4 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="time-select ">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeEnd4"
                      defaultValue={{ label: this.state.timeEnd4 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-2" style={style.col2}>
                  <Checkbox
                    name="isCheck5"
                    checked={this.state.isCheck5}
                    onChange={this.handleCheckBox("isCheck5")}
                    value="false"
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                  <label>Thursday</label>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeStart5"
                      defaultValue={{ label: this.state.timeStart5 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="time-select ">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeEnd5"
                      defaultValue={{ label: this.state.timeEnd5 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-2" style={style.col2}>
                  <Checkbox
                    name="isCheck6"
                    checked={this.state.isCheck6}
                    onChange={this.handleCheckBox("isCheck6")}
                    value="false"
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                  <label>Friday</label>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeStart6"
                      defaultValue={{ label: this.state.timeStart6 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="time-select ">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeEnd6"
                      defaultValue={{ label: this.state.timeEnd6 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-2" style={style.col2}>
                  <Checkbox
                    name="isCheck7"
                    checked={this.state.isCheck7}
                    onChange={this.handleCheckBox("isCheck7")}
                    value="false"
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                  <label>Saturday</label>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeStart7"
                      defaultValue={{ label: this.state.timeStart7 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeEnd7"
                      defaultValue={{ label: this.state.timeEnd7 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-2" style={style.col2}>
                  <Checkbox
                    name="isCheck8"
                    checked={this.state.isCheck8}
                    onChange={this.handleCheckBox("isCheck8")}
                    value="false"
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                  <label>Sunday</label>
                </div>
                <div className="col-5">
                  <div className="time-select">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeStart8"
                      defaultValue={{ label: this.state.timeStart8 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="col-5">
                  <div className="time-select ">
                    <Select
                      options={Time}
                      onChange={this.handleSelect}
                      name="timeEnd8"
                      defaultValue={{ label: this.state.timeEnd8 }}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}

          <div
            className="SettingsContent GeneralContent"
            style={{ paddingTop: "10px" }}
          >
            <Button className="btn btn-green" onClick={this.handleUpdateStaff}>
              SAVE
            </Button>
            <Button
              className="btn btn-red"
              onClick={() =>
                this.props.history.push("/app/merchants/staff/time")
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

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkTime);

const style = {
  col2: {
    paddingLeft: "5px",
  },
};
