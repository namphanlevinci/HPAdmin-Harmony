import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { ADD_ADMIN } from "../../../../actions/user/actions";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ViewProfile_User } from "../../../../actions/user/actions";

import axios from "axios";
import "../../Merchants/MerchantProfile/Detail/Detail.css";
import URL from "../../../../url/url";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import moment from "moment";

import "./User.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/high-res.css";

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
  _uploadFile = (event, setFieldValue) => {
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
      }
    }
  }
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
        className="row justify-content-center AdminProfile page-heading"
        style={{ minHeight: "650px" }}
      >
        <React.Fragment>
          <Formik
            initialValues={{
              email: "",
              password: "",
              WaRoleId: "",
              stateID: "",
              firstname: "",
              lastname: "",
              address: "",
              city: "",
              zip: "",
              BirthDate: "",
              phone: "",
              fileId: 0,
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
              if (!values.password) {
                errors.password = "Password cannot be empty ";
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
              if (!values.zip) {
                errors.zip = "Required";
              }
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
                BirthDate,
                phone,
                fileId,
              } = values;
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
              this.props.addAdmin(Data);
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form style={{ width: "100%" }}>
                <div className="admin-header-div col-12" style={styles.div}>
                  <div>
                    <h2 style={{ fontWeight: 600, color: "#4251af" }}>
                      Create New User
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
                    <Button type="submit" className="btn btn-red">
                      SAVE
                    </Button>
                  </span>
                </div>
                <div className="row">
                  <div className="col-3 text-center">
                    {$imagePreview}
                    <div>
                      {/* <label>Upload avatar</label> */}
                      <br />
                      <input
                        type="file"
                        name="image"
                        id="file"
                        className="custom-input"
                        onChange={(e) => this._uploadFile(e, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className="col-9">
                    <h2>Contact Information</h2>
                    <hr />
                    <div className="row">
                      <div className="col-6">
                        <label>First name</label>
                        <Field
                          type="text"
                          name="firstname"
                          placeholder="First Name"
                        />
                        <ErrorMessage
                          name="firstname"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-6">
                        <label>Last name</label>
                        <Field
                          type="text"
                          name="lastname"
                          placeholder="Last Name"
                        />
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Password</label>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Confirm Password</label>
                        <Field
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
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
                      <div className="col-6" style={styles.margin}>
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
                      <div className="col-6" style={styles.margin}>
                        <label>Email</label>
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Address</label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Address"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>City</label>
                        <Field type="text" name="city" placeholder="City" />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div className="col-6" style={styles.margin}>
                        <label>Zip</label>
                        <Field type="text" name="zip" placeholder="Zip" />
                        <ErrorMessage
                          name="zip"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>State</label>
                        <Select
                          value={this.state.stateID}
                          onChange={(value) =>
                            setFieldValue("stateID", value.value)
                          }
                          options={stateID}
                          name="stateID"
                        />
                        <ErrorMessage
                          name="stateID"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Birthday</label> <br />
                        <DatePicker
                          placeholderText="MM/DD/YYYY"
                          name="BirthDate"
                          value={values.BirthDate}
                          onChange={(date) =>
                            setFieldValue(
                              "BirthDate",
                              moment(date).format("MM/DD/YYYY")
                            )
                          }
                        />
                        <ErrorMessage
                          name="BirthDate"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </React.Fragment>
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

const mapStateToProps = (state) => ({
  UserProfile: state.ViewProfile_User,
  AddStatus: state.addAdminUser,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_User: (payload) => {
    dispatch(ViewProfile_User(payload));
  },
  addAdmin: (payload) => {
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
  },
  margin: {
    marginTop: "10px",
  },
};
