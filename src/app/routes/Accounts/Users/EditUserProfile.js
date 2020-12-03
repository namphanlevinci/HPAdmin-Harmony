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
import { Form, Formik } from "formik";
import * as Yup from "yup";

import SecurityIcon from "@material-ui/icons/Security";
import CreateIcon from "@material-ui/icons/Create";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

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

      imagePreviewUrl: "",
      loading: false,
      showPassword: false,
      isPass: false,
      passwordTab: null,
      uploadImage: false,
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
        passwordTab: false,
        newPassword: null,
      },
      () => this.setState({ loading: true })
    );
  }

  uploadImage = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const file = event?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      this.setState({ uploadImage: true });

      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.setState({
              imagePreviewUrl: reader.result,
              fileId: res.data.data.fileId,
              uploadImage: false,
            });
          };
        })
        .catch((err) => {
          console.log(err);
          this.setState({ uploadImage: false });
        });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  updateAdmin = (values) => {
    const ID = this.props.UserProfile.waUserId;
    const { passwordTab, currentPassword, newPassword } = values;
    let payload = passwordTab
      ? { oldPassword: currentPassword, newPassword, ID }
      : {
          ...values,
          ID,
        };

    if (passwordTab) {
      this.props.changeUserPasswordById(payload);
    } else {
      this.props.updateUserById(payload);
    }
  };

  goBack = () => {
    this.props.history.push("/app/accounts/admin/profile");
  };

  render() {
    let { imagePreviewUrl, uploadImage } = this.state;
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

          {this.state.loading && (
            <Formik
              initialValues={this.state}
              validationSchema={userSchema}
              onSubmit={(values, { setSubmitting, setFieldValue }) => {
                const { passwordTab, confirmPassword, newPassword } = values;

                setFieldValue(`errorPassword`, false);
                setFieldValue(`errorConfirmPassword`, false);
                setFieldValue(`errorConfirmPasswordMsg`, "");
                if (passwordTab) {
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
                    spacing={0}
                    className="admin_profile page-heading"
                    style={{ minHeight: "500px" }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={4}
                      className="text-center"
                      style={{ padding: "0px 15px" }}
                    >
                      {$imagePreview}
                      <div style={{ paddingTop: "10px" }}>
                        {uploadImage ? (
                          <CircularProgress />
                        ) : (
                          <input
                            type="file"
                            name="image"
                            id="file"
                            className="custom-input"
                            accept="image/gif,image/jpeg, image/png"
                            onChange={(e) => this.uploadImage(e)}
                          />
                        )}
                      </div>
                      <div className="nav-btn">
                        <NavLink
                          to="/app/accounts/admin/profile/edit/general"
                          activeStyle={{
                            fontWeight: "300",
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
                          to="/app/accounts/admin/profile/edit/password"
                          activeStyle={{
                            fontWeight: "300",
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
                    <Grid item xs={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={4}>
                          <h1>{e.firstName + " " + e.lastName}</h1>
                          <h4>{e.roleName}</h4>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          md={8}
                          className="admin-header-div"
                        >
                          <Button
                            className="btn btn-green"
                            style={styles.button}
                            onClick={() =>
                              this.props.history.push(
                                "/app/accounts/admin/profile"
                              )
                            }
                          >
                            CANCEL
                          </Button>
                          <Button
                            className="btn btn-red"
                            style={styles.button}
                            type="submit"
                            disabled={uploadImage}
                          >
                            SAVE
                          </Button>
                        </Grid>
                      </Grid>

                      <hr />
                      <Switch>
                        <Route path="/app/accounts/admin/profile/edit/general">
                          <General
                            values={values}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Route>
                        <Route path="/app/accounts/admin/profile/edit/password">
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
  UserProfile: state.userById.data,
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
    padding: "10px 0px",
  },
  avatar: {
    width: "14em",
    height: "14em",
    textAlign: "center",
    borderRadius: "50%",
  },
};

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const userSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(9)
    .max(16)
    .required("Phone number is required"),
  email: Yup.string().email().required("Email is required"),
  address: Yup.string().required("Address is required"),
  birthDate: Yup.string().required("Date of birth is required").nullable(),
});
