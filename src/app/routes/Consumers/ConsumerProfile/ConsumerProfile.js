import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, NavLink, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import General from "./Detail/General";
import Transactions from "./Detail/Transactions";
import ActivityList from "./Detail/ActivityList";
import EditGeneral from "./Detail/EditGeneral";
import Bank from "./Detail/Bank";
import CheckPermissions from "../../../../util/checkPermission";
import Setting from "./Detail/Setting";

import "../../Merchants/MerchantList/MerchantProfile.css";
import "../../Merchants/PendingList/MerchantReqProfile.css";
import "bootstrap/js/src/collapse.js";
import "./Detail/Consumer.css";

class ConsumerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    this.props.history.push("/app/consumers/list");
  };
  render() {
    const e = this.props.ConsumerProfile;

    const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

    const pageTransition = {
      in: {
        opacity: 1,
        transition,
      },
      out: {
        opacity: 0,
        transition: { duration: 1.5, ...transition },
      },
    };

    return (
      <div className="container-fluid content-list">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.consumers" />}
        />
        <div className="content-body page-heading general-content">
          <div className="header col-12">
            <div style={{ display: "flex" }}>
              <h3>Consumer ID: </h3>
              <h3 style={{ marginLeft: "10px" }}>{e?.accountId}</h3>
            </div>

            <Button
              style={{
                color: "#0764B0",
                backgroundColor: "white",
                marginRight: "0px",
              }}
              className="btn btn-green"
              onClick={this.goBack}
            >
              BACK
            </Button>
          </div>
          <hr />
          <div className="content">
            <div className="container-fluid">
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
                  <AnimatePresence
                    exitBeforeEnter
                    location={this.props.history.location}
                    key={this.props.history.location.pathname}
                  >
                    <Switch>
                      <Route
                        path="/app/consumers/profile/general/edit"
                        render={(props) => (
                          <EditGeneral
                            {...props}
                            pageTransition={pageTransition}
                          />
                        )}
                      />
                      <Route
                        path="/app/consumers/profile/general"
                        render={(props) => (
                          <General {...props} pageTransition={pageTransition} />
                        )}
                      />
                      <Route
                        path="/app/consumers/profile/bank"
                        render={(props) => (
                          <Bank {...props} pageTransition={pageTransition} />
                        )}
                      />
                      <Route
                        path="/app/consumers/profile/transactions"
                        render={(props) => (
                          <Transactions
                            {...props}
                            pageTransition={pageTransition}
                          />
                        )}
                      />
                      <Route
                        path="/app/consumers/profile/activies"
                        render={(props) => (
                          <ActivityList
                            {...props}
                            pageTransition={pageTransition}
                          />
                        )}
                      />
                      <Route
                        path="/app/consumers/profile/setting"
                        render={(props) => (
                          <Setting {...props} pageTransition={pageTransition} />
                        )}
                      />
                    </Switch>
                  </AnimatePresence>
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
  ConsumerProfile: state.consumerById.data,
});

export default withRouter(connect(mapStateToProps)(ConsumerProfile));
