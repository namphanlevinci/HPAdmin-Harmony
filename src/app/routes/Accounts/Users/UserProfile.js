import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
import "./User.css";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const e = this.props.UserProfile;
    // console.log("E", e);
    const renderProfile =
      e.waUserId !== undefined ? (
        <div className="row justify-content-md-center AdminProfile">
          <div className="col-md-2 text-center">
            <img
              src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
              alt="avatar"
            />
            <Button>EDIT PROFILE</Button>
          </div>
          <div className="col-md-10">
            <h1>{e.firstName + " " + e.lastName}</h1>
            <h3>{e.roleName}</h3>
            <hr />
            <h2>Contact Information</h2>
            <p>Phone: {e.phone}</p>
            <p>Email: {e.email}</p>
            <p>Address: {e.address}</p>
            <p>City: {e.city}</p>
            <h2>Basic Information</h2>
            <p>Birthday: {moment(e.birthDate).format("MM/DD/YYYY")}</p>
          </div>
        </div>
      ) : (
        <Redirect to="/app/accounts/admin-users" />
      );
    return (
      <div className="container-fluid UserProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUserProfile" />}
        />
        {renderProfile}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  UserProfile: state.ViewProfile_User
});

export default withRouter(connect(mapStateToProps)(UserProfile));
