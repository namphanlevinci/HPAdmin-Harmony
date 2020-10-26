import React, { Component } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "../../../../url/url";
import { ADD_ADMIN, VIEW_PROFILE_USER } from "../../../../actions/user/actions";
import { TextField, Grid, Button } from "@material-ui/core";
import { WARNING_NOTIFICATION } from "../../../../actions/notifications/actions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CustomStateSelect from "../../../../util/CustomStateSelect";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import moment from "moment";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import "date-fns";

import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";

import "../../Merchants/MerchantProfile/Detail/Detail.css";
import "react-datepicker/dist/react-datepicker.css";
import "./User.css";

const upFile = config.url.upFile;

class addAdmin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: "",
    };
  }

  uploadFile = (event, setFieldValue) => {
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
        .post(upFile + "/file?category=service", formData, config)
        .then((res) => {
          setFieldValue("fileId", res.data.data.fileId);
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

  _goBack = () => {
    this.props.history.push("/app/accounts/admin");
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          alt="avatar"
          style={{ width: "100%", height: "auto" }}
        />
      );
    } else {
      $imagePreview = (
        <img
          src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
          alt="avatar"
          style={{ width: "100%", height: "auto" }}
        />
      );
    }

    return (
      <div className="container-fluid UserProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.addAdmin" />}
        />

        <div className="row admin_profile page-heading">
          <>
            <Formik
              initialValues={{
                email: "",
                password: "",
                WaRoleId: "",
                confirmPassword: "",
                stateID: "",
                firstname: "",
                lastname: "",
                address: "",
                city: "",
                zip: "",
                BirthDate: null,
                phone: "",
                fileId: 0,
                userName: "",
                gender: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email is required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.firstname) {
                  errors.firstname = "First name is required";
                }
                if (!values.lastname) {
                  errors.lastname = "Last name is required";
                }
                if (!values.userName) {
                  errors.userName = "Username is required";
                }
                if (!values.password) {
                  errors.password = "Password cannot be empty ";
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = "Confirm password cannot be empty ";
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = "Please confirm your password";
                } else if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Confirm password didn't match";
                }
                if (!values.WaRoleId) {
                  errors.WaRoleId = "Please choose a Role";
                }
                if (!values.phone) {
                  errors.phone = "Please enter Phone number";
                }
                if (!values.address) {
                  errors.address = "Address is required";
                }
                // if (!values.zip) {
                //   errors.zip = "Required";
                // }
                if (!values.city) {
                  errors.city = "City is required";
                }
                if (!values.stateID) {
                  errors.stateID = "Please choose a State";
                }
                if (!values.BirthDate) {
                  errors.BirthDate = "Date of birth is required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const {
                  stateID,
                  WaRoleId,
                  firstname,
                  lastname,
                  email,
                  password,
                  address,
                  city,
                  zip,
                  phone,
                  fileId,
                } = values;
                const BirthDate = moment(values.BirthDate).format("MM/DD/YYYY");
                const fullname = firstname + lastname;
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
                  fileId,
                };
                this.props.addUserAdmin(Data);
              }}
            >
              {({
                isSubmitting,
                setFieldValue,
                values,
                handleChange,
                handleBlur,
                errors,
                touched,
              }) => (
                <Form style={{ width: "100%" }}>
                  <Grid container spacing={3} style={styles.grid}>
                    <Grid
                      item
                      xs={12}
                      className="admin-header-div"
                      style={styles.div}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          color: "black",
                        }}
                      >
                        <AddToPhotosIcon size={24} />
                        <p style={styles.p}>New Account</p>
                      </div>
                      <span>
                        <Button
                          style={{
                            color: "#4251af",
                            backgroundColor: "white",
                          }}
                          className="btn btn-green"
                          onClick={this._goBack}
                        >
                          BACK
                        </Button>
                      </span>
                    </Grid>

                    <Grid item xs={12}>
                      <h2 style={styles.h2}>Personal Information</h2>
                    </Grid>

                    <Grid item xs={4} style={styles.margin}>
                      <TextField
                        label="First Name*"
                        name="firstname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.firstname && Boolean(errors.firstname)}
                        helperText={touched.firstname ? errors.firstname : ""}
                      />
                    </Grid>
                    <Grid item xs={4} style={styles.margin}>
                      <TextField
                        label="Last Name*"
                        name="lastname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.lastname && Boolean(errors.lastname)}
                        helperText={touched.lastname ? errors.lastname : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <MaterialUiPhoneNumber
                        onlyCountries={["us", "vn"]}
                        placeholder="Contact Phone Number"
                        name="phone"
                        fullWidth
                        label="Phone"
                        onChange={(phone) => setFieldValue("phone", phone)}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone ? errors.phone : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Address*"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address ? errors.address : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="City"
                        name="city"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomStateSelect
                        label="State"
                        name="stateID"
                        initialValue={values.stateID}
                        handleChange={(state) =>
                          setFieldValue("stateID", state.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Email*"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email ? errors.email : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          displayEmpty
                          fullWidth
                          // error={touched.gender && Boolean(errors.gender)}
                          // helperText={touched.gender ? errors.gender : ""}
                          value={values.gender}
                          onChange={(gender) =>
                            setFieldValue("gender", gender.target.value)
                          }
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          label="Birthday"
                          variant="inline"
                          format="MM/dd/yyyy"
                          placeholder="MM/DD/YYYY"
                          value={values.BirthDate}
                          onChange={(date) => setFieldValue("BirthDate", date)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          fullWidth
                          error={touched.BirthDate && Boolean(errors.BirthDate)}
                          // helperText={
                          //   touched.BirthDate ? errors.BirthDate : ""
                          // }
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                          displayEmpty
                          fullWidth
                          error={touched.WaRoleId && Boolean(errors.WaRoleId)}
                          helperText={touched.WaRoleId ? errors.WaRoleId : ""}
                          value={values.WaRoleId}
                          onChange={(role) =>
                            setFieldValue("WaRoleId", Number(role.target.value))
                          }
                        >
                          <MenuItem value={1}>Administrator</MenuItem>
                          <MenuItem value={2}>Manager</MenuItem>
                          <MenuItem value={3}>Staff Lv1</MenuItem>
                          <MenuItem value={4}>Staff Lv2</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.WaRoleId && touched.WaRoleId ? (
                        <FormHelperText style={styles.errorText}>
                          {errors.WaRoleId}
                        </FormHelperText>
                      ) : null}
                    </Grid>
                    <Grid item xs={8} />
                    <Grid item xs={4}>
                      <label style={{ padding: "10px 0px", fontWeight: "400" }}>
                        Avatar
                      </label>{" "}
                      <br />
                      {$imagePreview}
                      <div>
                        <br />
                        <input
                          type="file"
                          name="image"
                          id="file"
                          className="custom-input"
                          accept="image/gif,image/jpeg, image/png"
                          onChange={(e) => this.uploadFile(e, setFieldValue)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <h2 style={styles.h2}>Account Information</h2>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        label="User Name*"
                        type="text"
                        name="userName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.userName && Boolean(errors.userName)}
                        helperText={touched.userName ? errors.userName : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Password*"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password ? errors.password : ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Confirm Password*"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword ? errors.confirmPassword : ""
                        }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      className="admin-header-div"
                      style={{
                        display: "block",
                        padding: "20px 15px 0px 15px",
                        marginBottom: "20px",
                      }}
                    >
                      <Button
                        style={{ color: "#4251af", backgroundColor: "white" }}
                        className="btn btn-green"
                        onClick={this._goBack}
                      >
                        CANCEL
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-red"
                      >
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UserProfile: state.userReducer.ViewUser,
  AddUser: state.userReducer.AddUser,
});
const mapDispatchToProps = (dispatch) => ({
  VIEW_PROFILE_USER: (payload) => {
    dispatch(VIEW_PROFILE_USER(payload));
  },
  addUserAdmin: (payload) => {
    dispatch(ADD_ADMIN(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(addAdmin2)
);

const styles = {
  grid: {
    padding: "0px 10px",
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  p: {
    fontWeight: "500",
    fontSize: "19px",
    paddingLeft: "10px",
  },
  errorText: {
    color: "red",
  },
  h2: {
    color: "#4251af",
    fontWeight: "400",
    padding: "10px 0px",
    fontSize: "22px",
  },
  row: {
    padding: "0px 15px 0px 15px",
  },
  input: {
    width: "100%",
  },
};
