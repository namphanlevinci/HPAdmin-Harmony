import React, { Component } from "react";
import { connect } from "react-redux";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import Button from "@material-ui/core/Button";
import Select from "react-select";
import selectState from "../../../../../../../util/selectState";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/high-res.css";
export class EditGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPin: true,
      loading: false,
    };
  }

  componentDidMount() {
    const data = this.props.Staff;
    this.setState(
      {
        firstName: data?.firstName,
        lastName: data?.lastName,
        displayName: data?.displayName,
        address: data?.address,
        city: data?.city,
        stateId: data?.stateId,
        stateName: data?.stateName,
        phone: data?.phone,
        email: data?.email,
        pin: data?.pin,
        roleName: data?.roleName,
        isDisabled: data?.isDisabled,
      },
      () => this.setState({ loading: true })
    );
  }
  showPin = () => {
    this.setState({ showPin: !this.state.showPin });
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const status = [
      { label: "Available", value: "0" },
      { label: "Disable", value: "1" },
    ];

    const roles = [
      { label: "Admin", value: "1" },
      { label: "Staff", value: "3" },
    ];

    const Staff = this.props.Staff;
    console.log("Staff", Staff);
    return (
      <div className="content">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-4">
              <label>First Name</label>
              <input
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4">
              <label>Last Name</label>
              <input
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4">
              <label>Display Name</label>
              <input
                name="displayName"
                value={this.state.displayName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>Address</label>
              <input
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>City</label>
              <input
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>State</label>
              {this.state.loading && (
                <Select
                  defaultValue={{
                    label: this.state.stateName,
                    value: this.state.stateId,
                  }}
                  options={selectState}
                  onChange={(e) => this.setState({ stateId: e.value })}
                />
              )}
            </div>
            <div className="col-4" style={{ paddingTop: "5px" }}>
              <label>Cell Phone</label>
              {/* <p>{Staff?.phone}</p> */}

              <PhoneInput
                country={"us"}
                value={this.state.phone}
                onChange={(phone) => this.setState({ phone })}
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>Contact Email</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4" style={styles.div}>
              <label>PIN Code</label>
              <div style={{ display: "flex" }}>
                <input
                  style={styles.input}
                  name="pin"
                  type={this.state.showPin ? "password" : "text"}
                  value={this.state.pin}
                  onChange={this.handleChange}
                  maxLength={4}
                />
                <span>
                  {this.state.showPin ? (
                    <RiEyeLine
                      onClick={this.showPin}
                      style={styles.icon}
                      size={20}
                    />
                  ) : (
                    <RiEyeOffLine
                      onClick={this.showPin}
                      style={styles.icon}
                      size={20}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="row" style={styles.div}>
            <div className="col-4">
              <label>Role</label>
              {/* <p>{Staff?.roleName}</p> */}
              {this.state.loading && (
                <Select
                  defaultValue={{
                    label: this.state.roleName,
                    value: this.state.roles,
                  }}
                  options={roles}
                  onChange={(e) => this.setState({ roles: e.value })}
                />
              )}
            </div>
            <div className="col-4">
              <label>Status</label>
              {/* <p>{Staff?.isDisabled === 0 ? "Available" : "Not Available"}</p> */}
              {this.state.loading && (
                <Select
                  defaultValue={{
                    label:
                      this.state.isDisabled === 0 ? "Availible" : "Disable",
                    value: this.state.isDisabled,
                  }}
                  options={status}
                  onChange={(e) => this.setState({ isDisabled: e.value })}
                />
              )}
            </div>
          </div>
          <div className="SettingsContent GeneralContent" style={styles.div}>
            <Button
              className="btn btn-green"
              onClick={() =>
                this.props.history.push("/app/merchants/staff/general/edit")
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

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);

const styles = {
  div: {
    paddingTop: "10px",
  },
  input: {
    width: "50%",
  },
  icon: {
    cursor: "pointer",
  },
};
