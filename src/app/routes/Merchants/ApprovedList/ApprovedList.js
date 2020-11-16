import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Typography } from "@material-ui/core";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/fetchApiActions";
import { getMerchantByID } from "../../../../actions/merchantActions";
import { debounce } from "lodash";

import SearchComponent from "../../../../util/searchComponent";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import moment from "moment";

import "../Merchants.css";
import "react-table/react-table.css";

class MerchantsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
    };
  }

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    const url = `merchant/search?key=${this.state.search}&page=${
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
    this.searchMerchant();
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      this.fetchApi();
    }
  };

  goToApprovePage = (ID) => {
    const path = "/app/merchants/approved/profile";
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
        Header: <CustomTableHeader value="Approved Date" />,
        id: "date",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(row?.adminUser?.created_date).format("MM/DD/YYYY")}
          </Typography>
        ),
        width: 130,
      },
      {
        Header: <CustomTableHeader value="MID" />,
        id: "mid",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.merchantCode}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="DBA" />,
        id: "general",
        accessor: "general",
        Cell: (e) => (
          <Typography variant="subtitle1">
            {e?.value?.doBusinessName}
          </Typography>
        ),
      },
      {
        id: "principals",
        Header: <CustomTableHeader value="Owner" />,
        accessor: (row) => (
          <Typography variant="subtitle1">
            {row?.principals[0]?.firstName + " " + row?.principals[0]?.lastName}
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
        id: "approvedBy",
        Header: <CustomTableHeader value="Approved By" />,
        accessor: "adminUser",
        Cell: (e) => (
          <Typography variant="subtitle1" style={{ color: "#4251af" }}>
            {e?.value?.first_name + " " + e?.value?.last_name}
          </Typography>
        ),
      },
    ];

    const onRowClick = (state, rowInfo) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this.goToApprovePage(rowInfo.original.merchantId);
          }
        },
      };
    };

    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Approved Request | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.approvedRequest" />}
          disableBreadcrumb={true}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <SearchComponent
              value={this.state.search}
              onChange={this.handleChange}
              onKeyPress={this.keyPressed}
            />
          </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsList);
