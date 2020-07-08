import React, { useState } from "react";
import { store } from "react-notifications-component";
import { css } from "@emotion/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { config } from "../../../../../../url/url";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import moment from "moment";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

const URL = config.url.URL;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ExportSettlement({ MerchantId, Token }) {
  const [open, setOpen] = React.useState(false);

  const [selectFrom, setSelectFrom] = React.useState(new Date());

  const [selectTo, setSelectTo] = React.useState(new Date());
  const handleFromDateChange = (date) => {
    setSelectFrom(date);
  };
  const handleToDateChange = (date) => {
    setSelectTo(date);
  };
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getReportSettlement = () => {
    setLoading(true);
    const config = {
      headers: { Authorization: "bearer " + Token },
    };
    axios
      .get(
        URL +
          `/settlement/export/monthly/${MerchantId}?fromDate=${moment(
            selectFrom
          ).format("YYYY-MM-DD")}&toDate=${moment(selectTo).format(
            "YYYY-MM-DD"
          )}`,
        config
      )
      .then((res) => {
        if (Number(res.data.codeNumber) === 400 || res.data.data === null) {
          store.addNotification({
            title: "ERROR!",
            message: `${res.data.message}`,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });
          setLoading(false);
          handleClose();
        } else {
          setTimeout(() => {
            window.open(res.data.data.path);
            setLoading(false);
            handleClose();
          }, 1000);
        }
      });
  };
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 50px;
  `;
  return (
    // .
    <div>
      <Button
        type="button"
        onClick={handleClickOpen}
        style={{ color: "#4251af", backgroundColor: "white" }}
        className="btn btn-green"
      >
        EXPORT SETTLEMENT
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle id="alert-dialog-slide-title">
          <span style={{ color: "#4251af" }}>EXPORT SETTLEMENT</span>
        </DialogTitle>
        <DialogContent>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="From Date"
                  value={selectFrom}
                  onChange={handleFromDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />

                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="To Date"
                  value={selectTo}
                  onChange={handleToDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PulseLoader
                css={override}
                size={16}
                color={"#4251af"}
                loading={loading}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ color: "#4251af" }}
          >
            Close
          </Button>
          <Button
            onClick={getReportSettlement}
            color="primary"
            style={{ color: "#4251af" }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExportSettlement;
