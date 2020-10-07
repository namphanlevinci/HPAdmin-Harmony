import React from "react";
import { connect } from "react-redux";
import { getP2P_Transactions } from "../../../../actions/transactions/actions";
import { DebounceInput } from "react-debounce-input";
import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";

import axios from "axios";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import moment from "moment";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import DateInput from "../../Consumers/ConsumerProfile/Detail/date-input";

import "react-table/react-table.css";
import "../Transactions/Transactions.css";
import "../../Merchants/MerchantsList/merchantsList.css";

const URL = config.url.URL;

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
  };
  fromDate = async (e) => {
    await this.setState({ from: e.target.value, range: "all" });
    await this.fetchData();
  };
  toDate = async (e) => {
    await this.setState({ to: e.target.value, range: "all" });
    await this.fetchData();
  };

  componentDidMount() {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    });
  }

  _handleChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    this.fetchData();
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
    await this.fetchData();
  };

  fetchData = async (state) => {
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
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/p2pgiftcard/transaction?page=${
            page === 0 ? 1 : page + 1
          }&row=${pageSize}&quickFilter=${range}&key=${search}&timeStart=${from}&timeEnd=${to}&amountFrom=${
            amount ? amount : amountFrom
          }&amountTo=${amount ? amount : amountTo}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.userLogin.token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        if (Number(res.data.codeNumber) === 200) {
          this.setState({
            page,
            pageCount: res.data.pages,
            data: data,
            loading: false,
            pageSize: 5,
          });
        } else {
          this.setState({ data: [] });
        }
        this.setState({ loading: false });
      });
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  render() {
    const {
      page,
      pageCount,
      data,
      pageSize,
      from,
      to,
      amountTo,
      amountFrom,
      amount,
    } = this.state;

    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        accessor: (e) => {
          return moment.utc(e.createdDate).local().format("MM/DD/YYYY hh:mm A");
        },
      },
      {
        id: "Sender",
        Header: "Sender",
        accessor: "senderUserName",
      },
      {
        id: "Receiver",
        Header: "Receiver",
        accessor: "receiveUserName",
      },
      {
        id: "Type ",
        Header: "Type",
        accessor: (row) => <span>Gift Card</span>,
      },
      {
        id: "Status",
        Header: "Status",
        accessor: (e) =>
          e.status !== null ? <p className="P2pStatus">{e.status}</p> : null,
      },
      {
        id: "Amount",
        Header: "Amount",
        accessor: (e) => (e.amount !== null ? <span>${e.amount}</span> : null),
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
            <div className="search">
              <form>
                <SearchIcon className="button" title="Search" />

                <DebounceInput
                  debounceTimeout={500}
                  type="text"
                  name="search"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._handleChange}
                />
              </form>
            </div>

            <div>
              <Button
                style={{ color: "#4251af", marginTop: "0" }}
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
              <h6
                style={{
                  color: "rgba(0, 0, 0, 0.54)",
                  fontSize: "0,7rem",
                }}
              >
                Amount ($)
              </h6>
              <form style={{ width: "100%" }}>
                <DebounceInput
                  type="text"
                  name="amount"
                  className="textBox"
                  debounceTimeout={500}
                  placeholder="Amount ($)"
                  value={amount}
                  onChange={this._handleChange}
                />
              </form>
            </div>
            <div className="col-4">
              <div className="search">
                <h6
                  style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}
                >
                  Amount From:
                </h6>
                <form style={{ width: "100%" }}>
                  <DebounceInput
                    type="text"
                    className="textBox"
                    name="amountFrom"
                    debounceTimeout={500}
                    placeholder="Amount From"
                    value={amountFrom === -1 ? 0 : amountFrom}
                    onChange={this._handleChange}
                  />
                </form>
              </div>
            </div>
            <div className="col-4">
              <div className="search">
                <h6
                  style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}
                >
                  Amount To:
                </h6>
                <form style={{ width: "100%" }}>
                  <DebounceInput
                    type="text"
                    className="textBox"
                    name="amountTo"
                    debounceTimeout={500}
                    placeholder="Amount To"
                    value={amountTo === -1 ? 0 : amountTo}
                    onChange={this._handleChange}
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
              onFetchData={(state) => this.fetchData(state)}
              defaultPageSize={20}
              minRows={1}
              noDataText="NO DATA!"
              loading={this.state.loading}
              columns={columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
  TransactionList: state.getTransactions,
  P2PList: state.GetP2P,
});
const mapDispatchToProps = (dispatch) => ({
  getP2P_Transactions: () => {
    dispatch(getP2P_Transactions());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(P2P);

const styles = {
  label: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "0,7rem",
    textAlign: "left",
  },
};
