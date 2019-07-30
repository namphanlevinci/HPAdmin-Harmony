import React from "react";
import { connect } from "react-redux";
import { getAll_ConsumerUsers } from "../../../actions/business/actions";
import { ViewProfile_Merchants } from "../../../actions/merchants/actions";
import Pagination from "../Merchants/MerchantsList/Pagination";
import "../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import "../Reports/Transactions/Transactions.css";
class Consumers extends React.Component {
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
  _ConsumerProfile = e => {
    this.props.ViewProfile_Merchants(e);
    this.props.history.push("/app/consumers/profile/general");
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
    // console.log('ConsumerList', ConsumerList)
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
        return (
          <tr key={e.userId} onClick={() => this._ConsumerProfile(e)}>
            <td>{"HP-" + e.userId}</td>
            <td>{e.firstName}</td>
            <td>{e.lastName}</td>
            <td>{e.phone}</td>
            <td>{e.email}</td>
          </tr>
        );
      }
    );
    return (
      <div className="app-wrapper">
        <div className="container-fluid MerList">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.consumers" />}
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

          <div className="MListContainer">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>
                    <span className="Mlist_table">ID</span>
                  </th>
                  <th style={{ width: "15%" }}>
                    <span className="Mlist_table">First name</span>
                  </th>
                  <th style={{ width: "15%" }}>
                    <span className="Mlist_table">Last name</span>
                  </th>
                  <th style={{ width: "15%" }}>
                    <span className="Mlist_table">Phone number</span>
                  </th>
                  <th style={{ width: "15%" }}>
                    <span className="Mlist_table">Email</span>
                  </th>
                </tr>
              </thead>
              <tbody>{renderConsumerList}</tbody>
            </table>
          </div>
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
  },
  ViewProfile_Merchants: payload => {
    dispatch(ViewProfile_Merchants(payload));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Consumers);
