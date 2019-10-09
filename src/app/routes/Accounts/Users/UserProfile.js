import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import "./User.css";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const e = this.props.UserProfile;
    console.log("E", e);
    const renderProfile =
      e.waUserId !== undefined ? (
        <div className="row justify-content-md-center AdminProfile">
          <div className="col-md-12">
            <h2>General Information</h2>
            <p>Full name: {e.firstName + " " + e.lastName}</p>
            <p>Role: {e.roleName}</p>
            <p>Phone: {e.phone}</p>
            <p>Email: {e.email}</p>
            <p>Address: {e.address}</p>
            <p>City: {e.city}</p>
            <p></p>
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
