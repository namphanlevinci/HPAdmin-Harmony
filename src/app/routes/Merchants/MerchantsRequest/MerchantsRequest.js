import React, { Component } from "react";
import {
  getAll_Merchant_Requests,
  ViewMerchant_Request,
} from "../../../../actions/merchants/actions";
import { connect } from "react-redux";
import { store } from "react-notifications-component";

import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import URL from "../../../../url/url";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";

import "react-table/react-table.css";
import "./MerchantsRequest.css";
import "../MerchantsList/merchantsList.css";
class MerchantsRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      page: 0,
      pageCount: 0,
      data: [],
      pageLoading: false,
    };
  }

  // componentDidMount() {
  //   this.props.getAll_Merchant_Requests();
  // }

  fetchData = async (state) => {
    const { page, pageSize } = state;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/merchant/pending?page=${page === 0 ? 1 : page + 1}&row=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
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

  _SearchMerchants = async (e) => {
    await this.setState({ search: e.target.value });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      axios
        .get(URL + `/merchant/pending?key=${this.state.search}&page=1&row=20`, {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
          },
        })
        .then((res) => {
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
                onScreen: true,
              },
              width: 250,
            });
            this.setState({ loading: false });
          } else {
            this.setState({
              page: "0",
              pageCount: res.data.pages,
              data: data,
              loading: false,
            });
          }
        });
    }
  };

  _merchantReqProfile = (ID) => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
        },
      })
      .then((res) => {
        if (Number(res.data.codeNumber) === 200) {
          this.props.ViewMerchant_Request(res.data.data);
          this.props.history.push("/app/merchants/pending/profile");
        }
      });
  };
  render() {
    const { page, pageCount, data, pageSize } = this.state;

    const columns = [
      {
        Header: "ID",
        accessor: "merchantId",
        width: 100,
      },
      {
        Header: "Business Name",
        id: "general",
        accessor: (e) => (
          <span style={{ fontWeight: 500 }}>{e.businessName}</span>
        ),

        width: 280,
      },
      {
        id: "principals",
        Header: "Owner",
        width: 280,
        accessor: (e) => e?.principals?.[0],
        Cell: (e) => (
          <span style={{ fontWeight: 500 }}>
            {e.value !== undefined
              ? e.value.firstName + " " + e.value.lastName
              : null}
          </span>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300,
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this._merchantReqProfile(rowInfo.original.merchantId);
          }
        },
      };
    };
    return (
      <div className="container-fluid  react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.pendingRequest" />}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
          <div className="MListContainer">
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
  MerchantRequests_List: state.MerchantRequests_List,
});
const mapDispatchToProps = (dispatch) => ({
  getAll_Merchant_Requests: () => {
    dispatch(getAll_Merchant_Requests());
  },
  ViewMerchant_Request: (payload) => {
    dispatch(ViewMerchant_Request(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsRequest);
