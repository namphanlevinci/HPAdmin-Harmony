import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GET_CONSUMER_BY_ID,
  DELETE_CONSUMER_BY_ID,
  RESTORE_CONSUMER_BY_ID,
} from "../../../../../actions/consumer/actions";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../util/CustomText";

import { Button, Grid } from "@material-ui/core";
import CheckPermissions from "../../../../../util/checkPermission";
import DisableConsumer from "./DisableConsumer.js";

import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
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
    const e = this.props.ConsumerProfile;
    const ID = this.props.ConsumerProfile.userId;

    const ConsumerStatus =
      e.isDisabled !== 1 ? (
        <DisableConsumer
          open={this.state.open}
          handleToggle={this.handleDialog}
          ConsumerID={this.props.ConsumerProfile.userId}
          deleteConsumer={this.props.DELETE_CONSUMER_BY_ID}
        />
      ) : (
        <Button
          type="submit"
          className="btn btn-green"
          onClick={() => this.props.RESTORE_CONSUMER_BY_ID(ID)}
        >
          ENABLE
        </Button>
      );

    return (
      <div className="content ">
        <div className="react-transition swipe-right consumer__general">
          <Grid container spacing={3} className="container-fluid">
            <Grid item xs={12}>
              <CustomTitle value="General Information" />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="First Name*" />
              <CustomText value={e?.firstName} />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="Last Name*" />
              <CustomText value={e?.lastName} />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="Contact Email*" />
              <CustomText value={e?.email} />
            </Grid>
            <Grid item xs={4}>
              <CustomTextLabel value="Phone Number*" />
              <CustomText value={e?.phone} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px", display: "flex" }}>
              {CheckPermissions("edit-consumer") && (
                <Button className="btn btn-green" onClick={this.EditPage}>
                  EDIT
                </Button>
              )}
              {/* active-consumer moi dung */}
              {CheckPermissions("active-consumer") && ConsumerStatus}
            </Grid>
          </Grid>
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
  GET_CONSUMER_BY_ID: (payload) => {
    dispatch(GET_CONSUMER_BY_ID(payload));
  },
  DELETE_CONSUMER_BY_ID: (payload, id) => {
    dispatch(DELETE_CONSUMER_BY_ID(payload, id));
  },
  RESTORE_CONSUMER_BY_ID: (payload, id) => {
    dispatch(RESTORE_CONSUMER_BY_ID(payload, id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(General);
