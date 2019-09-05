import React from "react";
import { connect } from "react-redux";
import { getAll_Transactions } from "../../../../actions/transactions/actions";
import "../../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
// import moment from "moment";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Batch.css";
class Transactions extends React.Component {
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
    this.props.getAll_Transactions();
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
    const columns = [
      {
        id: "createDate",
        Header: "Batch ID",
        maxWidth: 100,
        columns: [
          {
            Header: ""
          }
        ]
        // accessor:
      },
      {
        Header: "Merchant ID",
        // accessor: "paymentTransactionId",
        width: 140,
        columns: [
          {
            Header: ""
          }
        ]
      },
      {
        id: "Customer",
        Header: "Merchant Code",
        width: 160,
        columns: [
          {
            Header: ""
          }
        ]
        // accessor: e => e.user.fullName
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
            Header: "Harmony Credit"
          },
          {
            Header: "Credit Card"
          },
          {
            Header: "Cash"
          },
          {
            Header: "Other"
          }
        ]
      },
      {
        Header: "Total",
        width: 180,
        columns: [
          {
            Header: ""
          }
        ]
      },
      {
        Header: "Date/Time",
        columns: [
          {
            Header: ""
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
          <div className="MListContainer Transactions">
            <ReactTable
              //   data={null}
              columns={columns}
              defaultPageSize={10}
              minRows={2}
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
