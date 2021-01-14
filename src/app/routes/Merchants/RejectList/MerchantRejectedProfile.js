import React, { Component } from "react";
import { connect } from "react-redux";
import {
  revertMerchantById,
  deleteMerchantById,
} from "../../../../actions/merchantActions";
import { Checkbox } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { config } from "../../../../url/url";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  CardMedia,
} from "@material-ui/core";
import {
  CustomTitle,
  CustomTextLabel,
  CustomText,
} from "../../../../util/CustomText";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import CheckPermissions from "../../../../util/checkPermission";
import NumberFormat from "react-number-format";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import getStateNameById from "../../../../util/FormatState";

import "../PendingList/MerchantReqProfile.css";

const URL = config.url.URL;
class MerchantRejectedProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupAccept: false,
      showPopupReject: false,
      merchantID: "",
      merchantToken: "",
      rejectReason: "",
      openDelete: false,
    };
  }

  revertMerchant = () => {
    const ID = this.props.Profile.merchantId;
    const path = "/app/merchants/pending";
    this.props.revertMerchantById(ID, path);
  };
  goToEditPage = () => {
    this.props.history.push("/app/merchants/rejected/profile/edit");
  };
  goBack = () => {
    this.props.history.push("/app/merchants/rejected");
  };

  handleDeleteMerchant = () => {
    const ID = this.props.Profile.merchantId;
    const path = "/app/merchants/rejected";
    this.props.deleteMerchantById(ID, path);
    this.setState({ openDelete: false });
  };

  render() {
    const e = this.props.Profile;
    let principalLength = this.props.Profile?.principals?.length;
    // render Principal
    const renderPrincipal =
      e.principals !== undefined ? (
        e.principals.map((e, index) => {
          return (
            <React.Fragment key={index}>
              {Number(principalLength) >= 2 ? (
                <Grid item xs={12}>
                  <h3 style={{ color: "#0764B0", fontWeight: "500" }}>
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
                <CustomText
                  value={`${e.address}, ${e.city}, ${e.state.name}, ${e.zip}`}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Social Security Number* (SSN)" />

                <NumberFormat
                  value={e.ssn}
                  displayType={"text"}
                  thousandSeparator={true}
                  p
                  format="***-**-####"
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
                <CustomText value={getStateNameById(e?.stateIssued)} />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={3}>
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
    // render questions
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

    return (
      <div className="content-list react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.requestDetail" />}
          disableBreadcrumb={true}
        />
        <Grid container spacing={0} className="content-body page-heading">
          <Grid item xs={12} className="header">
            <h2 style={{ fontWeight: 500 }}>ID: {e.merchantId}</h2>
            <span>
              {CheckPermissions("delete-merchant-in-rejected-request") && (
                <Button
                  style={{ color: "#0764B0", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={() => this.setState({ openDelete: true })}
                >
                  DELETE
                </Button>
              )}
              {CheckPermissions("edit-merchant-in-rejected-request") && (
                <Button
                  style={{ color: "#0764B0", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={() => this.goToEditPage(e)}
                >
                  EDIT
                </Button>
              )}
              {CheckPermissions("revert-merchant-in-rejected-request") && (
                <Button
                  style={{ color: "#0764B0", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this.revertMerchant}
                >
                  REVERT
                </Button>
              )}
              <Button
                style={{ color: "#0764B0", backgroundColor: "white" }}
                className="btn btn-green"
                onClick={this.goBack}
              >
                BACK
              </Button>
            </span>
          </Grid>
          <hr />

          <Dialog open={this.state.openDelete}>
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
          </Dialog>

          <Grid item xs={12} className="request-status">
            <div className="title" style={{ color: "white" }}>
              REJECTED
            </div>
            <h4>
              By{" "}
              <span style={{ fontWeight: 600 }}>
                {e?.adminUser?.first_name + " " + e?.adminUser?.last_name}
              </span>
            </h4>

            <CustomText
              value={`  Date/Time:
              ${moment
                .utc(e?.adminUser?.created_date)
                .local()
                .format("MM/DD/YYYY - hh:mm A")}`}
            />
            <CustomText value="Reason:" />
            <CustomTextLabel value={e?.reason} />
          </Grid>
          <hr />
          <div className="content">
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
              <Grid item xs={12}>
                <CustomTextLabel value="Business Address* (no P.O. Boxes)" />
                <CustomText value={e?.general?.address} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="City*" />
                <CustomText value={e?.general?.city} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="State*" />
                <CustomText value={e?.state?.name} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Zip Code*" />
                <CustomText value={e.zip} />
              </Grid>
              {/* DBA ADDRESS */}
              <Grid item xs={12}>
                <CustomTextLabel value="DBA Address* " />
                <CustomText value={e?.general?.dbaAddress?.Address} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="City*" />
                <CustomText value={e?.general?.dbaAddress?.City} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="State*" />
                <CustomText value={e?.general?.dbaAddress?.StateName} />
              </Grid>
              <Grid item xs={4}>
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
                  value={e?.general?.firstName + " " + e?.general?.lastName}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Title/Position*" />
                <CustomText value={e?.general?.title} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Contact Phone Number*" />
                <CustomText value={e?.general?.phoneContact} />
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
                <CustomText value={e?.businessBank?.routingNumber} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="Account Number* (DDA)" />
                <CustomText value={e?.businessBank?.accountNumber} />
              </Grid>
              <Grid item xs={3}>
                <CustomTextLabel value="Void Check*" />
                {e.businessBank !== null ? (
                  <a
                    href={`${URL}/file/${
                      e?.businessBank?.fileId
                    }?fileName=VoidCheck-${(e?.general?.doBusinessName).trim()}`}
                    download
                  >
                    <CardMedia
                      component="img"
                      src={`${e.businessBank.imageUrl}`}
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
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Profile: state.merchant.merchant,
});
const mapDispatchToProps = (dispatch) => ({
  revertMerchantById: (ID, path) => {
    dispatch(revertMerchantById(ID, path));
  },
  deleteMerchantById: (ID, path) => {
    dispatch(deleteMerchantById(ID, path));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantRejectedProfile)
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
