import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  ARCHIVE_MERCHANT,
  RESTORE_MERCHANT,
} from "../../../../../actions/merchants/actions";
import TextField from "@material-ui/core/TextField";
import ReactFitText from "react-fittext";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
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
    const MerchantStatus =
      this.props.MerchantProfile.isDisabled !== 1 ? (
        <div>
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
                    <p className="close" onClick={this.handleOpenArchive}>
                      &times;
                    </p>
                    <div className="disable__title">
                      <p
                        style={{
                          fontSize: "22px",
                          textAlign: "center",
                          color: "white",
                          fontWeight: "400",
                        }}
                      >
                        Warning!
                      </p>
                    </div>
                    <Form style={styles.Form}>
                      <ReactFitText compressor={2.5}>
                        <h4 style={{ color: "black" }}>
                          Are you sure you want to Archive this Merchant?
                        </h4>
                      </ReactFitText>
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
                          touched.archiveReason && Boolean(errors.archiveReason)
                        }
                      />
                      <div style={styles.btnDiv} className="general-content">
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
                  </div>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </div>
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
            <DialogContent style={{ maxWidth: "600px" }}>
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
                    <p className="close" onClick={this.handleOpenActive}>
                      &times;
                    </p>
                    <div className="disable__title">
                      <p
                        style={{
                          fontSize: "22px",
                          textAlign: "center",
                          color: "white",
                          fontWeight: "400",
                        }}
                      >
                        Confirmation
                      </p>
                    </div>
                    <Form style={styles.Form}>
                      <ReactFitText compressor={2.5}>
                        <h2 style={{ color: "black", padding: "0px 25px" }}>
                          Are you sure you want to enable this Merchant?
                        </h2>
                      </ReactFitText>
                      <div style={{ textAlign: "left", color: "black" }}>
                        <ReactFitText compressor={3}>
                          <h4 style={{ fontSize: "20px", padding: "10px 0px" }}>
                            Why disabled:
                          </h4>
                        </ReactFitText>
                        <ReactFitText compressor={3}>
                          <p style={{ fontSize: "16px", color: "#707070" }}>
                            {data?.disabledReason}
                          </p>
                        </ReactFitText>
                      </div>

                      {/* <TextField
                        style={{ margin: "20px 0px" }}
                        name="archiveReason"
                        variant="outlined"
                        label="Why disabled"
                        fullWidth
                        multiline
                        value={data?.disabledReason}
                        onChange={handleChange}
                        disabled
                      /> */}

                      <div style={styles.btnDiv} className="general-content">
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
                  </div>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </>
      );

    return (
      <React.Fragment>
        <div className="container-fluid">
          <h2 style={{ marginBottom: "10px" }}>Settings</h2>
          <h3 style={styles.h3}>
            The charged percent fee of credit card transactions
          </h3>

          <div>
            <div className="row">
              <div className="col-4" style={styles.div}>
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
              </div>
              <div className="col-4" style={styles.div}>
                <TextField
                  label=" Merchant ID"
                  disabled
                  value={data.merchantCode}
                />
              </div>

              <div className="col-4" style={styles.div}>
                <TextField
                  label="Discount Rate"
                  disabled
                  value={data.discountRate}
                />
              </div>
              <div className="col-4" style={styles.div}>
                <TextField label="Point Rate" disabled value={data.pointRate} />
              </div>
              <div className="col-4" style={styles.div}>
                <TextField
                  label="Turn Amount"
                  disabled
                  value={data.turnAmount}
                />
              </div>
            </div>
            <br />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="SettingsContent general-content ">
            {CheckPermissions(29) && (
              <Button className="btn btn-green" onClick={this._gotoEdit}>
                EDIT
              </Button>
            )}
          </div>

          {CheckPermissions(30) && MerchantStatus}
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

const styles = {
  div: {
    marginBottom: "10px",
  },
  p: { fontWeight: 400, color: "black" },
  Form: {
    padding: "25px",
    textAlign: "center",
  },
  btnDiv: {
    marginTop: "15px",
  },
  label: {
    fontSize: "13px",
  },
  h3: {
    padding: "15px 0px",
  },
};
