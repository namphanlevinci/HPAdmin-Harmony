import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  VIEW_PROFILE_USER,
  DISABLE_USER,
  ENABLE_USER,
} from "../../../../actions/user/actions";
import { Grid, Avatar } from "@material-ui/core";
import { config } from "../../../../url/url";
import {
  CustomTitle,
  CustomText,
  CustomTextLabel,
} from "../../../../util/CustomText";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
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
        <Grid container spacing={3} className="admin_profile page-heading">
          <Grid item xs={3} className="text-center">
            {e?.imageUrl !== null ? (
              <img src={e?.imageUrl} alt="avatar" style={styles.avatar} />
            ) : (
              <img
                src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
                alt="avatar"
                style={styles.avatar}
              />
            )}
          </Grid>
          <Grid item xs={9} style={{ paddingLeft: "55px" }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <CustomTitle
                  value={e?.firstName + " " + e?.lastName}
                  styles={{ color: "black", fontSize: "26px" }}
                />
                <CustomTitle value={e?.roleName} />
                <hr />
              </Grid>
              <Grid item xs={8} className="admin-header-div">
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
              </Grid>
              <Grid item xs={12}>
                <CustomTitle value="Contact Information" />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Phone:" />
                <CustomText value={e?.phone} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Address:" />
                <CustomText value={e?.address} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Email:" />
                <CustomText value={e?.email} />
              </Grid>
              <Grid item xs={12}>
                <CustomTitle value="Basic Information" />
              </Grid>
            </Grid>

            <div className="row">
              <div className="col-12">
                <label>Date of Birth:</label>
                <p style={styles.p}>
                  {moment(e?.birthDate).format("MM/DD/YYYY")}
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
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
  avatar: {
    width: "255px",
    height: "255px",
    textAlign: "center",
    borderRadius: "50%",
  },
};
