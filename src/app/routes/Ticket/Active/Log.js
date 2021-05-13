import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars";
import { compareTwoDate } from "./util";

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { scrollbars } = this.refs;
    scrollbars.scrollToBottom();
  }

  render() {
    const { ticketLog } = this.props;
    const log = ticketLog?.data.slice(0).reverse() || [];

    return (
      <Scrollbars style={{ height: "100%" }} ref="scrollbars" autoHide={true}>
        {log.map((item, index) => {
          return (
            <>
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <div>
                    <p> {`${compareTwoDate(item.createdDate)}`}</p>
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
