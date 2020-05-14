import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { store } from "react-notifications-component";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
import URL from "../../../../url/url";
import axios from "axios";

import "./User.css";
import "../../Merchants/MerchantProfile/Detail/Detail.css";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Token: "",
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
      headers: { Authorization: "bearer " + token.token },
    };
    axios
      .delete(URL + "/adminuser/" + ID, config)
      .then((res) => {
        // console.log(res);
        store.addNotification({
          title: "SUCCESS!",
          message: `${res.data.message}`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
          width: 250,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  _enable = () => {
    const ID = this.props.UserProfile.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token },
    };
    axios
      .put(URL + "/adminuser/enable/" + ID, null, config)
      .then((res) => {
        // console.log(res);
        store.addNotification({
          title: "SUCCESS!",
          message: `${res.data.message}`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
          width: 250,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  render() {
    const e = this.props.UserProfile;

    return (
      <div className="container-fluid UserProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUserProfile" />}
        />
        <div className="row justify-content-md-center AdminProfile page-heading">
          <div className="admin-header-div col-12">
            {/* <h2 style={{ fontWeight: 500 }}>ID: {e.merchantId}</h2> */}
            <span>
              <Button
                style={{ color: "#4251af", backgroundColor: "white" }}
                className="btn btn-green"
                onClick={() => this.props.history.push("/app/accounts/admin")}
              >
                BACK
              </Button>
              {e.isDisabled === 0 ? (
                <Button className="btn btn-green" onClick={this._disable}>
                  DISABLE
                </Button>
              ) : (
                <Button
                  style={{ color: "#4251af", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this._enable}
                >
                  ENABLE
                </Button>
              )}
              <Button className="btn btn-red" onClick={this._Edit}>
                EDIT
              </Button>
            </span>
          </div>
          <hr style={styles.hr} />
          <div className="col-3 text-center">
            {e.imageUrl !== null ? (
              <img src={e.imageUrl} alt="avatar" />
            ) : (
              <img
                src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
                alt="avatar"
              />
            )}
          </div>
          <div className="col-9" style={{ paddingLeft: "30px" }}>
            <h1>{e.firstName + " " + e.lastName}</h1>
            <h4>{e.roleName}</h4>
            <hr />
            <h2>Contact Information</h2>
            <div className="row">
              <div className="col-6">
                <label>Phone:</label>
                <p style={styles.p}>{e.phone}</p>
              </div>
              <div className="col-6">
                <label>Email:</label>
                <p style={styles.p}>{e.email}</p>
              </div>
              <div className="col-12" style={{ paddingTop: "10px" }}>
                <label>Address:</label>
                <p style={styles.p}>{e.address}</p>
              </div>
            </div>
            <h2>Basic Information</h2>
            <div className="row">
              <div className="col-12">
                <label>Birthday:</label>
                <p style={styles.p}>
                  {moment(e.birthDate).format("MM/DD/YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UserProfile: state.ViewProfile_User,
});

export default withRouter(connect(mapStateToProps)(UserProfile));

const styles = {
  hr: {
    height: "1px",
    border: "0",
    borderTop: "1px solid #4251af",
    alignContent: "center",
    width: "100%",
  },
  p: {
    color: "black",
    fontWeight: "500",
    fontSize: "16px",
  },
};
