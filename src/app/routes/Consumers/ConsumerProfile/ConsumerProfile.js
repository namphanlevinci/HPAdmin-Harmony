import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, NavLink, Switch } from "react-router-dom";
import {
  getUser_Transaction,
  getUser_Activity,
} from "../../../../actions/transactions/actions";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import General from "./Detail/General";
import Transactions from "./Detail/Transactions";
import Acti from "./Detail/Acti";
import EditGeneral from "./Detail/EditGeneral";
import Bank from "./Detail/Bank";
import CheckPermissions from "../../../../util/checkPermission";

import "../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../Merchants/MerchantsRequest/MerchantsRequest.css";
import "bootstrap/js/src/collapse.js";

class ConsumerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // handleTransactions = () => {
  //   this.props.getTransactions(this.props.MerchantProfile?.userId);
  // };
  // handleActivity = () => {
  //   this.props.getActivity(this.props.MerchantProfile?.userId);
  // };
  _goBack = () => {
    this.props.history.push("/app/consumers/list");
  };
  render() {
    // render staff
    const e = this.props.MerchantProfile;

    const renderConsumer = (
      // e.firstName !== undefined ? (
      <div className="container-fluid content-list">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.merchantProfile" />}
        />
        <div className="content-body page-heading">
          <div className="header col-md-12">
            <h3>Consumer ID: {e.accountId}</h3>
            <span>
              <Button
                style={{ color: "#4251af", backgroundColor: "white" }}
                className="btn btn-green"
                onClick={this._goBack}
              >
                BACK
              </Button>
            </span>
          </div>
          <hr />
          <div className="content">
            <div className="container-fluid">
              <div className="">
                <div className="profile-nav">
                  <ul className="detail-tab">
                    <li>
                      <NavLink to="/app/consumers/profile/general">
                        General
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/app/consumers/profile/bank">Bank</NavLink>
                    </li>
                    <li>
                      {CheckPermissions(33) && (
                        <NavLink
                          to="/app/consumers/profile/transactions"
                          // onClick={this.handleTransactions}
                        >
                          Transactions
                        </NavLink>
                      )}
                    </li>
                    <li>
                      <NavLink
                        to="/app/consumers/profile/activies"
                        // onClick={this.handleActivity}
                      >
                        Activities
                      </NavLink>
                    </li>
                  </ul>
                  <div className="detail-content">
                    <Switch>
                      <Route
                        path="/app/consumers/profile/general/edit"
                        component={EditGeneral}
                      />
                      <Route
                        path="/app/consumers/profile/general"
                        component={General}
                      />
                      <Route
                        path="/app/consumers/profile/bank"
                        component={Bank}
                      />
                      <Route
                        path="/app/consumers/profile/transactions"
                        component={Transactions}
                      />
                      <Route
                        path="/app/consumers/profile/activies"
                        component={Acti}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // ) : (
    //   <Redirect to="/app/consumers/list" />
    // );
    return <div>{renderConsumer}</div>;
  }
}
const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (id) => {
      dispatch(getUser_Transaction(id));
    },
    getActivity: (id) => {
      dispatch(getUser_Activity(id));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConsumerProfile)
);
