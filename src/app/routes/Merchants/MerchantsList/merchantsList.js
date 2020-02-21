import React from "react";
import { connect } from "react-redux";
import {
  getAll_Merchants,
  SearchMerchants,
  ViewProfile_Merchants
} from "../../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import URL from "../../../../url/url";
import axios from "axios";

import "react-table/react-table.css";
import "./merchantsList.css";

class MerchantsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      // Pages
      page: 0,
      pageCount: 0,
      data: []
    };
  }

  componentDidMount() {
    this.props.getAll_Merchants();
  }

  _merchantsProfile = ID => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        if (Number(res.data.codeNumber) === 200) {
          this.props.ViewProfile_Merchants(res.data.data);
          this.props.history.push("/app/merchants/approved/profile");
        }
      });
  };

  fetchData = async state => {
    const { page } = state;
    this.setState({ loading: true });
    await axios
      .get(URL + `/merchant/?page=${page === 0 ? 1 : page + 1}`, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        const data = res.data.data;
        this.setState({
          page,
          pageCount: res.data.pages,
          data: data,
          loading: false
        });
      });
  };

  changePage = pageIndex => {
    // console.log(`changePage(pageIndex: ${pageIndex})`);
    this.setState({
      page: pageIndex
    });
  };

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };
  keyPressed = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      axios
        .get(URL + `/merchant/search?key=${this.state.search}&page=1`, {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
          }
        })
        .then(res => {
          const data = res.data.data;
          if (!data) {
            store.addNotification({
              title: "ERROR!",
              message: "That Merchant doesn't exist.",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              },
              width: 250
            });
            this.setState({ loading: false });
          } else {
            this.setState({
              page: "0 ",
              pageCount: res.data.pages,
              data: data,
              loading: false
            });
          }
        });
    }
  };

  render() {
    const { page, pageCount, data } = this.state;

    const columns = [
      {
        Header: "ID",
        accessor: "merchantId",
        width: 100
      },
      {
        Header: "Bussiness name",
        id: "general",
        accessor: "general",
        Cell: e => (
          <span>{e.value !== null ? e.value.doBusinessName : null}</span>
        )
      },
      {
        id: "principals",
        Header: "Owner",
        width: 150,
        accessor: e => e.principals[0],
        Cell: e => (
          <span>
            {e.value !== undefined
              ? e.value.firstName + " " + e.value.lastName
              : null}
          </span>
        )
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300
      },
      {
        Header: "Phone number",
        accessor: "phone"
      },
      {
        id: "Approvedby",
        Header: "Approved by",
        accessor: "adminUser",
        Cell: e => (
          <span style={{ color: "#0764b0", fontWeight: 500 }}>
            {e.value !== null
              ? e.value.first_name + " " + e.value.last_name
              : null}
          </span>
        )
      }
    ];

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: e => {
          if (rowInfo !== undefined) {
            this._merchantsProfile(rowInfo.original.merchantId);
          }
        }
      };
    };
    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.MList" />}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              // You should also control this...
              onPageChange={pageIndex => this.changePage(pageIndex)}
              onFetchData={state => this.fetchData(state)}
              // defaultPageSize={10}
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

const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  Merchants_List: state.MerchantsList
});
const mapDispatchToProps = dispatch => ({
  getAll_Merchants: () => {
    dispatch(getAll_Merchants());
  },
  SearchMerchants: payload => {
    dispatch(SearchMerchants(payload));
  },
  ViewProfile_Merchants: payload => {
    dispatch(ViewProfile_Merchants(payload));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsList);
