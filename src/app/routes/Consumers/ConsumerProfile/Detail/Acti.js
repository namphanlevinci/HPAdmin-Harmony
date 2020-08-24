import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../url/url";

import Button from "@material-ui/core/Button";
import moment from "moment";
import ReactTable from "react-table";
import DateInput from "./date-input";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import "react-table/react-table.css";
import "../../../Accounts/Logs/Logs.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import "./Consumer.css";
import "../../../Merchants/MerchantsList/merchantsList.css";

const URL = config.url.URL;

class Acti extends Component {
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
      from: moment()
        .startOf("month")
        .format("YYYY-MM-DD"),
      to: moment()
        .endOf("month")
        .format("YYYY-MM-DD"),
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
        from: moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        to: moment()
          .endOf("month")
          .format("YYYY-MM-DD"),
      },
      () => this.setState({ loadingDate: true })
    );
  }
  fetchData = async (state) => {
    // const { page, pageSize } = state;
    const page = state?.page ? state?.page : 0;
    const pageSize = state?.pageSize ? state?.pageSize : 20;
    const { ID, from, to } = this.state;

    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/useractivity/${ID}?page=${
            page === 0 ? 1 : page + 1
          }&row=${pageSize}&from=${from}&to=${to}`,
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
    const { page, pageCount, data, pageSize } = this.state;

    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        accessor: (e) => {
          return moment
            .utc(e.createDate)
            .local()
            .format("MM/DD/YYYY HH:mm A");
        },
      },
      {
        Header: "Activity",
        accessor: "action",
      },
    ];
    const { from, to } = this.state;

    return (
      <div className="content ConsumerTransactions  react-transition swipe-right general-content">
        <div>
          <div className="container-fluid">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <h2>Activities Logs</h2>
              <div>
                <Button className="btn btn-red" onClick={this.handleResetClick}>
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
  userActivity: state.userActivity,
});

export default connect(mapStateToProps)(Acti);
