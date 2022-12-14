import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import { userLogout } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import AvatarIcon from "./avatar.png";

class UserInfo extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  onLogout = () => {
    const ID = this.props.CurrentUser.waUserId;
    this.props.userLogout(ID);
  };

  // _gotoSetting = () => {
  //   this.setState({ open: false });
  //   this.props.history.push("/app/settings");
  // };

  goToProfile = () => {
    this.setState({ open: false });
    this.props.history.push("/app/profile/general");
  };

  render() {
    const User = this.props.CurrentUser;
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt="..."
          src={User?.imageUrl !== null ? User?.imageUrl : AvatarIcon}
          className="user-avatar"
          style={{ objectFit: "cover" }}
        />
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}>
            {User?.firstName + " " + User?.lastName}
            <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
          </h4>
        </div>
        <Menu
          className="user-info"
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              minWidth: 120,
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
        >
          <MenuItem onClick={this.goToProfile}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.profile" />
          </MenuItem>
          {/* <MenuItem onClick={this._gotoSetting}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.setting" />
          </MenuItem> */}
          <MenuItem onClick={this.onLogout}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.logout" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  CurrentUser: state.verifyUser.user.userAdmin,
});
const mapDispatchToProps = (dispatch) => ({
  userLogout: () => {
    dispatch(userLogout());
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfo)
);
