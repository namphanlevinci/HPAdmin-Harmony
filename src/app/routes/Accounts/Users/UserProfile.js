import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Grid } from "@material-ui/core";
import {
  CustomTitle,
  CustomText,
  CustomTextLabel,
} from "../../../../util/CustomText";
import {
  getUserByID,
  restoreUserById,
  archiveUserById,
} from "../../../../actions/userActions";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import moment from "moment";
import CheckPermissions from "../../../../util/checkPermission";

import "./User.css";
import "../../Merchants/MerchantList/Profile/Detail.css";

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  editUser = () => {
    this.props.history.push("/app/accounts/admin/profile/edit/general");
  };

  disableUser = () => {
    const ID = this.props.userProfile.waUserId;
    this.props.archiveUserById(ID);
  };

  enableUser = () => {
    const ID = this.props.userProfile.waUserId;
    this.props.restoreUserById(ID);
  };

  render() {
    const e = this.props.userProfile;
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
      <div className="container-fluid userProfile">
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
                    onClick={this.editUser}
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
  userProfile: state.userById.data,
});

const mapDispatchToProps = (dispatch) => ({
  getUserByID: (ID, path) => {
    dispatch(getUserByID(ID, path));
  },
  restoreUserById: (ID) => {
    dispatch(restoreUserById(ID));
  },
  archiveUserById: (ID) => {
    dispatch(archiveUserById(ID));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(userProfile)
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
