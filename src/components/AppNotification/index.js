import React, { Component } from "react";
import { connect } from "react-redux";
// import CustomScrollbars from "../../util/CustomScrollbars";
import { withRouter } from "react-router-dom";
// import { BsPersonPlus } from "react-icons/bs";

import InfiniteScroll from "react-infinite-scroller";

import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
import avatar from "./avatar.png";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";

import "./Noti.css";

class AppNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.Notify !== undefined) {
      let loadNotify = this.props.Notify;
      const renderNotify = loadNotify?.map((Notify) => {
        const { createdDate, waNotificationId, content } = Notify;
        const time = moment
          .utc(createdDate)
          .local()
          .format("MM-DD-YYYY hh:mm A");
        return (
          <li>
            <div className="media" key={waNotificationId}>
              <Avatar alt={avatar} src={avatar} className="mr-2" />
              {/* <BsPersonPlus className="mr-2" size={26} /> */}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => this.props.gotoList(Notify)}
                className="media-body"
              >
                <p className="content">{content}</p>

                <p className="meta-date">{time}</p>
              </div>
              <IconButton onClick={() => this.props.handleDelete(Notify)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </li>
        );
      });
      return (
        <div style={{ maxHeight: "280px", overflow: "auto" }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.props.loadNotify}
            hasMore={this.props.hasMore}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
            useWindow={false}
          >
            <ul className="list-unstyled">{renderNotify}</ul>
          </InfiniteScroll>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
  // Noti_List: state.getNoti,
});
const mapDispatchToProps = (dispatch) => ({});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppNotification)
);
