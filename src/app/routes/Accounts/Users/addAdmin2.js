import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { ADD_ADMIN } from "../../../../actions/user/actions";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "./User.css";
import axios from "axios";
import { ViewProfile_User } from "../../../../actions/user/actions";
import "../../Merchants/MerchantProfile/Detail/Detail.css";
import URL from "../../../../url/url";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const roles = [
  { value: "1", label: "Administrator" },
  { value: "2", label: "Manager" },
  { value: "3", label: "Staff Lv1" },
  { value: "4", label: "Staff Lv2" }
];

const stateID = [
  { value: "1", label: "New York" },
  { value: "2", label: "Florida" },
  { value: "4", label: "California" },
  { value: "5", label: "Texas" },
  { value: "7", label: "Alaska" },
  { value: "8", label: "Alabama" },
  { value: "9", label: "Arkansas" },
  { value: "10", label: "Arizona" },
  { value: "11", label: "Colorado" },
  { value: "12", label: "Connecticut" },
  { value: "13", label: "Washington, D.C." },
  { value: "14", label: "Delaware" },
  { value: "15", label: "Georgia" },
  { value: "16", label: "Hawaii" },
  { value: "17", label: "Iowa" },
  { value: "18", label: "Idaho" },
  { value: "19", label: "Illinois" },
  { value: "20", label: "Indiana" },
  { value: "21", label: "Kansas" },
  { value: "22", label: "Kentucky" },
  { value: "23", label: "Louisiana" },
  { value: "24", label: "Massachusetts" },
  { value: "25", label: "Maryland" },
  { value: "26", label: "Maine" },
  { value: "27", label: "Michigan" },
  { value: "28", label: "Minnesota" },
  { value: "29", label: "Missouri" },
  { value: "30", label: "Mississippi" },
  { value: "31", label: "Montana" },
  { value: "32", label: "North Carolina" },
  { value: "33", label: "North Dakota" },
  { value: "34", label: "Nebraska" },
  { value: "35", label: "New Hampshire" },
  { value: "36", label: "New Jersey" },
  { value: "37", label: "New Mexico" },
  { value: "38", label: "Nevada" },
  { value: "39", label: "Ohio" },
  { value: "40", label: "Oklahoma" },
  { value: "41", label: "Oregon" },
  { value: "42", label: "Pennsylvania" },
  { value: "43", label: "Rhode Island" },
  { value: "44", label: "South Carolina" },
  { value: "45", label: "South Dakota" },
  { value: "46", label: "Tennessee" },
  { value: "47", label: "Utah" },
  { value: "48", label: "Virginia" },
  { value: "49", label: "Vermont" },
  { value: "50", label: "Washington" },
  { value: "51", label: "Wisconsin" },
  { value: "52", label: "West Virginia" },
  { value: "53", label: "Wyoming" }
];

