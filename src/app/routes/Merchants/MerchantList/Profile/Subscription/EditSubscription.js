import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Grid,
  Radio,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../util/CustomText";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  getPackageAction,
  updateMerchantSubscriptionById,
} from "../../../../../../actions/merchantActions";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import InputCustom from "../../../../../../util/CustomInput";

import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";

class EditSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      additionStaff: 0,
      expiredDate: "2021-01-27T09:46:12.798Z",
      firstLoad: true,
    };
  }

  componentDidMount = () => {
    this.props.getPackage();
    const sub = this.props.subscription;
    const packageList = this.props.package;

    this.setState({
      subscriptionId: sub?.subscriptionId,
      packageId: sub?.packageId,
      pricingType: sub?.pricingType,
      additionStaffPrice: packageList?.[0]?.additionStaffPrice,
      subName: sub?.planName,
      amount: sub?.price,
      totalPrice: sub?.totalPrice,
      expiredDate: sub?.expiredDate,
      additionStaff: sub?.additionStaff,
    });
  };

  handleSubPlan = (e, amount, subName) => {
    const { name, value } = e.target;
    if (+value !== 3) {
      this.setState({ additionStaff: 0 });
    }
    this.setState({ [name]: value, amount, subName, firstLoad: false });
  };

  handlePricing = (e) => {
    const packageList = this.props.package;
    const { name, value } = e.target;
    const { packageId } = this.state;

    if (+packageId === 3) {
      this.setState({ amount: packageList?.[0]?.pricing });
    }
    if (+packageId === 2) {
      this.setState({ amount: packageList?.[1]?.pricing });
    }
    if (+packageId === 1) {
      this.setState({ amount: packageList?.[2]?.pricing });
    }

    this.setState({
      [name]: value,
      firstLoad: false,
    });
  };

  handleAdditionStaff = (e) => {
    const { value } = e.target;
    this.setState({ additionStaff: value, firstLoad: false });
  };

  handleUpdate = () => {
    this.props.updateSubscription(this.state);
  };

  render() {
    const packageList = this.props.package;

    const {
      packageId,
      pricingType,
      additionStaff,
      amount,
      additionStaffPrice,
      subName,
      expiredDate,
      firstLoad,
      totalPrice,
    } = this.state;

    const defaultAmount = pricingType === "annually" ? +amount * 10 : +amount;
    const staffPrice =
      +additionStaff !== 0
        ? pricingType === "annually"
          ? +additionStaff * +additionStaffPrice * 10
          : +additionStaff * +additionStaffPrice
        : 0;

    const totalAmount = defaultAmount + staffPrice;

    return (
      <div className="react-transition swipe-up">
        <Grid container spacing={3} className="container-fluid">
          <Grid item xs={12}>
            <CustomTitle value="Edit Subscription" />
          </Grid>

          <Grid item xs={3}>
            <CustomTextLabel value="Subscription Plan" />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              checked={Number(packageId) === 1}
              onChange={(e) =>
                this.handleSubPlan(
                  e,
                  packageList?.[2]?.pricing,
                  packageList?.[2]?.packageName
                )
              }
              value={1}
              name="packageId"
              inputProps={{ "aria-label": "B" }}
              control={<Radio style={{ color: "#0764B0" }} />}
              label={packageList?.[2]?.packageName}
              labelPlacement="right"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              checked={Number(packageId) === 2}
              onChange={(e) =>
                this.handleSubPlan(
                  e,
                  packageList?.[1]?.pricing,
                  packageList?.[1]?.packageName
                )
              }
              value={2}
              name="packageId"
              inputProps={{ "aria-label": "B" }}
              control={<Radio style={{ color: "#0764B0" }} />}
              label={packageList?.[1]?.packageName}
              labelPlacement="right"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              checked={Number(packageId) === 3}
              onChange={(e) =>
                this.handleSubPlan(
                  e,
                  packageList?.[0]?.pricing,
                  packageList?.[0]?.packageName
                )
              }
              value={3}
              name="packageId"
              inputProps={{ "aria-label": "B" }}
              control={<Radio style={{ color: "#0764B0" }} />}
              label={packageList?.[0]?.packageName}
              labelPlacement="right"
            />
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "0px" }}>
            <Grid
              container
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item xs={3} style={{ paddingLeft: "2rem" }}>
                {Number(packageId) === 3 && (
                  <TextField
                    label="Addition Staff"
                    InputLabelProps={{ shrink: true }}
                    value={additionStaff}
                    onChange={this.handleAdditionStaff}
                    fullWidth
                    name="additionStaff"
                    InputProps={{
                      inputComponent: InputCustom,
                    }}
                    inputProps={{
                      numericOnly: true,
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <CustomTextLabel value="Pricing Model" />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              checked={pricingType === "monthly"}
              onChange={this.handlePricing}
              value="monthly"
              name="pricingType"
              inputProps={{ "aria-label": "B" }}
              control={<Radio style={{ color: "#0764B0" }} />}
              label="Paid Monthly"
              labelPlacement="right"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              checked={pricingType === "annually"}
              onChange={this.handlePricing}
              value="annually"
              name="pricingType"
              inputProps={{ "aria-label": "B" }}
              control={<Radio style={{ color: "#0764B0" }} />}
              label="Paid Annually"
              labelPlacement="right"
            />
          </Grid>
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="flex-start">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Next Payment Date"
                  value={expiredDate}
                  onChange={(expiredDate) => this.setState({ expiredDate })}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  autoOk={true}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <CustomTextLabel value="New Subscription" />
          </Grid>
          <Grid item xs={4}>
            <CustomTextLabel value="Subscription Plan" />
          </Grid>
          <Grid item xs={8}>
            <CustomText value={subName} />

            {packageId === 3 && (
              <CustomTextLabel
                value={`Addition Staff: ${additionStaff}`}
                styles={{ fontSize: "0.9rem" }}
              />
            )}
          </Grid>

          <Grid item xs={4}>
            <CustomTextLabel value="Pricing Plan" />
          </Grid>
          <Grid item xs={8}>
            <CustomText value={`Paid ${pricingType}`} />
          </Grid>

          <Grid item xs={4}>
            <CustomTextLabel value="Next Payment Date" />
          </Grid>
          <Grid item xs={8}>
            <CustomText value={moment(expiredDate).format("MMM D, yyyy")} />
          </Grid>

          <Grid item xs={4}>
            <CustomTextLabel value="Amount" />
          </Grid>
          <Grid item xs={8}>
            <CustomText
              value={`$ ${firstLoad ? totalPrice : totalAmount.toFixed(2)}`}
            />
          </Grid>

          <Grid
            item
            xs={12}
            className="general-content"
            style={{ paddingTop: "15px" }}
          >
            <Button className="btn btn-green" onClick={this.handleUpdate}>
              SAVE
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
  package: state?.package?.data,
});

const mapDispatchToProps = (dispatch) => ({
  getPackage: () => dispatch(getPackageAction()),
  updateSubscription: (data) => dispatch(updateMerchantSubscriptionById(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSubscription);
