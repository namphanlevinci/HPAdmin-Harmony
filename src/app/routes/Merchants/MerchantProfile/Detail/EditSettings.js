import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_MERCHANT_BY_ID,
  MERCHANT_UPDATE_SETTING,
} from "../../../../../actions/merchants/actions";
import {
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { CustomTitle, CustomText } from "../../../../../util/CustomText";

import CustomCurrencyInput from "../../../../../util/CustomCurrencyInput";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "./Detail.css";

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
    });
  }
  toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };
  goBack = () => {
    this.props.history.push("/app/merchants/profile/settings");
  };
  updateMerchantSetting = () => {
    const ID = this.props.MerchantProfile.merchantId;
    const {
      merchantCode,
      transactionsFee,
      totalAmountLimit,
      discountRate,
      pointRate,
      turnAmount,
    } = this.state;

    const merchantToken = "";

    const payload = {
      merchantCode,
      merchantToken,
      transactionsFee,
      totalAmountLimit,
      turnAmount,
      discountRate,
      pointRate,
      ID,
    };
    this.props.MERCHANT_UPDATE_SETTING(payload);
  };
  render() {
    return (
      <div className="container-fluid ">
        <CustomTitle value="Settings" />
        <div className="general-content">
          <CustomText value="The charged percent fee of credit card transactions" />

          <Grid container spacing={3} style={{ paddingTop: "10px" }}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">
                  Transactions Fee
                </InputLabel>
                <Input
                  onChange={(e, masked) =>
                    this.setState({ transactionsFee: masked })
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

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Merchant Code"
                type="text"
                name="merchantCode"
                value={this.state.merchantCode}
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">
                  Discount Rate
                </InputLabel>
                <Input
                  onChange={(e, masked) =>
                    this.setState({ discountRate: masked })
                  }
                  value={this.state.discountRate}
                  name="discountRate"
                  id="custom-transaction-fee-input"
                  startAdornment
                  inputComponent={CustomCurrencyInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">
                  Point Rate
                </InputLabel>
                <Input
                  onChange={(e, masked) => this.setState({ pointRate: masked })}
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
            <Grid item xs={12} sm={6} md={4}>
              <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">
                  Turn Amount
                </InputLabel>
                <Input
                  onChange={(e, masked) =>
                    this.setState({ turnAmount: masked })
                  }
                  value={this.state.turnAmount}
                  name="turnAmount"
                  startAdornment
                  inputComponent={CustomCurrencyInput}
                />
              </FormControl>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => {
  return {
    GET_MERCHANT_BY_ID: (ID) => {
      dispatch(GET_MERCHANT_BY_ID(ID));
    },
    MERCHANT_UPDATE_SETTING: (payload) => {
      dispatch(MERCHANT_UPDATE_SETTING(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditSettings);
