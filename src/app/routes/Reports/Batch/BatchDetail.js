import React from "react";
import { connect } from "react-redux";
import {
  getBatch,
  getBatchDetail
} from "../../../../actions/transactions/actions";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import moment from "moment";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";

import "../Transactions/Transactions.css";
import "../../Merchants/MerchantsList/merchantsList.css";
import "../../Merchants/MerchantRejectList/EditMerchant.css";
import "react-table/react-table.css";
import "./Batch.css";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  _goBack = () => {
    this.props.history.push("/app/reports/batchs");
  };
  render() {
    let BatchDetail = this.props.BatchDetail;
    // console.log("BatchDetail", BatchDetail);
    const columns = [
      {
        Header: "Transaction ID",
        id: "transaction id",
        accessor: e => e.paymentData.transaction_id,
        width: 250
      },
      {
        id: "Customer",
        Header: "Date/Time",
        accessor: e => (
          <span style={{ fontWeight: 600 }}>
            {moment
              .utc(e.createdDate)
              .local()
              .format("MM/DD/YYYY HH:mm A")}
          </span>
        )
      },
      {
        Header: "Invoice Number",
        id: "invoice number",
        accessor: "checkoutId",
        width: 170
      },
      {
        Header: "Status",
        id: "status",
        accessor: e =>
          e.status !== null ? <p className="BatchStatus">{e.status}</p> : null,
        width: 100
      },
      {
        Header: "Payment",
        id: "payment",
        accessor: e => e.paymentData.transaction_type
      },
      {
        Header: "Total",
        id: "total",
        accessor: e => <span style={{ fontWeight: 600 }}>${e.amount}</span>
      }
    ];

    const renderBatchDetail =
      BatchDetail !== undefined ? (
        <div className="container-fluid react-transition swipe-right Batchs">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.Batch" />}
          />
          <div
            className="MerList BatchsContainer page-heading"
            style={{ padding: "10px" }}
          >
            <div className="MReqSP TransactionsBox">
              <h3>Merchant ID:</h3>
              <Button
                style={{ color: "#4251af", backgroundColor: "white" }}
                className="btn btn-green"
                onClick={this._goBack}
              >
                BACK
              </Button>
            </div>
            <div className="Transactions" style={{ paddingTop: "10px" }}>
              <ReactTable
                data={BatchDetail}
                columns={columns}
                defaultPageSize={10}
                minRows={1}
                noDataText="NO DATA!"
              />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/reports/batchs" />
      );
    return <div>{renderBatchDetail}</div>;
  }
}

const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  Batch: state.getAllBatch,
  BatchDetail: state.BatchDetail
});
const mapDispatchToProps = dispatch => ({
  getBatch: () => {
    dispatch(getBatch());
  },
  fetchBatchDetail: payload => {
    dispatch(getBatchDetail(payload));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
