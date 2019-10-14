import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "./User.css";
import axios from "axios";
import { ViewProfile_User } from "../../../../actions/user/actions";
import "../../Merchants/MerchantProfile/Detail/Detail.css";
import URL from "../../../../url/url";

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
      selectedOption: null,
      defaultValue: {
        value: { label: "", value: "" }
      },
      Token: null
    };
  }

  async componentDidMount() {
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
    const e = this.props.UserProfile;
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
      defaultValue: { value: { label: e.roleName, value: e.waRoleId } }
    });
  }

  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    // console.log("THIS.STATE", this.state);
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

  handleChange = selectedOption => {
    this.setState({ waRoleId: selectedOption.value });
  };

  handleDateChange = date => {
    // setSelectedDate(date);
    this.setState({ birthDate: date });
  };
  _updateSettings = () => {
    const ID = this.props.UserProfile.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token }
    };
    const {
      firstName,
      lastName,
      email,
      birthDate,
      address,
      city,
      zip,
      password,
      waRoleId,
      phone,
      stateId,
      fileId
    } = this.state;
    axios
      .put(
        URL + "/adminuser/" + ID,
        {
          firstName,
          lastName,
          email,
          birthDate,
          address,
          city,
          zip,
          password,
          waRoleId,
          phone,
          stateId,
          fileId
        },
        config
      )
      .then(async res => {
        if (res.data.message === "Success") {
          NotificationManager.success(res.data.message);
          await axios
            .get(URL + "/adminuser/" + ID, config)
            .then(res => {
              console.log("res02", res);
              setTimeout(
                () => this.props.ViewProfile_User(res.data.data),
                1000
              );
              setTimeout(
                () =>
                  this.props.history.push("/app/accounts/admin-user-profile"),
                1500
              );
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  _goBack = () => {
    this.props.history.push("/app/accounts/admin-user-profile");
  };
  _disable = () => {
    const ID = this.props.UserProfile.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token }
    };
    axios
      .delete(URL + "/adminuser/" + ID, config)
      .then(res => {
        // console.log(res);
        NotificationManager.success(res.data.message);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  _enable = () => {
    const ID = this.props.UserProfile.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token }
    };
    axios
      .put(URL + "/enable/" + ID, config)
      .then(res => {
        // console.log(res);
        NotificationManager.success(res.data.message);
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  render() {
    const e = this.props.UserProfile;
    const renderProfile =
      e.waUserId !== undefined ? (
        <div className="row justify-content-md-center AdminProfile">
          <div className="col-md-3 text-center">
            {e.imageUrl !== null ? (
              <img src={e.imageUrl} alt="avatar" />
            ) : (
              <img
                src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
                alt="avatar"
              />
            )}
            <div>
              <label>Upload new avatar:</label>
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
            <p>
              First Name:
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this._handleChange}
              ></input>
            </p>
            <p>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this._handleChange}
              ></input>
            </p>
            <div className="col-md-4">
              <p>
                Role:
                <Select
                  value={this.state.defaultValue.value}
                  onChange={this.handleChange}
                  options={options}
                />
              </p>
            </div>

            <hr />
            <h2>Contact Information</h2>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ width: "10%" }}>Phone</td>
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
                  <td style={{ width: "10%" }}>Email</td>
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
                  <td style={{ width: "10%" }}>Address</td>
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
                  <td style={{ width: "10%" }}>City</td>
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
                  <td style={{ width: "10%" }}>Zip</td>
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
                  <td style={{ width: "10%" }}>State ID</td>
                  <td>
                    <input
                      type="text"
                      name="stateId"
                      value={this.state.stateId}
                      onChange={this._handleChange}
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <label>Birthdate: </label>
              <form noValidate>
                <TextField
                  id="date"
                  // label="birthDate"
                  type="date"
                  name="birthDate"
                  defaultValue={this.state.birthDate}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this._handleChange}
                />
              </form>
            </div>
          </div>
          <div className="col-md-12">
            <div className="SettingsContent GeneralContent">
              {e.isDisabled === 0 ? (
                <Button className="btn btn-green" onClick={this._disable}>
                  DISABLE
                </Button>
              ) : (
                <Button className="btn btn-green" onClick={this._enable}>
                  ENABLE
                </Button>
              )}
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
        <NotificationContainer />
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
const mapDispatchToProps = dispatch => ({
  ViewProfile_User: payload => {
    dispatch(ViewProfile_User(payload));
  }
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditUserProfile)
);
