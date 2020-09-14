import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_CONSUMER } from "../../../../../actions/consumer/actions";

import {
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import CustomCurrencyInput from "../../../../../util/CustomCurrencyInput";
import Button from "@material-ui/core/Button";

import "./Consumer.css";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      limitAmount: "",
      ID: "",
      Token: "",
    };
  }

  componentDidMount() {
    const data = this.props.ConsumerProfile;
    this.setState({
      ID: data?.userId,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.phone,
      limitAmount: data?.limitAmount,
    });
  }

  Update = () => {
    this.props.UPDATE_CONSUMER(this.state, this.state.ID);
  };
  _goBack = () => {
    this.props.history.push("/app/consumers/profile/general");
  };
  render() {
    return (
      <div className="react-transition swipe-right consumer__setting">
        <div className="container-fluid">
          <h2 style={{ margin: "25px 0px" }}>
            Daily transactions limit (unit $)
          </h2>
          <p style={styles.p}>
            The HarmonyPay system will alert any user and prevent any use
            involved monetary transfer or transfers that are:
          </p>
          <p style={styles.p}>
            a. More than $10,000 in total from either cash-in or cash-out.
          </p>

          <p style={styles.p}>b. Is conducted by the same person.</p>

          <p style={styles.p}>c. Is conducted on the same business day.</p>

          <div style={{ marginTop: "3px" }}>
            <FormControl>
              <InputLabel
                htmlFor="formatted-text-mask-input"
                style={{ color: "#4251af" }}
              >
                Limit
              </InputLabel>
              <Input
                onChange={(e, masked) => this.setState({ limitAmount: masked })}
                value={this.state.limitAmount}
                name="price"
                id="custom-price-input"
                startAdornment={
                  <InputAdornment position="start">
                    <p style={{ marginBottom: "5px" }}>$</p>
                  </InputAdornment>
                }
                inputComponent={CustomCurrencyInput}
              />
            </FormControl>
          </div>
        </div>

        <div
          className="SettingsContent general-content"
          style={{ marginTop: "20px" }}
        >
          <Button className="btn btn-green" onClick={this.Update}>
            SAVE
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.ConsumerReducer.Consumer,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_CONSUMER: (payload, id) => {
    dispatch(UPDATE_CONSUMER(payload, id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = {
  p: {
    fontWeight: "400",
    fontSize: "16px",
    color: "#707070",
    lineHeight: "8px",
  },
};
