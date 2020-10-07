import React, { Component } from "react";
import { GET_MERCHANT_BY_ID } from "../../../../actions/merchants/actions";
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

import ReactTable from "react-table";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import moment from "moment";

import "react-table/react-table.css";
import "../MerchantsRequest/MerchantsRequest.css";
import "../MerchantsList/merchantsList.css";
const URL = config.url.URL;
class MerchantsRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  fetchData = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/merchant/reject?key=${this.state.search}&page=${
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
          this.setState({
            data: [],
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

  //goto merchant profile
  merchantProfile = (ID) => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        if (Number(res.data.codeNumber) === 200) {
          this.props.ViewMerchant_Rejected_Merchants(res.data.data);
          this.props.history.push("/app/merchants/rejected/profile");
        }
      });
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      this.fetchData();
    }
  };

  render() {
    const columns = [
      {
        Header: <CustomTableHeader value="ID" />,
        id: "id",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {row?.merchantId}
          </Typography>
        ),
        width: 60,
      },
      {
        Header: <CustomTableHeader value="Rejected Date" />,
        id: "date",
        accessor: (row) => (
          <Typography variant="subtitle1" className="table__light">
            {moment(row?.approvedDate).format("MM/DD/YYYY")}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="DBA" />,
        id: "general",
        accessor: (e) => (
          <Typography variant="subtitle1">{e?.businessName}</Typography>
        ),
      },
      {
        id: "principals",
        Header: <CustomTableHeader value="Owner" />,
        accessor: (e) => e.principals?.[0],
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
        id: "RejectedBy",
        Header: <CustomTableHeader value="Rejected By" />,
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
            // this.merchantProfile(rowInfo.original.merchantId);
            this.props.GET_MERCHANT_BY_ID({
              ID: rowInfo.original.merchantId,
              path: "/app/merchants/rejected/profile",
            });
          }
        },
      };
    };
    const { page, pageCount, data } = this.state;
    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Rejected Request | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.rejectedRequest" />}
          disableBreadcrumb={true}
        />
        <div className="MerList page-heading" style={{ padding: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* SEARCH */}
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
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  GET_MERCHANT_BY_ID: (payload) => {
    dispatch(GET_MERCHANT_BY_ID(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsRequest);
