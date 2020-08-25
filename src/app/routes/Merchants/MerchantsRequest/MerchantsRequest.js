import React, { Component } from "react";
import {
  getAll_Merchant_Requests,
  ViewMerchant_Request,
  GET_MERCHANT_BY_ID,
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
import ScaleLoader from "../../../../util/scaleLoader";

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
      isLoading: false,
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

  goToPendingPage = (ID) => {
    const path = "/app/merchants/pending/profile";
    const payload = { ID, path };
    this.props.GET_MERCHANT_BY_ID(payload);
  };
  render() {
    const { page, pageCount, data, pageSize } = this.state;

    const columns = [
      {
        Header: "ID",
        id: "merchantId",
        accessor: (row) => <p>{row?.merchantId}</p>,
        width: 60,
      },
      {
        Header: "Submitted Date",
        id: "submitDate",
        accessor: (row) => (
          <p>{moment(row?.createdDate).format("MM/DD/YYYY")}</p>
        ),
      },
      {
        Header: "DBA",
        id: "general",
        accessor: (e) => (
          <p style={{ fontWeight: 400 }}>{e?.general?.doBusinessName}</p>
        ),
      },
      {
        id: "principals",
        Header: "Owner",
        accessor: (e) => e?.principals?.[0],
        Cell: (e) =>
          e?.value === undefined ? null : (
            <p style={{ fontWeight: 400 }}>
              {e?.value?.firstName + " " + e?.value?.lastName}
            </p>
          ),
      },
      {
        Header: "Email",
        id: "email",
        accessor: (row) => <p>{row?.email}</p>,
      },
      {
        Header: "Store Phone",
        id: "phone",
        accessor: (row) => <p>{row?.phone}</p>,
      },
      {
        Header: "Contact Phone",
        id: "phoneContact",
        accessor: (row) => <p>{row?.general?.phoneContact}</p>,
      },
      {
        Header: "Status",
        id: "status",
        accessor: (row) => (
          <p style={{ fontWeight: "400" }}>
            {Number(row?.status) === 1 ? "Handling" : "Pending"}
          </p>
        ),
      },
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this.goToPendingPage(rowInfo.original.merchantId);
          }
        },
      };
    };
    return (
      <div className="container-fluid  react-transition swipe-right">
        <Helmet>
          <title>Pending Request | Harmony Admin </title>
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
          <ScaleLoader isLoading={this.state.isLoading} />

          <div className="merchant-list-container">
            <ReactTable
              manual
              sortable={false}
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
  GET_MERCHANT_BY_ID: (payload) => {
    dispatch(GET_MERCHANT_BY_ID(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsRequest);
