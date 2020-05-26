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
      fileId: 0,
      imagePreviewUrl: "",
    };
  }

  _handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleRoles = (selectedOption) => {
    this.setState({ roles: selectedOption.value });
  };
  handleState = (selectedOption) => {
    this.setState({ stateID: selectedOption.value });
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
      .post(URL + "/file?category=service", formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  _addAdminUser = (e) => {
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
        fileId,
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
        fileId,
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
          fileId: 0,
        });
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
      <div className="row justify-content-center AdminProfile page-heading">
        <React.Fragment>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
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
                      CANCEL
                    </Button>
                    <Button
                      className="btn btn-red"
                      onClick={this._addAdminUser}
                    >
                      SAVE
                    </Button>
                  </span>
                </div>
                <div className="row">
                  <div className="col-3 text-center">
                    {$imagePreview}
                    <div>
                      <label>Upload avatar</label>
                      <br />
                      <input
                        type="file"
                        name="image"
                        id="file"
                        className="custom-input"
                        onChange={(e) => this._uploadFile(e)}
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
                          name="firstName"
                          placeholder="First Name"
                        />
                        <ErrorMessage name="firstName" component="div" />
                      </div>
                      <div className="col-6">
                        <label>Last name</label>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                        />
                        <ErrorMessage name="lastName" component="div" />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Password</label>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Confirm Password</label>
                        <Field
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                        />
                        <ErrorMessage name="confirmPassword" component="div" />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Role</label>
                        <Select
                          required
                          name="role"
                          onChange={(value) => this.setState({ roles: value })}
                          options={roles}
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Phone</label>
                        <PhoneInput
                          country={"us"}
                          style={{ marginTop: "10px" }}
                          placeholder="Contact Phone Number"
                          name="phoneContact"
                          value={this.state.phoneContact}
                          onChange={(phone) =>
                            this.setState({ phoneContact: phone })
                          }
                        />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Email</label>
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>Address</label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Address"
                        />
                        <ErrorMessage name="address" component="div" />
                      </div>
                      <div className="col-6" style={styles.margin}>
                        <label>City</label>
                        <Field type="text" name="city" placeholder="City" />
                        <ErrorMessage name="city" component="div" />
                      </div>
                    </div>

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
                              onChange={(value) =>
                                this.setState({ stateID: value })
                              }
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
                              onChange={(date) =>
                                this.setState({ BirthDate: date })
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" /> */}
                  {/* <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
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
