import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";

import "./code_log.styles.scss";

const CodeLog = ({ open, handleClose, Log, Serial }) => {
  const renderLog = Log.map((e, index) => (
    <tr key={index}>
      <td>{moment(e?.createdDate).format("MM/DD/YYYY hh:mm A")}</td>
      <td>{e?.message}</td>
    </tr>
  ));
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="code-log"
      >
        <DialogTitle id="alert-dialog-title">{`Serial ${Serial} Logs`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>
                      <h4>Date/Time</h4>
                    </th>
                    <th>
                      <h4 style={{ width: "50%" }}>Details</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderLog}</tbody>
              </table>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  Log: state.GiftCardReducer.generationCode_log,
});

export default connect(mapStateToProps)(CodeLog);
