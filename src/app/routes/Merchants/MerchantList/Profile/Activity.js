import React, { Component } from "react";
import { connect } from "react-redux";
import { getMerchantActivityById } from "../../../../../actions/merchantActions";
import { CustomTableHeader } from "../../../../.../../../util/CustomText";
import { Typography, CircularProgress } from "@material-ui/core";

import moment from "moment";
import ReactTable from "react-table";

import "../MerchantProfile.css";
import "../../PendingList/MerchantReqProfile.css";
import "../../Merchants.css";
import "./Detail.css";
import "react-table/react-table.css";

class MerchantActi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
    };
  }

  async componentDidMount() {
    let merchantId = this.props.MerchantProfile.merchantId;
    this.props.getMerchantActivityById(merchantId);
  }

  render() {
    const columns = [
      {
        id: "createDate",
        Header: <CustomTableHeader value="Date/Time" />,
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {moment.utc(e.createDate).local().format("MM/DD/YYYY hh:mm A")}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Activity" />,
        id: "actions",
        accessor: (e) => (
          <Typography variant="subtitle1" className="table__light">
            {e.action}
          </Typography>
        ),
      },
    ];

    const { loading, activityList } = this.props.activity;

    return (
      <div className="content general-content react-transition swipe-right">
        <div>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <div className="TransactionTable ActivityTable">
              <ReactTable
                data={activityList}
                columns={columns}
                defaultPageSize={10}
                minRows={1}
                noDataText="NO DATA!"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  activity: state.activity,
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantActivityById: (merchantId) =>
    dispatch(getMerchantActivityById(merchantId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantActi);
