import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import { sendComment } from "../../../../actions/ticketActions";
import SendComponent from "../../../../util/sendmessInput";

import moment from "moment";

import "./index.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.scrollToBottom();
    console.log("didMount");
  }
  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.myRef.current.scrollIntoView({ behavior: "smooth" });
  };
  handleSendComment = () => {
    const { comment } = this.state;

    const payload = { comment: comment };
    const id = this.props.data.id;
    if (comment !== "") {
      this.props.sendComment(payload, id);
      this.setState({ comment: "" });
    }
  };
  checkNewComment = () => {
    if (!this.props.sendCommentRes.loading) {
      this.scrollToBottom();
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ comment: e.target.value });
  };
  render() {
    const { data, userAdmin, ticketComment } = this.props;
    const comment = ticketComment?.data.slice(0).reverse() || [];
    console.log("asda", this.props);
    // if (!this.props.sendCommentRes.loading) {
    //   this.scrollToBottom();
    // }
    return (
      <div>
        <>
          <div className="comment_wrapper">
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
                <div key={index}>
                  <div
                    className="mess-time"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <p className="date-time">
                      {moment(item.createdDate).format(
                        "MMM DD, YYYY, h:mm:ss A"
                      )}
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      className="comment isUser"
                      style={{ textAlign: "end" }}
                    >
                      <p>{item.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={this.myRef}></div>
          </div>
        </>
        <SendComponent
          value={this.state.comment}
          onChange={(e) => this.handleChange(e)}
          onClickIcon={() => this.handleSendComment()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ sendCommentRes: state.sendComment });
const mapDispatchToProps = (dispatch) => ({
  sendComment: (payload, id) => {
    dispatch(sendComment(payload, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
