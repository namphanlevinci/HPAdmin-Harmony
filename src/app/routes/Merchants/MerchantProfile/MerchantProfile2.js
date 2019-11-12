import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/js/src/collapse.js";
import { withRouter, Redirect, Route, NavLink, Switch } from "react-router-dom";
import "./MerchantProfile.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
import Button from "@material-ui/core/Button";
import General from "./Detail/General";
import EditGeneral from "./Detail/EditGeneral";
// import Business from "./Detail/Business";
import Bank from "./Detail/Bank";
import EditBank from "./Detail/EditBank";
import Principal from "./Detail/Principal";
import EditPrincipal from "./Detail/EditPrincipal";
import Settings from "./Detail/Settings";
import EditSettings from "./Detail/EditSettings";
import Staff from "./Detail/Staff";
import MerchantActi from "./Detail/Activity";
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
                  style={{ color: "#0764b0", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={this._goBack}
                >
                  BACK
                </Button>
              </span>
            </div>
            <hr />
            <div className="content">
              <div className="container">
                <div className="">
                  <div className="profile-nav PendingLBody">
                    <ul className="detail-tab">
                      <li>
                        <NavLink to="/app/merchants/merchant-profile/general">
                          General
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/merchant-profile/bank">
                          Bank
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/merchant-profile/pincipal">
                          Principal
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/merchant-profile/staff">
                          Staff
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/merchant-profile/settings">
                          Settings
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/merchant-profile/activities">
                          Activities
                        </NavLink>
                      </li>
                    </ul>
                    <div className="detail-content">
                      <Switch>
                        <Route
                          path="/app/merchants/merchant-profile/general/edit"
                          component={EditGeneral}
                        />
                        <Route
                          path="/app/merchants/merchant-profile/general"
                          component={General}
                        />
                        <Route
                          path="/app/merchants/merchant-profile/bank/edit"
                          component={EditBank}
                        />
                        <Route
                          path="/app/merchants/merchant-profile/bank"
                          component={Bank}
                        />
                        <Route
                          path="/app/merchants/merchant-profile/pincipal/edit"
                          component={EditPrincipal}
                        />
                        <Route
                          path="/app/merchants/merchant-profile/pincipal"
                          component={Principal}
                        />

                        <Route
                          path="/app/merchants/merchant-profile/staff"
                          component={Staff}
                        />
                        <Route
                          path="/app/merchants/merchant-profile/activities"
                          component={MerchantActi}
                        />
                        <Route
                          path="/app/merchants/merchant-profile/settings/edit"
                          component={EditSettings}
                        />
                        <Route
                          path="/app/merchants/merchant-profile/settings"
                          component={Settings}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
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
