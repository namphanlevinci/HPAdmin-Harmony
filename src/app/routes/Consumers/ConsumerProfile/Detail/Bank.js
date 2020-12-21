import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../util/CustomText";
import { Button, Grid } from "@material-ui/core";

import "../../../Merchants/MerchantList/MerchantProfile.css";
import "../../../Merchants/PendingList/MerchantReqProfile.css";
import "./Consumer.css";
class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const e = this.props.ConsumerProfile.banks;
    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={this.props.pageTransition}
      >
        <Grid container className="content general-content">
          {e.map((i) => {
            return (
              <Grid container spacing={3} key={i.bankAcountId}>
                <Grid item xs={12}>
                  <CustomTitle value="Bank Information" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextLabel value="Bank Name" />
                  <CustomText value={i.accountHolderName} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextLabel value="Routing Number" />
                  <CustomText value={i.routingNumber} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextLabel value="Account Number" />
                  <CustomText value={i.accountNumber} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextLabel value="Address" />
                  <CustomText value={i.address} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextLabel value="State" />
                  <CustomText value={i.stateName} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextLabel value="City" />
                  <CustomText value={i.city} />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.consumerById.data,
});

export default connect(mapStateToProps)(Bank);

const styles = {
  p: { fontWeight: 400, color: "black" },
  Form: {
    marginTop: "10px",
  },
  btnDiv: {
    marginTop: "10px",
  },
  label: {
    fontSize: "13px",
  },
};
