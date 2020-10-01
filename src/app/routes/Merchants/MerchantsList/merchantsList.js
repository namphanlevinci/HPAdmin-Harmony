import React from "react";
import { connect } from "react-redux";
import { ViewProfile_Merchants } from "../../../../actions/merchants/actions";
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

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import moment from "moment";

import "react-table/react-table.css";
import "./merchantsList.css";

const URL = config.url.URL;

class MerchantsList extends React.Component {
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

  merchantProfile = (ID) => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        if (Number(res.data.codeNumber) === 200) {
          this.props.ViewProfile_Merchants(res.data.data);
          this.props.history.push("/app/merchants/approved/profile");
        }
      });
  };

  fetchData = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 20;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/merchant/search?key=${this.state.search}&page=${
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
  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      this.fetchData();
    }
  };

  render() {
    // approved merchant list
    const { page, pageCount, data } = this.state;

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
            {moment(row.approvedDate).format("MM/DD/YYYY")}
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
            this.merchantProfile(rowInfo.original.merchantId);
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
              // You should also control this...
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
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsList);