class addAdmin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      city: "",
      zip: "",
      stateID: undefined,
      BirthDate: undefined,
      roles: undefined,
      phone: "",
      fileId: 0
    };
  }

  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleRoles = selectedOption => {
    this.setState({ roles: selectedOption.value });
  };
  handleState = selectedOption => {
    this.setState({ stateID: selectedOption.value });
  };
  _uploadFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    axios
      .post(URL + "/file?category=service", formData, config)
      .then(res => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch(err => {
        console.log(err);
      });
  };
  _addAdminUser = e => {
    if (this.state.roles && this.state.stateID) {
      e.preventDefault();
      const WaRoleId = this.state.roles.value;
      const stateID = this.state.stateID.value;
      const {
        firstname,
        lastname,
        email,
        password,
        address,
        city,
        zip,
        BirthDate,
        phone,
        fileId
      } = this.state;
      const fullname = `${firstname} ${lastname}`;
      const Data = {
        stateID,
        WaRoleId,
        firstname,
        lastname,
        email,
        password,
        address,
        city,
        zip,
        BirthDate,
        fullname,
        phone,
        fileId
      };
      this.props.addAdmin(Data);
    }
  };
  _goBack = () => {
    this.props.history.push("/app/accounts/admin");
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.AddStatus !== this.props.AddStatus) {
      const Message = localStorage.getItem("ADD_STATUS");
      if (Message !== "Success") {
        NotificationManager.error(Message);
        setTimeout(() => localStorage.removeItem("ADD_STATUS"), 1000);
      } else {
        NotificationManager.success(Message);
        setTimeout(() => localStorage.removeItem("ADD_STATUS"), 1000);
        setTimeout(() => this.props.history.push("/app/accounts/admin", 1200));
        this.setState({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          address: "",
          city: "",
          zip: "",
          stateID: undefined,
          BirthDate: undefined,
          roles: undefined,
          phone: "",
          fileId: 0
        });
      }
    }
  }
  render() {
    const renderProfile = (
      <div className="row justify-content-md-center AdminProfile">
        <div className="col-md-3 text-center">
          <img
            src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
            alt="avatar"
          />

          <div>
            <label>Upload avatar</label>
            <br />
            <input
              type="file"
              style={{ width: "250px" }}
              name="image"
              id="file"
              onChange={e => this._uploadFile(e)}
            ></input>
          </div>
        </div>
        <div className="col-md-9">
          <h2>Contact Information</h2>
          {/* <p>
            First Name
            <input
              type="text"
              name="firstname"
              value={this.state.firstName}
              onChange={this._handleChange}
            ></input>
          </p>
          <p>
            Last Name
            <input
              type="text"
              name="lastname"
              value={this.state.lastName}
              onChange={this._handleChange}
            ></input>
          </p>
          <p>
            Password &nbsp;
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this._handleChange}
            ></input>
          </p> */}

          <hr />

          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>First Name</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="firstname"
                    value={this.state.firstName}
                    onChange={this._handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>Last name </p>
                </td>
                <td>
                  <input
                    type="text"
                    name="lastname"
                    value={this.state.lastName}
                    onChange={this._handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>Password </p>
                </td>
                <td>
                  <input
                    type="text"
                    name="password"
                    value={this.state.password}
                    onChange={this._handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>Role</p>
                </td>
                <td style={{ width: "29%" }}>
                  <Select
                    required
                    value={this.state.roles}
                    onChange={value => this.setState({ roles: value })}
                    options={roles}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>Phone</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={this.state.phone}
                    onChange={this._handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>Email</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this._handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>Address</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="address"
                    value={this.state.address}
                    onChange={this._handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>City</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="city"
                    value={this.state.city}
                    onChange={this._handleChange}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Basic Information</h2>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>Zip</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="zip"
                    value={this.state.zip}
                    onChange={this._handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>State</p>
                </td>
                <td style={{ width: "29%" }}>
                  <Select
                    value={this.state.stateID}
                    onChange={value => this.setState({ stateID: value })}
                    options={stateID}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%" }}>
                  <p>Birthday </p>
                </td>
                <td className="Birthday">
                  <DatePicker
                    className="Birthday"
                    placeholderText="MM/DD/YYYY"
                    selected={this.state.BirthDate}
                    onChange={date => this.setState({ BirthDate: date })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="col-md-12">
            <div className="SettingsContent GeneralContent">
              <Button className="btn btn-green" onClick={this._addAdminUser}>
                CREATE USER
              </Button>
              <Button className="btn btn-red" onClick={this._goBack}>
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container-fluid UserProfile">
        <NotificationContainer />
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.addAdmin" />}
        />
        {renderProfile}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  UserProfile: state.ViewProfile_User,
  AddStatus: state.addAdminUser
});
const mapDispatchToProps = dispatch => ({
  ViewProfile_User: payload => {
    dispatch(ViewProfile_User(payload));
  },
  addAdmin: payload => {
    dispatch(ADD_ADMIN(payload));
  }
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(addAdmin2)
);
