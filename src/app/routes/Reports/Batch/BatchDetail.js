import React from "react";
import { connect } from "react-redux";
import { AiFillAppstore } from "react-icons/ai";
import { CustomTableHeader } from "../../../../util/CustomText";
import { Button, Typography } from "@material-ui/core";

import moment from "moment";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import ReactTable from "react-table";
import CreditCardIcon from "../../../../util/CreditCardIcon";

import "../Transactions/Transactions.css";
import "../../Merchants/Merchants.css";
import "../../Merchants/RejectList/EditMerchant.css";
import "react-table/react-table.css";
import "./Batch.css";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  goBack = () => {
    this.props.history.push("/app/reports/batchs");
  };
  render() {
    const { data, loading, pageSize } = this.props.apiData;

    const columns = [
      {
        Header: <CustomTableHeader value="Transaction ID" />,
        id: "transaction id",
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className="batch__detail table__light"
          >
            {e.paymentData.transaction_id}
          </Typography>
        ),
        width: 400,
      },
      {
        id: "Customer",
        Header: <CustomTableHeader value="Date/Time" />,
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className=" batch__detail table__light"
          >
            {moment.utc(e.createdDate).local().format("MM/DD/YYYY hh:mm A")}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Invoice Number" />,
        id: "invoice number",
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className=" batch__detail table__light"
          >
            {e?.checkoutId}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Status" />,
        id: "status",
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className=" batch__detail table__light"
          >
            {e?.status.toUpperCase()}
          </Typography>
        ),
      },
      {
        Header: <CustomTableHeader value="Payment" />,
        id: "payment",
        accessor: (e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={CreditCardIcon(e.paymentData.card_type)} alt="" />
            <Typography variant="subtitle1" className="table__light">
              {e.paymentData.card_number}
            </Typography>
          </div>
        ),
      },
      {
        Header: <CustomTableHeader value="Total" />,
        id: "total",
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className="table__light batch__detail"
          >
            ${e.amount}
          </Typography>
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
                {`Merchant ID: ${this.props.reportMerchant?.merchantId}`}
              </h3>
            </div>
            <Button
              style={{
                color: "#4251af",
                backgroundColor: "white",
                marginTop: "0",
              }}
              className="btn btn-green"
              onClick={this.goBack}
            >
              BACK
            </Button>
          </div>
          <div className="Transactions" style={{ paddingTop: "10px" }}>
            <ReactTable
              columns={columns}
              data={data}
              row={pageSize}
              defaultPageSize={10}
              minRows={1}
              loading={loading}
              noDataText="NO DATA!"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reportMerchant: state.reportMerchant.data,
  apiData: state.fetchApi,
});
export default connect(mapStateToProps)(Transactions);
