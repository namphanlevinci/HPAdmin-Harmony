import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../url/url";
import { CustomTitle } from "../../../../../util/CustomText";

import Button from "@material-ui/core/Button";
import moment from "moment";
import ReactTable from "react-table";
import DateInput from "./date-input";
import axios from "axios";

import "react-table/react-table.css";
import "../../../Accounts/Logs/Logs.css";
import "react-datepicker/dist/react-datepicker.css";

import "../../../Merchants/MerchantList/MerchantProfile.css";
import "../../../Merchants/PendingList/MerchantReqProfile.css";
import "./Consumer.css";
import "../../../Merchants/Merchants.css";
import "moment/locale/it";

const URL = config.url.URL;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      from: undefined,
      to: undefined,
      selectedOption: null,
      timeRange: "All",
      loadingDate: false,
    };
  }
  handleResetClick = () => {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
      timeRange: "All",
    });
  };

  fromDate = async (e) => {
    await this.setState({ from: e.target.value });
    await this.fetchData();
  };
  toDate = async (e) => {
    await this.setState({ to: e.target.value });
    await this.fetchData();
  };
  _TimeRange = async (e) => {
    await this.setState({
      timeRange: e.target.value,
    });
    await this.fetchData();
  };

  componentDidMount() {
    const ID = this.props.ConsumerProfile?.userId;
    this.setState(
      {
        ID: ID,
        from: moment().startOf("month").format("YYYY-MM-DD"),
        to: moment().endOf("month").format("YYYY-MM-DD"),
        timeRange: "All",
      },
      () => this.setState({ loadingDate: true })
    );
  }

  fetchData = async (state) => {
    const page = state?.page ? state?.page : 0;
    const pageSize = state?.pageSize ? state?.pageSize : 20;
    const { ID, from, to, timeRange } = this.state;

    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/paymenttransaction/${ID}?page=${
            page === 0 ? 1 : page + 1
          }&row=${pageSize}&quickFilter=${timeRange}&from=${from}&to=${to}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.userLogin.token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        this.setState({
          page,
          pageCount: res.data.pages,
          data: data,
          loading: false,
          pageSize: 5,
        });
      });
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  render() {
    const { from, to } = this.state;

    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        width: 200,
        accessor: (e) => {
          return moment.utc(e.createDate).local().format("MM/DD/YYYY HH:mm A");
        },
      },
      {
        Header: "Transaction ID",
        accessor: "paymentTransactionId",
      },
      {
        id: "Activity",
        Header: "Activity",
        accessor: (e) => (
          <p className="TStatus" style={{ fontWeight: 0 }}>
            {e?.paymentData?.transaction_type?.toUpperCase()}
          </p>
        ),
      },
      {
        id: "PaymentMethod",
        Header: "Payment Method",
        accessor: (e) => (
          <p className="TStatus" style={{ fontWeight: 0 }}>
            {e?.paymentData?.method?.toUpperCase()}
          </p>
        ),
      },
      {
        id: "cardtype",
        Header: "Card type",
        accessor: (e) => e?.paymentData.card_type,
      },
      {
        id: "amount",
        Header: "Amount",
        accessor: (e) => e.amount,
        Cell: (e) => (
          <span className="">${Math.round(e.value * 100) / 100}</span>
        ),
      },
      {
        Header: "IP",
        accessor: "ip",
      },
      {
        id: "status",
        Header: "Status",
        accessor: (e) => (
          <p className="TStatus" style={{ fontWeight: 0 }}>
            {e.paymentData?.validation_status?.toUpperCase()}
          </p>
        ),
      },
    ];

    const { page, pageCount, data, pageSize } = this.state;

    return (
      <div className="content ConsumerTransactions react-transition swipe-right general-content">
        <div>
          <div className="container-fluid">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <CustomTitle value="Transactions Management" />
              <div>
                <Button className="btn btn-red" onClick={this.handleResetClick}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <form noValidate>
                  <h6
                    style={{
                      color: "rgba(0, 0, 0, 0.54)",
                      fontSize: "0,7rem",
                      textAlign: "left",
                    }}
                  >
                    From
                  </h6>
                  <div>
                    <DateInput fromDate={this.fromDate} date={from} />
                  </div>
                </form>
              </div>
              <div className="col-4">
                <form noValidate>
                  <h6
                    style={{
                      color: "rgba(0, 0, 0, 0.54)",
                      fontSize: "0,7rem",
                      textAlign: "left",
                    }}
                  >
                    To
                  </h6>
                  <div>
                    <DateInput fromDate={this.toDate} date={to} />
                  </div>
                </form>
              </div>
              <div className="col-4">
                <h6
                  style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}
                >
                  Time range
                </h6>
                <select
                  className="search"
                  value={this.state.range}
                  onChange={this._TimeRange}
                >
                  <option value="">ALL </option>
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                </select>
              </div>
            </div>
            <div className="TransactionTable">
              {/* <ReactTable
                data={renderTable}
                columns={columns}
                defaultPageSize={5}
                minRows={1}
                noDataText="NO DATA!"
              /> */}
              {this.state.loadingDate && (
                <ReactTable
                  manual
                  page={page}
                  pages={pageCount}
                  data={data}
                  row={pageSize}
                  // You should also control this...
                  onPageChange={(pageIndex) => this.changePage(pageIndex)}
                  onFetchData={(state) => this.fetchData(state)}
                  defaultPageSize={20}
                  minRows={1}
                  noDataText="NO DATA!"
                  loading={this.state.loading}
                  columns={columns}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.ConsumerReducer.Consumer,
  userLogin: state.userReducer.User,
  TransactionsList: state.userTransaction,
});

export default connect(mapStateToProps)(Transactions);
