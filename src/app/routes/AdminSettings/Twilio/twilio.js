import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "react-notifications-component";

import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import "../Setting.css";
import axios from "axios";
import { config } from "../../../../url/url";
const URL = config.url.URL;

class Twilio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountSid: "",
      auToken: "",
      phoneSender: "",
      email: "",
      host: "",
      port: "",
      password: "",
      userSmtp: "",
      creditFree: "",
      transactionFee: ",",
    };
  }
  async componentDidMount() {
    await axios
      .get(URL + "/adminsetting", {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      })
      .then((res) => {
        const twilio = res.data.data.twilio;
        const smtp = res.data.data.smtp;
        const general = res.data.data.general;
        this.setState({
          accountSid: twilio.accountSid,
          auToken: twilio.auToken,
          phoneSender: twilio.phoneSender,
          email: smtp.email,
          host: smtp.host,
          port: smtp.port,
          password: smtp.password,
          userSmtp: smtp.userSmtp,
          creditFree: general.creditFree,
          transactionFee: general.transactionFee,
          totalAmountLimit: general.totalAmountLimit,
        });
      });
  }
  _handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  _updateTwilio = (e) => {
    e.preventDefault();
    const {
      accountSid,
      auToken,
      phoneSender,
      email,
      host,
      password,
      userSmtp,
      creditFree,
      transactionFee,
      totalAmountLimit,
    } = this.state;
    let twilio = {
      accountSid: accountSid,
      auToken: auToken,
      phoneSender: phoneSender,
    };
    let smtp = { email, host, password, userSmtp };
    let general = { transactionFee, creditFree, totalAmountLimit };
    axios
      .post(
        URL + "/adminsetting",
        { twilio, smtp, general },
        {
          headers: {
            Authorization: `Bearer ${this.props.userLogin.token}`,
          },
        }
      )
      .then((res) => {
        store.addNotification({
          title: "SUCCESS!",
          message: `${res.data.message}`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 25000,
            onScreen: true,
          },
          width: 250,
        });
      })
      .catch((error) => {
        // console.log("ERROR", error);
        store.addNotification({
          title: "ERROR!",
          message: `${error.data.message}`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
          width: 250,
        });
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.Twilio" />}
        />
        <form className="form-style-7">
          <h1>TWILIO ACCOUNT</h1>
          <ul>
            <li>
              <label htmlFor="PHONE">PHONE</label>
              <input
                type="text"
                name="phoneSender"
                maxLength="100"
                value={this.state.phoneSender}
                onChange={this._handleChange}
              />
            </li>
            <li>
              <label htmlFor="ACCOUNTID">ACCOUNT TOKEN</label>
              <input
                type="password"
                name="auToken"
                maxLength="100"
                value={this.state.auToken}
                onChange={this._handleChange}
              />
            </li>
            <li>
              <label htmlFor="TOKEN">ACCOUNT SID</label>
              <input
                type="password"
                name="accountSid"
                maxLength="100"
                value={this.state.accountSid}
                onChange={this._handleChange}
              />
            </li>
            <li>
              {/* <button className="btn btn-green">EDIT </button>
                                <button className="btn btn-green">BACK</button> */}
              <button className="btn btn-green" onClick={this._updateTwilio}>
                UPDATE
              </button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
});

export default connect(mapStateToProps)(Twilio);
