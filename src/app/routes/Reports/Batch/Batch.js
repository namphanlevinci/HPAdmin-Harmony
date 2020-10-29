import React from "react";
import { connect } from "react-redux";
import {
  getBatch,
  getBatchDetail,
} from "../../../../actions/transactions/actions";
import { ViewProfile_Merchants } from "../../../../actions/merchants/actions";

import axios from "axios";
import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";

import SearchIcon from "@material-ui/icons/Search";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import moment from "moment";

import "../Transactions/Transactions.css";
import "../../Merchants/Merchants.css";
import "react-table/react-table.css";
import "./Batch.css";

const URL = config.url.URL;

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  searchMerchantBatch = async (e) => {
    await this.setState({ search: e.target.value });
  };

  fetchData = async (state) => {
    const { search } = this.state;
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;
    this.setState({ loading: true });

    await axios
      .get(
        URL +
          `/settlement?key=${search}&page=${
            page === 0 ? 1 : page + 1
          }&row=${pageSize}`,
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

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      this.fetchData();
    }
  };

  render() {
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this.props.fetchBatchDetail(rowInfo?.original?.settlementId);
            this.props.passMerchantID(rowInfo?.original);
            this.props.history.push("/app/reports/batchs/detail");
          }
        },
      };
    };

    const columns = [
      {
        Header: "Date/Time",
        columns: [
          {
            Header: "",
            id: "dateTime",
            accessor: (e) => (
              <p>{moment.utc(e.settlementDate).local().format("LLL")}</p>
            ),
            width: 200,
          },
        ],
      },
      {
        id: "Customer",
        Header: "Merchant DBA",
        columns: [
          {
            Header: "",
            id: "DBA",
            accessor: (e) => (
              <p style={{ fontWeight: 400 }}>{e.doBusinessName}</p>
            ),
            width: 130,
          },
        ],
      },
      {
        Header: "Merchant ID",
        columns: [
          {
            Header: "",
            id: "merchantId",
            accessor: (e) => <p style={{ fontWeight: 400 }}>{e.merchantId}</p>,
          },
        ],
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Reports
          </div>
        ),

        columns: [
          {
            Header: "HarmonyPay",
            id: "paymentByHarmony",
            accessor: (e) => <p>${e.paymentByHarmony}</p>,
          },
          {
            Header: "Credit Card",
            id: "paymentByCreditCard",
            accessor: (e) => <p>${e.paymentByCreditCard}</p>,
          },
          {
            Header: "Cash",
            id: "paymentByCash",
            accessor: (e) => <p>${e.paymentByCash}</p>,
          },
          {
            Header: "Other",
            id: "otherPayment",
            accessor: (e) => <p>${e.otherPayment}</p>,
          },
        ],
      },
      {
        Header: "Total",
        columns: [
          {
            Header: "",
            id: "total",
            accessor: (e) => <p style={{ fontWeight: 400 }}>${e.total}</p>,
          },
        ],
      },
    ];

    const { page, pageCount, data, pageSize } = this.state;
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
            <div className="BatchSearch">
              <form>
                <SearchIcon className="button" title="Search" />
                <input
                  type="text"
                  className="textBox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this.searchMerchantBatch}
                  onKeyPress={this.keyPressed}
                />
              </form>
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
              getTdProps={onRowClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
  Batch: state.getAllBatch,
});
const mapDispatchToProps = (dispatch) => ({
  getBatch: () => {
    dispatch(getBatch());
  },
  fetchBatchDetail: (payload) => {
    dispatch(getBatchDetail(payload));
  },
  passMerchantID: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
