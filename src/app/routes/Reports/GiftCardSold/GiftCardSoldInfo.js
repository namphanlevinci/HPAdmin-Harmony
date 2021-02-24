import React, { Component } from "react";
import { connect } from "react-redux";
import { AiFillAppstore } from "react-icons/ai";
import { Button, Typography } from "@material-ui/core";
import { CustomTableHeader } from "../../../../util/CustomText";

import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import ReactTable from "react-table";
import moment from "moment";

import "react-table/react-table.css";
import "../Transactions/Transactions.css";
import "../../Merchants/Merchants.css";

import PropTypes from "prop-types";

class GiftCardSoldInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      loadingComp: false,
    };
  }
  goBack = () => {
    this.props.history.push("/app/reports/gift-card-sold");
  };

  render() {
    const { data, loading, pageSize, summary, totalRow } = this.props.apiData;
    console.log("data", data);
    console.log("prop", this.props);
    const columns = [
      {
        Header: <CustomTableHeader value="ID" />,
        id: "id",
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className="batch__detail table__light"
          >
            {e.giftCardId}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            Total Row: {totalRow}
          </Typography>
        ),
        width: 200,
      },
      {
        Header: <CustomTableHeader value="Serial" />,
        id: "transaction id",
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className="batch__detail table__light"
          >
            {e.serialNumber}
          </Typography>
        ),
        width: 500,
      },
      {
        Header: <CustomTableHeader value="Value" />,
        id: "value",
        accessor: (e) => (
          <Typography
            variant="subtitle1"
            className="table__light batch__detail"
          >
            ${e.value}
          </Typography>
        ),
        Footer: (
          <Typography variant="subtitle1" className="table__light">
            ${summary?.amount}
          </Typography>
        ),
      },
    ];
    return (
      <div className="container-fluid react-transition swipe-right Batchs">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Transactions" />}
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
            <button onClick={this.goBack} className="btn btn-red">
              BACK
            </button>
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

GiftCardSoldInfo.propTypes = {};
const mapStateToProps = (state) => ({
  // reportMerchant: state.reportMerchant.data,
  apiData: state.fetchApi,
  reportMerchant: state.reportMerchant.data,
});
export default connect(mapStateToProps)(GiftCardSoldInfo);
