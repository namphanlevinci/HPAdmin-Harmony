import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import {
  ARCHIVE_MERCHANT,
  RESTORE_MERCHANT,
} from "../../../../../actions/merchants/actions";
import { withStyles } from "@material-ui/core/styles";

import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  CustomTitle,
  CustomText,
  CustomTextLabel,
} from "../../../../../util/CustomText";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckPermissions from "../../../../../util/checkPermission";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "./Detail.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      openActive: false,
      open: false,
    };
  }
  _gotoEdit = () => {
    this.props.history.push("/app/merchants/profile/settings/edit");
  };
  async componentDidMount() {
    const data = this.props.MerchantProfile;

    this.setState({
      ID: data.merchantId,
    });
  }

  handleOpenArchive = () => {
    this.setState({ open: !this.state.open });
  };

  handleOpenActive = () => {
    this.setState({ openActive: !this.state.openActive });
  };

  render() {
    const data = this.props.MerchantProfile;
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

    const MerchantStatus =
      this.props.MerchantProfile.isDisabled !== 1 ? (
        <>
          <Button className="btn btn-red" onClick={this.handleOpenArchive}>
            ARCHIVE
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleOpenArchive}
            className="merchant_btn_container"
          >
            <DialogContent style={{ maxWidth: "600px" }}>
              <Formik
                initialValues={{ archiveReason: "" }}
                validate={(values) => {
                  let errors = {};
                  if (!values.archiveReason) {
                    errors.archiveReason = "Archive reason cannot be empty!";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.props.ARCHIVE_MERCHANT({
                    ID: this.state.ID,
                    reason: values.archiveReason,
                  });
                }}
              >
                {({ values, isSubmitting, handleChange, errors, touched }) => (
                  <div className="rejectInput">
                    <DialogTitle
                      className="setting_title"
                      onClose={this.handleOpenArchive}
                    >
                      Warning!
                    </DialogTitle>

                    <DialogContent style={{ marginTop: "70px" }}>
                      <Form style={styles.Form}>
                        <CustomText value="Are you sure you want to Archive this Merchant?" />

                        <TextField
                          name="archiveReason"
                          variant="outlined"
                          placeholder="Please enter your reason"
                          fullWidth
                          multiline
                          rows={4}
                          inputProps={{ maxLength: 100 }}
                          onChange={handleChange}
                          helperText={
                            touched.archiveReason ? errors.archiveReason : ""
                          }
                          error={
                            touched.archiveReason &&
                            Boolean(errors.archiveReason)
                          }
                        />
                        <div
                          style={{ paddingTop: "20px" }}
                          className="general-content"
                        >
                          <Button type="submit" className="btn btn-green">
                            CONFIRM
                          </Button>

                          <Button
                            onClick={this.handleOpenArchive}
                            className="btn btn-red"
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
      ) : (
        <>
          <Button className="btn btn-green" onClick={this.handleOpenActive}>
            ACTIVE
          </Button>
          <Dialog
            open={this.state.openActive}
            onClose={this.handleOpenActive}
            className="merchant_btn_container"
          >
            <Formik
              initialValues={{ archiveReason: "" }}
              onSubmit={(values, { setSubmitting }) => {
                this.setState({ openActive: false });
                const { ID } = this.state;
                this.props.RESTORE_MERCHANT(ID);
              }}
            >
              {({ values, isSubmitting, handleChange, errors, touched }) => (
                <div className="rejectInput">
                  <DialogTitle
                    className="setting_title"
                    onClose={this.handleOpenActive}
                  >
                    Confirmation
                  </DialogTitle>

                  <DialogContent
                    style={{
                      paddingTop: 70,
                      width: "50vw",
                      textAlign: "center",
                    }}
                  >
                    <Form style={styles.Form}>
                      <CustomText value=" Are you sure you want to enable this Merchant?" />

                      <Grid container spacing={0}>
                        <Grid item xs={12} style={{ textAlign: "start" }}>
                          <CustomText value=" Why disabled:" />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "start" }}>
                          <CustomTextLabel value={data?.disabledReason} />
                        </Grid>
                      </Grid>
                      <div
                        style={{ paddingTop: 20 }}
                        className="general-content"
                      >
                        <Button type="submit" className="btn btn-green">
                          CONFIRM
                        </Button>

                        <Button
                          onClick={this.handleOpenActive}
                          className="btn btn-red"
                        >
                          CANCEL
                        </Button>
                      </div>
                    </Form>
                  </DialogContent>
                </div>
              )}
            </Formik>
          </Dialog>
        </>
      );

    return (
      <React.Fragment>
        <div className="container-fluid">
          <CustomTitle value="Settings" />
          <CustomText value="The charged percent fee of credit card transactions" />

          <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
              <TextField
                label="Transactions Fee"
                disabled
                value={data.transactionsFee}
                InputProps={{
                  startAdornment: (
                    <span
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      %
                    </span>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                label=" Merchant ID"
                disabled
                value={data.merchantCode}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <TextField
                label="Discount Rate"
                disabled
                value={data.discountRate}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                label="Point Rate"
                disabled
                value={data.pointRate}
                InputProps={{
                  startAdornment: (
                    <span
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      %
                    </span>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField label="Turn Amount" disabled value={data.turnAmount} />
            </Grid>
            <Grid item xs={12}>
              {CheckPermissions("edit-setting") && (
                <Button className="btn btn-green" onClick={this._gotoEdit}>
                  EDIT
                </Button>
              )}

              {CheckPermissions("active-merchant") && MerchantStatus}
            </Grid>
          </Grid>
          <br />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => {
  return {
    ARCHIVE_MERCHANT: (payload) => {
      dispatch(ARCHIVE_MERCHANT(payload));
    },
    RESTORE_MERCHANT: (ID) => {
      dispatch(RESTORE_MERCHANT(ID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
