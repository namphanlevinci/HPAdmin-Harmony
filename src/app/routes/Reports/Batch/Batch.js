import React from "react";
import { connect } from "react-redux";
import { getReportMerchantId } from "../../../../actions/reportActions";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { CustomTableHeader } from "../../../../util/CustomText";
import { Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { debounce } from "lodash";

import NewButton from "../../../../../src/components/Button/Search";
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
    };
  }

  searchMerchantBatch = debounce((query) => {
    this.fetchApi();
  }, 1000);
  handleReset = debounce((e) => {
    this.setState({ search: "" });
    this.fetchApi();
  }, 1000);
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  fetchApi = async (state) => {
    const { search } = this.state;
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;

    const url = `settlement?key=${search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;

    this.props.fetchApiByPage(url);
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

    const { page } = this.state;
    const {
      data,
      loading,
      pageSize,
      pageCount,
      totalRow,
      summary,
    } = this.props.apiData;

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
        id: "paymentByCash",
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
        id: "otherPayment",
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
            <div
              className="BatchSearch"
              style={{ display: "flex", alignItems: "center" }}
            >
              <SearchComponent
                placeholder="Search"
                value={this.state.search}
                onChange={this.handleChange}
                onKeyPress={this.keyPressed}
                onClickIcon={this.fetchApi}
              />
              <NewButton style={{ marginLeft: "10px" }} onClick={this.fetchApi}>
                Search
              </NewButton>
            </div>
          </div>
          <NewButton style={{ marginTop: "10px" }} onClick={this.handleReset}>
            Reset
          </NewButton>
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
});
const mapDispatchToProps = (dispatch) => ({
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
  getReportMerchantId: (id) => {
    dispatch(getReportMerchantId(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
