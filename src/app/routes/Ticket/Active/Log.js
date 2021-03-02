import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

class Log extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const log = data.ticketActivities || [];
    console.log("log", log);
    return (
      <>
        {log.map((item, index) => {
          return (
            <>
              <Grid container spacing={2}>
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
      </>
    );
  }
}

Log.propTypes = {};

export default Log;
