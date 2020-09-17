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
import IconButton from "@material-ui/core/IconButton";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import CloseIcon from "@material-ui/icons/Close";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import Button from "@material-ui/core/Button";
import NumberFormat from "react-number-format";
import Dialog from "@material-ui/core/Dialog";
import checkPermission from "../../../../util/checkPermission";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContent from "@material-ui/core/DialogContent";
import * as Yup from "yup";

import Typography from "@material-ui/core/Typography";
import "./MerchantReqProfile.css";
import "./MerchantsRequest.css";
import "bootstrap/js/src/collapse.js";

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
    const ID = this.props.PendingProfile.merchantId;
    const status = event.target.value;
    const payload = { ID, status };
    this.props.setStatus(payload);
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
    // render Principal
    const renderPrincipal =
      e.principals !== undefined ? (
        e.principals.map((e, index) => {
          return (
            <div className="row" key={e.principalId}>
              {Number(principalLength) >= 2 ? (
                <div className="col-12">
                  <h3 style={{ color: "#4251af", fontWeight: "500" }}>
                    Principal {index + 1}
                  </h3>
                </div>
              ) : null}
              <div className="col-4">
                <label>Name*</label>
                <p>{e.firstName + " " + e.lastName}</p>
              </div>
              <div className="col-4">
                <label>Title/Position*</label>
                <p>{e.title}</p>
              </div>
              <div className="col-4">
                <label>Ownership* (%)</label>
                <p>{e.ownerShip}%</p>
              </div>
              <div className="col-4">
                <label>Home Phone</label>
                {/* <p>{formatPhone(e.homePhone)}</p> */}
                <p>{e.homePhone}</p>
              </div>
              <div className="col-4">
                <label>Mobile Phone*</label>
                {/* <p>{formatPhone(e.mobilePhone)}</p> */}
                <p>{e.mobilePhone}</p>
              </div>
              <div className="col-4">
                <label>Address*</label>
                <p>{e.address}</p>
              </div>
              <div className="col-4">
                <label>Social Security Number* (SSN)</label>
                <NumberFormat
                  value={e.ssn}
                  displayType={"text"}
                  thousandSeparator={true}
                  p
                  format="###-##-####"
                  mask="_"
                  renderText={(value) => <p>{value}</p>}
                />
              </div>
              <div className="col-4">
                <label>Date of Birth* (mm/dd/yy)</label>
                <p>{moment(e.birthDate).format("MM/DD/YYYY")}</p>
              </div>
              <div className="col-4">
                <label>Email Address*</label>
                <p>{e.email}</p>
              </div>
              <div className="col-4">
                <label>Driver License Number*</label>
                <p>{e.driverNumber}</p>
              </div>
              <div className="col-4">
                <label>State Issued*</label>
                <p>{e?.state?.name}</p>
              </div>
              <div className="col-6">
                <label>Driver License Picture*</label> <br />
                {
                  <a
                    href={`${URL}/file/${e?.fileId}?fileName=DriverLicense-${this.props.PendingProfile?.general?.doBusinessName}`}
                    download
                  >
                    <img
                      className="pending-image"
                      src={`${e?.imageUrl}`}
                      alt="driver license"
                    />
                  </a>
                }
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <label>&nbsp;- NO PRINCIPALS INFORMATION</label>
      );
    // render question
    const renderQuestion =
      e.business !== undefined ? (
        e.business.map((e, index) => {
          return (
            <div className="col-6" key={e.businessId}>
              <label>{e.question}</label> <br />
              <Checkbox checked={e.answer === false} />
              No
              <span className={e.answer ? "checked-red" : ""}>
                <Checkbox checked={e.answer === true} />
                {customLabel(index + 1)}
              </span>
              <h5>Answer: {e.answerReply} </h5>
            </div>
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

    //render profile
    return (
      <div className="container-fluid content-list ">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.requestDetail" />}
          disableBreadcrumb={true}
        />
        <div className="content-body page-heading">
          <div className="header col-md-12">
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

              {checkPermission(5) && (
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

              {checkPermission(4) && (
                <Button className="btn btn-red" onClick={this.handleEdit}>
                  EDIT
                </Button>
              )}

              {/* ACCEPT BTN */}

              {checkPermission(6) && (
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
                                  type="number"
                                  helperText={touched.fee ? errors.fee : ""}
                                  error={touched.fee && Boolean(errors.fee)}
                                />
                              </div>
                              <div style={styles.div}>
                                <label>Discount Rate</label> <br />
                                <TextField
                                  onChange={handleChange}
                                  name="discount"
                                  type="number"
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

          <div className="pending_status ">
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

            {Number(e.handlingActivities.length) !== 0 && (
              <>
                <h4>
                  By{" "}
                  <span style={{ fontWeight: 500 }}>
                    {e.handlingActivities[0]?.waUserName}
                  </span>
                </h4>
                <h4>
                  Date/Time:{" "}
                  {moment(e.handlingActivities[0]?.createDate).format(
                    "MM/DD/YYYY - hh:mm A"
                  )}
                </h4>
              </>
            )}
          </div>

          <hr />
          <div className="content react-transition swipe-right">
            <div className="container-fluid">
              <h2 style={styles.h2}>General Information</h2>
              <div className="row">
                <div className="col-4">
                  <label>Legal Business Name*</label>
                  <p>{e?.general?.legalBusinessName}</p>
                </div>
                <div className="col-4">
                  <label>Doing Business As* (DBA)</label>
                  <p>{e?.general?.doBusinessName}</p>
                </div>
                <div className="col-4">
                  <label>Federal Tax ID*</label>
                  <p>{e?.taxId}</p>
                </div>
                <div className="col-4">
                  <label>Business Address* (no P.O. Boxes)</label>
                  <p>{e?.general?.address}</p>
                </div>
                <div className="col-3">
                  <label>City*</label>
                  <p>{e?.general?.city}</p>
                </div>
                <div className="col-3">
                  <label>State Issued*</label>
                  <p>{e?.state?.name}</p>
                </div>
                <div className="col-2">
                  <label>Zip Code*</label>
                  <p>{e.zip}</p>
                </div>
                {/* DBA ADDRESS */}
                <div className="col-4">
                  <label>DBA Address* </label>
                  <p>{e?.general?.dbaAddress?.Address}</p>
                </div>
                <div className="col-3">
                  <label>City*</label>
                  <p>{e?.general?.dbaAddress?.City}</p>
                </div>
                <div className="col-3">
                  <label>State Issued*</label>
                  <p>{e?.general?.dbaAddress?.StateName}</p>
                </div>
                <div className="col-2">
                  <label>Zip Code*</label>
                  <p>{e?.general?.dbaAddress?.Zip}</p>
                </div>

                <div className="col-4">
                  <label>Business Phone Number*</label>
                  <p>{e.phone}</p>
                </div>
                <div className="col-4">
                  <label>Contact Email Address*</label>
                  <p>{e.email}</p>
                </div>
              </div>
              {/* <h2 style={styles.h2}>Representative Information</h2> */}
              <div className="row">
                <div className="col-4">
                  <label>Contact Name*</label>
                  <p>
                    {e.general !== null
                      ? e.general.firstName + " " + e.general.lastName
                      : null}
                  </p>
                </div>
                <div className="col-4">
                  <label>Title/Position*</label>
                  <p>{e.general !== null ? e.general.title : null}</p>
                </div>
                <div className="col-4">
                  <label>Contact Phone Number*</label>
                  <p>{e.general !== null ? e.general.phoneContact : null}</p>
                </div>
              </div>
              <h2 style={styles.h2}>Business Information</h2>
              <div className="row">{renderQuestion}</div>
              <h2 style={styles.h2}>Bank Information</h2>
              <div className="row">
                <div className="col-3">
                  <label>Account Holder Name*</label>
                  <p>{e?.businessBank?.accountHolderName}</p>
                </div>
                <div className="col-3">
                  <label>Bank Name*</label>
                  <p>{e?.businessBank?.name}</p>
                </div>
                <div className="col-3">
                  <label> Routing Number* (ABA)</label>
                  <p>
                    {e.businessBank !== null
                      ? e.businessBank.routingNumber
                      : null}
                  </p>
                </div>
                <div className="col-3">
                  <label>Account Number* (DDA)</label>
                  <p>
                    {e.businessBank !== null
                      ? e.businessBank.accountNumber
                      : null}
                  </p>
                </div>
                <div className="col-4">
                  <label>Void Check*</label>
                  <br />

                  {e.businessBank !== null ? (
                    <a
                      href={`${URL}/file/${
                        e?.businessBank?.fileId
                      }?fileName=VoidCheck-${(e?.general?.doBusinessName).trim()}`}
                      download
                    >
                      <img
                        className="pending-image"
                        src={`${e.businessBank.imageUrl}`}
                        alt="void check"
                      />
                    </a>
                  ) : null}
                </div>
              </div>
              <h2 style={styles.h2}>Principal Information</h2>
              {renderPrincipal}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  PendingProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,

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
      return "Yes (if yes, who was the processor)";
    case 2:
      return "Yes (if yes, who was the processor)";
    case 3:
      return "Yes (if yes, date filed)";
    case 4:
      return "Yes (if yes, what was program and when)";
    case 5:
      return "Yes (if yes, who was your previous company)";
    default:
      return "Yes";
  }
}

const AcceptSchema = Yup.object().shape({
  merchantID: Yup.number().min(4, "Min 4 digit").required("Required"),
  fee: Yup.number().required("Transaction fee is required"),
  discount: Yup.number().required("Discount rate is required"),
});
