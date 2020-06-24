import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ADD_ADMIN } from "../../../../actions/user/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { VIEW_PROFILE_USER } from "../../../../actions/user/actions";
import { MdLibraryAdd } from "react-icons/md";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import axios from "axios";
import URL from "../../../../url/url";
import PhoneInput from "react-phone-input-2";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import Select from "react-select";

import "date-fns";
import "./User.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/high-res.css";
import "../../Merchants/MerchantProfile/Detail/Detail.css";

const roles = [
  { value: "1", label: "Administrator" },
  { value: "2", label: "Manager" },
  { value: "3", label: "Staff Lv1" },
  { value: "4", label: "Staff Lv2" },
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
  { value: "53", label: "Wyoming" },
];

class addAdmin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: "",
    };
  }

  handleRoles = (selectedOption) => {
    this.setState({ roles: selectedOption.value });
  };
  handleState = (selectedOption) => {
    this.setState({ stateID: selectedOption.value });
  };
  uploadFile = (event, setFieldValue) => {
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
      .post(URL + "/file?category=service", formData, config)
      .then((res) => {
        setFieldValue("fileId", res.data.data.fileId);
      })
      .catch((err) => {
        console.log(err);
      });
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
          style={{ width: "192px", height: "192px" }}
        />
      );
    } else {
      $imagePreview = (
        <img
          src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
          alt="avatar"
        />
      );
    }

    const renderProfile = (
      <div
        className="row AdminProfile page-heading"
        style={{ minHeight: "650px" }}
      >
        <React.Fragment>
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
              BirthDate: Date(),
              phone: "",
              fileId: 0,
              userName: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.firstname) {
                errors.firstname = "Required";
              }
              if (!values.lastname) {
                errors.lastname = "Required";
              }
              if (!values.userName) {
                errors.userName = "Required";
              }
              if (!values.password) {
                errors.password = "Password cannot be empty ";
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = "Confirm Password cannot be empty ";
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
                errors.address = "Required";
              }
              // if (!values.zip) {
              //   errors.zip = "Required";
              // }
              if (!values.city) {
                errors.city = "Required";
              }
              if (!values.stateID) {
                errors.stateID = "Required";
              }
              if (!values.BirthDate) {
                errors.BirthDate = "Required";
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
            }) => (
              <Form style={{ width: "100%" }}>
                <div className="admin-header-div col-12" style={styles.div}>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      color: "black",
                    }}
                  >
                    <MdLibraryAdd size={24} />
                    <h2 style={{ fontWeight: 600, paddingLeft: "10px" }}>
                      New Account
                    </h2>
                  </div>
                  <span>
                    <Button
                      style={{ color: "#4251af", backgroundColor: "white" }}
                      className="btn btn-green"
                      onClick={this._goBack}
                    >
                      BACK
                    </Button>
                  </span>
                </div>

                <div className="col-12">
                  <h2 style={styles.h2}>Personal Information</h2>
                </div>
                <div className="row" style={styles.row}>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="First name*"
                      name="firstname"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="Last name*"
                      name="lastname"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4">
                    <label>Phone</label>
                    <PhoneInput
                      country={"us"}
                      style={{ marginTop: "10px" }}
                      placeholder="Contact Phone Number"
                      name="phone"
                      onChange={(phone) => setFieldValue("phone", phone)}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="Address*"
                      name="address"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="City"
                      name="city"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* <ErrorMessage
                      name="city"
                      component="div"
                      className="error"
                    /> */}
                  </div>
                  <div className="col-4">
                    <label>State</label>
                    <Select
                      value={this.state.stateID}
                      onChange={(value) =>
                        setFieldValue("stateID", value.value)
                      }
                      options={stateID}
                      name="stateID"
                    />
                    {/* <ErrorMessage
                      name="stateID"
                      component="div"
                      className="error"
                    /> */}
                  </div>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="Email*"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="Gender"
                      name="gender"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <label>Birthday</label> <br />
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        placeholder="MM/DD/YYYY"
                        value={moment(values.BirthDate).format("YYYY-MM-DD")}
                        onChange={(date) => setFieldValue("BirthDate", date)}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        style={{ marginTop: "0px" }}
                      />
                    </MuiPickersUtilsProvider>
                    <ErrorMessage
                      name="BirthDate"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4" style={styles.margin}>
                    <label>Role</label>
                    <Select
                      required
                      name="WaRoleId"
                      onChange={(value) =>
                        setFieldValue("WaRoleId", value.value)
                      }
                      options={roles}
                    />
                    <ErrorMessage
                      name="WaRoleId"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-3">
                  <label style={{ padding: "10px 0px", fontWeight: "600" }}>
                    Avatar
                  </label>

                  {$imagePreview}
                  <div>
                    <br />
                    <input
                      type="file"
                      name="image"
                      id="file"
                      className="custom-input"
                      onChange={(e) => this.uploadFile(e, setFieldValue)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <h2 style={styles.h2}>Account Information</h2>
                </div>
                <div className="row" style={styles.row}>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="User Name*"
                      type="text"
                      name="userName"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-4" style={styles.margin}>
                    <TextField
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div
                  className="admin-header-div"
                  style={{
                    display: "block",
                    padding: "20px 15px 20px 15px",
                    marginBottom: "20px",
                  }}
                >
                  <Button
                    style={{ color: "#4251af", backgroundColor: "white" }}
                    className="btn btn-green"
                    onClick={this._goBack}
                  >
                    BACK
                  </Button>
                  <Button type="submit" className="btn btn-red">
                    SAVE
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      </div>
    );

    return (
      <div className="container-fluid UserProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.addAdmin" />}
        />
        {renderProfile}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UserProfile: state.userReducer.viewUser,
  AddUser: state.userReducer.AddUser,
});
const mapDispatchToProps = (dispatch) => ({
  VIEW_PROFILE_USER: (payload) => {
    dispatch(VIEW_PROFILE_USER(payload));
  },
  addUserAdmin: (payload) => {
    dispatch(ADD_ADMIN(payload));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(addAdmin2)
);

const styles = {
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  margin: {
    marginTop: "9px",
  },
  h2: {
    color: "#4251af",
    fontWeight: "600",
  },
  row: {
    padding: "0px 15px 0px 15px",
  },
};
