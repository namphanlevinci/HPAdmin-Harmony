import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";

function CustomProgress({ size }) {
  return (
    <div>
      <Dialog
        open={true}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent>
          <DialogContentText>
            <CircularProgress style={{ color: "#4251af", zIndex: "9999" }} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomProgress;
