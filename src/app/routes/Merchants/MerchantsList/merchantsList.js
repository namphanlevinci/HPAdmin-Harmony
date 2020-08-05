import React from "react";
import { connect } from "react-redux";
import {
  getAll_Merchants,
  SearchMerchants,
  ViewProfile_Merchants,
} from "../../../../actions/merchants/actions";
import { config } from "../../../../url/url";
import { Helmet } from "react-helmet";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import moment from "moment";

import "react-table/react-table.css";
import "./merchantsList.css";
const URL = config.url.URL;
const upFile = config.url.upFile;

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
        Header: "ID",
        id: "merchantId",
        accessor: (row) => <p>{row?.merchantId}</p>,
        width: 60,
      },
      {
        Header: "Approved Date",
        id: "date",
        accessor: (row) => (
          <p>{moment(row.approvedDate).format("MM/DD/YYYY")}</p>
        ),
        width: 130,
      },
      {
        Header: "MID",
        id: "mid",
        accessor: (row) => <p>{row?.merchantCode}</p>,
      },
      {
        Header: "DBA",
        id: "general",
        accessor: "general",
        Cell: (e) => (
          <p style={{ fontWeight: 400 }}>{e?.value?.doBusinessName}</p>
        ),
      },
      {
        id: "principals",
        Header: "Owner",
        accessor: (e) => e.principals[0],
        Cell: (e) => (
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
        id: "approvedBy",
        Header: "Approved By",
        accessor: "adminUser",
        Cell: (e) => (
          <p style={{ color: "#4251af", fontWeight: 400 }}>
            {e?.value?.first_name + " " + e?.value?.last_name}
          </p>
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
  getAll_Merchants: () => {
    dispatch(getAll_Merchants());
  },
  SearchMerchants: (payload) => {
    dispatch(SearchMerchants(payload));
  },
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsList);
