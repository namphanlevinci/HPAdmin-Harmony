import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../util/CustomText";

import CheckPermissions from "../../../../../../util/checkPermission";

import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleBank = () => {
    this.props.history.push("/app/merchants/profile/bank/edit");
  };

  render() {
    const e = this.props.MerchantProfile;

    return (
      <div className="react-transition swipe-up">
        <Grid container spacing={3} className="container-fluid">
          <Grid item xs={12}>
            <CustomTitle value="Bank Information" />
          </Grid>

          <Grid item xs={6} md={3}>
            <CustomTextLabel value="Account Holder Name*" />
            <CustomText value={e?.businessBank?.accountHolderName} />
          </Grid>
          <Grid item xs={6} md={3}>
            <CustomTextLabel value="Bank Name*" />
            <CustomText value={e?.businessBank?.name} />
          </Grid>
          <Grid item xs={6} md={3}>
            <CustomTextLabel value="Routing Number* (ABA)" />
            <CustomText value={e?.businessBank?.routingNumber} />
          </Grid>
          <Grid item xs={6} md={3}>
            <CustomTextLabel value="Account Number* (DDA)" />
            <CustomText value={e?.businessBank?.accountNumber} />
          </Grid>
          <Grid item xs={4} md={3}>
            <CustomTextLabel value="Void Check*" />
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
          </Grid>

          <Grid
            item
            xs={12}
            className="general-content"
            style={{ paddingTop: "15px" }}
          >
            {CheckPermissions("edit-merchant") && (
              <Button className="btn btn-green" onClick={this.handleBank}>
                EDIT
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
});

export default connect(mapStateToProps)(Bank);
