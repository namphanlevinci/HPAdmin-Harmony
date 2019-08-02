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
    let renderContent = renderTable.map(e => {
      return (
        <tr key={e.paymentTransactionId}>
          <td>{moment(e.createDate).format("DD/MM/YYYY")}</td>
          <td>{e.paymentTransactionId}</td>
          <td>{e.paymentData.transaction_type}</td>
          <td>{e.paymentData.method}</td>
          <td>{e.paymentData.card_type}</td>
          <td>{"$" + e.amount}</td>
          <td>{e.ip}</td>
          <td>{e.paymentData.validation_status}</td>
        </tr>
      );
    });

    return (
      <div className="content GeneralContent ConsumerTransactions">
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
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Date/time</th>
                    <th>Transaction ID</th>
                    <th>Activity</th>
                    <th>Payment method</th>
                    <th>Card type</th>
                    <th>Amount</th>
                    <th>IP</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{renderContent}</tbody>
              </table>
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
