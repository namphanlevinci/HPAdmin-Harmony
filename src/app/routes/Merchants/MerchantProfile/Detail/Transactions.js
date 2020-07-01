import React, { Component } from "react";
import { connect } from "react-redux";
import DayPicker, { DateUtils } from "react-day-picker";

import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";

import "../../../Accounts/Logs/Logs.css";
import "react-day-picker/lib/style.css";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search_consumer: "",
      search_amount: "",
      from: undefined,
      to: undefined,
    };
  }

  componentDidMount() {
    const ID = this.props.MerchantProfile.merchantId;
    axios
      .get(
        "https://api2.levincidemo.com/api/CustomerMerchantTransaction/" + ID,
        {
          headers: {
            Authorization: `Bearer ${this.props.userLogin.token}`,
          },
        }
      )
      .then((res) => {
        // console.log("res.data.data", res.data.data);
        this.setState({ data: res.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleResetClick = () => {
    this.setState({ from: undefined, to: undefined });
    this.setState({ search_consumer: "", search_amount: "" });
  };
  getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  }
  handleDayClick = (day) => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };
  _onChangeSearchUser = async (e) => {
    await this.setState({
      search_consumer: e.target.value,
    });
  };
  _onChangeSearchAmount = async (e) => {
    await this.setState({
      search_amount: e.target.value,
    });
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const valuez = { start: this.state.from, end: this.state.to };
    let renderTable = this.state.data;
    let renderConsumerName = this.state.data;
    if (this.state.from) {
      renderTable = renderTable.filter((datez) => {
        let date = moment(datez.createdDate)
          .subtract(10, "days")
          .calendar();
        let from = moment(modifiers.start)
          .subtract(10, "days")
          .calendar();
        let to = moment(modifiers.end)
          .subtract(10, "days")
          .calendar();

        let date2 = moment(date).format("X");
        let from2 = moment(from).format("X");
        let to2 = moment(to).format("X");
        return date2 >= from2 && date2 <= to2;
      });
    }
    if (this.state.search_consumer) {
      renderTable = renderTable.filter((e) => {
        let name = e.customer.firstName + " " + e.customer.lastName;
        return name === this.state.search_consumer;
      });
    }
    if (this.state.search_amount) {
      renderTable = renderTable.filter((e) => {
        let amount = e.amount;
        if (amount <= 50) {
          return amount <= this.state.search_amount;
        } else if (amount <= 2000) {
          return amount <= this.state.search_amount;
        } else {
          return amount <= this.state.search_amount;
        }
      });
    }
    let ConsumerName = this.getUnique(renderConsumerName, "customerId");
    const renderConsumer = ConsumerName.map((e) => {
      const name =
        e.customer !== null
          ? e.customer.firstName + " " + e.customer.lastName
          : null;
      return (
        <option key={e.customer.customerId} value={name}>
          {name}{" "}
        </option>
      );
    });
    const renderContent = renderTable.map((e) => {
      return (
        <tr key={e.customerMerchantTransactionId}>
          <td>
            {moment
              .utc(e.createdDate)
              .local()
              .format("MM/DD/YYYY")}
          </td>
          <td>{e.customerMerchantTransactionId}</td>
          <td>
            {e.customer !== null
              ? e.customer.firstName + " " + e.customer.lastName
              : null}
          </td>
          <td>{e.customer !== null ? e.customer.phone : null}</td>
          <td>{e.paymentMethod}</td>
          <td>{e.paymentData !== null ? e.paymentData.type : null}</td>
          <td>{e}</td>
          <td>{e.amount}</td>
          <td>Success</td>
        </tr>
      );
    });
    return (
      <div className="content GeneralContent">
        <div>
          <div className="container">
            <h2>Transactions Management</h2>
            <div className="row">
              <h3>
                <Button
                  style={{
                    padding: "10px 20px",
                    color: "#4251af",
                    backgroundColor: "#fff",
                    fontWeight: "600",
                  }}
                  variant="contained"
                  color="primary"
                  data-toggle="collapse"
                  data-target="#demo"
                >
                  FILTER
                </Button>
                <div id="demo" className="collapse">
                  <Button className="resetBtn" onClick={this.handleResetClick}>
                    Reset
                  </Button>
                  <span>
                    <DayPicker
                      className="Selectable"
                      numberOfMonths={1}
                      selectedDays={[from, { from, to }]}
                      value={valuez}
                      modifiers={modifiers}
                      onDayClick={this.handleDayClick}
                    />
                  </span>
                  <FormControl width={{ width: "140px" }}>
                    <h5>Customer Name:</h5>
                    <select
                      value={this.state.search_consumer}
                      onChange={this._onChangeSearchUser}
                    >
                      <option value="">ALL </option>
                      {renderConsumer}
                    </select>
                    <br />
                    <h5>Amount ($):</h5>
                    <select
                      value={this.state.search_amount}
                      onChange={this._onChangeSearchAmount}
                    >
                      <option value="">ALL </option>
                      <option value="50">Under $50</option>
                      <option value="2000">Under $2000</option>
                      <option value="3000">Under $3000</option>
                    </select>
                  </FormControl>
                  <br />
                </div>
              </h3>
            </div>
            <div className="TransactionTable">
              <h2>Summary Data</h2>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Customer</th>
                    <th>Phone number</th>
                    <th>Payment method</th>
                    <th>Card type</th>
                    <th>Amount</th>
                    <th>IP</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {/* <tbody>{renderContent}</tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});

export default connect(mapStateToProps)(Transactions);
