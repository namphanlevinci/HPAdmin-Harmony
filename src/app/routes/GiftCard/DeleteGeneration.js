import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./Generation/CodeLog/code-log.styles.scss";

const Delete = ({ open, handleCloseDelete, deleteGeneration, text }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleCloseDelete}>
        <DialogTitle id="alert-dialog-title">
          {/* {`Are you sure you want to DELETE this ${text}?`} */}
          {`ARCHIVE ${text.toUpperCase()}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{`Are you sure you want to ARCHIVE this ${text}`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            No
          </Button>
          <Button onClick={deleteGeneration} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Delete;
