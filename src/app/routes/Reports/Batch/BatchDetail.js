import React from "react";
import { connect } from "react-redux";
import {
  getBatch,
  getBatchDetail,
} from "../../../../actions/transactions/actions";
import { AiFillAppstore } from "react-icons/ai";

import Button from "@material-ui/core/Button";
import moment from "moment";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import CreditCardIcon from "../../../../util/CreditCardIcon";

import "../Transactions/Transactions.css";
import "../../Merchants/MerchantsList/merchantsList.css";
import "../../Merchants/MerchantRejectList/EditMerchant.css";
import "react-table/react-table.css";
import "./Batch.css";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  _goBack = () => {
    this.props.history.push("/app/reports/batchs");
  };
  render() {
    let BatchDetail = this.props.BatchDetail;

    const columns = [
      {
        Header: "Transaction ID",
        id: "transaction id",
        accessor: (e) => (
          <div className="batch__detail">
            <p style={{ fontWeight: 400 }}>{e.paymentData.transaction_id}</p>
          </div>
        ),
        width: 300,
      },
      {
        id: "Customer",
        Header: "Date/Time",
        accessor: (e) => (
          <div className="batch__detail">
            <p style={{ fontWeight: 400 }}>
              {moment
                .utc(e.createdDate)
                .local()
                .format("LLL")}
            </p>
          </div>
        ),
        width: 200,
      },
      {
        Header: "Invoice Number",
        id: "invoice number",
        accessor: (e) => (
          <div className="batch__detail">
            <p>{e?.checkoutId}</p>
          </div>
        ),
        width: 140,
      },
      {
        Header: "Status",
        id: "status",
        accessor: (e) => (
          <div className="batch__detail">
            <p className="BatchStatus">{e?.status}</p>
          </div>
        ),
        width: 100,
      },
      {
        Header: "Payment",
        id: "payment",
        accessor: (e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={CreditCardIcon(e.paymentData.card_type)} alt="" />
            <p>{e.paymentData.card_number}</p>
          </div>
        ),
      },
      {
        Header: "Total",
        id: "total",
        accessor: (e) => (
          <div className="batch__detail">
            <p style={{ fontWeight: 400 }}>${e.amount}</p>
          </div>
        ),
      },
    ];

    return (
      <div className="container-fluid react-transition swipe-right Batchs">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Batch" />}
        />
        <div
          className="MerList batch-container page-heading"
          style={{ padding: "10px" }}
        >
          <div className=" TransactionsBox">
            <div style={{ display: "flex", alignItems: "center" }}>
              <AiFillAppstore size={23} style={{ color: " black" }} />
              <h3
                style={{
                  paddingLeft: "5px",
                  marginBottom: "0px",
                  fontWeight: "500",
                }}
              >
                {`Merchant ID: ${this.props.MerchantID?.merchantId}`}
              </h3>
            </div>
            <Button
              style={{
                color: "#4251af",
                backgroundColor: "white",
                marginTop: "0",
              }}
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
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
  Batch: state.getAllBatch,
  BatchDetail: state.BatchDetail,
  MerchantID: state.ViewProfile_Merchants,
});
const mapDispatchToProps = (dispatch) => ({
  getBatch: () => {
    dispatch(getBatch());
  },
  fetchBatchDetail: (payload) => {
    dispatch(getBatchDetail(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
