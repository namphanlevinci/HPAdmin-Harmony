import React from "react";
import { connect } from "react-redux";
import { getAll_Transactions } from "../../../../actions/transactions/actions";
import Pagination from "../../Merchants/MerchantsList/Pagination";
import "../../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import moment from "moment";
import "./Transactions.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: "",
      PaginationFilter: false,
      from: undefined,
      to: undefined,
      amount: "",
      amountFrom: "",
      amountTo: "",
      range: ""
    };
  }
  onChangePage = data => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };
  handleResetClick = () => {
    this.setState({
      from: undefined,
      to: undefined,
      amount: "",
      amountFrom: "",
      amountTo: "",
      range: ""
    });
  };
  fromDate = e => {
    this.setState({ from: e.target.value });
  };
  toDate = e => {
    this.setState({ to: e.target.value });
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  };
  componentDidMount() {
    this.props.getAll_Transactions();
    this.setState({
      totalRecords: this.props.TransactionList.length
    });
  }

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
    if (this.state.search.length === 1) {
      this.PaginationFilter();
    }
  };
  _SearchAmount = async e => {
    await this.setState({ amount: e.target.value });
  };

  PaginationFilter() {
    this.setState({ PaginationFilter: true });
    setTimeout(() => {
      this.setState({ PaginationFilter: false });
    }, 300);
  }
  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  _TimeRange = async e => {
    await this.setState({
      range: e.target.value
    });
  };
  render() {
    var { pageLimit, startIndex, endIndex } = this.state;
    const { from, to } = this.state;
    let TransactionsList = this.props.TransactionList;
    if (TransactionsList) {
      if (this.state.search) {
        TransactionsList = TransactionsList.filter(e => {
          return (
            e.user.firstName
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            e.user.phone
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            parseInt(e.merchantId) === parseInt(this.state.search)
          );
        });
      }
      if (this.state.from) {
        TransactionsList = TransactionsList.filter(e => {
          let date = moment(e.createDate).format("YYYY-MM-DD");
          return date >= from && date <= to;
        });
      }
      if (this.state.amount) {
        TransactionsList = TransactionsList.filter(e => {
          const A = parseInt(e.amount);
          const B = parseInt(this.state.amount);
          return A === B;
        });
      }
      if (this.state.amountFrom) {
        TransactionsList = TransactionsList.filter(e => {
          const Amount = parseInt(e.amount);
          const AmountFrom = parseInt(this.state.amountFrom);
          const AmountTo = parseInt(this.state.amountTo);
          return Amount >= AmountFrom && Amount <= AmountTo;
        });
      }
    }
    const renderTransactionsList = TransactionsList.slice(
      startIndex,
      endIndex + 1
    ).map(e => {
      return (
        <tr key={e.paymentTransactionId}>
          <td>{moment(e.createDate).format("DD/MM/YYYY")}</td>
          <td>{e.paymentTransactionId}</td>
          <td>{e.user.firstName + " " + e.user.lastName}</td>
          <td>{e.user.phone}</td>
          <td>{e.paymentData.method}</td>
          <td>{e.paymentData.card_type}</td>
          <td>{"$" + e.amount}</td>
          <td>{e.ip}</td>
          <td>{e.paymentData.validation_status}</td>
        </tr>
      );
    });

    return (
      <div className="container-fluid MerList">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Transactions" />}
        />
        <div className="MReqSP TransactionsBox">
          {/* SEARCH */}
          <div className="search">
            <form>
              <input title="Search" value="" className="button" readOnly />
              <input
                type="text"
                className="textbox"
                placeholder="Search.."
                value={this.state.search}
                onChange={this._SearchMerchants}
              />
            </form>
          </div>
          {/* THANH CHUYỂN TRANGz */}
          <div className="paginating-table">
            <Pagination
              totalRecords={TransactionsList.length}
              pageLimit={pageLimit || 10}
              initialPage={1}
              pagesToShow={10}
              onChangePage={this.onChangePage}
              PaginationFilter={this.state.PaginationFilter}
            />
          </div>
        </div>
        <div className="row TransactionSearch" style={{ marginTop: "10px" }}>
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
            <h6 style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}>
              Time range
            </h6>
            <select
              className="search"
              value={this.state.range}
              onChange={this._TimeRange}
            >
              <option value="">ALL </option>
              <option>This week</option>
              <option>This month</option>
            </select>
          </div>
          <div className="col-md-4">
            <div className="search">
              <h6 style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}>
                Amount ($)
              </h6>
              <form>
                <input
                  type="text"
                  name="amount"
                  className="textbox"
                  placeholder="Amount ($)"
                  value={this.state.amount}
                  onChange={this._handleChange}
                />
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="search">
              <h6 style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}>
                Amount From:
              </h6>
              <form>
                <input
                  type="text"
                  className="textbox"
                  name="amountFrom"
                  placeholder="Amount From"
                  value={this.state.amountFrom}
                  onChange={this._handleChange}
                />
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="search">
              <h6 style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}>
                Amount To:
              </h6>
              <form>
                <input
                  type="text"
                  className="textbox"
                  name="amountTo"
                  placeholder="Amount To"
                  value={this.state.amountTo}
                  onChange={this._handleChange}
                />
              </form>
            </div>
          </div>
          <div className="col-md-12">
            <Button variant="contained" onClick={this.handleResetClick}>
              RESET
            </Button>
          </div>
        </div>
        {/* //! yeet */}
        <div className="MListContainer Transactions">
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
            <tbody>{renderTransactionsList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  TransactionList: state.getTransactions
});
const mapDispatchToProps = dispatch => ({
  getAll_Transactions: () => {
    dispatch(getAll_Transactions());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
