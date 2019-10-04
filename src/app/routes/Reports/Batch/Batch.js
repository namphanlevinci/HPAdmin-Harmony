import React from "react";
import { connect } from "react-redux";
import {
  getBatch,
  getBatchDetail
} from "../../../../actions/transactions/actions";
import "../../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Batch.css";
import moment from "moment";
import "../Transactions/Transactions.css";
import "../../Merchants/MerchantsList/merchantsList.css";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    this.props.getBatch();
  }
  _SearchMerchants = async e => {
    await this.setState({ search: e.target.value });
  };
  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    const onRowClick = (state, rowInfo, column, instance) => {
      return {
        onClick: e => {
          // console.log("1", rowInfo.original.settlementId);
          if (rowInfo !== undefined) {
            // console.log("2", rowInfo.original.settlementId);
            this.props.fetchBatchDetail(rowInfo.original.settlementId);
            this.props.history.push("/app/reports/batch-detail");
          }
        }
      };
    };

    let BatchList = this.props.Batch;
    if (BatchList) {
      if (this.state.search) {
        BatchList = BatchList.filter(e => {
          return (
            e.doBusinessName
              .trim()
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            parseInt(e.merchantId) === parseInt(this.state.search)
          );
        });
      }
    }

    const columns = [
      {
        Header: "Date/Time",
        columns: [
          {
            Header: "",
            id: "yeet",
            width: 120,
            accessor: e => {
              return moment
                .utc(e.settlementDate)
                .local()
                .format("MM/DD/YYYY HH:mm A");
            }
          }
        ]
      },
      {
        id: "Customer",
        Header: "Merchant DBA",
        width: 100,
        columns: [
          {
            Header: "",
            id: "DBA",
            accessor: "doBusinessName"
          }
        ]
        // accessor: e => e.user.fullName
      },
      {
        Header: "Merchant ID",
        columns: [
          {
            Header: "",
            accessor: "merchantId",
            width: 120
          }
        ]
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "center"
            }}
          >
            Reports
          </div>
        ),

        // accessor: "title"
        columns: [
          {
            Header: "Harmony Credit",
            accessor: "paymentByHarmony"
          },
          {
            Header: "Credit Card",
            accessor: "paymentByCreditCard"
          },
          {
            Header: "Cash",
            accessor: "paymentByCash"
          },
          {
            Header: "Other",
            accessor: "otherPayment"
          }
        ]
      },
      {
        Header: "Total",
        width: 180,
        columns: [
          {
            Header: "",
            id: "total",
            accessor: e => <span>${e.total}</span>
          }
        ]
      }
    ];

    return (
      <div className="container-fluid react-transition swipe-right Batchs">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Batch" />}
        />
        <div className="MerList BatchsContainer" style={{ padding: "10px" }}>
          <div className="MReqSP TransactionsBox">
            <div className="BatchSearch">
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
          <div className="MListContainer Transactions">
            <ReactTable
              data={this.props.Batch}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              noDataText="NO DATA!"
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
  Batch: state.getAllBatch
});
const mapDispatchToProps = dispatch => ({
  getBatch: () => {
    dispatch(getBatch());
  },
  fetchBatchDetail: payload => {
    dispatch(getBatchDetail(payload));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
