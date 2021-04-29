import React from "react";
import { connect } from "react-redux";
import {
  getReportMerchantId,
  setBatchDate,
  setBatchRange,
  setBatchPage,
  setBatchRow,
} from "../../../../actions/reportActions";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { CustomTableHeader } from "../../../../util/CustomText";
import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { debounce } from "lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NewButton from "../../../../../src/components/Button/Search";
import ResetButton from "../../../../../src/components/Button/Reset";

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
      amount: "",
      amountFrom: -1,
      amountTo: -1,
      status: -1,
      page: 0,
      row: 5,
    };
  }

  componentDidMount() {
    const { batchTimeSet } = this.props;
    this.setState({
      page: batchTimeSet.page,
      row: batchTimeSet.row,
    });
  }

  searchMerchantBatch = debounce((query) => {
    this.fetchApi();
  }, 1000);
  handleReset = (e) => {
    this.setState(
      {
        search: "",
      },
      () => {
        this.fetchApi();
      }
    );
    this.props.setBatchPage(0);
    this.props.setBatchDate({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    });
    this.props.setBatchRange("thisMonth");
  };

  handleDateChange = async (e, name) => {
    const value = moment(e).format("MM/DD/YYYY");
    this.setState({
      [name]: value,
    });
    const payload = { [name]: value };
    this.props.setBatchDate(payload);
  };
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };
  timeRange = async (e) => {
    const value = e.target.value;
    this.setState({
      page: 0,
      row: 5,
    });
    this.props.setBatchPage(0);

    this.props.setBatchRange(value);

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
  changePage = async (pageIndex) => {
    await this.props.setBatchPage(pageIndex);
    this.setState({ page: this.props.batchTimeSet.page });
  };
  changePageSize = async (row) => {
    await this.props.setBatchRow(row);
    console.log("row", this.props.batchTimeSet.row);
    this.setState({ row: this.props.batchTimeSet.row });
  };
  fetchApi = async (state) => {
    const { search } = this.state;

    console.log("state", state);
    const { range, from, to } = await this.props.batchTimeSet;
    const { page, row } = this.state;
    console.log("asdawdasgawgasas", page);
    const sortType = state?.sorted?.[0]?.desc ? "desc" : "asc";
    const sortValue = state?.sorted?.[0]?.id ? state?.sorted[0]?.id : "";

    const url = `settlement?key=${search}&page=${
      page + 1
    }&row=${row}&timeStart=${from}&quickFilter=${range}&timeEnd=${to}&sortValue=${sortValue}&sortType=${sortType}`;

    this.props.fetchApiByPage(url);
  };

  resetpage = () => {
    this.props.setBatchPage(0);
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

    const { range, from, to, page, row } = this.props.batchTimeSet;
    const { data, loading, pageCount, totalRow, summary } = this.props.apiData;
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
        Header: <CustomTableHeader value="Terminal" />,
        id: "serialNumber",
        accessor: (e) => (
          <Typography variant="subtitle1">
            {e.serialNumber && `#${e.serialNumber}`}
          </Typography>
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
            <Grid
              container
              spacing={3}
              className="BatchSearch"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={2}>
                <SearchComponent
                  placeholder="Search"
                  value={this.state.search}
                  onChange={(e) => this.handleChange(e)}
                  onKeyPress={this.keyPressed}
                  onClickIcon={this.fetchApi}
                />
              </Grid>
              <NewButton style={{ marginLeft: "10px" }} onClick={this.fetchApi}>
                Search
              </NewButton>
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
                <Select
                  value={this.props.batchTimeSet.range}
                  onChange={this.timeRange}
                >
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
                </Grid>
              </MuiPickersUtilsProvider>
            ) : null}
          </Grid>
          <ResetButton style={{ marginTop: "10px" }} onClick={this.handleReset}>
            Reset filter
          </ResetButton>
          <div className="merchant-list-container Transactions">
            <ReactTable
              manual={true}
              pageSize={row}
              page={page}
              pages={pageCount}
              data={data}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onPageSizeChange={(size) => this.changePageSize(size)}
              onFetchData={(state) => {
                this.fetchApi(state, page);
              }}
              defaultPageSize={5}
              minRows={1}
              noDataText="NO DATA!"
              loading={loading}
              columns={columns}
              showPageJump={false}
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
  batchTimeSet: state.batchTime,
});
const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  getReportMerchantId: (id) => {
    dispatch(getReportMerchantId(id));
  },
  setBatchDate: (payload) => {
    dispatch(setBatchDate(payload));
  },
  setBatchRange: (payload) => {
    dispatch(setBatchRange(payload));
  },
  setBatchPage: (page) => {
    dispatch(setBatchPage(page));
  },
  setBatchRow: (row) => {
    dispatch(setBatchRow(row));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
