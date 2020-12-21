import React from "react";
import { connect } from "react-redux";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { Helmet } from "react-helmet";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { debounce } from "lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import ReactTable from "react-table";
import SearchComponent from "../../../../util/searchComponent";
import InputCustom from "../../../../util/CustomInput";

import "./Transactions.css";
import "react-table/react-table.css";
import "../../Merchants/Merchants.css";

class Transactions extends React.Component {
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

  handleResetClick = async () => {
    await this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
      amount: "",
      amountFrom: -1,
      amountTo: -1,
      range: "thisMonth",
      search: "",
    });
    this.fetchApi();
  };

  componentDidMount() {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    });
  }

  searchTransaction = debounce((query) => {
    this.fetchApi();
  }, 1000);

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.searchTransaction();
  };

  handEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.fetchApi();
    }
  };

  timeRange = async (e) => {
    const value = e.target.value;
    await this.setState({
      range: value,
    });

    switch (value) {
      case "today":
        this.setState({
          from: moment().startOf("day").format("YYYY-MM-DD"),
          to: moment().startOf("day").format("YYYY-MM-DD"),
        });
        return this.fetchApi();
      case "yesterday":
        this.setState({
          from: moment().subtract(1, "day").format("YYYY-MM-DD"),
          to: moment().subtract(1, "day").format("YYYY-MM-DD"),
        });
        return this.fetchApi();
      case "thisWeek":
        this.setState({
          from: moment().startOf("week").format("YYYY-MM-DD"),
          to: moment().endOf("week").format("YYYY-MM-DD"),
        });
        return this.fetchApi();
      case "lastWeek":
        this.setState({
          from: moment().subtract(1, "week").format("YYYY-MM-DD"),
          to: moment().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
        });
        return this.fetchApi();
      case "thisMonth":
        this.setState({
          from: moment().startOf("month").format("YYYY-MM-DD"),
          to: moment().endOf("month").format("YYYY-MM-DD"),
        });
        return this.fetchApi();
      case "lastMonth":
        this.setState({
          from: moment()
            .subtract(1, "month")
            .startOf("month")
            .format("YYYY-MM-DD"),
          to: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
        });
        return this.fetchApi();
      default:
        return;
    }
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

    const url = `paymentTransaction/search?page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}&quickFilter=${range}&key=${search}&timeStart=${from}&timeEnd=${to}&amountFrom=${
      amount ? amount : amountFrom
    }&amountTo=${amount ? amount : amountTo}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  handleDateChange = async (e, name) => {
    const value = moment(e).format("MM/DD/YYYY");
    await this.setState({
      [name]: value,
    });
    await this.fetchApi();
  };

  render() {
    const { page, from, to, amountTo, amountFrom, amount, range } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        // maxWidth: 200,
        accessor: (e) => {
          return moment.utc(e.createDate).local().format("MM/DD/YYYY HH:mm A");
        },
      },
      {
        Header: "ID",
        accessor: "paymentTransactionId",
        // width: 100,
      },
      {
        id: "Title",
        Header: "Method",
        accessor: "title",
        // width: 100,
      },
      {
        id: "Customer",
        Header: "Original Account",
        accessor: (e) => e?.paymentData?.name_on_card,
        // width: 140,
      },

      {
        id: "Account Details ",
        Header: "Card /Last 4 Digit",
        // width: 180,
        accessor: (e) =>
          e?.paymentData?.card_type ? (
            <span>
              {e?.paymentData?.card_type} <br />
              {` **** **** ****  ${e?.paymentData?.card_number}`}
            </span>
          ) : null,
      },
      {
        id: "MerchantCode",
        Header: "Merchant Account",
        // width: 180,
        accessor: (e) => (
          <span>{`${e?.receiver === null ? "" : e?.receiver?.name}`}</span>
        ),
      },
      {
        id: "Amount",
        Header: "Amount",
        accessor: (e) => e.amount,
        Cell: (e) => <span style={{ fontWeight: 600 }}>${e.value}</span>,
        // width: 100,
      },
      {
        Header: "IP",
        accessor: "ip",
      },
      {
        id: "status",
        Header: "Status",
        accessor: (e) => (
          <p className="TStatus">{e?.status === 1 ? "Success" : "Fail"}</p>
        ),
      },
    ];

    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Transaction | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Transactions" />}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div className="TransactionsBox">
            <SearchComponent
              placeholder="Search"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyDown={this.handEnter}
              name="search"
            />

            <div>
              <Button
                style={{ color: "#0764B0" }}
                onClick={this.handleResetClick}
                className="btn btn-red"
              >
                RESET
              </Button>
            </div>
          </div>
          <Grid
            container
            spacing={0}
            className="TransactionSearch"
            // style={{ textAlign: "center" }}
          >
            <Grid item xs={4} style={{ marginTop: "16px" }}>
              <FormControl style={{ width: "80%" }}>
                <InputLabel>Time Range</InputLabel>
                <Select value={range} onChange={this.timeRange}>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                  <MenuItem value="thisWeek">This Week</MenuItem>
                  <MenuItem value="lastWeek">Last Week</MenuItem>
                  <MenuItem value="thisMonth">This Month</MenuItem>
                  <MenuItem value="lastMonth">Last Month</MenuItem>
                  <MenuItem value="all">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={4}>
                {range === "all" ? (
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
                    style={{ width: "80%" }}
                  />
                ) : null}
              </Grid>
              <Grid item xs={4}>
                {range === "all" ? (
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
                    style={{ width: "80%" }}
                  />
                ) : null}
              </Grid>
            </MuiPickersUtilsProvider>

            <Grid item xs={4} style={{ marginTop: "20px" }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Amount ($)"
                value={amount}
                onChange={this.handleChange}
                name="amount"
                variant="outlined"
                InputProps={{
                  inputComponent: InputCustom,
                }}
                inputProps={{
                  numericOnly: true,
                }}
                style={{ width: "80%" }}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "20px" }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Amount From"
                value={amountFrom === -1 ? 0 : amountFrom}
                onChange={this.handleChange}
                name="amountFrom"
                variant="outlined"
                InputProps={{
                  inputComponent: InputCustom,
                }}
                inputProps={{
                  numericOnly: true,
                }}
                style={{ width: "80%" }}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "20px" }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Amount To"
                value={amountTo === -1 ? 0 : amountTo}
                onChange={this.handleChange}
                name="amountTo"
                variant="outlined"
                InputProps={{
                  inputComponent: InputCustom,
                }}
                inputProps={{
                  numericOnly: true,
                }}
                style={{ width: "80%" }}
              />
            </Grid>
          </Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
