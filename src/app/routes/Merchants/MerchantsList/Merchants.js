import React from "react";
import { connect } from "react-redux";
import {
  getAll_Merchants,
  SearchMerchants,
  ViewProfile_Merchants,
} from "../../../../actions/merchants/actions";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { config } from "../../../../url/url";
import axios from "axios";

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
          this.props.history.push("/app/merchants/profile/general");
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

  _SearchMerchants = async (e) => {
    await this.setState({ search: e.target.value });
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
        Header: "MID",
        id: "mid",
        accessor: (row) => <span>{row?.merchantCode}</span>,
      },
      {
        Header: "DBA",
        id: "general",
        accessor: "general",
        Cell: (e) => (
          <span style={{ fontWeight: 500 }}>
            {e?.value ? e.value.doBusinessName : null}
          </span>
        ),
      },
      {
        id: "principals",
        Header: "Owner",
        accessor: (e) => e?.principals?.[0],
        Cell: (e) => (
          <span style={{ fontWeight: 500 }}>
            {e?.value ? e.value.firstName + " " + e.value.lastName : null}
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
        id: "contactPhone",
        accessor: (row) => <span>{row?.general?.phoneContact}</span>,
      },
      {
        Header: "Status",
        accessor: "isDisabled",
        Cell: (e) => (
          <span style={{ fontWeight: 500 }}>
            {e.value === 0 ? "Active" : "Inactive"}
          </span>
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
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.MList" />}
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
            <div>
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
            </div>
          </div>
          <div className="merchant-list-container">
            <ReactTable
              manual
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
  Merchants_List: state.MerchantsList,
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
export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
