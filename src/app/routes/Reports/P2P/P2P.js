import React from "react";
import { connect } from "react-redux";
import { getP2P_Transactions } from "../../../../actions/transactions/actions";
import "../../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import moment from "moment";
// import "./Transactions.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../Transactions/Transactions.css";
import SearchIcon from "@material-ui/icons/Search";

class P2P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      from: undefined,
      to: undefined,
      amount: "",
      amountFrom: "",
      amountTo: "",
      range: ""
    };
  }

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

  componentDidMount() {
    this.props.getP2P_Transactions();
  }

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };
  _SearchAmount = async e => {
    await this.setState({ amount: e.target.value });
  };

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
    // console.log("YAYAYA", this.props.P2PList);
    const { from, to } = this.state;
    let TransactionsList = this.props.P2PList;
    if (TransactionsList) {
      if (this.state.search) {
        TransactionsList = TransactionsList.filter(e => {
          return (
            e.sender
              //   .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            e.reciever
              //   .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            parseInt(e.merchantId) === parseInt(this.state.search)
          );
        });
      }
      if (this.state.from) {
        TransactionsList = TransactionsList.filter(e => {
          let date = moment(e.createdDate).format("YYYY-MM-DD");
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
      if (this.state.range) {
        if (this.state.range === "week") {
          const today = moment();
          const from_date = today.startOf("week").format("YYYY-MM-DD");
          const to_date = today.endOf("week").format("YYYY-MM-DD");
          TransactionsList = TransactionsList.filter(e => {
            let date = moment(e.createdDate).format("YYYY-MM-DD");
            return date >= from_date && date <= to_date;
          });
        }
        if (this.state.range === "today") {
          const today = moment().format("YYYY-MM-DD");
          TransactionsList = TransactionsList.filter(e => {
            let date = moment(e.createdDate).format("YYYY-MM-DD");
            return date === today;
          });
        } else {
          const today = moment();
          const from_month = today.startOf("month").format("YYYY-MM-DD");
          const to_month = today.endOf("month").format("YYYY-MM-DD");
          TransactionsList = TransactionsList.filter(e => {
            let date = moment(e.createdDate).format("YYYY-MM-DD");
            return date >= from_month && date <= to_month;
          });
        }
      }
    }

    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        maxWidth: 200,
        accessor: e => {
          return moment
            .utc(e.createdDate)
            .local()
            .format("MM/DD/YYYY HH:mm A");
        }
      },
      {
        id: "Sender",
        Header: "Sender",
        accessor: "sender"
      },
      {
        id: "Reciever",
        Header: "Reciever",
        accessor: "reciever"
      },
      {
        id: "Type ",
        Header: "Type",
        width: 180,
        accessor: "type"
      },
      {
        id: "Status",
        Header: "Status",
        accessor: e =>
          e.status !== null ? <p className="P2pStatus">{e.status}</p> : null
      },
      {
        id: "Amount",
        Header: "Amount",
        width: 180,
        accessor: e => (e.amount !== null ? <span>${e.amount}</span> : null)
      }
    ];
    return (
      <div className="container-fluid react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Transactions" />}
        />
        <div className="MerList" style={{ padding: "10px" }}>
          <div className="MReqSP TransactionsBox">
            {/* SEARCH */}
            <div className="search">
              <form>
                <SearchIcon className="button" title="Search" />
                <input
                  type="text"
                  className="textbox"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this._SearchMerchants}
                />
              </form>
            </div>
          </div>
          <div className="row TransactionSearch" style={{ marginTop: "10px" }}>
            <div className="col-md-4" align="center">
              <form noValidate>
                <TextField
                  id="date"
                  label="From"
                  type="date"
                  className="datePicker"
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
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
              </select>
            </div>
            <div className="col-md-4 searchx" align="center">
              <h6
                style={{
                  color: "rgba(0, 0, 0, 0.54)",
                  fontSize: "0,7rem"
                }}
              >
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
            <div className="col-md-4">
              <div className="search">
                <h6
                  style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}
                >
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
                <h6
                  style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0,7rem" }}
                >
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
          <div className="MListContainer Transactions">
            <ReactTable
              data={TransactionsList}
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

const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  TransactionList: state.getTransactions,
  P2PList: state.GetP2P
});
const mapDispatchToProps = dispatch => ({
  getP2P_Transactions: () => {
    dispatch(getP2P_Transactions());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P2P);
