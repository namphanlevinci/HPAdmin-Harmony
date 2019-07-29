import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect, Route, NavLink } from "react-router-dom";
import "./MerchantProfile.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
import { NotificationContainer } from "react-notifications";
import Button from "@material-ui/core/Button";
// YEET
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class merchantProfile2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goBack = () => {
    this.props.history.push("/app/merchants/list");
  };
  render() {
    const e = this.props.MerchantProfile;
    const renderMerchantProfile =
      e.merchantId !== undefined ? (
        <div className="container-fluid PendingList">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantprofile" />}
          />
          <div className="PendingLBody">
            <div className="PDL-Btn col-md-12">
              <h3>ID: {e.merchantId}</h3>
              <span>
                <Button
                  style={{ color: "#3f51b5", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this._goBack}
                >
                  BACK
                </Button>
              </span>
            </div>
            <hr />
            <NotificationContainer />
            <div className="content">
              <div className="container">
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/merchants/list" />
      );
    return <div>{renderMerchantProfile}</div>;
  }
}
const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default withRouter(connect(mapStateToProps)(merchantProfile2));
