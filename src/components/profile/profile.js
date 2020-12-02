import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "../../url/url";

import {
  updateUserById,
  changeUserPasswordById,
} from "../../actions/userActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import SecurityIcon from "@material-ui/icons/Security";
import CreateIcon from "@material-ui/icons/Create";
import IntlMessages from "../../util/IntlMessages";
import ContainerHeader from "../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
import axios from "axios";
import General from "../../app/routes/Accounts/Users/General";
import Password from "./ProfileHeader/password";

import "./profile.css";

const upFile = config.url.upFile;

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
      isPass: false,
      password: null,
      currentPassword: null,
      confirmPassword: null,
      newPassword: null,
      isCurrentUserPage: true,
    };
  }

  async componentDidMount() {
    const Token = localStorage.getItem("User_login");
    const e = this.props.CurrentUser;
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

  uploadFile = (event) => {
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
      .post(upFile, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateAdmin = (values) => {
    const ID = this.props.CurrentUser?.waUserId;
    const { passwordTab, currentPassword, newPassword } = values;
    const { isCurrentUserPage } = this.state;

    const path = "/app/profile/general";

    let payload = passwordTab
      ? {
          oldPassword: currentPassword,
          newPassword,
          ID,
          isCurrentUserPage,
          path,
        }
      : {
          ...values,
          path,
          ID,
        };

    if (passwordTab) {
      this.props.changeUserPasswordById(payload);
    } else {
      this.props.updateUserById(payload);
    }
  };

  render() {
    let { imagePreviewUrl } = this.state;
    const e = this.props.CurrentUser;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} alt="avatar" style={styles.avatar} />
      );
    } else {
      $imagePreview =
        e?.imageUrl !== null ? (
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
        <div
          className="container-fluid UserProfile"
          style={{ marginTop: "30px" }}
        >
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.adminUserProfile" />}
          />

          {this.state.loading && (
            <Formik
              initialValues={this.state}
              validationSchema={userSchema}
              onSubmit={(values, { setSubmitting, setFieldValue }) => {
                const {
                  passwordTab,
                  confirmPassword,
                  newPassword,
                  currentPassword,
                  password,
                } = values;
                setFieldValue(`errorCurrentPassword`, false);
                setFieldValue(`errorCurrentPasswordMsg`, "");
                setFieldValue(`errorPassword`, false);
                setFieldValue(`errorConfirmPassword`, false);
                setFieldValue(`errorConfirmPasswordMsg`, "");

                if (passwordTab) {
                  if (currentPassword === null) {
                    setFieldValue(`errorCurrentPassword`, true);
                    setFieldValue(
                      `errorCurrentPasswordMsg`,
                      "Current password is required"
                    );
                  }
                  if (Number(currentPassword) !== Number(password)) {
                    setFieldValue(`errorCurrentPassword`, true);
                    setFieldValue(
                      `errorCurrentPasswordMsg`,
                      "Current password is incorrect"
                    );
                  }
                  if (newPassword === null) {
                    setFieldValue(`errorPassword`, true);
                  }
                  if (confirmPassword === null) {
                    setFieldValue(`errorConfirmPassword`, true);
                    setFieldValue(
                      `errorConfirmPasswordMsg`,
                      "Confirm Password is required"
                    );
                  }
                  if (newPassword !== confirmPassword) {
                    setFieldValue(`errorConfirmPassword`, true);
                    setFieldValue(
                      `errorConfirmPasswordMsg`,
                      "Confirm Password didn't match"
                    );
                  }
                  if (
                    newPassword !== null &&
                    confirmPassword !== null &&
                    newPassword === confirmPassword
                  ) {
                    this.updateAdmin(values);
                  }
                } else {
                  this.updateAdmin(values);
                }
              }}
            >
              {({
                isSubmitting,
                setFieldValue,
                values,
                handleChange,
                errors,
                touched,
              }) => (
                <Form style={{ width: "100%" }}>
                  <Grid
                    container
                    spacing={3}
                    className="admin_profile page-heading"
                    style={{ minHeight: "500px", paddingTop: "50px" }}
                  >
                    <Grid item xs={3} className="text-center">
                      {$imagePreview}
                      <div style={{ paddingTop: "20px" }}>
                        <input
                          type="file"
                          name="image"
                          id="file"
                          className="custom-input"
                          onChange={(e) => this.uploadFile(e)}
                        />
                      </div>
                      <div className="nav-btn" style={{ marginTop: "5px" }}>
                        <NavLink
                          to="/app/profile/general"
                          activeStyle={{
                            fontWeight: "500",
                            color: "#0764B0",
                            opacity: "0.6",
                          }}
                          onClick={() => setFieldValue(`passwordTab`, false)}
                        >
                          <div style={styles.navIcon}>
                            <CreateIcon size={19} />
                            <span style={{ paddingLeft: "10px" }}>Profile</span>
                          </div>
                        </NavLink>

                        <NavLink
                          to="/app/profile/password"
                          activeStyle={{
                            fontWeight: "500",
                            color: "#0764B0",
                            opacity: "0.6",
                          }}
                          onClick={() => setFieldValue(`passwordTab`, true)}
                        >
                          <div style={styles.navIcon}>
                            <SecurityIcon size={20} />
                            <span style={{ paddingLeft: "10px" }}>
                              Change password
                            </span>
                          </div>
                        </NavLink>
                      </div>
                    </Grid>
                    <Grid item xs={9} style={{ paddingLeft: "30px" }}>
                      <Grid container>
                        <Grid item xs={4}>
                          <h1>{e?.firstName + " " + e.lastName}</h1>
                          <h4>{e?.roleName}</h4>
                        </Grid>
                        <Grid item xs={8} className="col-8 admin-header-div">
                          <Button
                            className="btn btn-green"
                            style={styles.button}
                            onClick={() =>
                              this.props.history.push("/app/merchants/list")
                            }
                          >
                            BACK
                          </Button>
                          <Button
                            className="btn btn-red"
                            style={styles.button}
                            type="submit"
                          >
                            SAVE
                          </Button>
                        </Grid>
                      </Grid>

                      <hr />

                      <Switch>
                        <Route path="/app/profile/general">
                          <General
                            values={values}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Route>
                        <Route path="/app/profile/password">
                          <Password
                            values={values}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Route>
                      </Switch>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  CurrentUser: state.verifyUser.user.userAdmin,
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
  connect(mapStateToProps, mapDispatchToProps)(proFile)
);
const styles = {
  hr: {
    height: "1px",
    border: "0",
    borderTop: "1px solid #0764B0",
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
  avatar: {
    width: "255px",
    height: "255px",
    textAlign: "center",
    borderRadius: "50%",
  },
};

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const userSchema = Yup.object().shape({
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  email: Yup.string().email().required("Email is required"),
  address: Yup.string().required("Address is required"),
  birthDate: Yup.string().required("Date of birth is required").nullable(),
});
