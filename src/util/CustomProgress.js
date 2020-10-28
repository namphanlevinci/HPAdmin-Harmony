import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";

// import PulseLoader from "react-spinners/PulseLoader";

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
            {/* <PulseLoader size={size ? size : "19"} margin={6} color={"#4251af"} /> */}
            <CircularProgress style={{ color: "#4251af", zIndex: "9999" }} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomProgress;
