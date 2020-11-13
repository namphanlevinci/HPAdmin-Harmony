import React from "react";
import { connect } from "react-redux";
import { getReportMerchantId } from "../../../../actions/reportActions";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { CustomTableHeader } from "../../../../util/CustomText";
import { Typography } from "@material-ui/core";
import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";

import SearchComponent from "../../../../util/searchComponent";
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

  fetchApi = async (state) => {
    const { search } = this.state;
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;

    const url = `${URL}/settlement?key=${search}&page=${
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
            const url = `${URL}/settlement/${rowInfo?.original?.settlementId}`;
            this.props.fetchApiByPage(url);
            this.props.getReportMerchantId(rowInfo?.original);
            this.props.history.push("/app/reports/batchs/detail");
          }
        },
      };
    };

    const columns = [
      {
        Header: <CustomTableHeader value="Date/Time" />,
        columns: [
          {
            Header: "",
            id: "dateTime",
            accessor: (e) => (
              <Typography variant="subtitle1" className="table__light">
                {moment
                  .utc(e.settlementDate)
                  .local()
                  .format("MM/DD/YYYY hh:mm A")}
              </Typography>
            ),
            width: 200,
          },
        ],
      },
      {
        id: "Customer",
        Header: <CustomTableHeader value="Merchant DBA" />,
        columns: [
          {
            Header: "",
            id: "DBA",
            accessor: (e) => (
              <Typography variant="subtitle1">{e.doBusinessName}</Typography>
            ),
            width: 130,
          },
        ],
      },
      {
        Header: <CustomTableHeader value="Merchant ID" />,
        columns: [
          {
            Header: "",
            id: "merchantId",
            accessor: (e) => (
              <Typography variant="subtitle1">{e.merchantId}</Typography>
            ),
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
            Header: <CustomTableHeader value="HarmonyPay" />,
            id: "paymentByHarmony",
            accessor: (e) => (
              <Typography variant="subtitle1" className="table__light">
                ${e.paymentByHarmony}
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
          },
          {
            Header: <CustomTableHeader value="Cash" />,
            id: "paymentByCash",
            accessor: (e) => (
              <Typography variant="subtitle1" className="table__light">
                ${e.paymentByCash}
              </Typography>
            ),
          },
          {
            Header: <CustomTableHeader value="Other" />,
            id: "otherPayment",
            accessor: (e) => (
              <Typography variant="subtitle1" className="table__light">
                ${e.otherPayment}
              </Typography>
            ),
          },
        ],
      },
      {
        Header: "Total",
        columns: [
          {
            Header: "",
            id: "total",
            accessor: (e) => (
              <Typography variant="subtitle1">${e.total}</Typography>
            ),
          },
        ],
      },
    ];

    const { page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

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
              <SearchComponent
                placeholder="Search"
                value={this.state.search}
                onChange={this.searchMerchantBatch}
                onKeyPress={this.keyPressed}
              />
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
