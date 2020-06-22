import React from "react";
import { connect } from "react-redux";
import {
  getBatch,
  getBatchDetail,
} from "../../../../actions/transactions/actions";
import { store } from "react-notifications-component";
import axios from "axios";
import URL from "../../../../url/url";

import "../../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Batch.css";
import moment from "moment";
import "../Transactions/Transactions.css";
import "../../Merchants/MerchantsList/merchantsList.css";
import SearchIcon from "@material-ui/icons/Search";

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
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
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
          store.addNotification({
            title: "ERROR!",
            message: `${res.data.message}`,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });
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
            this.props.fetchBatchDetail(rowInfo.original.settlementId);
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
            width: 120,
            accessor: (e) => {
              return moment
                .utc(e.settlementDate)
                .local()
                .format("MM/DD/YYYY HH:mm A");
            },
          },
        ],
      },
      {
        id: "Customer",
        Header: "Merchant DBA",
        width: 100,
        columns: [
          {
            Header: "",
            id: "DBA",
            accessor: (e) => (
              <span style={{ fontWeight: 600 }}>{e.doBusinessName}</span>
            ),
          },
        ],
      },
      {
        Header: "Merchant ID",
        columns: [
          {
            Header: "",
            accessor: "merchantId",
            width: 120,
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
            Header: "Harmony Credit",
            id: "paymentByHarmony",
            accessor: (e) => <span>${e.paymentByHarmony}</span>,
          },
          {
            Header: "Credit Card",
            id: "paymentByCreditCard",
            accessor: (e) => <span>${e.paymentByCreditCard}</span>,
          },
          {
            Header: "Cash",
            id: "paymentByCash",
            accessor: (e) => <span>${e.paymentByCash}</span>,
          },
          {
            Header: "Other",
            id: "otherPayment",
            accessor: (e) => <span>${e.otherPayment}</span>,
          },
        ],
      },
      {
        Header: "Total",
        width: 180,
        columns: [
          {
            Header: "",
            id: "total",
            accessor: (e) => (
              <span style={{ fontWeight: 600 }}>${e.total}</span>
            ),
          },
        ],
      },
    ];

    const { page, pageCount, data, pageSize } = this.state;
    return (
      <div className="container-fluid react-transition swipe-right Batchs">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Batch" />}
        />
        <div
          className="MerList BatchsContainer page-heading"
          style={{ padding: "10px" }}
        >
          <div className="MReqSP TransactionsBox">
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
          <div className="MListContainer Transactions">
            {/* <ReactTable
              data={BatchList}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              noDataText="NO DATA!"
              getTdProps={onRowClick}
            /> */}
            <ReactTable
              manual
              page={page}
              pages={pageCount}
              data={data}
              row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchData(state)}
              defaultPageSize={20}
              minRows={0}
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
  InfoUser_Login: state.User,
  Batch: state.getAllBatch,
});
const mapDispatchToProps = (dispatch) => ({
  getBatch: () => {
    dispatch(getBatch());
  },
  fetchBatchDetail: (payload) => {
    dispatch(getBatchDetail(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
