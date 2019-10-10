import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import Select from "react-select";

import moment from "moment";
import "./User.css";
import axios from "axios";
import "../../Merchants/MerchantProfile/Detail/Detail.css";

const options = [
  { value: "1", label: "Administrator" },
  { value: "2", label: "Manager" },
  { value: "3", label: "Staff Lv1" },
  { value: "4", label: "Staff Lv2" }
];

class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      address: "",
      city: "",
      zip: "",
      password: "",
      waRoleId: "",
      phone: "",
      stateId: "",
      fileId: "",
      selectedOption: null
    };
  }

  componentDidMount() {
    const e = this.props.UserProfile;
    const ID = e.waUserId;
    this.setState({
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      birthDate: e.birthDate,
      address: e.address,
      city: e.city,
      zip: e.zip,
      password: e.password,
      waRoleId: e.waRoleId,
      phone: e.phone,
      stateId: e.stateId,
      fileId: e.fileId,
      selectedOption: null,
      defaultValue: { label: e.roleName, value: e.waRoleId }
    });
  }

  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  };
  _goBack = () => {
    this.props.history.push("/app/accounts/admin-user-profile");
  };
  render() {
    const e = this.props.UserProfile;
    // console.log("E", this.state);
    const renderProfile =
      e.waUserId !== undefined ? (
        <div className="row justify-content-md-center AdminProfile">
          <div className="col-md-2 text-center">
            <img
              src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
              alt="avatar"
            />
          </div>
          <div className="col-md-10">
            {/* <h1>{e.firstName + " " + e.lastName}</h1> */}
            <p>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this._handleChange}
              ></input>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this._handleChange}
              ></input>
            </p>
            <div className="col-md-4">
              <Select
                value={this.state.selectedOption}
                defaultValue={{ label: e.roleName, value: e.waRoleId }}
                onChange={this.handleChange}
                options={options}
              />
            </div>

            <hr />
            <h2>Contact Information</h2>
            <p>Phone: {e.phone}</p>
            <p>Email: {e.email}</p>
            <p>Address: {e.address}</p>
            <p>City: {e.city}</p>
            <h2>Basic Information</h2>
            <p>Birthday: {moment(e.birthDate).format("MM/DD/YYYY")}</p>
          </div>
          <div className="col-md-12">
            <div className="SettingsContent GeneralContent">
              <Button className="btn btn-green" onClick={this._updateSettings}>
                SAVE
              </Button>
              <Button className="btn btn-red" onClick={this._goBack}>
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/accounts/admin-users" />
      );
    return (
      <div className="container-fluid UserProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUserProfile" />}
        />
        {renderProfile}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  UserProfile: state.ViewProfile_User
});

export default withRouter(connect(mapStateToProps)(EditUserProfile));
