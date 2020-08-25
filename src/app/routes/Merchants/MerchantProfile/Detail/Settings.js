import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  GetMerchant_byID,
  ViewProfile_Merchants,
  ARCHIVE_MERCHANT,
  RESTORE_MERCHANT,
} from "../../../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { config } from "../../../../../url/url";
import Popup from "reactjs-popup";
import CheckPermissions from "../../../../../util/checkPermission";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "./Detail.css";
const URL = config.url.URL;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsFee: "",
      merchantCode: "",
      merchantToken: "",
      totalAmountLimit: "",
      ID: "",
      Token: "",
      discountRate: "",
      pointRate: "",
      isOpenReject: false,
      isOpenAccept: false,
    };
  }
  _gotoEdit = () => {
    this.props.history.push("/app/merchants/profile/settings/edit");
  };
  async componentDidMount() {
    const data = this.props.MerchantProfile;
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
    this.setState({
      merchantCode: data.merchantCode,
      merchantToken: data.merchantToken,
      transactionsFee: data.transactionsFee,
      totalAmountLimit: data.totalAmountLimit,
      discountRate: data.discountRate,
      pointRate: data?.pointRate,
      ID: data.merchantId,
      Token: Token,
    });
  }

  handleOpenArchive = () => {
    this.setState({ open: !this.state.open });
  };

  _toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };

  _enable = () => {
    this.setState({ open: false });
    const { ID } = this.state;
    this.props.RESTORE_MERCHANT(ID);
  };
  render() {
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
                initialValues={{ rejectReason: "" }}
                validate={(values) => {
                  let errors = {};
                  if (!values.rejectReason) {
                    errors.rejectReason = "Required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.props.ARCHIVE_MERCHANT({
                    ID: this.state.ID,
                    reason: values.rejectReason,
                  });
                }}
              >
                {({ values, isSubmitting }) => (
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
                      <h2 style={{ color: "black" }}>
                        Are you sure you want to Archive this Merchant?
                      </h2>
                      <Field
                        type="textarea"
                        name="rejectReason"
                        component="textarea"
                        placeholder="Please enter your reason."
                      />
                      <ErrorMessage
                        name="rejectReason"
                        component="div"
                        style={{
                          color: "red",
                          fontWeight: "400",
                          fontSize: "17px",
                        }}
                      />

                      <div style={styles.btnDiv} className="general-content">
                        <Button type="submit" className="btn btn-green">
                          CONFIRM
                        </Button>

                        <Button
                          onClick={this.handleOpenArchive}
                          type="submit"
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
        <Button className="btn btn-green" onClick={this._enable}>
          ACTIVE
        </Button>
      );

    return (
      <React.Fragment>
        <div className="container-fluid">
          <h2 style={{ marginBottom: "10px" }}>Settings</h2>
          <div className="">
            <div className="SettingsContent">
              <div>
                <h3>The charged percent fee of credit card transactions</h3>
                <div style={styles.div}>
                  <label>
                    Transactions Fee:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.transactionsFee}
                    </span>
                  </label>
                </div>
                <div style={styles.div}>
                  <label>
                    Merchant ID:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.merchantCode}
                    </span>
                  </label>
                </div>
                <div style={styles.div}>
                  <label>
                    Merchant Token:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.merchantToken}
                    </span>
                  </label>
                </div>
                <div style={styles.div}>
                  <label>
                    Discount Rate:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.discountRate}
                    </span>
                  </label>
                </div>
                <div style={styles.div}>
                  <label>
                    Point Rate:
                    <span style={{ color: "black", paddingLeft: "10px" }}>
                      {this.state.pointRate}
                    </span>
                  </label>
                </div>
              </div>
              <br />
            </div>
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
    marginBottom: "8px",
  },
  p: { fontWeight: 400, color: "black" },
  Form: {
    padding: "25px",
    textAlign: "center",
  },
  btnDiv: {
    marginTop: "10px",
  },
  label: {
    fontSize: "13px",
  },
};
