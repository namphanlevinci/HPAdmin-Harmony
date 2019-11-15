import React, { Component } from "react";
import { Formik } from "formik";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";

import { NotificationContainer } from "react-notifications";
import { ADD_ADMIN } from "../../../../actions/user/actions";

import "../../Merchants/MerchantProfile/Detail/Detail.css";
import "./User.css";
class addUser extends Component {
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
      fileId: 0
    };
  }
  render() {
    return (
      <div>
        <div>
          <NotificationContainer />
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.addAdmin" />}
          />
        </div>
        <div className="row justify-content-md-center AdminProfile">
          <div className="col-md-4 text-center">
            <img
              src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
              alt="avatar"
            />

            <div>
              <label>Upload avatar</label>
              <br />
              <input
                type="file"
                style={{ width: "250px" }}
                name="image"
                id="file"
                onChange={e => this._uploadFile(e)}
              ></input>
            </div>
          </div>
          <div className="col-md-8">
            <div className="adminForm col-md-4 text-center">
              <h2>Account Information</h2>
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  phone: ""
                }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Please enter your email";
                  }
                  if (!values.firstname) {
                    errors.firstname = "Please enter your first name";
                  }
                  if (!values.lastname) {
                    errors.lastname = "Please enter your last name";
                  }
                  if (!values.password) {
                    errors.password = "Please enter your password";
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword = "Please enter your password";
                  }
                  if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Password did not match";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
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
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstname}
                      className={
                        errors.firstname && touched.firstname
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.firstname && touched.firstname && (
                      <div className="input-feedback">{errors.firstname}</div>
                    )}
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                      className={
                        errors.lastname && touched.lastname
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.lastname && touched.lastname && (
                      <div className="input-feedback">{errors.lastname}</div>
                    )}
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={
                        errors.password && touched.password
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="input-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                    <label>Role</label> <br />
                    <select
                      name="role"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "text-input error"
                          : "text-input"
                      }
                    >
                      <option value="1">Administrator</option>
                      <option value="2">Manager</option>
                      <option value="3">Staff Lv1</option>
                      <option value="4">Staff Lv2</option>
                    </select>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="input-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                    <br />
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  UserProfile: state.ViewProfile_User,
  AddStatus: state.addAdminUser
});
const mapDispatchToProps = dispatch => ({
  addAdmin: payload => {
    dispatch(ADD_ADMIN(payload));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(addUser)
);
