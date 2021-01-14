import React, { Component } from "react";
import { getMerchantByID } from "../../../../actions/merchantActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Typography } from "@material-ui/core";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { debounce } from "lodash";

import SearchComponent from "../../../../util/searchComponent";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import moment from "moment";
import ScaleLoader from "../../../../util/scaleLoader";

import "../Merchants.css";
import "react-table/react-table.css";

class PendingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      isLoading: false,
    };
  }

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const url = `merchant/pending?key=${this.state.search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;
    this.props.fetchApiByPage(url);
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  searchMerchant = debounce((query) => {
    this.fetchApi();
  }, 1000);

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.fetchApi();
    }
  };

  goToPendingPage = (ID) => {
    const path = "/app/merchants/pending/profile";
    this.props.getMerchantByID(ID, path);
  };
  render() {
    const { page } = this.state;
    const { data, loading, pageSize, pageCount } = this.props.apiData;

    const columns = [
      {
        Header: <CustomTableHeader value="ID" />,
        id: "merchantId",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.merchantId}
          </Typography>
        ),
        width: 60,
      },
      {
        Header: <CustomTableHeader value="Submitted Date" />,
        id: "submitDate",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(row?.createdDate).format("MM/DD/YYYY")}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="DBA" />,
        id: "general",
        accessor: (e) => (
          <Typography variant="subtitle1">
            {e?.general?.doBusinessName}
          </Typography>
        ),
      },
      {
        id: "principals",
        Header: <CustomTableHeader value="Owner" />,
        accessor: (e) => e?.principals?.[0],
        Cell: (e) =>
          e?.value === undefined ? null : (
            <Typography variant="subtitle1">
              {e?.value?.firstName + " " + e?.value?.lastName}
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
        Header: <CustomTableHeader value="Store Phone" />,
        id: "phone",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.phone}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Contact Phone" />,
        id: "phoneContact",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.general?.phoneContact}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Status" />,
        id: "status",
        accessor: (row) => (
          <Typography variant="subtitle1">
            {Number(row?.status) === 1 ? "Handling" : "Pending"}
          </Typography>
        ),
      },
    ];
    const onRowClick = (state, rowInfo) => {
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
            <SearchComponent
              value={this.state.search}
              onChange={this.handleChange}
              onKeyPress={this.keyPressed}
              onClickIcon={this.fetchApi}
            />
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
  getMerchantByID: (ID, path) => {
    dispatch(getMerchantByID(ID, path));
  },
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingList);
