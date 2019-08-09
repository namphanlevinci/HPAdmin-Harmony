import React, { Component } from "react";
import "./MerchantsRequest.css";
import "../MerchantsList/merchantsList.css";
import {
  getAll_Merchant_Requests,
  ViewMerchant_Request
} from "../../../../actions/merchants/actions";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import ReactTable from "react-table";
import "react-table/react-table.css";

class MerchantsRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentWillMount() {
    this.props.getAll_Merchant_Requests();
  }
  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };

  _merchantReqProfile = e => {
    this.props.ViewMerchant_Request(e);
    this.props.history.push("/app/merchants/pending-profile");
  };
  render() {
    let ReqList = this.props.MerchantRequests_List;
    if (ReqList) {
      if (this.state.search) {
        ReqList = ReqList.filter(e => {
          return (
            e.businessName
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            e.email
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            parseInt(e.merchantId) === parseInt(this.state.search)
          );
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
        accessor: "businessName"
      },
      {
        id: "principals",
        Header: "Owner",
        width: 150,
        accessor: "principals",
        Cell: e => (
          <span>
            {e.value !== null
              ? e.value.firstName + " " + e.value.lastName
              : null}
          </span>
        )
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300
      },
      {
        Header: "Phone number",
        accessor: "phone"
      }
    ];
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: e => {
          this._merchantReqProfile(rowInfo.original);
        }
      };
    };
    return (
      <div className="container-fluid MerList react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.pendingRequest" />}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* SEARCH */}
          <div className="search">
            <form>
              <input title="Search" value="" className="button" readOnly />
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
            minRows={0}
            getTdProps={onRowClick}
            noDataText="NO DATA!"
          />
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantsRequest);
