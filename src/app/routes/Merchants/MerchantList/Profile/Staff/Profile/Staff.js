import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";

import IntlMessages from "../../../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import EditGeneral from "./General/EditGeneral";
import General from "./General/General";
import WorkTime from "./WorkTime/WorkTime";
import EditWorkTime from "./WorkTime/EditTime";
import Salary from "./Salary/Salary";
import EditSalary from "./Salary/EditSalary";
import License from "./License/License";
import EditLicense from "./License/EditLicense";

import "../../../../PendingList/MerchantReqProfile.css";
import "../../../MerchantProfile.css";
import "bootstrap/js/src/collapse.js";

class staffGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.Staff?.firstName,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const Staff = this.props.Staff;
    return (
      <div>
        <div className="container-fluid content-list">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantProfile" />}
          />
          <div className="content-body page-heading">
            <div className="header col-12">
              <div style={{ display: "flex", alignItems: "center" }}>
                <PersonIcon style={{ color: "black" }} />
                <h3 style={{ margin: "0px" }}>
                  Staff {Staff?.staffId} - {Staff?.displayName}
                </h3>
              </div>

              <span>
                <Button
                  style={{ color: "#4251af", backgroundColor: "white" }}
                  className="btn btn-green"
                  onClick={() =>
                    this.props.history.push("/app/merchants/profile/staff")
                  }
                >
                  BACK
                </Button>
              </span>
            </div>
            <hr />
            <div className="content">
              <div className="container-fluid" style={{ padding: "10px" }}>
                <div className="">
                  <div className="profile-nav content-body">
                    <ul className="detail-tab">
                      <li>
                        <NavLink to="/app/merchants/staff/general">
                          General
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/staff/time">
                          Working Time
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/staff/salary">
                          Salary
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/staff/license">
                          License
                        </NavLink>
                      </li>
                    </ul>
                    <div className="detail-content">
                      <Switch>
                        <Route
                          path="/app/merchants/staff/general/edit"
                          render={(props) => (
                            <EditGeneral
                              {...props}
                              token={this.props.userLogin.token}
                              merchantID={this.props.MerchantProfile.merchantId}
                            />
                          )}
                        />

                        <Route
                          path="/app/merchants/staff/general"
                          render={(props) => <General {...props} />}
                        />

                        <Route
                          path="/app/merchants/staff/time/edit"
                          render={(props) => (
                            <EditWorkTime
                              {...props}
                              token={this.props.userLogin.token}
                              merchantID={this.props.MerchantProfile.merchantId}
                            />
                          )}
                        />
                        <Route
                          path="/app/merchants/staff/time"
                          component={WorkTime}
                        />

                        <Route
                          path="/app/merchants/staff/salary/edit"
                          render={(props) => (
                            <EditSalary
                              {...props}
                              token={this.props.userLogin.token}
                              merchantID={this.props.MerchantProfile.merchantId}
                            />
                          )}
                        />
                        <Route
                          path="/app/merchants/staff/salary"
                          component={Salary}
                        />

                        <Route
                          path="/app/merchants/staff/license/edit"
                          render={(props) => (
                            <EditLicense
                              {...props}
                              token={this.props.userLogin.token}
                              merchantID={this.props.MerchantProfile.merchantId}
                            />
                          )}
                        />
                        <Route
                          path="/app/merchants/staff/license"
                          component={License}
                        />
                      </Switch>
                    </div>
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
  Staff: state.MerchantReducer.StaffData,
  userLogin: state.userReducer.User,
  MerchantProfile: state.ViewProfile_Merchants,
});

export default connect(mapStateToProps)(staffGeneral);
