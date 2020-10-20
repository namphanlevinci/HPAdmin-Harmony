import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MERCHANT_APPROVAL,
  MERCHANT_REJECT,
  SET_PENDING_STATUS,
  DELETE_MERCHANT,
} from "../../../../actions/merchants/actions";
import { Checkbox } from "@material-ui/core";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import { config } from "../../../../url/url";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Grid,
  CardMedia,
  IconButton,
  Button,
  Dialog,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  CustomTitle,
  CustomTextLabel,
  CustomText,
} from "../../../../util/CustomText";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import NumberFormat from "react-number-format";
import checkPermission from "../../../../util/checkPermission";
import DialogContent from "@material-ui/core/DialogContent";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";
// import MyLoader from "../../../../util/ContentLoader";

import "./MerchantReqProfile.css";

const URL = config.url.URL;

// PENDING MERCHANT PROFILE
class MerchantReqProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAccept: false,
      isOpenReject: false,
      merchantID: "",
      merchantToken: "",
      rejectReason: "",
      discountRate: "",
      openDelete: false,
      pendingStatus: true,
    };
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  goBack = () => {
    this.props.history.push("/app/merchants/pending");
  };
  handleEdit = () => {
    this.props.history.push("/app/merchants/pending/profile/edit");
  };

  handleOpenAccept = () => {
    this.setState({ isOpenAccept: true });
  };

  handleCloseAccept = () => {
    this.setState({ isOpenAccept: false });
  };
  handleOpenReject = () => {
    this.setState({ isOpenReject: true });
  };

  handleCloseReject = () => {
    this.setState({ isOpenReject: false });
  };

  handleSetStatus = (event) => {
    this.setState({ pendingStatus: false });
    const ID = this.props.PendingProfile.merchantId;
    const status = event.target.value;
    const payload = { ID, status };
    this.props.setStatus(payload);

    setTimeout(() => {
      this.setState({ pendingStatus: true });
    }, 2000);
  };

  handleDeleteMerchant = () => {
    const ID = this.props.PendingProfile.merchantId;
    const path = "/app/merchants/pending";
    const payload = { ID, path };
    this.props.deleteMerchant(payload);
    this.setState({ openDelete: false });
  };

  render() {
    const e = this.props.PendingProfile;
    let principalLength = this.props.PendingProfile?.principals?.length;
    // Render Principal
    const renderPrincipal =
      e?.principals !== undefined ? (
        e?.principals.map((e, index) => {
          return (
            <React.Fragment key={index}>
              {Number(principalLength) >= 2 ? (
                <Grid item xs={12}>
                  <h3 style={{ color: "#4251af", fontWeight: "500" }}>
                    Principal {index + 1}
                  </h3>
                </Grid>
              ) : null}
              <Grid item xs={4}>
                <CustomTextLabel value="Name*" />
                <CustomText value={e.firstName + " " + e.lastName} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Title/Position*" />
                <CustomText value={e.title} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Ownership* (%)" />
                <CustomText value={`${e.ownerShip}%`} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Home Phone" />
                <CustomText value={e.homePhone} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Mobile Phone*" />
                <CustomText value={e.mobilePhone} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Address*" />
                <CustomText value={e.address} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Social Security Number* (SSN)" />

                <NumberFormat
                  value={e.ssn}
                  displayType={"text"}
                  thousandSeparator={true}
                  p
                  format="###-##-####"
                  mask="_"
                  renderText={(value) => <CustomText value={value} />}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Date of Birth* (mm/dd/yy)" />
                <CustomText value={moment(e.birthDate).format("MM/DD/YYYY")} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Email Address*" />
                <CustomText value={e.email} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Driver License Number*" />
                <CustomText value={e.driverNumber} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="State Issued*" />
                <CustomText value={e?.state?.name} />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={3} lg={3}>
                <CustomTextLabel value="Driver License Picture*" />

                {
                  <a
                    href={`${URL}/file/${e?.fileId}?fileName=DriverLicense-${this.props.PendingProfile?.general?.doBusinessName}`}
                    download
                  >
                    <CardMedia
                      component="img"
                      src={`${e?.imageUrl}`}
                      alt="driver license"
                    />
                  </a>
                }
              </Grid>
              <hr />
            </React.Fragment>
          );
        })
      ) : (
        <label>&nbsp;- NO PRINCIPALS INFORMATION</label>
      );

    // Render question
    const renderQuestion =
      e.business !== undefined ? (
        e.business.map((e, index) => {
          return (
            <Grid item xs={6} key={e.businessId}>
              <CustomTextLabel value={e.question} />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox checked={e.answer === false} />
                <CustomText value="No" />

                <Checkbox checked={e.answer === true} />
                {customLabel(index + 1)}
              </div>
              <CustomText value="Answer:" />
              <CustomText value={e.answerReply} />
            </Grid>
          );
        })
      ) : (
        <label>&nbsp;- NO BUSINESS INFORMATION</label>
      );
    const styles = (theme) => ({
      root: {
        margin: 0,
        padding: theme.spacing(2),
      },
      closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: "white",
      },
    });
    const DialogTitle = withStyles(styles)((props) => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h5">{children}</Typography>
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

    // Render profile
    return (
      <div className="container-fluid content-list ">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.requestDetail" />}
          disableBreadcrumb={true}
        />
        <div className="content-body page-heading">
          <div className="header col-12">
            <h3 style={{ marginBottom: "0px" }}>{"HP-" + e.merchantId}</h3>

            {/* // Delete */}
            {/* <Dialog open={this.state.openDelete}>
              <DialogTitle id="alert-dialog-title">
                {"Delete Merchant?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This Merchant will be remove from the app. You can not restore
                  this Merchant, Are you sure you want to do this?.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.setState({ openDelete: false })}
                  color="primary"
                >
                  Disagree
                </Button>
                <Button
                  onClick={this.handleDeleteMerchant}
                  color="primary"
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog> */}
            <span>
              <Button className="btn btn-red" onClick={this.goBack}>
                BACK
              </Button>

              {checkPermission("reject-merchant-in-pending") && (
                <>
                  <Button
                    className="btn btn-red"
                    color="primary"
                    onClick={this.handleOpenReject}
                  >
                    REJECT
                  </Button>
                  <Dialog
                    onClose={this.handleCloseReject}
                    open={this.state.isOpenReject}
                    fullWidth={true}
                    maxWidth="sm"
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={this.handleCloseReject}
                      className="modal-title"
                    >
                      Confirmation
                    </DialogTitle>
                    <DialogContent dividers>
                      <Formik
                        initialValues={{ rejectReason: "" }}
                        validate={(values) => {
                          let errors = {};
                          if (!values.rejectReason) {
                            errors.rejectReason = "Reject reason is required";
                          }
                          return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          const reason = values.rejectReason;
                          const ID = this.props.PendingProfile.merchantId;
                          const data = { reason, ID };
                          this.props.RejectMerchant(data);
                        }}
                      >
                        {({
                          values,
                          handleChange,
                          isSubmitting,
                          errors,
                          touched,
                        }) => (
                          <div className="reject-container">
                            <h2 className="title">REASONS FOR REJECTION</h2>
                            <Form>
                              <TextField
                                id="filled-multiline-flexible"
                                name="rejectReason"
                                multiline
                                fullWidth
                                rows={4}
                                value={values.rejectReason}
                                onChange={handleChange}
                                variant="outlined"
                                placeholder="Please enter your reason."
                                helperText={
                                  touched.rejectReason
                                    ? errors.rejectReason
                                    : ""
                                }
                                error={
                                  touched.rejectReason &&
                                  Boolean(errors.rejectReason)
                                }
                              />

                              <div style={{ paddingTop: "10px" }}>
                                <Button
                                  type="submit"
                                  className="btn btn-red"
                                  onClick={this.handleCloseReject}
                                >
                                  BACK
                                </Button>
                                <Button type="submit" className="btn btn-green">
                                  CONFIRM
                                </Button>
                              </div>
                            </Form>
                          </div>
                        )}
                      </Formik>
                    </DialogContent>
                  </Dialog>
                </>
              )}

              {checkPermission("edit-merchant-in-pending") && (
                <Button className="btn btn-red" onClick={this.handleEdit}>
                  EDIT
                </Button>
              )}

              {/* ACCEPT BTN */}

              {checkPermission("accept-merchant-in-pending") && (
                <>
                  <Button
                    className="btn btn-green"
                    color="primary"
                    onClick={this.handleOpenAccept}
                  >
                    ACCEPT
                  </Button>
                  <Dialog
                    onClose={this.handleCloseAccept}
                    open={this.state.isOpenAccept}
                    fullWidth={true}
                    maxWidth="sm"
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={this.handleCloseAccept}
                      className="modal-title"
                    >
                      Confirmation
                    </DialogTitle>
                    <DialogContent dividers>
                      <Formik
                        initialValues={{
                          merchantID: "",
                          fee: "",
                          discount: "",
                        }}
                        validationSchema={AcceptSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          const ID = this.props.PendingProfile.merchantId;
                          const merchantCode = values.merchantID;
                          const transactionsFee = values.fee;
                          const discountRate = values.discount;
                          const data = {
                            transactionsFee,
                            merchantCode,
                            ID,
                            discountRate,
                          };
                          this.props.ApproveMerchant(data);
                        }}
                      >
                        {({ values, handleChange, errors, touched }) => (
                          <div className="accept-container">
                            <h2 className="title">
                              Are you sure you want to accept this request?
                            </h2>

                            <Form
                              style={{ textAlign: "center" }}
                              className="InputBox"
                            >
                              <div style={styles.div}>
                                <label>Merchant ID</label>
                                <br />

                                <TextField
                                  onChange={handleChange}
                                  name="merchantID"
                                  type="number"
                                  helperText={
                                    touched.merchantID ? errors.merchantID : ""
                                  }
                                  error={
                                    touched.merchantID &&
                                    Boolean(errors.merchantID)
                                  }
                                />
                              </div>
                              <div style={styles.div}>
                                <label>Transaction Fee</label> <br />
                                <TextField
                                  onChange={handleChange}
                                  name="fee"
                                  helperText={touched.fee ? errors.fee : ""}
                                  error={touched.fee && Boolean(errors.fee)}
                                />
                              </div>
                              <div style={styles.div}>
                                <label>Discount Rate</label> <br />
                                <TextField
                                  onChange={handleChange}
                                  name="discount"
                                  helperText={
                                    touched.discount ? errors.discount : ""
                                  }
                                  error={
                                    touched.discount && Boolean(errors.discount)
                                  }
                                />
                              </div>
                              <br />
                              <div
                                style={{
                                  textAlign: "center",
                                  paddingTop: "10px",
                                }}
                              >
                                <Button
                                  className="btn btn-red"
                                  onClick={this.handleCloseAccept}
                                >
                                  NO
                                </Button>
                                <Button type="submit" className="btn btn-green">
                                  YES
                                </Button>
                              </div>
                            </Form>
                          </div>
                        )}
                      </Formik>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </span>
          </div>
          <hr />

          <Grid item xs={3} className="pending_status">
            {this.props.setPendingStatus ? (
              <div className="loading-progress">
                <CircularProgress
                  size={20}
                  style={{
                    color: "white",
                  }}
                />
              </div>
            ) : (
              <Select
                value={e.status}
                onChange={this.handleSetStatus}
                displayEmpty
                className="status_select"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={0}>Pending</MenuItem>
                <MenuItem value={1}>Handling</MenuItem>
              </Select>
            )}
          </Grid>
          {Number(e.handlingActivities.length) !== 0 && (
            <>
              <h4>
                By{" "}
                <span style={{ fontWeight: 500 }}>
                  {e.handlingActivities[0]?.waUserName}
                </span>
              </h4>
              <CustomText
                value={`Date/Time:
                    ${moment(e.handlingActivities[0]?.createDate).format(
                      "MM/DD/YYYY - hh:mm A"
                    )}`}
              />
            </>
          )}

          <hr />
          <div className="content react-transition swipe-right">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomTitle value="General Information" />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Legal Business Name*" />
                <CustomText value={e?.general?.legalBusinessName} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Doing Business As* (DBA)" />
                <CustomText value={e?.general?.doBusinessName} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Federal Tax ID*" />
                <CustomText value={e?.taxId} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Business Address* (no P.O. Boxes)" />
                <CustomText value={e?.general?.address} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="City*" />
                <CustomText value={e?.general?.city} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="State Issued*" />
                <CustomText value={e?.state?.name} />
              </Grid>
              <Grid item xs={2}>
                <CustomTextLabel value="Zip Code*" />
                <CustomText value={e.zip} />
              </Grid>
              {/* DBA ADDRESS */}
              <Grid item xs={4}>
                <CustomTextLabel value="DBA Address* " />
                <CustomText value={e?.general?.dbaAddress?.Address} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="City*" />
                <CustomText value={e?.general?.dbaAddress?.City} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="State Issued*" />
                <CustomText value={e?.general?.dbaAddress?.StateName} />
              </Grid>
              <Grid item xs={2}>
                <CustomTextLabel value="Zip Code*" />
                <CustomText value={e?.general?.dbaAddress?.Zip} />
              </Grid>

              <Grid item xs={4}>
                <CustomTextLabel value="Business Phone Number*" />
                <CustomText value={e.phone} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Contact Email Address*" />
                <CustomText value={e.email} />
              </Grid>
              <Grid item xs={4}></Grid>

              <Grid item xs={4}>
                <CustomTextLabel value="Contact Name*" />
                <CustomText
                  value={
                    e.general !== null
                      ? e.general.firstName + " " + e.general.lastName
                      : null
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Title/Position*" />
                <CustomText
                  value={e.general !== null ? e.general.title : null}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Contact Phone Number*" />
                <CustomText
                  value={e.general !== null ? e.general.phoneContact : null}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTitle value="Business Information" />
              </Grid>
              {renderQuestion}

              <Grid item xs={12}>
                <CustomTitle value="Bank Information" />
              </Grid>

              <Grid item xs={3}>
                <CustomTextLabel value="Account Holder Name*" />
                <CustomText value={e?.businessBank?.accountHolderName} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="Bank Name*" />
                <CustomText value={e?.businessBank?.name} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="Routing Number* (ABA)" />
                <CustomText value={e.businessBank?.routingNumber} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="Account Number* (DDA)" />
                <CustomText value={e.businessBank?.accountNumber} />
              </Grid>
              <Grid item xs={3} lg={3}>
                <CustomTextLabel value="Void Check*" />
                {e.businessBank !== null ? (
                  <a
                    href={`${URL}/file/${
                      e?.businessBank?.fileId
                    }?fileName=VoidCheck-${e?.general?.doBusinessName?.trim()}`}
                    download
                  >
                    <CardMedia
                      component="img"
                      image={`${e?.businessBank?.imageUrl}`}
                      alt="void check"
                    />
                  </a>
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <CustomTitle value="Principal Information" />
              </Grid>

              {renderPrincipal}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  PendingProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
  setPendingStatus: state.MerchantReducer.setPendingStatus,
  checkPermission: state.userReducer.checkPermission,
});
const mapDispatchToProps = (dispatch) => {
  return {
    ApproveMerchant: (payload) => {
      dispatch(MERCHANT_APPROVAL(payload));
    },
    RejectMerchant: (payload) => {
      dispatch(MERCHANT_REJECT(payload));
    },
    setStatus: (payload) => {
      dispatch(SET_PENDING_STATUS(payload));
    },
    deleteMerchant: (payload) => {
      dispatch(DELETE_MERCHANT(payload));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantReqProfile)
);

function customLabel(questionId) {
  switch (questionId) {
    case 1:
      return <CustomText value="Yes (if yes, who was the processor)" />;
    case 2:
      return <CustomText value="Yes (if yes, who was the processor)" />;
    case 3:
      return <CustomText value="Yes (if yes, date filed)" />;
    case 4:
      return <CustomText value="Yes (if yes, what was program and when)" />;
    case 5:
      return <CustomText value="Yes (if yes, who was your previous company)" />;
    default:
      return <CustomText value="Yes" />;
  }
}

const AcceptSchema = Yup.object().shape({
  merchantID: Yup.number().min(4, "Min 4 digit").required("Required"),
  fee: Yup.number()
    .typeError("Transaction fee must be a number")
    .required("Transaction fee is required"),
  discount: Yup.number()
    .typeError("Discount rate must be a number")
    .required("Discount rate is required"),
});
