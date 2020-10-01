import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox } from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../util/CustomText";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { Button, Grid } from "@material-ui/core";
import CheckPermissions from "../../../../../../util/checkPermission";

import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
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
  _toggleEdit = () => {
    this.props.history.push("/app/merchants/profile/general/edit");
  };

  render() {
    const e = this.props.MerchantProfile;
    const renderGeneral = (
      <Grid container spacing={3} className="container-fluid">
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
        {/* DBA Address */}
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

        <Grid item xs={4}>
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
      </Grid>
    );

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

        <Grid item xs={12} className="SettingsContent general-content">
          {CheckPermissions("edit-merchant") && (
            <Button className="btn btn-green" onClick={this._toggleEdit}>
              EDIT
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(General);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
};

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
