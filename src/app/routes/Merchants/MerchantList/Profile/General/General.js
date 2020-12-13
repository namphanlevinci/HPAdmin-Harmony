import React, { Component } from "react";
import { connect } from "react-redux";

import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../util/CustomText";
import {
  Button,
  Grid,
  FormControl,
  Input,
  InputAdornment,
  Checkbox,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CheckPermissions from "../../../../../../util/checkPermission";

import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";
import "../Detail.css";
class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      businessName: "",
      email: "",
      cellphone: "",
      address: "",
      city: "",
      stateId: "",
      showP: false,
    };
  }
  goToEdit = () => {
    this.props.history.push("/app/merchants/profile/general/edit");
  };

  render() {
    const e = this.props.MerchantProfile;

    const {
      legalBusinessName,
      doBusinessName,
      tax,
      address,
      city,
      dbaAddress,
      phoneBusiness,
      emailContact,
      sendReviewLinkOption,
      reviewLink,
      zip,
      lastName,
      firstName,
      phoneContact,
      title,
      longitude,
      latitude,
    } = this.props.MerchantProfile.general;

    const renderGeneral = (
      <Grid container spacing={3} className="container-fluid">
        <Grid item xs={12}>
          <CustomTitle value="General Information" />
        </Grid>

        <Grid item xs={6} md={4}>
          <CustomTextLabel value="Legal Business Name*" />
          <CustomText value={legalBusinessName} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="Doing Business As* (DBA)" />
          <CustomText value={doBusinessName} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextLabel value="Federal Tax ID*" />
          <CustomText value={tax} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextLabel value="Business Address* (no P.O. Boxes)" />
          <CustomText value={address} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="City*" />
          <CustomText value={city} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="State*" />
          <CustomText value={e?.state?.name} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="Zip Code*" />
          <CustomText value={zip} />
        </Grid>
        {/* DBA Address */}
        <Grid item xs={12}>
          <CustomTextLabel value="DBA Address* " />
          <CustomText value={dbaAddress?.Address} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="City*" />
          <CustomText value={dbaAddress?.City} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="State*" />
          <CustomText value={dbaAddress?.StateName} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="Zip Code*" />
          <CustomText value={dbaAddress?.Zip} />
        </Grid>

        <Grid item xs={6} md={4}>
          <CustomTextLabel value="Business Phone Number*" />
          <CustomText value={phoneBusiness} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="Contact Email Address*" />
          <CustomText value={emailContact} />
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomTextLabel value="Password" />
          <FormControl>
            <Input
              type={this.state.showP ? "text" : "password"}
              value={e?.password}
              disabled
              endAdornment={
                <InputAdornment position="end">
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => this.setState({ showP: !this.state.showP })}
                  >
                    {this.state.showP ? <Visibility /> : <VisibilityOff />}
                  </p>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <CustomTextLabel value="Contact Name*" />
          <CustomText value={firstName + " " + lastName} />
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomTextLabel value="Title/Position*" />
          <CustomText value={title} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextLabel value="Contact Phone Number*" />
          <CustomText value={phoneContact} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextLabel value="Review Link" />
          <CustomText value={reviewLink} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextLabel value="Send Review Link Option" />
          <CustomText value={reNameSendLinkName(sendReviewLinkOption)} />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <CustomTextLabel value="Longitude" />
              <CustomText value={longitude} />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextLabel value="Latitude" />
              <CustomText value={latitude} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

    const renderQuestion =
      e.business !== undefined ? (
        e.business.map((e, index) => {
          return (
            <Grid item xs={12} md={6} key={e.businessId}>
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
      <Grid
        container
        spacing={3}
        className="content general-content react-transition swipe-up"
      >
        {renderGeneral}

        <Grid item xs={12}>
          <CustomTitle value="Business Information" />
        </Grid>
        {renderQuestion}

        <Grid item xs={12} className="general-content">
          {CheckPermissions("edit-merchant") && (
            <Button className="btn btn-green" onClick={this.goToEdit}>
              EDIT
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
});
export default connect(mapStateToProps)(General);

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

function reNameSendLinkName(name) {
  switch (name) {
    case "auto":
      return "Automatic";
    case "off":
      return "Off";
    case "manual":
      return "Manual";
    default:
      return name;
  }
}
