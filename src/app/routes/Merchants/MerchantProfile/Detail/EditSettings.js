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
} from "@material-ui/core";
import CustomCurrencyInput from "../../../../../util/CustomCurrencyInput";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    };
  }
  _handleChange = (event) => {
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
    });
  }
  _toggleConfirm = () => {
    this.setState({ update: !this.state.update });
  };
  _goBack = () => {
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
    } = this.state;

    const merchantToken = "";

    const payload = {
      merchantCode,
      merchantToken,
      transactionsFee,
      totalAmountLimit,
      discountRate,
      pointRate,
      ID,
    };
    this.props.MERCHANT_UPDATE_SETTING(payload);
  };
  render() {
    return (
      <div className="container-fluid ">
        <h2 style={{ marginBottom: "10px" }}>Settings</h2>
        <div className="general-content">
          <h3 style={styles.h3}>
            The charged percent fee of credit card transactions
          </h3>

          <div className="row">
            <div className="col-4" style={styles.div}>
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
                    <InputAdornment position="start">
                      <p style={{ marginBottom: "5px" }}>%</p>
                    </InputAdornment>
                  }
                  inputComponent={CustomCurrencyInput}
                />
              </FormControl>
            </div>

            <div className="col-4" style={styles.div}>
              <TextField
                label="Merchant Code"
                type="text"
                name="merchantCode"
                value={this.state.merchantCode}
                onChange={this._handleChange}
              />
            </div>

            {/* <div className="col-4" style={styles.div}>
              <TextField
                label="Merchant Token"
                type="text"
                name="merchantToken"
                value={this.state.merchantToken}
                onChange={this._handleChange}
              />
            </div> */}

            <div className="col-4" style={styles.div}>
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
            </div>

            <div className="col-4" style={styles.div}>
              <TextField
                label="Point Rate"
                type="number"
                name="pointRate"
                min={1}
                max={100}
                value={this.state.pointRate}
                onChange={this._handleChange}
              />
            </div>
          </div>
          <br />
        </div>
        <div className="SettingsContent general-content">
          <Button
            className="btn btn-green"
            onClick={this.updateMerchantSetting}
          >
            SAVE
          </Button>
          <Button className="btn btn-red" onClick={this._goBack}>
            CANCEL
          </Button>
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
    marginTop: "10px",
  },
  label: {
    fontSize: "13px",
  },
  h3: {
    padding: "15px 0px",
  },
};
