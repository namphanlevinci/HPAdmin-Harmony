import React, { Component } from "react";
import { connect } from "react-redux";
// import NotificationItem from './NotificationItem';
import CustomScrollbars from "util/CustomScrollbars";
import { getAll_Notifications } from "../../actions/notifications/actions";
import { withRouter } from "react-router-dom";
//
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import avatar from "./avatar.png";
import moment from "moment";
import "./Noti.css";
class AppNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.e !== undefined) {
      let Notidata = this.props.e;
      const renderNoti = Notidata.map(e => {
        const { CreatedDate, WaNotificationId, Content } = e;
        const time = moment
          .utc(CreatedDate)
          .local()
          .format("MM-DD-YYYY HH:mm A");

        return (
          <li className="media" key={WaNotificationId}>
            <Avatar alt={avatar} src={avatar} className=" mr-2" />
            <div
              style={{ cursor: "pointer" }}
              onClick={() => this.props.gotoList(e)}
              className="media-body align-self-center"
            >
              <p className="sub-heading mb-0">{Content}</p>
              <Button size="small" className="jr-btn jr-btn-xs mb-0">
                <i className={`zmdi  zmdi-hc-fw`} />
              </Button>{" "}
              <span className="meta-date">
                <small>{time}</small>
              </span>
            </div>
            <Avatar className="notiDele">
              <i
                onClick={() => this.props.handleDelete(e)}
                className="fa fa-trash"
              ></i>
            </Avatar>
          </li>
        );
      });
      return (
        <CustomScrollbars
          className="messages-list scrollbar"
          style={{ height: 280 }}
        >
          <ul className="list-unstyled">{renderNoti}</ul>
        </CustomScrollbars>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  Noti_List: state.getNoti
});
const mapDispatchToProps = dispatch => ({
  getAll_Notifications: () => {
    dispatch(getAll_Notifications());
  }
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppNotification)
);
