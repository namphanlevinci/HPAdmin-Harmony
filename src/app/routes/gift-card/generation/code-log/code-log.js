import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import Button from "@material-ui/core/Button";
import "./code-log.styles.scss";

const CodeLog = ({ open, handleClose, Log, Serial }) => {
  const renderLog = Log.map((e, index) => (
    <tr key={index}>
      <td>{moment(e?.createdDate).format("hh:mm A")}</td>
      <td>{moment(e?.createdDate).format("MM/DD/YYYY")}</td>
      <td>{e?.message}</td>
    </tr>
  ));

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="code-log">
        <div className="code-log-title">
          <p>{`Logs for ${Serial} `}</p>
          <Button onClick={handleClose}>CLOSE</Button>
        </div>

        <DialogContent>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "25%" }}>
                  <h4>Time</h4>
                </th>
                <th style={{ width: "25%" }}>
                  <h4>Date</h4>
                </th>
                <th>
                  <h4 style={{ width: "50%" }}>Details</h4>
                </th>
              </tr>
            </thead>
            <tbody>{renderLog}</tbody>
          </table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  Log: state.GiftCardReducer.generationCode_log,
});

export default connect(mapStateToProps)(CodeLog);
