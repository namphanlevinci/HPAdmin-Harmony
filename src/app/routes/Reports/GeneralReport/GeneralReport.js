import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import { withRouter, Link } from "react-router-dom";
import "./GeneralReport.css";

class GeneralReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.generalReport" />}
        />
        <div
          className="MerList page-heading"
          style={{ padding: "20px", background: "white" }}
        >
          <div className="TransactionsBox GeneralReportBox ">
            <h1>Statistics</h1>
          </div>
          <div className="Link">
            <Link to="/app/reports/general-reports/approved-reports">
              Approved Merchant Accounts
            </Link>
            <br />
            <Link to="/app/reports/general-reports/download-reports">
              App Download Statistics
            </Link>
            {/* <br />
            <Link to="/app/reports/harmonyApp-accounts">
              Amount Of Harmony App Accounts
            </Link>
            <br />
            <Link to="/app/reports/harmonyPayApp-accounts">
              Amount Of Harmony App Pay Accounts
            </Link>
            <br />
            <Link to="/app/reports/transactions">
              Amount Of Users Using The Harmony App
            </Link>
            <br />
            <Link to="/app/reports/transactions">
              Average Amount Of Time Spend Per User
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(GeneralReport));
