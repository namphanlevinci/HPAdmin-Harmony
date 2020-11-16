import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomTitle } from "../../../../../util/CustomText";
import { motion } from "framer-motion";
import { fetchApiByPage } from "../../../../../actions/fetchApiActions";

import Button from "@material-ui/core/Button";
import moment from "moment";
import ReactTable from "react-table";
import DateInput from "./date-input";

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
    this.fetchData();
  };
  fromDate = async (e) => {
    await this.setState({ from: e.target.value });
    await this.fetchData();
  };
  toDate = async (e) => {
    await this.setState({ to: e.target.value });
    await this.fetchData();
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
    const { page } = this.state;
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
    const { from, to } = this.state;

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

              <div className="row">
                <div className="col-4">
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
                    <form noValidate>
                      <DateInput fromDate={this.fromDate} date={from} />
                    </form>
                  </div>
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
              </div>
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
