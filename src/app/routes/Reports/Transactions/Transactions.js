import React from "react";
import { connect } from "react-redux";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { DebounceInput } from "react-debounce-input";
import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import DateInput from "../../Consumers/ConsumerProfile/Detail/date-input";

import "./Transactions.css";
import "react-table/react-table.css";
import "../../Merchants/Merchants.css";

const URL = config.url.URL;

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
  fromDate = async (e) => {
    await this.setState({ from: e.target.value, range: "all" });
    await this.fetchApi();
  };
  toDate = async (e) => {
    await this.setState({ to: e.target.value, range: "all" });
    await this.fetchApi();
  };

  componentDidMount() {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    });
  }

  searchMerchants = async (e) => {
    await this.setState({ search: e.target.value });
  };

  handEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.fetchApi();
    }
  };

  searchAmount = async (e) => {
    await this.setState({ amount: e.target.value });
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

  handleChange = async (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    await this.setState({
      [name]: value,
    });
    this.fetchApi();
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

    const url = `${URL}/paymentTransaction/search?page=${
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

  render() {
    const { page, from, to, amountTo, amountFrom, amount } = this.state;
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
          <div className=" TransactionsBox">
            {/* SEARCH */}
            <div className="search">
              <form>
                <SearchIcon className="button" title="Search" />
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this.searchMerchants}
                  onKeyDown={this.handEnter}
                />
              </form>
            </div>

            <div>
              <Button
                style={{ color: "#4251af" }}
                onClick={this.handleResetClick}
                className="btn btn-red"
              >
                RESET
              </Button>
            </div>
          </div>
          <div className="row TransactionSearch" style={{ marginTop: "10px" }}>
            <div className="col-4">
              <form noValidate>
                <h6 style={styles.label}>From</h6>
                <DateInput fromDate={this.fromDate} date={from} />
              </form>
            </div>
            <div className="col-4">
              <form noValidate>
                <h6 style={styles.label}>To</h6>
                <DateInput fromDate={this.toDate} date={to} />
              </form>
            </div>
            <div className="col-4">
              <h6 style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}>
                Time range
              </h6>
              <select
                className="search"
                value={this.state.range}
                onChange={this.timeRange}
                style={{ width: "100%" }}
              >
                <option value="all">ALL</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisWeek">This Week</option>
                <option value="lastWeek">Last Week</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
              </select>
            </div>
            <div className="col-4 search">
              <h6 style={styles.label}>Amount ($)</h6>
              <form style={{ width: "100%" }}>
                <DebounceInput
                  type="text"
                  name="amount"
                  className="textBox"
                  debounceTimeout={500}
                  placeholder="Amount ($)"
                  value={amount}
                  onChange={this.handleChange}
                />
              </form>
            </div>
            <div className="col-4">
              <div className="search">
                <h6 style={styles.label}>Amount From:</h6>
                <form style={{ width: "100%" }}>
                  <DebounceInput
                    type="text"
                    className="textBox"
                    style={{ width: "265px" }}
                    name="amountFrom"
                    debounceTimeout={500}
                    placeholder="Amount From"
                    value={amountFrom === -1 ? 0 : amountFrom}
                    onChange={this.handleChange}
                  />
                </form>
              </div>
            </div>
            <div className="col-4">
              <div className="search">
                <h6 style={styles.label}>Amount To:</h6>
                <form style={{ width: "100%" }}>
                  <DebounceInput
                    type="text"
                    className="textBox"
                    name="amountTo"
                    debounceTimeout={500}
                    placeholder="Amount To"
                    value={amountTo === -1 ? 0 : amountTo}
                    onChange={this.handleChange}
                  />
                </form>
              </div>
            </div>
          </div>
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

const styles = {
  label: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "0,7rem",
    textAlign: "left",
  },
};
