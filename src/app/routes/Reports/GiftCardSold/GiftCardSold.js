import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { getReportMerchantId } from "../../../../actions/reportActions";
import { debounce } from "lodash";
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
  Typography,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import ReactTable from "react-table";
import SearchComponent from "../../../../util/searchComponent";
import NewButton from "../../../../components/Button/Search";
import ResetButton from "../../../../components/Button/Reset";

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
      range: "thisMonth",
    };
  }
  handleResetClick = async () => {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
      range: "thisMonth",
    });
    this.searchTransaction();
  };

  componentDidMount() {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    });
  }

  searchTransaction = debounce((query) => {
    this.fetchApi();
  }, 800);

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
  };

  fetchApi = async (state) => {
    const { from, to, search, range } = this.state;
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;
    const sortType = state?.sorted?.[0]?.desc ? "desc" : "asc";
    const sortValue = state?.sorted?.[0]?.id ? state?.sorted[0]?.id : "";

    const url = `giftcard/sold?page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}&quickFilter=${range}&key=${search}&timeStart=${from}&timeEnd=${to}&sortValue=${sortValue}&sortType=${sortType}`;

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
    console.log("propssss", this.props);

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          console.log(rowInfo);
          if (rowInfo !== undefined) {
            const url = `GiftCard/sold/${rowInfo?.original?.merchantId}?date=${rowInfo?.original?.date}`;
            this.props.fetchApiByPage(url);
            this.props.getReportMerchantId(rowInfo?.original);
            this.props.history.push("/app/reports/gift-card-sold/detail");
          }
        },
      };
    };
    const { page, from, to, range } = this.state;
    const {
      data,
      loading,
      pageSize,
      pageCount,
      totalRow,
      summary,
    } = this.props.apiData;
    console.log("total", this.props.apiData);

    const columns = [
      {
        id: "date",
        Header: "Date/time",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {moment.utc(e.date).local().format("MM/DD/YYYY hh:mm A")}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            Total Rows: {totalRow}
          </Typography>
        ),
      },
      {
        id: "merchant",
        Header: "Merchant Account",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.merchant}
          </Typography>
        ),
      },
      {
        id: "quantity",
        Header: "Quantity Sold",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e?.quantity}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            {summary?.quantity}
          </Typography>
        ),
      },
      {
        id: "amount",
        Header: "Total Amount",
        accessor: (row) => (
          <Typography variant="subtitle1">${row?.amount}</Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.amount}
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
              spacing={3}
              className="search"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={2}>
                <SearchComponent
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this.handleChange}
                  onKeyDown={this.handEnter}
                  onClickIcon={this.fetchApi}
                  name="search"
                />
              </Grid>
              <NewButton
                style={{ marginLeft: "10px" }}
                onClick={() => this.fetchApi()}
              >
                Search
              </NewButton>
            </Grid>
          </div>
          <Grid
            container
            spacing={3}
            className="TransactionSearch"
            style={{ marginTop: 10 }}
          >
            <Grid item xs={2}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel>Time Range</InputLabel>
                <Select value={range} onChange={this.timeRange}>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                  <MenuItem value="thisWeek">This Week</MenuItem>
                  <MenuItem value="lastWeek">Last Week</MenuItem>
                  <MenuItem value="thisMonth">This Month</MenuItem>
                  <MenuItem value="lastMonth">Last Month</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={2}>
                {this.state.range === "custom" && (
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
                )}
              </Grid>

              <Grid item xs={2}>
                {this.state.range === "custom" && (
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
                )}
              </Grid>
            </MuiPickersUtilsProvider>

            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            ></Grid>
          </Grid>
          <ResetButton
            style={{
              marginTop: "10px",
            }}
            onClick={this.handleResetClick}
          >
            Reset filter
          </ResetButton>
          <div className="merchant-list-container Transactions">
            <ReactTable
              manual={true}
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
              getTdProps={onRowClick}
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
  getReportMerchantId: (id) => {
    dispatch(getReportMerchantId(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(P2P);
