import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import URL, { upFileUrl } from "../../url/url";
import { ViewProfile_User } from "../../actions/user/actions";
import { store } from "react-notifications-component";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { GiCheckedShield } from "react-icons/gi";
import { FaPen } from "react-icons/fa";

import IntlMessages from "../../util/IntlMessages";
import ContainerHeader from "../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
import axios from "axios";

import General from "../../app/routes/Accounts/Users/General";
import Password from "./ProfileHeader/password";

import "./profile.css";

class proFile extends Component {
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
      password: null,
      confirmPassword: null,
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
    const e = this.props.UserProfile?.User?.userAdmin;
    console.log("e", e);
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
      },
      () => this.setState({ loading: true })
    );
  }

  handleChange = (event) => {
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
    this.setState({ birthDate: date });
  };

  updateAdmin = () => {
    const ID = this.props.UserProfile?.User?.userAdmin.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token },
    };
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
                () => this.props.history.push("/app/profile/general"),
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

  _updateSettings = () => {
    console.log("this.props.history", this.props.history.location.pathname);
    const patchURL = this.props.history.location.pathname;
    if (patchURL === "/app/profile/password") {
      this.setState({ error: "", confirmError: "" });
      const { password, confirmPassword } = this.state;
      if (password === null) {
        this.setState({ error: "Please enter Password " });
      }
      if (confirmPassword === null) {
        this.setState({ confirmError: "Please enter Confirm Password" });
      }
      if (password !== confirmPassword) {
        this.setState({ confirmError: "Confirm Password didn't match" });
      }
      if (
        password !== null &&
        confirmPassword !== null &&
        password === confirmPassword
      ) {
        this.updateAdmin();
      }
    } else {
      this.updateAdmin();
    }
  };

  _goBack = () => {
    this.props.history.push("/app/dashboard");
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    let { imagePreviewUrl } = this.state;
    const e = this.props.UserProfile?.User?.userAdmin;
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
      <Router>
        <div className="container-fluid UserProfile">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.adminUserProfile" />}
          />
          <div
            className="row justify-content-md-center AdminProfile page-heading"
            style={{ minHeight: "500px" }}
          >
            <div className="col-3 text-center">
              {$imagePreview}
              <div style={{ paddingTop: "10px" }}>
                <input
                  type="file"
                  name="image"
                  id="file"
                  className="custom-input"
                  onChange={(e) => this._uploadFile(e)}
                />
              </div>
              <div className="nav-btn">
                <NavLink
                  to="/app/profile/general"
                  activeStyle={{
                    fontWeight: "500",
                    color: "#4251af",
                    textDecoration: "underline",
                  }}
                >
                  <div style={styles.navIcon}>
                    <FaPen size={19} />
                    <span style={{ paddingLeft: "10px" }}>Profile</span>
                  </div>
                </NavLink>

                {/* <br /> */}
                <NavLink
                  to="/app/profile/password"
                  activeStyle={{
                    fontWeight: "500",
                    color: "#4251af",
                    textDecoration: "underline",
                  }}
                >
                  <div style={styles.navIcon}>
                    <GiCheckedShield size={20} />
                    <span style={{ paddingLeft: "10px" }}>
                      {" "}
                      Change password
                    </span>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="col-9" style={{ paddingLeft: "30px" }}>
              <div className="row">
                <div className="col-4">
                  <h1>{e.firstName + " " + e.lastName}</h1>
                  <h4>{e.roleName}</h4>
                </div>
                <div className="col-8 admin-header-div">
                  <Button
                    className="btn btn-green"
                    style={styles.button}
                    onClick={() => this.props.history.push("/app/dashboard")}
                  >
                    BACK
                  </Button>
                  <Button
                    className="btn btn-red"
                    style={styles.button}
                    onClick={this._updateSettings}
                  >
                    SAVE
                  </Button>
                </div>
              </div>

              <hr />
              {this.state.loading && (
                <Switch>
                  <Route path="/app/profile/general">
                    <General
                      data={this.state}
                      handleChange={this.handleChange}
                      showPassword={this.showPassword}
                    />
                  </Route>
                  <Route path="/app/profile/password">
                    <Password
                      data={this.state}
                      handleChange={this.handleChange}
                      handleShowPassword={this.handleShowPassword}
                    />
                  </Route>
                </Switch>
              )}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  UserProfile: state.User,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_User: (payload) => {
    dispatch(ViewProfile_User(payload));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(proFile)
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
  button: {
    padding: "3px 20px",
    height: "40px",
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "7px",
  },
};
