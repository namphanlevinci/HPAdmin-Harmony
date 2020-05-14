import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import URL, { upFileUrl } from "../../../../url/url";
import { ViewProfile_User } from "../../../../actions/user/actions";
import { store } from "react-notifications-component";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
// import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

import "./User.css";
import "../../Merchants/MerchantProfile/Detail/Detail.css";

// const options = [
//   { value: "1", label: "Administrator" },
//   { value: "2", label: "Manager" },
//   { value: "3", label: "Staff Lv1" },
//   { value: "4", label: "Staff Lv2" }
// ];

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
        value: { label: "", value: "" },
      },
      Token: null,
      imagePreviewUrl: "",
      loading: false,
      showPassword: false,
    };
  }

  async componentDidMount() {
    const Token = localStorage.getItem("User_login");
    const e = this.props.UserProfile;
    this.setState(
      {
        Token: Token,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        birthDate: moment(e.birthDate).format("yyyy-MM-DD"),
        address: e.address,
        city: e.city,
        zip: e.zip,
        password: e.password,
        waRoleId: e.waRoleId,
        phone: e.phone,
        stateId: e.stateId,
        fileId: e.fileId,
        selectedOption: null,
        // defaultValue: { value: { label: e.roleName, value: e.waRoleId } }
      },
      () => this.setState({ loading: true })
    );
  }

  _handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    // console.log("THIS.STATE", this.state);
  };

  _uploadFile = (event) => {
    event.stopPropagation();
    event.preventDefault();

    let reader = new FileReader();

    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFileUrl, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDateChange = (date) => {
    // setSelectedDate(date);
    this.setState({ birthDate: date });
  };
  _updateSettings = () => {
    const ID = this.props.UserProfile.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token },
    };
    // const waRoleId = this.state.waRoleId.value;
    const {
      firstName,
      lastName,
      email,
      birthDate,
      address,
      city,
      zip,
      phone,
      stateId,
      fileId,
      waRoleId,
      password,
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
          fileId,
        },
        config
      )
      .then(async (res) => {
        if (res.data.message === "Success") {
          // NotificationManager.success, null, 800);
          store.addNotification({
            title: "Success!",
            message: `${res.data.message}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });

          await axios
            .get(URL + "/adminuser/" + ID, config)
            .then((res) => {
              setTimeout(
                () => this.props.ViewProfile_User(res.data.data),
                1000
              );
              setTimeout(
                () => this.props.history.push("/app/accounts/admin/profile"),
                1500
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  _goBack = () => {
    this.props.history.push("/app/accounts/admin/profile");
  };

  showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    let { imagePreviewUrl } = this.state;
    const e = this.props.UserProfile;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="avatar" />;
    } else {
      $imagePreview =
        e.imageUrl !== null ? (
          <img src={e.imageUrl} alt="avatar" />
        ) : (
          <img
            src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
            alt="avatar"
          />
        );
    }

    return (
      <div className="container-fluid UserProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUserProfile" />}
        />
        <div className="row justify-content-md-center AdminProfile page-heading">
          <div className="admin-header-div col-12">
            {/* <h2 style={{ fontWeight: 500 }}>ID: {e.waUserId}</h2> */}
            <span>
              <Button
                style={{ color: "#4251af", backgroundColor: "white" }}
                className="btn btn-green"
                onClick={() =>
                  this.props.history.push("/app/accounts/admin/profile")
                }
              >
                CANCEL
              </Button>
              <Button className="btn btn-red" onClick={this._updateSettings}>
                SAVE
              </Button>
            </span>
          </div>
          <hr style={styles.hr} />
          <div className="col-3 text-center">
            {$imagePreview}
            <div style={{ paddingTop: "10px" }}>
              <input
                type="file"
                // style={{ paddingTop: "10px" }}
                name="image"
                id="file"
                className="custom-input"
                onChange={(e) => this._uploadFile(e)}
              />
            </div>
          </div>
          <div className="col-9" style={{ paddingLeft: "30px" }}>
            <h1>{e.firstName + " " + e.lastName}</h1>
            <h4>{e.roleName}</h4>
            <hr />
            <h2>Contact Information</h2>
            <div className="row">
              <div className="col-6">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this._handleChange}
                />
              </div>
              <div className="col-6">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this._handleChange}
                />
              </div>

              <div className="col-12" style={styles.div}>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this._handleChange}
                />
              </div>
            </div>

            <h2>Basic Information</h2>

            <div>
              <div style={{ display: "inline" }}>
                <label>Birthday: </label>
              </div>
              <div style={{ display: "inline", paddingLeft: "15px" }}>
                <form noValidate>
                  {this.state.loading && (
                    <TextField
                      id="date"
                      // label="birthDate"
                      type="date"
                      name="birthDate"
                      defaultValue={this.state.birthDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this._handleChange}
                    />
                  )}
                </form>
              </div>

              <div style={styles.div}>
                <label>Password</label>
                <div style={{ display: "flex" }}>
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    name="password"
                    value={this.state.password}
                    onChange={this._handleChange}
                    style={styles.input}
                    // className="form-control"
                  />
                  <span>
                    {this.state.showPassword ? (
                      <RiEyeLine
                        onClick={this.showPassword}
                        style={styles.icon}
                        size={20}
                      />
                    ) : (
                      <RiEyeOffLine
                        onClick={this.showPassword}
                        style={styles.icon}
                        size={20}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UserProfile: state.ViewProfile_User,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_User: (payload) => {
    dispatch(ViewProfile_User(payload));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditUserProfile)
);

const styles = {
  hr: {
    height: "1px",
    border: "0",
    borderTop: "1px solid #4251af",
    alignContent: "center",
    width: "100%",
  },
  div: {
    paddingTop: "10px",
  },
  input: {
    width: "30%",
  },
  icon: {
    cursor: "pointer",
  },
};
