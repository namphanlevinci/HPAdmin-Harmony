import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import { sendComment } from "../../../../actions/ticketActions";
import { Scrollbars } from "react-custom-scrollbars";
import { compareTwoDate } from "./util";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";

import "./index.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    // this.scrollToBottom();
    const { scrollbars } = this.refs;
    scrollbars.scrollToBottom();
  }
  componentDidUpdate(prevProps, prevState) {
    const { scrollbars } = this.refs;
    scrollbars.scrollToBottom();
  }

  handleSendComment = () => {
    const { comment } = this.state;
    this.setState({ comment: "" });
    const payload = { comment: comment };
    const id = this.props.data.id;
    if (comment !== "") {
      this.props.sendComment(payload, id);
      this.setState({ comment: "" });
    }
  };
  keyPressed = (event) => {
    if (event.key === "Enter") {
      const { comment } = this.state;
      const payload = { comment: comment };
      const id = this.props.data.id;
      if (comment !== "") {
        this.props.sendComment(payload, id);
        this.setState({ comment: "" });
      }
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
    const { userAdmin, ticketComment } = this.props;
    const comment = ticketComment?.data.slice(0).reverse() || [];

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <>
          <Scrollbars
            style={{ height: "100%" }}
            ref="scrollbars"
            autoHide={true}
          >
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
                          {/* {moment(item.createdDate).format(
                            "MMM DD, YYYY, h:mm:ss A"
                          )} */}
                          {`${compareTwoDate(item.createdDate)} ${moment(
                            item.createdDate
                          ).format("h:mm:ss A")}`}
                        </p>
                      </div>
                      <div className="comment">
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  </div>
                );
              return (
                <div key={index} style={{ marginBottom: 10, marginRight: 15 }}>
                  <div
                    className="mess-time"
                    style={{ justifyContent: "flex-end" }}
                  >
                    <p className="date-time">
                      {`${compareTwoDate(item.createdDate)} ${moment(
                        item.createdDate
                      ).format("h:mm:ss A")}`}
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
          </Scrollbars>

          {/* <div className="ref" ref={this.myRef}></div> */}
        </>
        <div>
          <TextareaAutosize
            style={{
              width: "100%",
              border: "0.5px solid #c5c5c5",
              outline: "none",
              fontSize: 16,
            }}
            aria-label="minimum height"
            rowsMin={3}
            rowsMax={5}
            placeholder="Type a comment..."
            onChange={(e) => this.handleChange(e)}
            value={this.state.comment}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon></SendIcon>}
              onClick={() => this.handleSendComment()}
            >
              Send
            </Button>
          </div>
          {/* <IconButton aria-label="">
            <SendIcon />
          </IconButton> */}
        </div>
        {/* <SendComponent
          value={this.state.comment}
          onChange={(e) => this.handleChange(e)}
          onClickIcon={() => this.handleSendComment()}
          onKeyPress={this.keyPressed}
        /> */}
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
