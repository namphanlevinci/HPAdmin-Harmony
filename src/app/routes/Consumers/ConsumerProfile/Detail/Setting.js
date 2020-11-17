import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomTitle, CustomTextLabel } from "../../../../../util/CustomText";
import { motion } from "framer-motion";
import { updateConsumerByID } from "../../../../../actions/consumerActions";
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
    const payload = { ...this.state, path: "/app/consumers/profile/setting" };
    this.props.updateConsumerByID(payload);
  };
  goBack = () => {
    this.props.history.push("/app/consumers/profile/general");
  };
  render() {
    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={this.props.pageTransition}
      >
        <div className="consumer__setting">
          <div className="container-fluid">
            <CustomTitle value="Daily transactions limit (unit $)" />
            <CustomTextLabel
              value=" The HarmonyPay system will alert any user and prevent any use
            involved monetary transfer or transfers that are:"
            />

            <CustomTextLabel
              value="
            a. More than $10,000 in total from either cash-in or cash-out.
          "
            />

            <CustomTextLabel value="b. Is conducted by the same person." />

            <CustomTextLabel value="c. Is conducted on the same business day." />

            <div style={{ marginTop: "3px" }}>
              <FormControl>
                <InputLabel
                  htmlFor="formatted-text-mask-input"
                  style={{ color: "#4251af" }}
                >
                  Limit
                </InputLabel>
                <Input
                  onChange={(e, masked) =>
                    this.setState({ limitAmount: masked })
                  }
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
            <div className=" general-content" style={{ marginTop: "20px" }}>
              <Button className="btn btn-green" onClick={this.Update}>
                SAVE
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.consumerById.data,
});

const mapDispatchToProps = (dispatch) => ({
  updateConsumerByID: (payload) => {
    dispatch(updateConsumerByID(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
