import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";

import { withStyles } from "@material-ui/core/styles";
import { WARNING_NOTIFICATION } from "../../../../../../constants/notificationConstants";
import { config } from "@/url/url";
import axios from "axios";

import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import {
  CustomTitle,
  CustomText,
  CustomTextLabel,
} from "../../../../../../util/CustomText";
import {
  DownloadMerchantTemplateById,
  AddMerchantTemplateById,
  restoreMerchantById,
  archiveMerchantById,
} from "../../../../../../actions/merchantActions";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckPermissions from "../../../../../../util/checkPermission";
import CustomProgress from "../../../../../../util/CustomProgress";
import FadeLoader from "react-spinners/PulseLoader";
import PopupBookingLink from "./PopupBookingLink";

import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";
import "../Detail.css";

const URL = config.url.URL;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      openActive: false,
      open: false,
      linkBooking: '',
    };
  }
  goToEditPage = () => {
    this.props.history.push("/app/merchants/profile/settings/edit");
  };
  componentDidMount() {
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

  handleDownloadTemplate = async () => {
    await this.props.downloadTemplate();
  };

  handleAddTemplate = async (e) => {
    e.preventDefault();
    let file = await e.target.files[0];
    if (file?.name.toLowerCase().match(/\.(xlsx)$/)) {
      this.props.addTemplate({ file, merchantId: this.state.ID });
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  generateBookingLink = async () => {
    this.setState({ isLoading: true });

    const { MerchantProfile, user } = this.props;

    const { merchantId } = MerchantProfile;

    let url = `merchant/bookingLink/${merchantId}`;
    const { data } = await axios.get(`${URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (data && parseInt(data.codeNumber) === 200) {
      this.setState({
        isLoading: false,
        linkBooking: data?.data || ""
      });
    }
  }

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
            INACTIVE
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
                  const merchantId = this.state.ID;
                  const reason = values.archiveReason;
                  this.props.archiveMerchantById(merchantId, reason);
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
                  this.props.restoreMerchantById(this.state.ID);
                  this.setState({ openActive: false, open: false });
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

                        width: "510px",
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
                          style={{ padding: "10px 0px" }}
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
        {this.props.AddMerchantTemplate.loading && <CustomProgress />}
        {this.props.Template.loading && <CustomProgress />}
        <div className="container-fluid">
          <CustomTitle value="Settings" />
          <CustomText value="The charged percent fee of credit card transactions" />

          <Grid container spacing={3} style={{ paddingTop: "10px" }}>
            <Grid item xs={6} md={3}>
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
            <Grid item xs={6} md={3}>
              <TextField
                label=" Merchant ID"
                disabled
                value={data.merchantCode}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                label="Discount Rate"
                disabled
                value={data.discountRate}
              />
            </Grid>
            <Grid item xs={6} md={3}>
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
            <Grid item xs={6} md={3}>
              <TextField label="Turn Amount" disabled value={data.turnAmount} />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <TextField
                style={{ width: "80%" }}
                label="Time Zone"
                disabled
                value={data.timezone}
              />
            </Grid>
            <Grid item xs={6} md={3}>

            </Grid>
            <Grid item xs={12} sm={3} md={3}>

            </Grid>
            <Grid item xs={6} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isTop}
                    style={{ color: "#0764B0" }}
                    color="primary"
                  />
                }
                label="Top Store"
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.isTest}
                    style={{ color: "#0764B0" }}
                    color="primary"
                  />
                }
                label="Test Merchant"
              />
            </Grid>
            <Grid item xs={12}>
              {CheckPermissions("edit-setting") && (
                <Button className="btn btn-green" onClick={this.goToEditPage}>
                  EDIT
                </Button>
              )}

              {CheckPermissions("active-merchant") && MerchantStatus}

              <Button
                className="btn btn-green"
                onClick={this.handleDownloadTemplate}
              >
                Download Customer Template
              </Button>

              <div style={{ marginRight: 15 }} id="upload_button">
                <label>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => this.handleAddTemplate(e)}
                  />
                  <span style={{ margin: "0px" }} className="btn btn-green">
                    Import Customer
                  </span>
                </label>
              </div>

              <Button
                className="btn btn-green"
                style={{ width: 250 }}
                onClick={this.generateBookingLink}
              >
                {
                  this.state.isLoading ?
                    <FadeLoader
                      color={'white'}
                      loading={true}
                      size={10}
                      css={{
                        display: 'block',
                      }} /> :
                    `Generate Booking link`
                }
              </Button>

            </Grid>
          </Grid>
          <br />
        </div>

        <PopupBookingLink
          link={this.state.linkBooking}
          close={() => this.setState({ linkBooking: "" })}
        />

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  Template: state.downloadTemplate,
  AddMerchantTemplate: state.addTemplate,
  user: state.verifyUser.user
});
const mapDispatchToProps = (dispatch) => ({
  archiveMerchantById: (merchantId, reason) => {
    dispatch(archiveMerchantById(merchantId, reason));
  },
  restoreMerchantById: (merchantId) => {
    dispatch(restoreMerchantById(merchantId));
  },
  downloadTemplate: () => {
    dispatch(DownloadMerchantTemplateById());
  },
  addTemplate: (payload) => {
    dispatch(AddMerchantTemplateById(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
