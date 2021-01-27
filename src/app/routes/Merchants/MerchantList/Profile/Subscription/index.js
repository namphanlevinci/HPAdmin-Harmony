import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../util/CustomText";
import { getMerchantSubscriptionByID } from "../../../../../../actions/merchantActions";

import moment from "moment";

import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleBank = () => {
    this.props.history.push("/app/merchants/profile/bank/edit");
  };

  handleEditSub = () => {
    this.props.history.push("/app/merchants/profile/subscriptions/edit");
  };
  componentDidMount = () => {
    const id = this.props.MerchantProfile?.merchantId;
    this.props.getSubscriptionByID(id);
  };

  render() {
    const sub = this.props.subscription;

    return (
      <div className="react-transition swipe-up">
        <Grid container spacing={3} className="container-fluid">
          <Grid item xs={12}>
            <CustomTitle value="Subscription" />
          </Grid>

          <Grid item xs={4}>
            <CustomTextLabel value="Current Subscription Plan" />
          </Grid>
          <Grid item xs={8}>
            <CustomText value={sub?.planName} />
          </Grid>

          <Grid item xs={4}>
            <CustomTextLabel value="Pricing Model" />
          </Grid>
          <Grid item xs={8}>
            <CustomText value={`Paid ${sub?.pricingType}`} />
          </Grid>

          <Grid item xs={4}>
            <CustomTextLabel value="Next Payment Date" />
          </Grid>
          <Grid item xs={8}>
            <CustomText
              value={moment(sub?.expiredDate).format("MMM D, yyyy")}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Amount" />
          </Grid>
          <Grid item xs={8}>
            <CustomText value={`$ ${sub?.totalPrice}`} />
          </Grid>

          <Grid
            item
            xs={12}
            className="general-content"
            style={{ paddingTop: "15px" }}
          >
            <Button className="btn btn-green" onClick={this.handleEditSub}>
              EDIT
            </Button>
          </Grid>

          <Grid item xs={12}>
            <CustomTitle value="Payment Method" />
          </Grid>
          <Grid item xs={12}>
            <CustomText value={sub?.paymentMethod} />
          </Grid>
          <Grid
            item
            xs={12}
            className="general-content"
            style={{ paddingTop: "15px" }}
          >
            <Button className="btn btn-green" onClick={this.handleBank}>
              EDIT
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  subscription: state.subscription.data,
});

const mapDispatchToProps = (dispatch) => ({
  getSubscriptionByID: (id) => {
    dispatch(getMerchantSubscriptionByID(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
