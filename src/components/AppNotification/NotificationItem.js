import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import axios from "axios";
import avatar from "./avatar.png";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Noti.css";
class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _handleDelete = e => {
    axios
      .delete("http://api2.levincidemo.com/api/notification/" + e, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        // console.log(res)
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const {
      icon,
      title,
      receiveDate,
      notificationId
    } = this.props.notification;
    const time = moment(receiveDate).format("MMMM Do YYYY, h:mm:ss a");
    return (
      <li className="media">
        <Avatar alt={avatar} src={avatar} className=" mr-2" />
        <div className="media-body align-self-center">
          <p className="sub-heading mb-0">{title}</p>
          <Button size="small" className="jr-btn jr-btn-xs mb-0">
            <i className={`zmdi ${icon} zmdi-hc-fw`} />
          </Button>{" "}
          <span className="meta-date">
            <small>{time}</small>
            <span
              className="notiDele"
              onClick={() => this._handleDelete(notificationId)}
            >
              <i className="fa fa-trash"></i>
            </span>
          </span>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  InfoUser_Login: state.User
});

export default withRouter(connect(mapStateToProps)(NotificationItem));
