import React, { Component } from "react";
import { connect } from "react-redux";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import "../../MerchantsList/merchantsList.css";
import "./Detail.css";
import moment from "moment";
// import TextField from "@material-ui/core/TextField";
import ReactTable from "react-table";
import "react-table/react-table.css";
// import Button from "@material-ui/core/Button";
import axios from "axios";
import URL from "../../../../../url/url";
class MerchantActi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: []
    };
  }

  async componentDidMount() {
    let ID = this.props.MerchantProfile.merchantId;
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
    const token = JSON.parse(this.state.Token);
    axios
      .get(URL + "/merchantactivity/" + ID, {
        headers: { Authorization: `Bearer ${token.token}` }
      })
      .then(async res => {
        await this.setState({ data: res.data.data });
      });
  }

  render() {
    const columns = [
      {
        id: "createDate",
        Header: "Date/time",
        accessor: e => {
          return moment
            .utc(e.createDate)
            .local()
            .format("MM/DD/YYYY HH:mm A");
        }
      },
      {
        Header: "Activity",
        accessor: "action"
      }
    ];
    // const { from, to } = this.state;
    // let renderTable = this.props.userActivity;
    // if (this.state.from) {
    //   renderTable = renderTable.filter(e => {
    //     let date = moment(e.createDate).format("YYYY-MM-DD");
    //     return date >= from && date <= to;
    //   });
    // }
    return (
      <div className="content GeneralContent react-transition swipe-right">
        <div>
          {/* <div className="container">
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
              <div className="col-md-4 resetBtn">
                <Button onClick={this.handleResetClick}>Reset</Button>
              </div>
            </div> */}
          <div className="TransactionTable ActivityTable">
            <h2>Summary Data</h2>
            <ReactTable
              data={this.state.data}
              columns={columns}
              defaultPageSize={10}
              minRows={1}
              noDataText="NO DATA!"
            />
          </div>
        </div>
      </div>
      //   </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});
export default connect(mapStateToProps)(MerchantActi);
