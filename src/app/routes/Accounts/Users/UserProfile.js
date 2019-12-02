import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import URL from "../../../../url/url";
import axios from "axios";
import "./User.css";
import "../../Merchants/MerchantProfile/Detail/Detail.css";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Token: ""
    };
  }
  componentDidMount() {
    const Token = localStorage.getItem("User_login");
    this.setState({ Token: Token });
  }
  _Edit = () => {
    this.props.history.push("/app/accounts/admin/profile/edit");
  };
  _disable = () => {
    const ID = this.props.UserProfile.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token }
    };
    axios
      .delete(URL + "/adminuser/" + ID, config)
      .then(res => {
        // console.log(res);
        NotificationManager.success(res.data.message, null, 800);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  _enable = () => {
    const ID = this.props.UserProfile.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token }
    };
    axios
      .put(URL + "/adminuser/enable/" + ID, null, config)
      .then(res => {
        // console.log(res);
        NotificationManager.success(res.data.message, null, 800);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  render() {
    const e = this.props.UserProfile;
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
              {e.isDisabled === 0 ? (
                <Button className="btn btn-green" onClick={this._disable}>
                  DISABLE
                </Button>
              ) : (
                <Button className="btn btn-green" onClick={this._enable}>
                  ENABLE
                </Button>
              )}
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
                      width: "10%",
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
                      width: "10%",
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
                      width: "10%",
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
                      width: "10%",
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
                  {/* <td
                    style={{
                      width: "10%",
                      color: "black",
                      fontWeight: "500",
                      fontSize: "16px"
                    }}
                  >
                    Gender:
                  </td>
                  <td> ? </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Redirect to="/app/accounts/admin" />
      );
    return (
      <div className="container-fluid UserProfile">
        <NotificationContainer />
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
