import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchApiByPage } from "@/actions/fetchApiActions";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import InputCustom from "@/util/CustomInput";
import IntlMessages from "@/util/IntlMessages";
import ContainerHeader from "@components/ContainerHeader/index";
import moment from "moment";
import ReactTable from "react-table";
import SearchComponent from "@/util/searchComponent";
import NewButton from "@components/Button/Search";
import ResetButton from "@components/Button/Reset";

import "react-table/react-table.css";
import "../Transactions/Transactions.css";
import "../../Merchants/Merchants.css";

class P2P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      from: "",
      to: "",
      amount: "",
      amountFrom: -1,
      amountTo: -1,
      range: "thisMonth",
    };
  }

  handleResetClick = () => {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
      amount: "",
      amountFrom: -1,
      amountTo: -1,
      range: "thisMonth",
    });
    this.fetchApi();
  };

  componentDidMount() {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    });
  }

  handleDateChange = (date, kind) => {
    switch (kind) {
      case 'from':
        this.setState({ from: moment(date).format("YYYY-MM-DD") });
        break;

      case 'to':
        this.setState({ to: moment(date).format("YYYY-MM-DD") });
        break;

      default:
        break;
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.fetchApi();
    }
  };

  timeRange = async (e) => {
    const value = e.target.value;
    if (value === "today") {
      this.setState({
        from: moment().startOf("day").format("YYYY-MM-DD"),
        to: moment().startOf("day").format("YYYY-MM-DD"),
      });
    }
    if (value === "yesterday") {
      this.setState({
        from: moment().subtract(1, "day").format("YYYY-MM-DD"),
        to: moment().subtract(1, "day").format("YYYY-MM-DD"),
      });
    }
    if (value === "thisWeek") {
      this.setState({
        from: moment().startOf("week").format("YYYY-MM-DD"),
        to: moment().endOf("week").format("YYYY-MM-DD"),
      });
    }
    if (value === "lastWeek") {
      this.setState({
        from: moment().subtract(1, "week").format("YYYY-MM-DD"),
        to: moment().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
      });
    }
    if (value === "thisMonth") {
      this.setState({
        from: moment().startOf("month").format("YYYY-MM-DD"),
        to: moment().endOf("month").format("YYYY-MM-DD"),
      });
    }
    if (value === "lastMonth") {
      this.setState({
        from: moment()
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD"),
        to: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
      });
    }
    await this.setState({
      range: value,
    });
    await this.fetchApi();
  };

  fetchApi = async (state) => {
    const {
      from,
      to,
      search,
      range,
      amount,
      amountFrom,
      amountTo,
    } = this.state;
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;

    const url = `p2pgiftcard/transaction?page=${page === 0 ? 1 : page + 1
      }&row=${pageSize}&quickFilter=${range}&key=${search}&timeStart=${from}&timeEnd=${to}&amountFrom=${amount ? amount : amountFrom
      }&amountTo=${amount ? amount : amountTo}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  render() {
    const { page, from, to, amountTo, amountFrom, amount, range } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {moment.utc(e.createDate).local().format("MM/DD/YYYY hh:mm A")}
          </Typography>
        ),
      },
      {
        id: "Sender",
        Header: "Sender",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.senderUserName}
          </Typography>
        ),
      },
      {
        id: "Receiver",
        Header: "Receiver",

        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.receiveUserName}
          </Typography>
        ),
      },
      {
        id: "Type ",
        Header: "Type",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            Gift Card
          </Typography>
        ),
      },
      {
        id: "Status",
        Header: "Status",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e.status !== null ? <p className="P2pStatus">{e.status}</p> : null}
          </Typography>
        ),
      },
      {
        id: "Amount",
        Header: "Amount",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e.amount !== null ? <span>${e.amount}</span> : null}
          </Typography>
        ),
      },
    ];

    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Gift Card Transaction | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Transactions" />}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div className=" TransactionsBox">
            {/* SEARCH */}

            <Grid
              container
              spacing={0}
              className="search"
              style={{ marginBottom: 15 }}
            >
              <div className="container-search-component">
                <SearchComponent
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this.handleChange}
                  onKeyDown={this.handEnter}
                  onClickIcon={() => this.setState({ search: "" })}
                  name="search"
                />
                <NewButton onClick={this.fetchApi} style={{ marginLeft: "10px" }}>
                  Search
              </NewButton>
              </div>
            </Grid>
          </div>
          <Grid
            container
            spacing={3}
            className="TransactionSearch"
            style={{ marginTop: 5 }}
          >
            <Grid item xs={2}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel>Time Range</InputLabel>
                <Select value={range} onChange={this.timeRange}>
                  <MenuItem value="all">Custom</MenuItem>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                  <MenuItem value="thisWeek">This Week</MenuItem>
                  <MenuItem value="lastWeek">Last Week</MenuItem>
                  <MenuItem value="thisMonth">This Month</MenuItem>
                  <MenuItem value="lastMonth">Last Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {range === "all" ? (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={2}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="From"
                    name="from"
                    value={from}
                    onChange={(e) => this.handleDateChange(e, "from")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    autoOk={true}
                    style={{ width: "100%", margin: 0 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="To"
                    value={to}
                    name="to"
                    onChange={(e) => this.handleDateChange(e, "to")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    autoOk={true}
                    style={{ width: "100%", margin: 0 }}
                  />
                </Grid>{" "}
              </MuiPickersUtilsProvider>
            ) : null}

            <Grid item xs={2}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Amount From"
                value={amountFrom === -1 ? 0 : amountFrom}
                onChange={this.handleChange}
                name="amountFrom"
                InputProps={{
                  inputComponent: InputCustom,
                }}
                inputProps={{
                  numericOnly: true,
                }}
                style={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Amount To"
                value={amountTo === -1 ? 0 : amountTo}
                onChange={this.handleChange}
                name="amountTo"
                InputProps={{
                  inputComponent: InputCustom,
                }}
                inputProps={{
                  numericOnly: true,
                }}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <ResetButton
            onClick={this.handleResetClick}
            style={{ marginTop: "10px" }}
          >
            Reset filter
          </ResetButton>
          <div className="merchant-list-container Transactions">
            <ReactTable
              manual
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchApi(state)}
              defaultPageSize={20}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
              columns={columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.fetchApi,
});
const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(P2P);
