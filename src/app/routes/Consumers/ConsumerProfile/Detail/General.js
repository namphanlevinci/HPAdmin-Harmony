import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

import {
  restoreConsumerById,
  archiveConsumerById,
} from "../../../../../actions/consumerActions";

import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../util/CustomText";

import { Button, Grid } from "@material-ui/core";
import CheckPermissions from "../../../../../util/checkPermission";
import DisableConsumer from "./DisableConsumer.js";

import "../../../Merchants/MerchantList/MerchantProfile.css";
import "../../../Merchants/PendingList/MerchantReqProfile.css";
import "./Consumer.css";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Token: "",
      isOpenReject: false,
      isOpenAccept: false,
      open: false,
    };
  }
  handleDialog = () => {
    this.setState({ open: !this.state.open });
  };

  EditPage = () => {
    this.props.history.push("/app/consumers/profile/general/edit");
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      userId,
      isDisabled,
    } = this.props.ConsumerProfile;

    const ConsumerStatus =
      isDisabled !== 1 ? (
        <DisableConsumer
          open={this.state.open}
          handleToggle={this.handleDialog}
          ConsumerID={userId}
          deleteConsumer={this.props.archiveConsumerById}
        />
      ) : (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            type="submit"
            className="btn btn-green"
            onClick={() => this.props.restoreConsumerById(userId)}
          >
            ENABLE
          </Button>
        </motion.div>
      );

    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={this.props.pageTransition}
      >
        <div className="content">
          <div className="consumer__general">
            <Grid container spacing={3} className="container-fluid">
              <Grid item xs={12}>
                <CustomTitle value="General Information" />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="First Name*" />
                <CustomText value={firstName} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Last Name*" />
                <CustomText value={lastName} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Contact Email*" />
                <CustomText value={email} />
              </Grid>
              <Grid item xs={4}>
                <CustomTextLabel value="Phone Number*" />
                <CustomText value={phone} />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "20px", display: "flex" }}>
                {CheckPermissions("edit-consumer") && (
                  <Button className="btn btn-green" onClick={this.EditPage}>
                    EDIT
                  </Button>
                )}

                {CheckPermissions("active-consumer") && ConsumerStatus}
              </Grid>
            </Grid>
          </div>
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.consumerById.data,
  archiveConsumer: state.archiveConsumer,
  restoreConsumer: state.restoreConsumer,
});
const mapDispatchToProps = (dispatch) => ({
  archiveConsumerById: (ID, reason) => {
    dispatch(archiveConsumerById(ID, reason));
  },
  restoreConsumerById: (ID) => {
    dispatch(restoreConsumerById(ID));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(General);
