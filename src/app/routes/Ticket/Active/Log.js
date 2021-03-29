import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars";

class Log extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { scrollbars } = this.refs;
    scrollbars.scrollToBottom();
  }

  render() {
    const { data, ticketLog } = this.props;
    const log = ticketLog.data || [];
    return (
      <Scrollbars style={{ height: "100%" }} ref="scrollbars" autoHide={true}>
        {log.map((item, index) => {
          return (
            <>
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <div>
                    <p>{moment(item.createdDate).format("MMM DD, YYYY")}</p>
                    <p style={{ marginBottom: "0" }}>
                      {moment(item.createdDate).format("h:mm:ss A")}
                    </p>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div>
                    <p style={{ fontWeight: 500 }}>{item.createdUserName}</p>
                    <div>
                      <p style={{ marginBottom: "0" }}>{item.description}</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <hr />
            </>
          );
        })}
      </Scrollbars>
    );
  }
}

Log.propTypes = {};

export default Log;
