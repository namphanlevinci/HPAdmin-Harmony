import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomTitle } from "../../../../../util/CustomText";
import { motion } from "framer-motion";
import { fetchApiByPage } from "../../../../../actions/fetchApiActions";

import moment from "moment";
import ReactTable from "react-table";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, Button } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-table/react-table.css";
import "../../../Accounts/Logs/Logs.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../../Merchants/MerchantList/MerchantProfile.css";
import "../../../Merchants/PendingList/MerchantReqProfile.css";
import "./Consumer.css";
import "../../../Merchants/Merchants.css";

class ActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      from: undefined,
      to: undefined,
      loadingDate: false,
    };
  }

  handleResetClick = () => {
    this.setState({
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    });
    this.fetchApi();
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
      },
      () => this.setState({ loadingDate: true })
    );
  }

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const { ID, from, to } = this.state;

    const url = `useractivity/${ID}?page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}&from=${from}&to=${to}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  render() {
    const { from, to, page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;
    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        accessor: (e) => {
          return moment.utc(e.createDate).local().format("MM/DD/YYYY HH:mm A");
        },
      },
      {
        Header: "Activity",
        accessor: "action",
      },
    ];

    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={this.props.pageTransition}
      >
        <div className="content ConsumerTransactions   general-content">
          <div>
            <div className="container-fluid">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <CustomTitle value="Activities Logs" />
                <div>
                  <Button
                    className="btn btn-red"
                    onClick={this.handleResetClick}
                  >
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
                </MuiPickersUtilsProvider>
              </Grid>
              <div className="TransactionTable ActivityTable">
                {this.state.loadingDate && (
                  <ReactTable
                    manual
                    page={page}
                    pages={pageCount}
                    data={data !== null ? data : ""}
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
      </motion.div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
