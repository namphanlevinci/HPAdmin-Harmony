import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "../../../../url/url";
import {
  updateUserById,
  changeUserPasswordById,
} from "../../../../actions/userActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Button, Grid } from "@material-ui/core";

import SecurityIcon from "@material-ui/icons/Security";
import CreateIcon from "@material-ui/icons/Create";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import axios from "axios";

import General from "./General";
import Password from "./Password";

import "./User.css";
import "../../Merchants/MerchantList/Profile/Detail.css";

const upFile = config.url.upFile;

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
      currentPassword: null,
      confirmPassword: null,
      waRoleId: "",
      phone: "",
      stateId: "",
      fileId: "",
      selectedOption: null,
      defaultValue: {
        value: { label: "", value: "" },
      },
      imagePreviewUrl: "",
      loading: false,
      showPassword: false,
      isPass: false,
      newPassword: null,
    };
  }

  async componentDidMount() {
    const e = this.props.UserProfile;
    this.setState(
      {
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        birthDate: moment(e.birthDate).format("yyyy-MM-DD"),
        address: e.address,
        city: e.city,
        zip: e.zip,
        currentPassword: e.password,
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
  };

  handlePhone = (value) => {
    this.setState({ phone: value });
  };

  uploadImage = (event) => {
    event.stopPropagation();
    event.preventDefault();

    let reader = new FileReader();

    const file = event?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
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
        .post(upFile, formData, config)
        .then((res) => {
          this.setState({ fileId: res.data.data.fileId });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  handleDateChange = (date) => {
    this.setState({ birthDate: date });
  };

  updateAdmin = () => {
    const ID = this.props.UserProfile.waUserId;
    const { isPass, currentPassword, newPassword } = this.state;
    let payload = isPass
      ? { oldPassword: currentPassword, newPassword, ID }
      : {
          ...this.state,
          ID,
        };

    if (isPass) {
      this.props.changeUserPasswordById(payload);
    } else {
      this.props.updateUserById(payload);
    }
  };

  updateSettings = () => {
    this.setState({ error: "", confirmError: "" });

    if (this.state.isPass) {
      const { newPassword, confirmPassword } = this.state;
      if (newPassword === null) {
        this.setState({ error: "Please enter Password " });
      }
      if (confirmPassword === null) {
        this.setState({ confirmError: "Please enter Confirm Password" });
      }
      if (newPassword !== confirmPassword) {
        this.setState({ confirmError: "Confirm Password didn't match" });
      }
      if (
        newPassword !== null &&
        confirmPassword !== null &&
        newPassword === confirmPassword
      ) {
        this.updateAdmin();
      }
    } else {
      this.updateAdmin();
    }
  };
  goBack = () => {
    this.props.history.push("/app/accounts/admin/profile");
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    let { imagePreviewUrl } = this.state;
    const e = this.props.UserProfile;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} alt="avatar" style={styles.avatar} />
      );
    } else {
      $imagePreview =
        e.imageUrl !== null ? (
          <img src={e.imageUrl} alt="avatar" style={styles.avatar} />
        ) : (
          <img
            src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
            alt="avatar"
            style={styles.avatar}
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
          <Grid
            container
            spacing={3}
            className="admin_profile page-heading"
            style={{ minHeight: "500px" }}
          >
            <Grid item xs={3} className="text-center">
              {$imagePreview}
              <div style={{ paddingTop: "10px" }}>
                <input
                  type="file"
                  name="image"
                  id="file"
                  className="custom-input"
                  accept="image/gif,image/jpeg, image/png"
                  onChange={(e) => this.uploadImage(e)}
                />
              </div>
              <div className="nav-btn">
                <NavLink
                  to="/app/accounts/admin/profile/edit/general"
                  activeStyle={{
                    fontWeight: "300",
                    color: "#4251af",
                    opacity: "0.6",
                  }}
                  onClick={() => this.setState({ isPass: false })}
                >
                  <div style={styles.navIcon}>
                    <CreateIcon size={19} />
                    <span style={{ paddingLeft: "10px" }}>Profile</span>
                  </div>
                </NavLink>

                <NavLink
                  to="/app/accounts/admin/profile/edit/password"
                  activeStyle={{
                    fontWeight: "300",
                    color: "#4251af",
                    opacity: "0.6",
                  }}
                  onClick={() => this.setState({ isPass: true })}
                >
                  <div style={styles.navIcon}>
                    <SecurityIcon size={20} />
                    <span style={{ paddingLeft: "10px" }}>Change password</span>
                  </div>
                </NavLink>
              </div>
            </Grid>
            <Grid item xs={9} style={{ paddingLeft: "55px" }}>
              <div className="row">
                <div className="col-4">
                  <h1>{e.firstName + " " + e.lastName}</h1>
                  <h4>{e.roleName}</h4>
                </div>
                <div className="col-8 admin-header-div">
                  <Button
                    className="btn btn-green"
                    style={styles.button}
                    onClick={() =>
                      this.props.history.push("/app/accounts/admin/profile")
                    }
                  >
                    CANCEL
                  </Button>
                  <Button
                    className="btn btn-red"
                    style={styles.button}
                    onClick={this.updateSettings}
                  >
                    SAVE
                  </Button>
                </div>
              </div>

              <hr />
              {this.state.loading && (
                <Switch>
                  <Route path="/app/accounts/admin/profile/edit/general">
                    <General
                      data={this.state}
                      handlePhone={this.handlePhone}
                      handleChange={this.handleChange}
                      showPassword={this.showPassword}
                    />
                  </Route>
                  <Route path="/app/accounts/admin/profile/edit/password">
                    <Password
                      data={this.state}
                      handleChange={this.handleChange}
                      handleShowPassword={this.handleShowPassword}
                    />
                  </Route>
                </Switch>
              )}
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  UserProfile: state.userReducer.ViewUser,
});
const mapDispatchToProps = (dispatch) => ({
  updateUserById: (payload) => {
    dispatch(updateUserById(payload));
  },
  changeUserPasswordById: (payload) => {
    dispatch(changeUserPasswordById(payload));
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
  button: {
    padding: "3px 20px",
    height: "40px",
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0px",
  },
  avatar: {
    width: "255px",
    height: "255px",
    textAlign: "center",
    borderRadius: "50%",
  },
};
