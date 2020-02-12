import React, { Component } from "react";
import {
  getAll_Merchant_Requests,
  ViewMerchant_Request
} from "../../../../actions/merchants/actions";
import { connect } from "react-redux";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import URL from "../../../../url/url";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";

import "react-table/react-table.css";
import "./MerchantsRequest.css";
import "../MerchantsList/merchantsList.css";
class MerchantsRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    this.props.getAll_Merchant_Requests();
  }
  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };

  _merchantReqProfile = ID => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        if (Number(res.data.codeNumber) === 200) {
          this.props.ViewMerchant_Request(res.data.data);
          this.props.history.push("/app/merchants/pending/profile");
        }
      });
  };
  render() {
    let ReqList = this.props.MerchantRequests_List;
    if (ReqList) {
      if (this.state.search) {
        ReqList = ReqList.filter(e => {
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
        width: 100
      },
      {
        Header: "Bussiness name",
        id: "general",
        accessor: "general",
        Cell: e => (
          <span>{e.value !== null ? e.value.doBusinessName : null}</span>
        ),
        width: 280
      },
      {
        id: "principals",
        Header: "Owner",
        width: 280,
        accessor: e => e.principals[0],
        Cell: e => (
          <span>
            {e.value !== undefined
              ? e.value.firstName + " " + e.value.lastName
              : null}
          </span>
        )
      },
      {
        Header: "Email",
        accessor: "email",
        width: 350
      },
      {
        Header: "Phone number",
        accessor: "phone"
      }
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: e => {
          if (rowInfo !== undefined) {
            this._merchantReqProfile(rowInfo.original.merchantId);
          }
        }
      };
    };
    return (
      <div className="container-fluid  react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.pendingRequest" />}
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
const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  MerchantRequests_List: state.MerchantRequests_List
});
const mapDispatchToProps = dispatch => ({
  getAll_Merchant_Requests: () => {
    dispatch(getAll_Merchant_Requests());
  },
  ViewMerchant_Request: payload => {
    dispatch(ViewMerchant_Request(payload));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantsRequest);
