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
import Setting from "./Detail/Setting";

import "../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../Merchants/PendingList/MerchantReqProfile.css";
import "bootstrap/js/src/collapse.js";
import "./Detail/Consumer.css";

class ConsumerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _goBack = () => {
    this.props.history.push("/app/consumers/list");
  };
  render() {
    // render staff
    const e = this.props.ConsumerProfile;

    return (
      <div className="container-fluid content-list">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.merchantProfile" />}
        />
        <div className="content-body page-heading general-content">
          <div className="header col-12">
            <div style={{ display: "flex" }}>
              <h3>Consumer ID: </h3>
              <h3 style={{ marginLeft: "10px" }}>{e?.accountId}</h3>
            </div>

            <Button
              style={{
                color: "#4251af",
                backgroundColor: "white",
                marginRight: "0px",
              }}
              className="btn btn-green"
              onClick={this._goBack}
            >
              BACK
            </Button>
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
                      {CheckPermissions("view-consumer-transactions") && (
                        <NavLink to="/app/consumers/profile/transactions">
                          Transactions
                        </NavLink>
                      )}
                    </li>
                    <li>
                      <NavLink to="/app/consumers/profile/activies">
                        Activities
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/app/consumers/profile/setting">
                        Setting
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
                      <Route
                        path="/app/consumers/profile/setting"
                        component={Setting}
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
  }
}
const mapStateToProps = (state) => ({
  ConsumerProfile: state.ConsumerReducer.Consumer,
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
