import React from "react";
import { connect } from "react-redux";
import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { CustomTableHeader } from "../../../../util/CustomText";
import { fetchApiByPage } from "../../../../actions/FetchApiActions";
import { GET_MERCHANT_BY_ID } from "../../../../actions/merchants/actions";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";

import "../Merchants.css";
import "react-table/react-table.css";
const URL = config.url.URL;

class MerchantsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      // Pages
      data: [],
    };
  }

  fetchApi = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;

    const url = `${URL}/merchant/search?key=${this.state.search}&page=${
      page === 0 ? 1 : page + 1
    }&row=${pageSize}`;

    this.props.fetchApiByPage(url);
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
      this.fetchApi();
    }
  };

  goToApprovePage = (ID) => {
    const path = "/app/merchants/approved/profile";
    this.props.getMerchantByID({ ID, path });
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
        accessor: (e) => e.principals[0],
        Cell: (e) => (
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

    const onRowClick = (state, rowInfo, column, instance) => {
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
            <FormControl>
              <OutlinedInput
                inputProps={{
                  style: {
                    padding: 14,
                  },
                }}
                placeholder="Search.."
                value={this.state.search}
                onChange={this._SearchMerchants}
                onKeyPress={this.keyPressed}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={0}
              />
            </FormControl>
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
  userLogin: state.userReducer.User,
  apiData: state.fetchApi,
});
const mapDispatchToProps = (dispatch) => ({
  getMerchantByID: (payload) => {
    dispatch(GET_MERCHANT_BY_ID(payload));
  },
  fetchApiByPage: (url) => {
    dispatch(fetchApiByPage(url));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsList);
