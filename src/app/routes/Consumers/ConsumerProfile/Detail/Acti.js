import React, { Component } from "react";
import { connect } from "react-redux";
import "./Consumer.css";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import Button from "@material-ui/core/Button";
import "react-day-picker/lib/style.css";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Acti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      from: undefined,
      to: undefined
    };
  }

  handleResetClick = () => {
    this.setState({
      from: undefined,
      to: undefined,
      selectedOption: null
    });
  };
  fromDate = e => {
    this.setState({ from: e.target.value });
  };
  toDate = e => {
    this.setState({ to: e.target.value });
  };
  render() {
    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        accessor: e => {
          return moment(e.createDate).format("MM-DD-YYYY HH:mm:ss A");
        }
      },
      {
        Header: "Activity",
        accessor: "action"
      }
    ];
    const { from, to } = this.state;
    let renderTable = this.props.userActivity;
    if (this.state.from) {
      renderTable = renderTable.filter(e => {
        let date = moment(e.createDate).format("YYYY-MM-DD");
        return date >= from && date <= to;
      });
    }
    return (
      <div className="content GeneralContent">
        <div>
          <div className="container">
            <h2>Activities Logs</h2>
            <div className="row">
              <div className="col-md-4">
                <form noValidate>
                  <TextField
                    id="date"
                    label="From"
                    type="date"
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
                <Button className="resetBtn" onClick={this.handleResetClick}>
                  Reset
                </Button>
              </div>
            </div>
            <div className="TransactionTable ActivityTable">
              <h2>Summary Data</h2>
              <ReactTable
                data={renderTable}
                columns={columns}
                defaultPageSize={10}
                minRows={1}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  userActivity: state.userActivity
});

export default connect(mapStateToProps)(Acti);
