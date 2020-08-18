import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import "./code-log.styles.scss";

const CodeLog = ({ open, handleClose, Log, Serial }) => {
  const renderLog = Log.map((e, index) => (
    <Grid container key={index}>
      <Grid item xs={3}>
        <p>{moment(e?.createdDate).format("hh:mm A")}</p>
      </Grid>
      <Grid item xs={3}>
        <p>{moment(e?.createdDate).format("MM/DD/YYYY")}</p>
      </Grid>
      <Grid item xs={6}>
        <p>{e?.message}</p>
      </Grid>
    </Grid>
  ));

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="code-log">
        <div className="code-log-title">
          <p>{`Logs for ${Serial} `}</p>
          <Button className="close__btn" onClick={handleClose}>
            Close
          </Button>
        </div>

        <DialogContent>
          <div className="code__log__container">
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <h4>Time</h4>
              </Grid>
              <Grid item xs={3}>
                <h4>Date</h4>
              </Grid>
              <Grid item xs={6}>
                <h4>Details</h4>
              </Grid>
            </Grid>
            {renderLog}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  Log: state.GiftCardReducer.generationCode_log,
});

export default connect(mapStateToProps)(CodeLog);
