import React, { Component } from "react";
import {
  getAll_Rejected_Merchants,
  ViewMerchant_Rejected_Merchants,
} from "../../../../actions/merchants/actions";
import { connect } from "react-redux";

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
  componentDidMount() {
    this.props.getAll_Rejected_Merchants();
  }
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
  render() {
    let ReqList = this.props.RejectedList;
    if (ReqList) {
      if (this.state.search) {
        ReqList = ReqList.filter((e) => {
          if (e.general !== null) {
            return (
              e.general.doBusinessName
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              e.email
                .trim()
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 ||
              parseInt(e.merchantId) === parseInt(this.state.search)
            );
          }
          return null;
        });
      }
    }
    const columns = [
      {
        Header: "ID",
        accessor: "merchantId",
        width: 100,
      },
      {
        Header: "Bussiness Name",
        id: "general",
        accessor: "general",
        Cell: (e) => (
          <span style={{ fontWeight: 500 }}>
            {e.value !== null ? e.value.doBusinessName : null}
          </span>
        ),
      },
      {
        id: "principals",
        Header: "Owner",
        width: 150,
        accessor: (e) => e.principals[0],
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
                  className="textbox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._SearchMerchants}
                />
              </form>
            </div>
          </div>
          <div className="MListContainer">
            <ReactTable
              data={ReqList}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              getTdProps={onRowClick}
              noDataText="NO DATA!"
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
