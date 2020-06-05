import React, { Component } from "react";
import { connect } from "react-redux";
import CustomScrollbars from "../../util/CustomScrollbars";
import { getAll_Notifications } from "../../actions/notifications/actions";
import { withRouter } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import avatar from "./avatar.png";
import moment from "moment";
import "./Noti.css";
import IconButton from "@material-ui/core/IconButton";

class AppNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.e !== undefined) {
      let notiData = this.props.e;
      const renderNoti = notiData?.map((e) => {
        const { createdDate, waNotificationId, content } = e;
        const time = moment
          .utc(createdDate)
          .local()
          .format("MM-DD-YYYY hh:mm A");
        return (
          <li className="media" key={waNotificationId}>
            <Avatar alt={avatar} src={avatar} className=" mr-2" />
            <div
              style={{ cursor: "pointer" }}
              onClick={() => this.props.gotoList(e)}
              className="media-body align-self-center"
            >
              <p className="sub-heading mb-0">{content}</p>
              <Button size="small" className="jr-btn jr-btn-xs mb-0">
                <i className={`zmdi  zmdi-hc-fw`} />
              </Button>
              <span className="meta-date">
                <small>{time}</small>
              </span>
            </div>
            <IconButton onClick={() => this.props.handleDelete(e)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
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

const mapStateToProps = (state) => ({
  InfoUser_Login: state.User,
  Noti_List: state.getNoti,
});
const mapDispatchToProps = (dispatch) => ({
  getAll_Notifications: () => {
    dispatch(getAll_Notifications());
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppNotification)
);
