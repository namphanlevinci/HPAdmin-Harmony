import React, { Component } from "react";
import { withRouter, Redirect, Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { MdPerson } from "react-icons/md";

import IntlMessages from "../../../../../../../util/IntlMessages";
import ContainerHeader from "../../../../../../../components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import General from "./general";
import workTime from "./work-time";
import salary from "./salary";
import license from "./license";

import "../../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../../MerchantsRequest/MerchantsRequest.css";
import "../../../MerchantProfile.css";

import "bootstrap/js/src/collapse.js";
class staffGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.Staff?.firstName
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const Staff = this.props.Staff;
    console.log("THIS STATE", this.state);
    console.log("IM GETTING RE-RENDER");
    return (
      <div>
        <div className="container-fluid PendingList">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.merchantprofile" />}
          />
          <div className="PendingLBody page-heading">
            <div className="PDL-Btn col-md-12">
              <div style={{ display: "flex" }}>
                <MdPerson size={22} style={{ color: "black" }} />
                <h3>
                  Staff {Staff?.staffId} - {Staff?.displayName}
                </h3>
              </div>

              <span>
                <Button
                  style={{ color: "#0764b0", backgroundColor: "white" }}
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
              <div className="container-fuild" style={{ padding: "10px" }}>
                <div className="">
                  <div className="profile-nav PendingLBody">
                    <ul className="detail-tab">
                      <li>
                        <NavLink to="/app/merchants/staff/general">
                          General
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/app/merchants/staff/worktime">
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
                          path="/app/merchants/staff/general"
                          // component={general}
                          render={props => (
                            <General
                              handleChange={this.handleChange}
                              data={this.state}
                            />
                          )}
                        />
                        <Route
                          path="/app/merchants/staff/worktime"
                          component={workTime}
                        />
                        <Route
                          path="/app/merchants/staff/salary"
                          component={salary}
                        />
                        <Route
                          path="/app/merchants/staff/license"
                          component={license}
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

const mapStateToProps = state => ({
  Staff: state.staffDetail
});

export default connect(mapStateToProps)(staffGeneral);
