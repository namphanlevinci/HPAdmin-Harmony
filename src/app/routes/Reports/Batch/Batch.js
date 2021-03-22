import React from "react";
import { connect } from "react-redux";
import { getReportMerchantId } from "../../../../actions/reportActions";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { CustomTableHeader } from "../../../../util/CustomText";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { debounce } from "lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputCustom from "../../../../util/CustomInput";
import NewButton from "../../../../../src/components/Button/Search";
import SearchComponent from "../../../../util/searchComponent";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import moment from "moment";

import "../Transactions/Transactions.css";
import "../../Merchants/Merchants.css";
import "react-table/react-table.css";
import "./Batch.css";

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
      range: "",
      status: -1,
    };
  }

  componentDidMount() {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    });
  }

  searchMerchantBatch = debounce((query) => {
    this.fetchApi();
  }, 1000);
  handleReset = debounce((e) => {
    this.setState({ search: "" });
    this.fetchApi();
  }, 1000);
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };
  handleDateChange = async (e, name) => {
    const value = moment(e).format("MM/DD/YYYY");
    await this.setState({
      [name]: value,
    });
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

  fetchApi = async (state) => {
    const { search, from, to, range } = this.state;
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;
    const sortType = state?.sorted?.[0]?.desc ? "desc" : "asc";
    const sortValue = state?.sorted?.[0]?.id ? state?.sorted[0]?.id : "";

    const url = `settlement?key=${search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}&timeStart=${from}&quickFilter=${range}&timeEnd=${to}&sortValue=${sortValue}&sortType=${sortType}`;
    // {{host}}api/settlement?page=1&row=20&timeStart=2019-03-01&timeEnd=2021-03-31
    //&sortValue=created_date&sortType=desc&key=405

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      this.fetchApi();
    }
  };

  render() {
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            const url = `settlement/${rowInfo?.original?.settlementId}`;
            this.props.fetchApiByPage(url);
            this.props.getReportMerchantId(rowInfo?.original);
            this.props.history.push("/app/reports/batchs/detail");
          }
        },
      };
    };

    const { page, amountTo, amountFrom, range, status, from, to } = this.state;
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
        Header: <CustomTableHeader value="Date/Time" />,
        id: "dateTime",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(e.settlementDate).format("MM/DD/YYYY hh:mm A")}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            Total Transaction: {totalRow}
          </Typography>
        ),
        width: 200,
      },
      {
        id: "Customer",
        Header: <CustomTableHeader value="Merchant DBA" />,
        accessor: (e) => (
          <Typography variant="subtitle1">{e.doBusinessName}</Typography>
        ),
        width: 130,
      },
      {
        Header: <CustomTableHeader value="Merchant ID" />,
        id: "merchantId",
        accessor: (e) => (
          <Typography variant="subtitle1">{e.merchantId}</Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="HarmonyPay" />,
        id: "paymentByHarmony",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            ${e.paymentByHarmony}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.paymentByHarmony}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Credit Card" />,
        id: "paymentByCreditCard",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            ${e.paymentByCreditCard}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.paymentByCreditCard}
          </Typography>
        ),
      },

      {
        Header: <CustomTableHeader value="Cash" />,
        id: "paymentByCash",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            ${e.paymentByCashStatistic}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.paymentByCash}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Gift Card" />,
        id: "paymentByGiftCash",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            ${e.paymentByGiftcard}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.paymentByGiftcard}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Other" />,
        id: "otherPayment",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            ${e.otherPaymentStatistic}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.otherPayment}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Discount" />,
        id: "discount",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            ${e?.discount}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.discount}
          </Typography>
        ),
      },
      {
        Header: "Total",
        id: "total",
        accessor: (e) => (
          <Typography variant="subtitle1">${e.total}</Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.total}
          </Typography>
        ),
      },
    ];

    return (
      <div className="container-fluid react-transition swipe-right Batchs">
        <Helmet>
          <title>Batch Settlement | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Batch" />}
        />
        <div
          className="MerList batch-container page-heading"
          style={{ padding: "10px" }}
        >
          <div className=" TransactionsBox">
            <div
              className="BatchSearch"
              style={{ display: "flex", alignItems: "center" }}
            >
              <SearchComponent
                placeholder="Search"
                value={this.state.search}
                onChange={this.handleChange}
                onKeyPress={this.keyPressed}
                onClickIcon={this.fetchApi}
              />
              <NewButton style={{ marginLeft: "10px" }} onClick={this.fetchApi}>
                Search
              </NewButton>
            </div>
          </div>
          <NewButton style={{ marginTop: "10px" }} onClick={this.handleReset}>
            Reset
          </NewButton>
          <Grid container spacing={0} className="TransactionSearch">
            <Grid item xs={3} style={{ marginTop: "20px" }}>
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
            {range === "all" ? (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={3} style={{ marginTop: "5px" }}>
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
                </Grid>
                <Grid item xs={3} style={{ marginTop: "5px" }}>
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
                </Grid>
              </MuiPickersUtilsProvider>
            ) : null}

            <Grid
              item
              xs={3}
              style={{
                marginTop: "20px",
                marginLeft: "auto",
                textAlign: "right",
              }}
            ></Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
