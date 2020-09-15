import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  VIEW_PROFILE_USER,
  DISABLE_USER,
  ENABLE_USER,
} from "../../../../actions/user/actions";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { config } from "../../../../url/url";
import axios from "axios";
import CheckPermissions from "../../../../util/checkPermission";

import "./User.css";
import "../../Merchants/MerchantProfile/Detail/Detail.css";

const URL = config.url.URL;
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
    this.props.history.push("/app/accounts/admin/profile/edit/general");
  };

  getUserByID = () => {
    const ID = this.props.UserProfile.waUserId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token },
    };
    axios
      .get(URL + "/adminuser/" + ID, config)
      .then((res) => {
        this.props.VIEW_PROFILE_USER(res.data.data);
        // this.forceUpdate();
        this.props.history.push("/app/accounts/admin/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  disableUser = () => {
    const ID = this.props.UserProfile.waUserId;
    this.props.DISABLE_USER(ID);
  };

  enableUser = () => {
    const ID = this.props.UserProfile.waUserId;
    this.props.ENABLE_USER(ID);
  };

  render() {
    const e = this.props.UserProfile;
    const userStatus =
      e?.isDisabled === 0 ? (
        <Button
          className="btn btn-green"
          style={styles.button}
          onClick={this.disableUser}
        >
          DISABLE
        </Button>
      ) : (
        <Button
          className="btn btn-green"
          style={styles.button}
          onClick={this.enableUser}
        >
          ENABLE
        </Button>
      );
    return (
      <div className="container-fluid UserProfile">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.adminUserProfile" />}
        />
        <div className="row admin_profile page-heading">
          <div className="col-3 text-center">
            {e?.imageUrl !== null ? (
              <img src={e?.imageUrl} alt="avatar" className="admin-avatar" />
            ) : (
              <img
                src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
                alt="avatar"
                className="admin-avatar"
              />
            )}
          </div>
          <div className="col-9" style={{ paddingLeft: "55px" }}>
            <div className="row">
              <div className="col-4">
                <h1>{e?.firstName + " " + e?.lastName}</h1>
                <h4>{e?.roleName}</h4>
                <hr />
              </div>
              <div className="col-8 admin-header-div">
                <Button
                  className="btn btn-green"
                  style={styles.button}
                  onClick={() => this.props.history.push("/app/accounts/admin")}
                >
                  BACK
                </Button>
                {CheckPermissions("active-user") && userStatus}

                {CheckPermissions("edit-user") && (
                  <Button
                    className="btn btn-red"
                    style={styles.button}
                    onClick={this._Edit}
                  >
                    EDIT
                  </Button>
                )}
              </div>
            </div>

            <h2>Contact Information</h2>
            <div className="row">
              <div className="col-3">
                <label>Phone:</label>
                <p style={styles.p}>{e?.phone}</p>
              </div>
              <div className="col-4">
                <label>Address:</label>
                <p style={styles.p}>{e?.address}</p>
              </div>
              <div className="col-5">
                <label>Email:</label>
                <p style={styles.p}>{e?.email}</p>
              </div>
            </div>
            <h2>Basic Information</h2>
            <div className="row">
              <div className="col-12">
                <label>Date of Birth:</label>
                <p style={styles.p}>
                  {moment(e?.birthDate).format("MM/DD/YYYY")}
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
  UserProfile: state.userReducer.ViewUser,
});

const mapDispatchToProps = (dispatch) => ({
  VIEW_PROFILE_USER: (payload) => {
    dispatch(VIEW_PROFILE_USER(payload));
  },
  DISABLE_USER: (payload) => {
    dispatch(DISABLE_USER(payload));
  },
  ENABLE_USER: (payload) => {
    dispatch(ENABLE_USER(payload));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
);

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
    fontWeight: "400",
    fontSize: "16px",
  },
  button: {
    padding: "3px 20px",
    height: "40px",
  },
};
