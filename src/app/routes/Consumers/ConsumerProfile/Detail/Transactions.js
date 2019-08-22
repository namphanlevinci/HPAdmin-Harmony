import React, { Component } from "react";
import { connect } from "react-redux";
import "./Consumer.css";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import { NotificationContainer } from "react-notifications";
import Button from "@material-ui/core/Button";
import "react-day-picker/lib/style.css";
import moment from "moment";
import "moment/locale/it";
import "../../../Accounts/Logs/Logs.css";
import TextField from "@material-ui/core/TextField";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      from: undefined,
      to: undefined,
      selectedOption: null,
      range: ""
    };
  }
  handleResetClick = () => {
    this.setState({
      from: undefined,
      to: undefined,
      range: ""
    });
  };

  fromDate = e => {
    this.setState({ from: e.target.value });
  };
  toDate = e => {
    this.setState({ to: e.target.value });
  };
  _TimeRange = async e => {
    await this.setState({
      range: e.target.value
    });
  };
  render() {
    let renderTable = this.props.TransactionsList;
    const { from, to } = this.state;
    if (this.state.from) {
      renderTable = renderTable.filter(e => {
        let date = moment(e.createDate).format("YYYY-MM-DD");
        return date >= from && date <= to;
      });
    }
    if (this.state.range) {
      if (this.state.range === "week") {
        const today = moment();
        const from_date = today.startOf("week").format("YYYY-MM-DD");
        const to_date = today.endOf("week").format("YYYY-MM-DD");
        renderTable = renderTable.filter(e => {
          let date = moment(e.createDate).format("YYYY-MM-DD");
          return date >= from_date && date <= to_date;
        });
      } else {
        const today = moment();
        const from_month = today.startOf("month").format("YYYY-MM-DD");
        const to_month = today.endOf("month").format("YYYY-MM-DD");
        renderTable = renderTable.filter(e => {
          let date = moment(e.createDate).format("YYYY-MM-DD");
          return date >= from_month && date <= to_month;
        });
      }
    }

    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        width: 200,
        accessor: e => {
          return moment(e.createDate).format("MM-DD-YYYY HH:mm A");
        }
      },
      {
        Header: "Transaction ID",
        accessor: "paymentTransactionId"
      },
      {
        id: "Activity",
        Header: "Activity",
        accessor: e => (
          <p className="TStatus" style={{ fontWeight: 0 }}>
            {e.paymentData.transaction_type}
          </p>
        )
      },
      {
        id: "PaymentMethod",
        Header: "Payment Method",
        accessor: e => (
          <p className="TStatus" style={{ fontWeight: 0 }}>
            {e.paymentData.method}
          </p>
        )
      },
      {
        id: "cardtype",
        Header: "Card type",
        accessor: e => e.paymentData.card_type
      },
      {
        id: "amount",
        Header: "Amount",
        accessor: e => e.amount,
        Cell: e => <span className="">${Math.round(e.value * 100) / 100}</span>
      },
      {
        Header: "IP",
        accessor: "ip"
      },
      {
        id: "status",
        Header: "Status",
        accessor: e => (
          <p className="TStatus" style={{ fontWeight: 0 }}>
            {e.paymentData.validation_status}
          </p>
        )
      }
    ];
    return (
      <div className="content GeneralContent ConsumerTransactions react-transition swipe-right">
        <div>
          <div className="container">
            <h2>Transactions Management</h2>
            <div className="row">
              <div className="col-md-4">
                <form noValidate>
                  <TextField
                    id="date"
                    label="From"
                    type="date"
                    // defaultValue={newToday}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.fromDate}
                  />
                </form>
              </div>
              <div className="col-md-4">
                <form noValidate>
                  <TextField
                    id="date"
                    label="To"
                    type="date"
                    // defaultValue={this.state.to}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.toDate}
                  />
                </form>
              </div>
              <div className="col-md-4">
                <h6
                  style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}
                >
                  Time range
                </h6>
                <select
                  className="search"
                  value={this.state.range}
                  onChange={this._TimeRange}
                >
                  <option value="">ALL </option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                </select>
              </div>
              <div className="col-md-12">
                <Button className="resetBtn" onClick={this.handleResetClick}>
                  Reset
                </Button>
              </div>
            </div>
            <div className="TransactionTable">
              <h2>Summary Data</h2>
              <ReactTable
                data={renderTable}
                columns={columns}
                defaultPageSize={5}
                minRows={0}
                noDataText="NO DATA!"
              />
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  TransactionsList: state.userTransaction
});

export default connect(mapStateToProps)(Transactions);
