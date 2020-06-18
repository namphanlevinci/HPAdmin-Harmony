import React, { Component } from "react";
import {
  getAll_Rejected_Merchants,
  ViewMerchant_Rejected_Merchants,
} from "../../../../actions/merchants/actions";
import { connect } from "react-redux";
import { store } from "react-notifications-component";

import ReactTable from "react-table";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import URL from "../../../../url/url";

import "react-table/react-table.css";
import "../MerchantsRequest/MerchantsRequest.css";
import "../MerchantsList/merchantsList.css";
class MerchantsRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  // componentDidMount() {
  //   this.props.getAll_Rejected_Merchants();
  // }

  fetchData = async (state) => {
    const { page, pageSize } = state;
    this.setState({ loading: true });
    await axios
      .get(
        URL +
          `/merchant/reject?page=${page === 0 ? 1 : page + 1}&row=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data.data;
        this.setState({
          page,
          pageCount: res.data.pages,
          data: data,
          loading: false,
          pageSize: 5,
        });
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
  _merchantReqProfile = (ID) => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
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
      axios
        .get(URL + `/merchant/reject?key=${this.state.search}&page=1&row=20`, {
          headers: {
            Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`,
          },
        })
        .then((res) => {
          const data = res.data.data;
          if (!data) {
            store.addNotification({
              title: "ERROR!",
              message: "That Merchant doesn't exist.",
              type: "danger",
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
            this.setState({ loading: false });
          } else {
            this.setState({
              page: "0 ",
              pageCount: res.data.pages,
              data: data,
              loading: false,
            });
          }
        });
    }
  };

  render() {
    let ReqList = this.props.RejectedList;

    const columns = [
      {
        Header: "ID",
        accessor: "merchantId",
        width: 100,
      },
      {
        Header: "Business Name",
        id: "general",
        accessor: (e) => (
          <span style={{ fontWeight: 500 }}>{e?.businessName}</span>
        ),
      },
      {
        id: "principals",
        Header: "Owner",
        width: 150,
        accessor: (e) => e.principals?.[0],
        Cell: (e) => (
          <span style={{ fontWeight: 500 }}>
            {e.value !== undefined
              ? e.value.firstName + " " + e.value.lastName
              : null}
          </span>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300,
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        id: "RejectedBy",
        Header: "Rejected By",
        accessor: "adminUser",
        Cell: (e) => (
          <span style={{ color: "#4251af", fontWeight: 500 }}>
            {e.value !== null
              ? e.value.first_name + " " + e.value.last_name
              : null}
          </span>
        ),
      },
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: (e) => {
          if (rowInfo !== undefined) {
            this._merchantReqProfile(rowInfo.original.merchantId);
          }
        },
      };
    };
    const { page, pageCount, data, pageSize } = this.state;

    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.rejectedRequest" />}
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
          <div className="MListContainer">
            <ReactTable
              manual
              page={page}
              pages={pageCount}
              data={data}
              // row={pageSize}
              onPageChange={(pageIndex) => this.changePage(pageIndex)}
              onFetchData={(state) => this.fetchData(state)}
              defaultPageSize={20}
              minRows={0}
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
  InfoUser_Login: state.User,
  RejectedList: state.Merchants_RejectedList,
});
const mapDispatchToProps = (dispatch) => ({
  getAll_Rejected_Merchants: () => {
    dispatch(getAll_Rejected_Merchants());
  },
  ViewMerchant_Rejected_Merchants: (payload) => {
    dispatch(ViewMerchant_Rejected_Merchants(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsRequest);
