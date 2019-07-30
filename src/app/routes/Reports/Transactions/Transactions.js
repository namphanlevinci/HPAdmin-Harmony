import React from "react";
import { connect } from "react-redux";
import { getAll_Transactions } from "../../../../actions/transactions/actions";
import Pagination from "../../Merchants/MerchantsList/Pagination";
import "../../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import moment from "moment";
import "./Transactions.css";

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
      PaginationFilter: false
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
  componentWillMount() {
    this.props.getAll_Transactions();
  }
  componentDidMount() {
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

  PaginationFilter() {
    this.setState({ PaginationFilter: true });
    setTimeout(() => {
      this.setState({ PaginationFilter: false });
    }, 300);
  }

  render() {
    var { pageLimit, startIndex, endIndex } = this.state;

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
      } else {
      }
    }
    console.log("TransactionsList", TransactionsList);
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
