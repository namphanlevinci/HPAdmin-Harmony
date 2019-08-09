import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import "../GeneralReport.css";
import TextField from "@material-ui/core/TextField";
// import ReactTable from "react-table";
import "react-table/react-table.css";
class HarmonyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const columns = [
    //   {
    //     Header: "ID",
    //     accessor: "userId"
    //   },
    //   {
    //     Header: "First name",
    //     accessor: "firstName"
    //   }
    // ];
    return (
      <div className="react-transition scale-in-right">
        <div>
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.generalReport" />}
          />
        </div>
        <div className="container-fluid  ReportBox">
          <span>
            <Button
              style={{ color: "#3f51b5", backgroundColor: "white" }}
              className="btn btn-green"
              onClick={() =>
                this.props.history.push("/app/reports/general-reports")
              }
            >
              BACK
            </Button>
          </span>
          <h2>New Harmony App Accounts</h2>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h6
                  style={{
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize: "0,7rem"
                  }}
                >
                  Time range
                </h6>
                <select
                  className="search"
                  value={this.state.range}
                  onChange={this._TimeRange}
                >
                  <option value="">ALL </option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                </select>
              </div>
              <div className="col-md-4">
                <form noValidate>
                  <TextField
                    id="date"
                    label="From"
                    type="date"
                    // defaultValue={newToday}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.fromDate}
                  />
                </form>
              </div>
              <div className="col-md-4">
                <form noValidate>
                  <TextField
                    id="date"
                    label="To"
                    type="date"
                    // defaultValue={this.state.to}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.toDate}
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="MListContainer">
            {/* <ReactTable
              data={ConsumerList}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              getTdProps={onRowClick}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(HarmonyAccount);
