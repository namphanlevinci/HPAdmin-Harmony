import React from "react";
import { connect } from "react-redux";
import {
  SearchMerchants,
  ViewProfile_Merchants,
  GET_MERCHANT_BY_ID,
} from "../../../../actions/merchants/actions";
import { Helmet } from "react-helmet";
import { config } from "../../../../url/url";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ScaleLoader from "../../../../util/scaleLoader";
import CheckPermissions from "../../../../util/checkPermission";

import "react-table/react-table.css";
import "./merchantsList.css";
import "../MerchantsRequest/MerchantReqProfile.css";

const URL = config.url.URL;

class Merchants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: true,
      // Pages
      page: 0,
      pageCount: 0,
      data: [],
      pageLoading: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ pageLoading: true });
  }

  fetchData = async (state) => {
    let page = state?.page ? state?.page : 0;
    let pageSize = state?.pageSize ? state?.pageSize : 10;
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
          this.setState({ data: [] });
        }
        this.setState({ loading: false });
      });
  };

  changePage = (pageIndex) => {
    this.setState({
      page: pageIndex,
    });
  };

  addMerchant = () => {
    this.props.history.push("/app/merchants/add");
  };
  MerchantProfilePage = (ID) => {
    this.setState({ loading: true });
    const payload = { ID, path: "/app/merchants/profile/general" };
    this.props.GET_MERCHANT_BY_ID(payload);
  };

  keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({ loading: true });
      this.fetchData();
    }
  };

  _SearchMerchants = async (e) => {
    await this.setState({ search: e.target.value });
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
        Header: "MID",
        id: "mid",
        accessor: (row) => <p>{row?.merchantCode}</p>,
      },
      {
        Header: "DBA",
        id: "general",
        accessor: "general",
        Cell: (e) => (
          <p style={{ fontWeight: 400 }}>
            {e?.value ? e.value.doBusinessName : null}
          </p>
        ),
      },
      {
        id: "principals",
        Header: "Owner",
        accessor: (e) => e?.principals?.[0],
        Cell: (e) => (
          <p style={{ fontWeight: 400 }}>
            {e?.value ? e.value.firstName + " " + e.value.lastName : null}
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
        id: "contactPhone",
        accessor: (row) => <p>{row?.general?.phoneContact}</p>,
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: (e) => (
          <p style={{ fontWeight: 400 }}>
            {e.value === 0 ? "Active" : "Inactive"}
          </p>
        ),
        width: 100,
      },
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this.MerchantProfilePage(rowInfo.original.merchantId);
          }
        },
      };
    };
    return (
      <div className="container-fluid react-transition swipe-right">
        <Helmet>
          <title>Merchant | Harmony Admin</title>
        </Helmet>
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.MList" />}
        />
        <div className="MerList page-heading " style={{ padding: "10px" }}>
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
            <div>
              {CheckPermissions(12) && (
                <Button
                  style={{
                    backgroundColor: "#4251af",
                    color: "white",
                    marginTop: "0px",
                  }}
                  className="btn btn-red"
                  onClick={this.addMerchant}
                >
                  ADD MERCHANT
                </Button>
              )}
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
  SearchMerchants: (payload) => {
    dispatch(SearchMerchants(payload));
  },
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
  GET_MERCHANT_BY_ID: (ID) => {
    dispatch(GET_MERCHANT_BY_ID(ID));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
