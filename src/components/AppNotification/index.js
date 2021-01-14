import React, { Component } from "react";
import { connect } from "react-redux";
// import CustomScrollbars from "../../util/CustomScrollbars";
import { withRouter } from "react-router-dom";
// import { BsPersonPlus } from "react-icons/bs";

import InfiniteScroll from "react-infinite-scroller";

import { MdDateRange } from "react-icons/md";

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
      const renderNotify = loadNotify?.map((Notify, index) => {
        const { createdDate, content } = Notify;
        const time = moment
          .utc(createdDate)
          .local()
          .format("MM-DD-YYYY hh:mm A");
        return (
          <li className="media" key={index}>
            <Avatar alt={avatar} src={avatar} className="mr-2" />
            <div
              style={{ cursor: "pointer" }}
              onClick={() => this.props.gotoList(Notify)}
              className="media-body"
            >
              <p className="content">{content}</p>

              <span className="meta-date">
                <small style={{ paddingRight: "5px" }}>
                  <MdDateRange />
                </small>
                {time}
              </span>
            </div>
            <IconButton
              className="delete-btn"
              onClick={() => this.props.handleDelete(Notify)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </li>
        );
      });
      return (
        <div
          style={{ maxHeight: "280px", overflow: "auto" }}
          className="messages-list scrollbar"
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={this.props.loadNotify}
            hasMore={this.props.hasMore}
            loader={<div key={0}>Loading ...</div>}
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppNotification)
);
