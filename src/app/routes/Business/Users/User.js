import React from "react";
import { connect } from "react-redux";
// import { getAll_Transactions } from '../../../../actions/transactions/actions'
import { getAll_ConsumerUsers } from "../../../../actions/business/actions";
import Pagination from "../../Merchants/MerchantsList/Pagination";
import "../../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import moment from "moment";
import "../../Reports/Transactions/Transactions.css";

class Users extends React.Component {
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
    this.props.getAll_ConsumerUsers();
  }
  componentDidMount() {
    this.setState({
      totalRecords: this.props.ConsumerList.length
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

    let ConsumerList = this.props.ConsumerList;
    if (ConsumerList) {
      if (this.state.search) {
        ConsumerList = ConsumerList.filter(e => {
          return (
            e.firstName
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            e.phone
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            parseInt(e.userId) === parseInt(this.state.search)
          );
        });
      } else {
      }
    }
    const renderConsumerList = ConsumerList.slice(startIndex, endIndex + 1).map(
      e => {
        const birthday = moment(e.birthDate).format("DD/MM/YYYY");
        return (
          <tr key={e.userId}>
            <td>{e.userId}</td>
            <td>{e.firstName + " " + e.lastName}</td>
            <td>{e.phone}</td>
            <td>{e.email}</td>
            <td>{birthday}</td>
            {e.totalAmount > 10000 ? (
              <td className="bigshot">{"$" + e.totalAmount}</td>
            ) : (
              <td>{"$" + e.totalAmount}</td>
            )}
          </tr>
        );
      }
    );
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
              totalRecords={ConsumerList.length}
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
                <th style={{ width: "10%" }}>
                  <span className="Mlist_table">ID</span>
                </th>
                <th style={{ width: "15%" }}>
                  <span className="Mlist_table">Name</span>
                </th>
                <th style={{ width: "15%" }}>
                  <span className="Mlist_table">Phone</span>
                </th>
                <th style={{ width: "15%" }}>
                  <span className="Mlist_table">Email</span>
                </th>
                <th style={{ width: "15%" }}>
                  <span className="Mlist_table">Birthday</span>
                </th>
                <th style={{ width: "10%" }}>
                  <span className="Mlist_table">Total Amount</span>
                </th>
              </tr>
            </thead>
            <tbody>{renderConsumerList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  InfoUser_Login: state.User,
  ConsumerList: state.getConsumerUsers
});
const mapDispatchToProps = dispatch => ({
  getAll_ConsumerUsers: () => {
    dispatch(getAll_ConsumerUsers());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
