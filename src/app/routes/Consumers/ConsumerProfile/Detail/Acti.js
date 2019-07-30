import React, { Component } from "react";
import { connect } from "react-redux";
import "./Consumer.css";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import Button from "@material-ui/core/Button";
import "react-day-picker/lib/style.css";
import moment from "moment";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

class Acti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      from: undefined,
      to: undefined
    };
  }

  componentDidMount() {
    const ID = this.props.MerchantProfile.userId;
    axios
      .get("https://api2.levincidemo.com/api/useractivity/" + ID, {
        headers: {
          Authorization: `Bearer ${this.props.InfoUser_Login.User.token}`
        }
      })
      .then(res => {
        this.setState({ data: res.data.data });
      })
      .catch(error => {
        console.log(error);
      });
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
    const { from, to } = this.state;
    let renderTable = this.state.data;
    if (this.state.from) {
      renderTable = renderTable.filter(e => {
        let date = moment(e.createDate).format("YYYY-MM-DD");
        return date >= from && date <= to;
      });
    }
    let renderContent = renderTable.map(e => {
      return (
        <tr key={e.userActivityId}>
          <td>{moment(e.createDate).format("DD/MM/YYYY")}</td>
          <td>{e.action}</td>
        </tr>
      );
    });
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
            <div className="TransactionTable">
              <h2>Summary Data</h2>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Date/time</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>{renderContent}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default connect(mapStateToProps)(Acti);
