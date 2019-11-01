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
import ProgressLoading from "../../../util/progress";
import SearchIcon from "@material-ui/icons/Search";

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
      PaginationFilter: false,
      loading: false
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
        Header: "Harmony ID",
        accessor: "accountId",
        width: 170
      },
      {
        Header: "First name",
        accessor: "firstName",
        width: 130
      },
      {
        Header: "Last name",
        accessor: "lastName",
        width: 130
      },
      {
        Header: "Phone number",
        accessor: "phone",
        width: 180
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300
      },
      {
        Header: "Balance",
        accessor: "credit",
        Cell: e => <span>${e.value}</span>
      },
      {
        id: "totalAmount",
        Header: "Money spent/Daily",
        accessor: e => e.totalAmount,
        Cell: e => (
          <span className={e.value > 10000 ? "BIG" : ""}>${e.value}</span>
        )
      },
      {
        accessor: "limitAmount",
        show: false
      },
      {
        accessor: "banks",
        show: false
      },
      {
        accessor: "stateName",
        show: false
      },
      {
        accessor: "isDisabled",
        show: false
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
          if (rowInfo !== undefined) {
            this._ConsumerProfile(rowInfo.row);
          }
        }
      };
    };
    return (
      <div className="app-wrapper">
        <div className="container-fluid">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.consumers" />}
          />
          <div className="MerList" style={{ padding: "10px" }}>
            <div className="MReqSP TransactionsBox ">
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

            <div className="MListContainer">
              <ReactTable
                data={ConsumerList}
                columns={columns}
                defaultPageSize={10}
                minRows={1}
                getTdProps={onRowClick}
                loading={this.state.loading}
                LoadingComponent={ProgressLoading}
                noDataText="NO DATA!"
              />
            </div>
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
