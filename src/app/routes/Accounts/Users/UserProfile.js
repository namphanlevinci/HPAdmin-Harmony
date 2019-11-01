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
  _Edit = () => {
    this.props.history.push("/app/accounts/edit-admin-profile");
  };
  render() {
    const e = this.props.UserProfile;
    console.log(e);
    const renderProfile =
      e.waUserId !== undefined ? (
        <div className="row justify-content-md-center AdminProfile">
          <div className="col-md-3 text-center">
            {e.imageUrl !== null ? (
              <img src={e.imageUrl} alt="avatar" />
            ) : (
              <img
                src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
                alt="avatar"
              />
            )}
            <div className="SettingsContent GeneralContent">
              <Button onClick={this._Edit} className="btn btn-green">
                EDIT PROFILE
              </Button>
            </div>
          </div>
          <div className="col-md-9">
            <h1>{e.firstName + " " + e.lastName}</h1>
            <h4>{e.roleName}</h4>
            <hr />
            <h2>Contact Information</h2>
            <table style={{ width: "100%" }} className="Admin-Table">
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "13%",
                      color: "black",
                      fontWeight: "500",
                      fontSize: "16px"
                    }}
                  >
                    Phone:
                  </td>
                  <td
                    style={{
                      color: "#0764b0",
                      fontSize: "16px",
                      fontWeight: "500"
                    }}
                  >
                    {e.phone}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "13%",
                      color: "black",
                      fontWeight: "500",
                      fontSize: "16px"
                    }}
                  >
                    Email:
                  </td>
                  <td
                    style={{
                      color: "#0764b0",
                      fontSize: "16px",
                      fontWeight: "500"
                    }}
                  >
                    {e.email}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "13%",
                      color: "black",
                      fontWeight: "500",
                      fontSize: "16px"
                    }}
                  >
                    Address:
                  </td>
                  <td
                    style={{
                      color: "#0764b0",
                      fontSize: "16px",
                      fontWeight: "500"
                    }}
                  >
                    {e.address}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <p>City: {e.city}</p>
            <p>State: {e.stateId} </p> */}
            <h2>Basic Information</h2>
            <table style={{ width: "100%" }} className="Admin-Table">
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "13%",
                      color: "black",
                      fontWeight: "500",
                      fontSize: "16px"
                    }}
                  >
                    Birthday:
                  </td>
                  <td
                    style={{
                      color: "#0764b0",
                      fontSize: "16px",
                      fontWeight: "500"
                    }}
                  >
                    {moment(e.birthDate).format("MM/DD/YYYY")}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "13%",
                      color: "black",
                      fontWeight: "500",
                      fontSize: "16px"
                    }}
                  >
                    Gender:
                  </td>
                  <td> ? </td>
                </tr>
              </tbody>
            </table>
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
