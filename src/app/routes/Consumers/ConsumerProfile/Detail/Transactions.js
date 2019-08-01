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
import Select from "react-select";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      from: undefined,
      to: undefined,
      selectedOption: null
    };
  }
  handleResetClick = () => {
    this.setState({
      from: undefined,
      to: undefined,
      selectedOption: null
    });
  };

  fromDate = e => {
    this.setState({ from: e.target.value });
  };
  toDate = e => {
    this.setState({ to: e.target.value });
  };

  //! filter theo tuần/tháng chưa làm
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
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
    const options = [
      { value: "chocolate", label: "This week" },
      { value: "strawberry", label: "This year" },
      { value: "vanilla", label: "This month" }
    ];
    const { selectedOption } = this.state;
    return (
      <div className="content GeneralContent">
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
                <h5>Time range</h5>
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                />
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
