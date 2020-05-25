import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ReactTable from "react-table";
import DateInput from "./date-input";

import "react-table/react-table.css";
import "../../../Accounts/Logs/Logs.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import "./Consumer.css";
import "../../../Merchants/MerchantsList/merchantsList.css";

class Acti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      from: undefined,
      to: undefined,
    };
  }

  handleResetClick = () => {
    this.setState({
      from: undefined,
      to: undefined,
      selectedOption: null,
    });
  };
  fromDate = (e) => {
    this.setState({ from: e.target.value });
  };
  toDate = (e) => {
    this.setState({ to: e.target.value });
  };
  render() {
    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        accessor: (e) => {
          return moment
            .utc(e.createDate)
            .local()
            .format("MM/DD/YYYY HH:mm A");
        },
      },
      {
        Header: "Activity",
        accessor: "action",
      },
    ];
    const { from, to } = this.state;
    let renderTable = this.props.userActivity;
    if (this.state.from) {
      renderTable = renderTable.filter((e) => {
        let date = moment(e.createDate).format("YYYY-MM-DD");
        return date >= from && date <= to;
      });
    }
    return (
      <div className="content ConsumerTransactions  react-transition swipe-right">
        <div>
          <div className="container-fluid">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <h2>Activities Logs</h2>
              <div>
                <Button className="btn btn-red" onClick={this.handleResetClick}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <h6
                  style={{
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize: "0,7rem",
                    textAlign: "left",
                  }}
                >
                  From
                </h6>
                <div>
                  <form noValidate>
                    <DateInput fromDate={this.fromDate} />
                  </form>
                </div>
              </div>

              <div className="col-4">
                <form noValidate>
                  <h6
                    style={{
                      color: "rgba(0, 0, 0, 0.54)",
                      fontSize: "0,7rem",
                      textAlign: "left",
                    }}
                  >
                    To
                  </h6>
                  <div>
                    <DateInput fromDate={this.toDate} />
                  </div>
                </form>
              </div>
            </div>
            <div className="TransactionTable ActivityTable">
              <ReactTable
                data={renderTable}
                columns={columns}
                defaultPageSize={10}
                minRows={1}
                noDataText="NO DATA!"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  userActivity: state.userActivity,
});

export default connect(mapStateToProps)(Acti);
