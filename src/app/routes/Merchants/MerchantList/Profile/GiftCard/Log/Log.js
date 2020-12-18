import React from "react";
import { connect } from "react-redux";

import {
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../../util/CustomText";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import "./log.scss";

const CodeLog = ({ open = false, handleClose, log, Serial }) => {
  const renderLog = log.map((e, index) => (
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
          <CustomTitle value={`Logs for ${Serial} `} />
          <Button className="close__btn" onClick={handleClose}>
            Close
          </Button>
        </div>

        <DialogContent>
          <div className="code__log__container">
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <CustomTextLabel value="Time" />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="Date" />
              </Grid>
              <Grid item xs={6}>
                <CustomTextLabel value="Details" />
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
  log: state.codeLog.log,
});

export default connect(mapStateToProps)(CodeLog);
