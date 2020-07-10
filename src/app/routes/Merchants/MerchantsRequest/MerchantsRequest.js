import React, { Component } from "react";
import {
  getAll_Merchant_Requests,
  ViewMerchant_Request,
} from "../../../../actions/merchants/actions";
import { connect } from "react-redux";
import { store } from "react-notifications-component";
import { Helmet } from "react-helmet";
import { config } from "../../../../url/url";

import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import moment from "moment";

import "react-table/react-table.css";
import "./MerchantsRequest.css";
import "../MerchantsList/merchantsList.css";

const URL = config.url.URL;

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

  fetchData = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/merchant/pending?key=${this.state.search}&page=${
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

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      this.fetchData();
    }
  };

  pendingProfile = (ID) => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
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
        width: 60,
      },
      {
        Header: "Submitted Date",
        id: "submitDate",
        accessor: (row) => (
          <span>{moment(row?.createdDate).format("MM-DD-YYYY")}</span>
        ),
      },
      {
        Header: "DBA",
        id: "general",
        accessor: (e) => (
          <span style={{ fontWeight: 500 }}>{e?.general?.doBusinessName}</span>
        ),
      },
      {
        id: "principals",
        Header: "Owner",
        accessor: (e) => e?.principals?.[0],
        Cell: (e) =>
          e?.value === undefined ? null : (
            <span style={{ fontWeight: 500 }}>
              {e?.value?.firstName + " " + e?.value?.lastName}
            </span>
          ),
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Store Phone",
        accessor: "phone",
      },
      {
        Header: "Contact Phone",
        id: "phoneContact",
        accessor: (row) => <span>{row?.general?.phoneContact}</span>,
      },
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this.pendingProfile(rowInfo.original.merchantId);
          }
        },
      };
    };
    return (
      <div className="container-fluid  react-transition swipe-right">
        <Helmet>
          <title>Pending Request - Harmony Admin </title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.pendingRequest" />}
          disableBreadcrumb={true}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
