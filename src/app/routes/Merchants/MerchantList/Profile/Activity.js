import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../url/url";

import moment from "moment";
import ReactTable from "react-table";
import axios from "axios";

import "../MerchantProfile.css";
import "../../PendingList/MerchantReqProfile.css";
import "../../Merchants.css";
import "./Detail.css";

const URL = config.url.URL;
class MerchantActi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
    };
  }

  async componentDidMount() {
    let ID = this.props.MerchantProfile.merchantId;
    const Token = localStorage.getItem("user");
    await this.setState({ Token: Token });
    const token = JSON.parse(this.state.Token);
    axios
      .get(URL + "/merchantactivity/" + ID, {
        headers: { Authorization: `Bearer ${token.token}` },
      })
      .then(async (res) => {
        await this.setState({ data: res.data.data });
      });
  }

  render() {
    const columns = [
      {
        id: "createDate",
        Header: "Date/Time",
        accessor: (e) => {
          return moment.utc(e.createDate).local().format("MM/DD/YYYY hh:mm A");
        },
      },
      {
        Header: "Activity",
        accessor: "action",
      },
    ];

    return (
      <div className="content general-content react-transition swipe-right">
        <div>
          <div className="TransactionTable ActivityTable">
            <ReactTable
              data={this.state.data}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              noDataText="NO DATA!"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});
export default connect(mapStateToProps)(MerchantActi);
