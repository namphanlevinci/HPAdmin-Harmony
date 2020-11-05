import React from "react";
import { Dialog, Typography, Button, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { CustomText } from "../../../../../util/CustomText";

import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "../../../Merchants/MerchantList/MerchantProfile.css";
import "../../../Merchants/PendingList/MerchantReqProfile.css";
import "./Consumer.css";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function DisableConsumer({
  open,
  handleToggle,
  ConsumerID,
  deleteConsumer,
}) {
  return (
    <>
      <Button className="btn btn-red" onClick={handleToggle}>
        ARCHIVE
      </Button>
      <Dialog
        open={open}
        onClose={handleToggle}
        className="merchant_btn_container"
      >
        <DialogContent style={{ maxWidth: "600px" }}>
          <Formik
            initialValues={{ rejectReason: "" }}
            validate={(values) => {
              let errors = {};
              if (!values.rejectReason) {
                errors.rejectReason = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const reason = values.rejectReason;
              const ID = ConsumerID;
              deleteConsumer(ID, reason);
              handleToggle();
            }}
          >
            {({ values, isSubmitting, handleChange, errors, touched }) => (
              <div className="rejectInput">
                <DialogTitle className="setting_title" onClose={handleToggle}>
                  Warning!
                </DialogTitle>
                <DialogContent style={{ marginTop: "50px" }}>
                  <Form style={styles.Form}>
                    <CustomText value=" Are you sure you want to Archive this Consumer?" />

                    <TextField
                      name="rejectReason"
                      variant="outlined"
                      placeholder="Please enter your reason"
                      fullWidth
                      multiline
                      rows={4}
                      inputProps={{ maxLength: 100 }}
                      onChange={handleChange}
                      helperText={
                        touched.rejectReason ? errors.rejectReason : ""
                      }
                      error={
                        touched.rejectReason && Boolean(errors.rejectReason)
                      }
                    />

                    <div
                      style={{ paddingTop: "15px" }}
                      className="general-content"
                    >
                      <Button type="submit" className="btn btn-green">
                        CONFIRM
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-red"
                        onClick={handleToggle}
                      >
                        CANCEL
                      </Button>
                    </div>
                  </Form>
                </DialogContent>
              </div>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
