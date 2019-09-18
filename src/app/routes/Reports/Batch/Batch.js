import React from "react";
import { connect } from "react-redux";
import { getBatch } from "../../../../actions/transactions/actions";
import "../../Merchants/MerchantsList/merchantsList.css";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
// import moment from "moment";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Batch.css";
import moment from "moment";

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getBatch();
    // console.log("YEET", this.props.Batch);
  }

  render() {
    const columns = [
      {
        id: "createDate",
        Header: "Batch ID",
        maxWidth: 100,
        // accessor: settlementId,
        columns: [
          {
            Header: "",
            accessor: "settlementId"
          }
        ]
        // accessor:
      },
      {
        Header: "Merchant ID",
        width: 140,
        columns: [
          {
            Header: "",
            accessor: "merchantId"
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
            accessor: "total"
          }
        ]
      },
      {
        Header: "Date/Time",
        columns: [
          {
            Header: "",
            id: "yeet",
            accessor: e => {
              return moment
                .utc(e.settlementDate)
                .local()
                .format("MM-DD-YYYY HH:mm A");
            }
          }
        ]
      }
    ];
    // console.log(this.props.Batch);
    return (
      <div className="container-fluid react-transition swipe-right Batchs">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Batch" />}
        />
        <div className="MerList BatchsContainer" style={{ padding: "10px" }}>
          <div className="MListContainer Transactions">
            <ReactTable
              data={this.props.Batch}
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
  Batch: state.getAllBatch
});
const mapDispatchToProps = dispatch => ({
  getBatch: () => {
    dispatch(getBatch());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
