import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import Button from "@material-ui/core/Button";
import "../GeneralReport.css";
import TextField from "@material-ui/core/TextField";
import ReactTable from "react-table";
import moment from "moment";
import { APPROVED_STATICS } from "../../../../../actions/static/actions";
import _ from "lodash";
import { CSVLink } from "react-csv";
import "react-table/react-table.css";
class HarmonyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HarmonyApp: [],
      fromDate: undefined,
      toDate: undefined,
      range: "",
    };
  }
  fromDate = (e) => {
    this.setState({ fromDate: e.target.value });
  };
  toDate = (e) => {
    this.setState({ toDate: e.target.value });
  };
  async componentDidMount() {
    const fromDate = moment()
      .startOf("month")
      .format("YYYY/MM/DD");
    const toDate = moment()
      .endOf("month")
      .format("YYYY/MM/DD");
    const Data = { fromDate, toDate };
    this.props.APPROVED_STATICS(Data);
    setTimeout(() => {
      const Content = this.props.Approved.data;
      this.setState({
        HarmonyApp: Content.amountHarmonyApp,
        fromDate: fromDate,
        toDate: toDate,
      });
    }, 500);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.Approved !== this.props.Approved) {
      const Content = this.props.Approved.data;
      this.setState({ HarmonyApp: Content.amountHarmonyApp });
    }
  }
  _TimeRange = async (e) => {
    await this.setState({
      range: e.target.value,
    });
  };
  _Filter = () => {
    const { range } = this.state;
    if (range === "") {
      let { fromDate, toDate } = this.state;
      const Data = { fromDate, toDate };
      this.props.APPROVED_STATICS(Data);
    } else if (range === "today") {
      const fromDate = moment(new Date()).format("YYYY/MM/DD");
      const toDate = moment(new Date()).format("YYYY/MM/DD");
      const Data = { fromDate, toDate };
      this.props.APPROVED_STATICS(Data);
      this.setState({ range: "", fromDate: fromDate, toDate: toDate });
    } else if (range === "week") {
      const fromDate = moment()
        .startOf("week")
        .format("YYYY/MM/DD");
      const toDate = moment()
        .endOf("week")
        .format("YYYY/MM/DD");
      const Data = { fromDate, toDate };
      this.props.APPROVED_STATICS(Data);
      this.setState({ range: "", fromDate: fromDate, toDate: toDate });
    } else if (range === "month") {
      const fromDate = moment()
        .startOf("month")
        .format("YYYY/MM/DD");
      const toDate = moment()
        .endOf("month")
        .format("YYYY/MM/DD");
      const Data = { fromDate, toDate };
      this.props.APPROVED_STATICS(Data);
      this.setState({ range: "", fromDate: fromDate, toDate: toDate });
    }
  };
  render() {
    const columns = [
      {
        Header: "Date",
        accessor: "date",
        width: 250,
        Footer: <span className="Total">Total</span>,
        Cell: (e) => moment(e.value).format("DD/MM/YYYY"),
      },
      {
        Header: "New Harmony App Accounts",
        accessor: "total",
        Footer: (
          <span className="Total">
            {_.sum(_.map(this.state.HarmonyApp, (d) => d.total))}
          </span>
        ),
      },
    ];
    return (
      <div className="react-transition swipe-right">
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
              <div className="col-md-3">
                <h6
                  style={{
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize: "0,7rem",
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
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                </select>
              </div>
              <div className="col-md-3">
                <form noValidate>
                  <TextField
                    id="date"
                    label="From"
                    type="date"
                    // defaultValue={newToday}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.fromDate}
                  />
                </form>
              </div>
              <div className="col-md-3">
                <form noValidate>
                  <TextField
                    id="date"
                    label="To"
                    type="date"
                    // defaultValue={this.state.to}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.toDate}
                  />
                </form>
              </div>
              <div className="col-md-3">
                <Button
                  style={{ color: "white", backgroundColor: "#3f51b5" }}
                  className="btn btn-green"
                  variant="contained"
                  onClick={this._Filter}
                >
                  FILTER
                </Button>
              </div>
            </div>
            <div>
              <h2>Result</h2>
              <h3 style={{ color: "#3f51b5" }}>
                New Harmony App Accounts From
                {" " + moment(this.state.fromDate).format("DD/MM/YYYY")} To
                {" " + moment(this.state.toDate).format("DD/MM/YYYY")}
                <CSVLink
                  style={{ marginLeft: "30%" }}
                  data={this.state.HarmonyApp}
                  filename={`report${this.state.fromDate}-${this.state.toDate}.csv`}
                  className="btn btn-green"
                  target="_blank"
                  enclosingCharacter={`'`}
                >
                  EXPORT
                </CSVLink>
              </h3>
            </div>
          </div>
          <div className="merchant-list-container">
            <ReactTable
              data={this.state.HarmonyApp}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  Approved: state.ApprovedStatic,
});
const mapDispatchToProps = (dispatch) => ({
  APPROVED_STATICS: (payload) => {
    dispatch(APPROVED_STATICS(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HarmonyAccount);
