import React from "react";
import { connect } from "react-redux";
import { GET_CONSUMER_BY_ID } from "../../../actions/consumer/actions";
import { config } from "../../../url/url";
import { Helmet } from "react-helmet";
import { CustomTableHeader } from "../../../util/CustomText";
import { Typography } from "@material-ui/core";
import { fetchApiByPage } from "../../../actions/FetchApiActions";

import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";

import "../Merchants/Merchants.css";
import "./ConsumerProfile/Detail/Consumer.css";
import "react-table/react-table.css";
import "../Reports/Transactions/Transactions.css";

const URL = config.url.URL;

class Consumers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      // Pages
      page: 0,
      pageCount: 0,
      data: [],
    };
  }

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;

    const url = `${URL}/user/?key=${this.state.search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;

    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  searchMerchant = async (e) => {
    await this.setState({ search: e.target.value });
  };

  keyPressed = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchData();
    }
  };

  render() {
    const { page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const columns = [
      {
        Header: <CustomTableHeader value="Harmony ID" />,
        id: "accountId",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.accountId}
          </Typography>
        ),
      },
      {
        Header: "Harmony ID",
        id: "userId",
        accessor: (row) => <p>{row?.userId}</p>,
        show: false,
      },
      {
        Header: <CustomTableHeader value=" First Name" />,
        id: "firstName",
        accessor: (row) => (
          <Typography variant="subtitle1">{row?.firstName}</Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Last Name" />,
        id: "lastName",
        accessor: (row) => (
          <Typography variant="subtitle1">{row?.lastName}</Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Phone number" />,
        id: "phone",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.phone}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Email" />,
        id: "email",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.email}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Balance" />,
        id: "balance",
        accessor: (e) => e.credit,
        Cell: (e) => (
          <Typography variant="subtitle1" className="table__light">
            ${e.value}
          </Typography>
        ),
      },
      {
        id: "totalAmount",
        Header: <CustomTableHeader value="Money spent/Daily" />,
        accessor: (e) => Number(e.totalAmount).toFixed(2),
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: (e) => (
          <Typography
            variant="subtitle1"
            className={Number(e.value) > 10000 ? "BIG" : ""}
          >
            ${e.value}
          </Typography>
        ),
      },
      {
        accessor: "limitAmount",
        show: false,
      },
      {
        accessor: "banks",
        show: false,
      },
      {
        accessor: "stateName",
        show: false,
      },
      {
        accessor: "isDisabled",
        show: false,
      },
    ];

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this.props.GET_CONSUMER_BY_ID(rowInfo.row._original.userId);
          }
        },
      };
    };
    return (
      <>
        <div className="container-fluid">
          <Helmet>
            <title>Consumer | Harmony Admin</title>
          </Helmet>
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.consumers" />}
          />
          <div className="MerList page-heading" style={{ padding: "10px" }}>
            <div className=" TransactionsBox ">
              {/* SEARCH */}
              <div className="search">
                <form>
                  <SearchIcon className="button" title="Search" />
                  <input
                    type="text"
                    className="textBox"
                    placeholder="Search.."
                    value={this.state.search}
                    onChange={this.searchMerchant}
                    onKeyPress={this.keyPressed}
                  />
                </form>
              </div>
            </div>

            <div className="merchant-list-container">
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
  ConsumerList: state.getConsumerUsers,
  apiData: state.fetchApi,
});
const mapDispatchToProps = (dispatch) => ({
  GET_CONSUMER_BY_ID: (payload) => {
    dispatch(GET_CONSUMER_BY_ID(payload));
  },

  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Consumers);
