import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomTitle } from "../../../../../util/CustomText";
import { fetchApiByPage } from "../../../../../actions/fetchApiActions";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, Button, Select, MenuItem, InputLabel } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import ReactTable from "react-table";
import FormControl from "@material-ui/core/FormControl";

import "react-table/react-table.css";
import "../../../Accounts/Logs/Logs.css";
import "react-datepicker/dist/react-datepicker.css";

import "../../../Merchants/MerchantList/MerchantProfile.css";
import "../../../Merchants/PendingList/MerchantReqProfile.css";
import "./Consumer.css";
import "../../../Merchants/Merchants.css";
import "moment/locale/it";

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

  handleTimeRange = async (e) => {
    this.setState({
      timeRange: e.target.value,
    });
    await this.fetchApi();
  };

  handleDateChange = async (e, name) => {
    const value = moment(e).format("MM/DD/YYYY");
    this.setState({
      [name]: value,
    });
    await this.fetchApi();
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

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const { ID, from, to, timeRange } = this.state;

    const url = `paymenttransaction/${ID}?page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}&quickFilter=${timeRange}&from=${from}&to=${to}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  render() {
    const { from, to, timeRange, page } = this.state;

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
        accessor: (e) => e?.paymentData?.card_type,
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

    const { data, loading, pageSize, pageCount } = this.props.apiData;

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

            <Grid container spacing={3} style={{ marginBottom: "10px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={4}>
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
                  />
                </Grid>
                <Grid item xs={4}>
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
                  />
                </Grid>
                <Grid item xs={4} style={{ marginTop: "10px" }}>
                  <FormControl style={{ width: "80%" }}>
                    <InputLabel>Time Range</InputLabel>
                    <Select value={timeRange} onChange={this.handleTimeRange}>
                      <MenuItem value="All">All User</MenuItem>
                      <MenuItem value="thisWeek">This Week</MenuItem>
                      <MenuItem value="thisMonth">This Month</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <div className="TransactionTable">
              {this.state.loadingDate && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.consumerById.data,
  apiData: state.fetchApi,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
