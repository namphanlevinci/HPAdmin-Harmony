import React, { Component } from "react";
import PropTypes from "prop-types";

import { Avatar } from "@material-ui/core";

import moment from "moment";

import "./index.css";
class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, userAdmin } = this.props;
    const comment = data.ticketComments || [];
    console.log("asda", this.props);
    return (
      <div>
        {comment.map((item, index) => {
          if (item.createdBy !== userAdmin.waUserId)
            return (
              <div
                style={{ display: "flex", marginBottom: "10px" }}
                key={index}
              >
                <Avatar />
                <div style={{ marginLeft: "20px" }}>
                  <div className="mess-time">
                    <p className="name">{item.createdUserName}</p>
                    <p className="date-time">
                      {moment(item.createdDate).format(
                        "MMM DD, YYYY, h:mm:ss A"
                      )}
                    </p>
                  </div>
                  <div className="comment">
                    <p>{item.comment}</p>
                  </div>
                </div>
              </div>
            );
          return (
            <div>
              <div className="mess-time" style={{ justifyContent: "flex-end" }}>
                <p className="date-time">
                  {moment(item.createdDate).format("MMM DD, YYYY, h:mm:ss A")}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div className="comment isUser" style={{ textAlign: "end" }}>
                  <p>{item.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Comment.propTypes = {};

export default Comment;
