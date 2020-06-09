import React from "react";
import { connect } from "react-redux";
import { ViewProfile_Merchants } from "../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import IntlMessages from "../../../util/IntlMessages";
import ContainerHeader from "../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import URL from "../../../url/url";

import "../Merchants/MerchantsList/merchantsList.css";
import "./ConsumerProfile/Detail/Consumer.css";
import "react-table/react-table.css";
import "../Reports/Transactions/Transactions.css";

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

  _ConsumerProfile = (e) => {
    this.props.ViewProfile_Merchants(e);
    this.props.history.push("/app/consumers/profile/general");
  };

  fetchData = async (state) => {
    const { page, pageSize } = state;
    this.setState({ loading: true });
    await axios
      .get(URL + `/user/?page=${page === 0 ? 1 : page + 1}&row=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        console.log("data", data);
        this.setState({
          page,
          pageCount: res.data.pages,
          data: data,
          loading: false,
        });
      });
  };
  changePage = (pageIndex) => {
    // console.log(`changePage(pageIndex: ${pageIndex})`);
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
      this.setState({ loading: true });
      const search = this.state.search;

      const searchValue = !search
        ? `/user/?page=1`
        : `/user?key=${search}&page=1&row=20`;
      await axios
        .get(URL + searchValue, {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
          },
        })
        .then((res) => {
          const data = res.data.data;
          if (!data) {
            store.addNotification({
              title: "ERROR!",
              message: "That User doesn't exist.",
              type: "danger",
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
            this.setState({ loading: false });
          } else {
            this.setState({
              page: "0 ",
              pageCount: res.data.pages,
              data: data,
              loading: false,
            });
          }
        });
    }
  };
  render() {
    const { page, pageCount, data } = this.state;
    const columns = [
      {
        Header: "Harmony ID",
        accessor: "accountId",
        width: 170,
      },
      {
        Header: "First name",
        accessor: "firstName",
        width: 130,
      },
      {
        Header: "Last name",
        accessor: "lastName",
        width: 130,
      },
      {
        Header: "Phone number",
        accessor: "phone",
        width: 180,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300,
      },
      {
        Header: "Balance",
        // accessor: "credit",
        id: "balance",
        accessor: (e) => e.credit,
        Cell: (e) => <span>${e.value}</span>,
      },
      {
        id: "totalAmount",
        Header: "Money spent/Daily",
        accessor: (e) => Number(e.totalAmount).toFixed(2),
        sortMethod: (a, b) => Number(a) - Number(b),
        Cell: (e) => (
          <span className={Number(e.value) > 10000 ? "BIG" : ""}>
            ${e.value}
          </span>
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
            this._ConsumerProfile(rowInfo.row);
          }
        },
      };
    };
    return (
      <div className="app-wrapper">
        <div className="container-fluid">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.consumers" />}
          />
          <div className="MerList page-heading" style={{ padding: "10px" }}>
            <div className="MReqSP TransactionsBox ">
              {/* SEARCH */}
              <div className="search">
                <form>
                  <SearchIcon className="button" title="Search" />
                  <input
                    type="text"
                    className="textbox"
                    placeholder="Search.."
                    value={this.state.search}
                    onChange={this._SearchMerchants}
                    onKeyPress={this.keyPressed}
                  />
                </form>
              </div>
            </div>

            <div className="MListContainer">
              <ReactTable
                manual
                page={page}
                pages={pageCount}
                data={data}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  InfoUser_Login: state.User,
  ConsumerList: state.getConsumerUsers,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Consumers);
