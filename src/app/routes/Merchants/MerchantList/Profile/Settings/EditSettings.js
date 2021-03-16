import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMerchantSettingById } from "../../../../../../actions/merchantActions";
import {
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import { CustomTitle, CustomText } from "../../../../../../util/CustomText";

import CustomCurrencyInput from "../../../../../../util/CustomCurrencyInput";

import { timeZone } from "./timeZone";
import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";
import "../Detail.css";

class EditSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsFee: "",
      merchantCode: "",
      merchantToken: "",
      totalAmountLimit: "",
      limit: "10000",
      update: false,
      discountRate: "",
      pointRate: "",
      turnAmount: "",
      timezone: "",
    };
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  componentDidMount() {
    const data = this.props.MerchantProfile;
    this.setState({
      merchantCode: data.merchantCode,
      merchantToken: data.merchantToken,
      transactionsFee: data.transactionsFee,
      totalAmountLimit: data.totalAmountLimit,
      discountRate: data.discountRate,
      pointRate: data?.pointRate,
      turnAmount: data?.turnAmount,
      isTop: data.isTop,
      timezone: data.timezone,
      loading: true,
    });
  }
  toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };
  goBack = () => {
    this.props.history.push("/app/merchants/profile/settings");
  };
  updateMerchantSetting = () => {
    const merchantId = this.props.MerchantProfile.merchantId;
    const merchantToken = "";
    const path = "/app/merchants/profile/settings";
    const payload = {
      ...this.state,
      merchantToken,
      transactionsfee: this.state.transactionsFee,
      merchantId,
      path,
    };
    this.props.updateMerchantSettingById(payload);
  };
  render() {
    console.log("props", this.props.classes.select);
    return (
      <div className="container-fluid ">
        <CustomTitle value="Settings" />
        <div className="general-content">
          <CustomText value="The charged percent fee of credit card transactions" />

          {this.state.loading && (
            <Grid container spacing={3} style={{ paddingTop: "10px" }}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Transactions Fee
                  </InputLabel>
                  <Input
                    onChange={(e, masked) =>
                      this.setState({ transactionsFee: e.target.value })
                    }
                    value={this.state.transactionsFee}
                    name="transactionsFee"
                    id="custom-transaction-fee-input"
                    startAdornment={
                      <InputAdornment position="start">%</InputAdornment>
                    }
                    inputComponent={CustomCurrencyInput}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Merchant Code"
                  type="text"
                  name="merchantCode"
                  value={this.state.merchantCode}
                  onChange={this.handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Discount Rate
                  </InputLabel>
                  <Input
                    onChange={(e, masked) =>
                      this.setState({ discountRate: e.target.value })
                    }
                    value={this.state.discountRate}
                    name="discountRate"
                    id="custom-transaction-fee-input"
                    startAdornment
                    inputComponent={CustomCurrencyInput}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Point Rate
                  </InputLabel>
                  <Input
                    onChange={(e, masked) =>
                      this.setState({ pointRate: e.target.value })
                    }
                    value={this.state.pointRate}
                    name="pointRate"
                    id="custom-transaction-point--rate-input"
                    startAdornment={
                      <InputAdornment position="start">%</InputAdornment>
                    }
                    inputComponent={CustomCurrencyInput}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Turn Amount
                  </InputLabel>
                  <Input
                    onChange={(e, masked) =>
                      this.setState({ turnAmount: e.target.value })
                    }
                    value={this.state.turnAmount}
                    name="turnAmount"
                    startAdornment
                    inputComponent={CustomCurrencyInput}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl style={{ width: "80%" }}>
                  <InputLabel htmlFor="formatted-text-mask-input">
                    Time Zone
                  </InputLabel>
                  <Select
                    classes={{ select: this.props.classes.select }}
                    name="sendReviewLinkOption"
                    value={this.state.timezone}
                    onChange={(e) => {
                      this.setState({ timezone: e.target.value });
                    }}
                  >
                    {timeZone.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <Select
                  name="sendReviewLinkOption"
                  // value={values?.sendReviewLinkOption}
                  // onChange={handleChange}
                >
                  <MenuItem value="auto">Automatic</MenuItem>
                  <MenuItem value="off">Off</MenuItem>
                  <MenuItem value="manual">Manual</MenuItem>
                </Select> */}
              </Grid>
              <Grid item xs={6} md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isTop"
                      checked={this.state.isTop}
                      style={{ color: "#0764B0" }}
                      color="primary"
                      onChange={(e) =>
                        this.setState({ isTop: e.target.checked })
                      }
                    />
                  }
                  label="Top Store"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="btn btn-green"
                  onClick={this.updateMerchantSetting}
                >
                  SAVE
                </Button>
                <Button className="btn btn-red" onClick={this.goBack}>
                  CANCEL
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    );
  }
}
const styles = (theme) => ({
  select: {
    paddingBottom: "2px",
  },
});
const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
});
const mapDispatchToProps = (dispatch) => ({
  updateMerchantSettingById: (payload) => {
    dispatch(updateMerchantSettingById(payload));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditSettings));
