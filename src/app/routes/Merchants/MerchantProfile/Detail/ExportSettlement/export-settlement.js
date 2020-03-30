import React, { useState } from "react";
import { store } from "react-notifications-component";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Select from "react-select";
import url from "../../../../../../url/url";
import axios from "axios";

const months = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" }
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ExportSettlement({ IDMERCHANT, Token }) {
  const [open, setOpen] = React.useState(false);

  let d = new Date();
  var n = d.getMonth() + 1;
  const [month, setMonth] = useState({ value: n, label: n });
  const nam = new Date().getFullYear();
  let years = Array.from(new Array(20), (val, index) => index + nam);
  const [year, setYear] = useState({ value: nam, label: nam });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getReportSettlement = () => {
    const config = {
      headers: { Authorization: "bearer " + Token }
    };
    handleClose();
    axios
      .get(
        url +
          `/settlement/export/monthly/${IDMERCHANT}?date=${year.value}-${month.value}-01`,
        config
      )
      .then(res => {
        if (res.codeNumber === 400) {
          store.addNotification({
            title: "ERROR!",
            message: `${res.data.message}`,
            type: "wanrning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            },
            width: 250
          });
        } else {
          setTimeout(() => {
            setYear({ value: nam, label: nam });
            setMonth({ value: n, label: n });
            window.open(res.data.data.path);
          }, 100);
        }
      });
  };

  return (
    // .
    <div>
      <Button
        type="button"
        onClick={handleClickOpen}
        style={{ color: "#0764b0", backgroundColor: "white" }}
        className="btn btn-green"
      >
        EXPORT SETTLEMENT
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >
        <DialogTitle id="alert-dialog-slide-title">
          <span style={{ color: "#0764b0" }}>EXPORT SETTLEMENT</span>
        </DialogTitle>
        <DialogContent>
          <div>
            <h4 style={{ color: "#0764b0" }}>Month</h4>
            <Select
              options={months}
              placeholder="Month"
              value={month}
              onChange={e => setMonth({ value: e.value, label: e.value })}
            />
            <br />
            <h4 style={{ color: "#0764b0" }}>Year</h4>
            <Select
              placeholder="Year"
              value={year}
              options={years.map(e => {
                return {
                  id: e,
                  label: e,
                  value: e
                };
              })}
              onChange={e => setYear({ value: e.value, label: e.value })}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: "#0764b0" }}
          >
            Close
          </Button>
          <Button
            onClick={getReportSettlement}
            color="primary"
            style={{ color: "#0764b0" }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExportSettlement;
