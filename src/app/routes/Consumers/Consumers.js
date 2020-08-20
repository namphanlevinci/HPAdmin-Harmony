import React from "react";
import { connect } from "react-redux";
import { GET_CONSUMER_BY_ID } from "../../../actions/consumer/actions";
import { store } from "react-notifications-component";
import { config } from "../../../url/url";
import { Helmet } from "react-helmet";

import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

import "../Merchants/MerchantsList/merchantsList.css";
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

  fetchData = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/user/?key=${this.state.search}&page=${
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
        console.log("data", data);
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

  _SearchMerchants = async (e) => {
    await this.setState({ search: e.target.value });
  };

  keyPressed = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchData();
    }
  };

  render() {
    const { page, pageCount, data } = this.state;
    const columns = [
      {
        Header: "Harmony ID",
        id: "accountId",
        accessor: (row) => <p>{row?.accountId}</p>,
        width: 170,
      },
      {
        Header: "Harmony ID",
        id: "userId",
        accessor: (row) => <p>{row?.userId}</p>,
        show: false,
      },
      {
        Header: " First Name",
        id: "firstName",
        accessor: (row) => (
          <p style={{ fontWeight: "400" }}>{row?.firstName}</p>
        ),
      },
      {
        Header: "Last Name",
        id: "lastName",
        accessor: (row) => <p style={{ fontWeight: "400" }}>{row?.lastName}</p>,
      },
      {
        Header: "Phone number",
        id: "phone",
        accessor: (row) => <p>{row?.phone}</p>,
        width: 180,
      },
      {
        Header: "Email",
        id: "email",
        accessor: (row) => <p>{row?.email}</p>,
        width: 300,
      },
      {
        Header: "Balance",
        id: "balance",
        accessor: (e) => e.credit,
        Cell: (e) => <p>${e.value}</p>,
      },
      {
        id: "totalAmount",
        Header: "Money spent/Daily",
        accessor: (e) => Number(e.totalAmount).toFixed(2),
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: (e) => (
          <p className={Number(e.value) > 10000 ? "BIG" : ""}>${e.value}</p>
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
                    onChange={this._SearchMerchants}
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
  ConsumerList: state.getConsumerUsers,
});
const mapDispatchToProps = (dispatch) => ({
  GET_CONSUMER_BY_ID: (payload) => {
    dispatch(GET_CONSUMER_BY_ID(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Consumers);
