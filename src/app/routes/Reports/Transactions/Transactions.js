import React from "react";
import { connect } from "react-redux";
import { fetchApiByPage } from "@/actions/fetchApiActions";
import { Helmet } from "react-helmet";
import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";

import { debounce } from "lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import IntlMessages from "@/util/IntlMessages";
import ContainerHeader from "@/components/ContainerHeader/index";
import moment from "moment";
import ReactTable from "react-table";
import SearchComponent from "@/util/searchComponent";
import InputCustom from "@/util/CustomInput";
import NewButton from "@/components/Button/Search";
import ResetButton from "@/components/Button/Reset";
import Pagination from "@/components/Pagination";

import "./Transactions.css";
import "react-table/react-table.css";
import "../../Merchants/Merchants.css";

const initialState = {
  search: "",
  from: moment().startOf("month").format("YYYY-MM-DD"),
  to: moment().endOf("month").format("YYYY-MM-DD"),
  amount: "",
  amountFrom: -1,
  amountTo: -1,
  range: "thisMonth",
  status: -1,
}

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.refTable = React.createRef();
    this.pagination = React.createRef();
  }

  handleResetClick = async () => {
    await this.setState(initialState);
    await this.pagination.current.changePage(1);
    this.fetchApi();
  };

  componentDidMount() {
    this.fetchApi();
  }

  searchTransaction = debounce((query) => {
    this.fetchApi();
  }, 1000);

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
    await this.setState({ range: value });

    switch (value) {
      case "today":
        this.setState({
          from: moment().startOf("day").format("YYYY-MM-DD"),
          to: moment().startOf("day").format("YYYY-MM-DD"),
        });
        return;

      case "yesterday":
        this.setState({
          from: moment().subtract(1, "day").format("YYYY-MM-DD"),
          to: moment().subtract(1, "day").format("YYYY-MM-DD"),
        });
        return;

      case "thisWeek":
        this.setState({
          from: moment().startOf("week").format("YYYY-MM-DD"),
          to: moment().endOf("week").format("YYYY-MM-DD"),
        });
        return;

      case "lastWeek":
        this.setState({
          from: moment().subtract(1, "week").format("YYYY-MM-DD"),
          to: moment().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
        });
        return;

      case "thisMonth":
        this.setState({
          from: moment().startOf("month").format("YYYY-MM-DD"),
          to: moment().endOf("month").format("YYYY-MM-DD"),
        });
        return;

      case "lastMonth":
        this.setState({
          from: moment()
            .subtract(1, "month")
            .startOf("month")
            .format("YYYY-MM-DD"),
          to: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
        });

        return;
      default:
        return;
    }
  };

  search = async() =>{
    await this.pagination.current.changePage(1);
    await this.fetchApi();
  }

  fetchApi = async (state) => {
    const {
      from,
      to,
      search,
      range,
      amount,
      amountFrom,
      amountTo,
      status,
    } = this.state;
    let page = this.pagination.current.state.page;
    let row = this.pagination.current.state.rowSelected;
    const sortType = state?.sorted?.[0]?.desc ? "desc" : "asc";
    const sortValue = state?.sorted?.[0]?.id ? state?.sorted[0]?.id : "";

    const url = `paymentTransaction/search?page=${page}&row=${row}&quickFilter=${range}&key=${search}&timeStart=${from}&timeEnd=${to}&amountFrom=${amount ? amount : amountFrom
      }&amountTo=${amount ? amount : amountTo
      }&sortValue=${sortValue}&sortType=${sortType}&status=${status}`;
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
  };

  render() {
    const { page, from, to, amountTo, amountFrom, range, status } = this.state;
    const {
      data,
      loading,
      pageSize,
      pageCount,
      totalRow,
      summary,
    } = this.props.apiData;

    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(e.createDate).format("MM/DD/YYYY hh:mm A")}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            Total Transaction: {totalRow}
          </Typography>
        ),
        width: 220,
      },
      {
        Header: "ID",
        id: "paymentTransactionId",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.paymentTransactionId}
          </Typography>
        ),
        width: 100,
      },
      {
        Header: "MID",
        id: "merchantCode",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.merchantCode}
          </Typography>
        ),
        width: 100,
      },
      {
        id: "title",
        Header: "Method",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.title}
          </Typography>
        ),
      },
      {
        id: "Customer",
        Header: "Original Account",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.paymentData?.name_on_card}
          </Typography>
        ),
        sortable: false,
      },

      {
        id: "Account Details ",
        Header: "Card /Last 4 Digit",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.paymentData?.card_type ? (
              <span>
                {e?.paymentData?.card_type} <br />
                {` **** **** ****  ${e?.paymentData?.card_number}`}
              </span>
            ) : null}
          </Typography>
        ),
        sortable: false,
      },
      {
        id: "MerchantCode",
        Header: "Merchant Account",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {`${e?.receiver === null ? "" : e?.receiver?.name}`}
          </Typography>
        ),
        sortable: false,
      },
      {
        id: "amount",
        Header: "Amount",
        accessor: (e) => e.amount,
        Cell: (e) => <Typography variant="subtitle1">${e.value}</Typography>,
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.amount}
          </Typography>
        ),
      },
      {
        Header: "IP",
        id: "ip",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.ip}
          </Typography>
        ),
      },
      {
        id: "status",
        Header: "Status",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.status === 1 ? "Success" : "Fail"}
          </Typography>
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
            <Grid
              container
              spacing={0}
              className="BatchSearch"
              style={{ marginBottom: 15 }}
            >
              <div className="container-search-component">
                <SearchComponent
                  placeholder="Search"
                  value={this.state.search}
                  onChange={this.handleChange}
                  onKeyDown={this.handEnter}
                  onClickIcon={() => this.setState({ search: "" })}
                  name="search"
                />
                <NewButton
                  style={{ marginLeft: "10px" }}
                  onClick={this.search}
                >
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
            <Grid item xs={2} style={{}}>
              <FormControl style={{ width: "100%" }}>
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

            {range === "all" ? (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={2} style={{}}>
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
                <Grid item xs={2} style={{}}>
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
                </Grid>
              </MuiPickersUtilsProvider>
            ) : null}

            <Grid item xs={2} style={{}}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
                  <MenuItem value={-1}>All Status</MenuItem>
                  <MenuItem value={1}>Success </MenuItem>
                  <MenuItem value={2}>Failure</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2} style={{}}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Amount From"
                value={amountFrom === -1 ? 0 : amountFrom}
                onChange={this.handleChange}
                name="amountFrom"
                InputProps={{
                  inputComponent: InputCustom,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                inputProps={{
                  numericOnly: true,
                }}
                style={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={2} style={{}}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Amount To"
                value={amountTo === -1 ? 0 : amountTo}
                onChange={this.handleChange}
                name="amountTo"
                InputProps={{
                  inputComponent: InputCustom,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
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
              ref={this.refTable}
              manual={false}
              data={data}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
              columns={columns}
              PaginationComponent={() => <div />}
            />
            <Pagination
              ref={this.pagination}
              fetchApi={this.fetchApi}
              pageCount={pageCount}
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
