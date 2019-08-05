import React from "react";
import { connect } from "react-redux";
import { getAll_ConsumerUsers } from "../../../actions/business/actions";
import { ViewProfile_Merchants } from "../../../actions/merchants/actions";
import "../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import "../Reports/Transactions/Transactions.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./ConsumerProfile/Detail/Consumer.css";
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

  componentWillMount() {
    this.props.getAll_ConsumerUsers();
  }

  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };
  _ConsumerProfile = e => {
    this.props.ViewProfile_Merchants(e);
    this.props.history.push("/app/consumers/profile/general");
  };

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "userId"
      },
      {
        Header: "First name",
        accessor: "firstName"
      },
      {
        Header: "Last name",
        accessor: "lastName"
      },
      {
        Header: "Phone number",
        accessor: "phone"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        id: "totalAmount",
        Header: "Money spent/Daily",
        accessor: e => e.totalAmount,
        Cell: e => (
          <span className={e.value > 10000 ? "BIG" : ""}>${e.value}</span>
        )
      }
    ];

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

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: e => {
          console.log("rowInfo.row", rowInfo.row);
          this._ConsumerProfile(rowInfo.row);
        }
      };
    };
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
          </div>

          <div className="MListContainer">
            <ReactTable
              data={ConsumerList}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              getTdProps={onRowClick}
            />
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
