import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from 'util/IntlMessages';
import {connect} from 'react-redux';
import { logout_User } from '../../actions/user/actions'
import { withRouter } from 'react-router-dom';
// const signalR = require("@aspnet/signalr");

class UserInfo extends React.Component {

  state = {
    anchorEl: null,
    open: false,
    yeet: []
  };

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  // handleRequestClose = () => {
  //   this.setState({open: false});
  // };

  // signalR
  // componentDidMount = () => {
  //   const token = this.props.InfoUser_Login.User.token
  //   let connection = new signalR.HubConnectionBuilder()
  //   .withUrl("https://api2.levincidemo.com/notification/", { accessTokenFactory: () => token })
  //   .build();
  //   connection.start();
  //     connection.on("ListWaNotification", data => {
  //       console.log("DATA", JSON.parse(data));
  //   });
  // };
  onLogout = () => {
    this.props.logout_User()
  }
  _gotoSetting = () => {
    this.setState({open: false});
    this.props.history.push('/app/settings')
  }
  _gotoProfile = () => {
    this.setState({open: false});
    this.props.history.push('/app/profile')
  }
  render() {
    const  User = this.props.InfoUser_Login.User.userAdmin
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt='...'
          src={'https://via.placeholder.com/150x150'}
          className="user-avatar "
        />
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}>{User.firstName + ' ' + User.lastName}<i
            className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
          </h4>
        </div>
        <Menu className="user-info"
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              PaperProps={{
                style: {
                  minWidth: 120,
                  paddingTop: 0,
                  paddingBottom: 0
                }
              }}>
          <MenuItem onClick={this._gotoProfile}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.profile"/>
          </MenuItem>
          <MenuItem onClick={this._gotoSetting}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.setting"/>
          </MenuItem>
          <MenuItem onClick={this.onLogout}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.logout"/>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  InfoUser_Login: state.User,
});
const mapDispatchToProps = (dispatch) => ({
  logout_User: (agent_info) => {
      dispatch(logout_User(agent_info));
  }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));
