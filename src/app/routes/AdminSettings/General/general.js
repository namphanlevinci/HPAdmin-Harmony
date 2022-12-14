import React, { Component } from "react";
import { connect } from "react-redux";

import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import Axios from "axios";
import { config } from "../../../../url/url";

import "../Setting.css";

// ON HOLD

const URL = config.url.URL;
const upFile = config.url.upFile;
class General extends Component {
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
      transactionFee: "",
      creditFree: "",
      totalAmountLimit: "",
    };
  }
  async componentDidMount() {
    await Axios.get(URL + "/adminsetting", {
      headers: {
        Authorization: `Bearer ${this.props.userLogin.token}`,
      },
    }).then((res) => {
      // console.log({ res });
      const general = res.data.data.general;
      const twilio = res.data.data.twilio;
      const smtp = res.data.data.smtp;
      this.setState({
        accountSid: twilio.accountSid,
        auToken: twilio.auToken,
        phoneSender: twilio.phoneSender,
        email: smtp.email,
        host: smtp.host,
        port: smtp.port,
        password: smtp.password,
        userSmtp: smtp.userSmtp,
        transactionFee: general.transactionFee,
        creditFree: general.creditFree,
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
  _updateFee = (e) => {
    e.preventDefault();
    const {
      accountSid,
      auToken,
      phoneSender,
      email,
      host,
      password,
      userSmtp,
      transactionFee,
      creditFree,
      totalAmountLimit,
    } = this.state;
    let twilio = {
      accountSid: accountSid,
      auToken: auToken,
      phoneSender: phoneSender,
    };
    let smtp = { email, host, password, userSmtp };
    let general = { transactionFee, creditFree, totalAmountLimit };
    Axios.post(
      URL + "/adminsetting",
      { twilio, smtp, general },
      {
        headers: {
          Authorization: `Bearer ${this.props.userLogin.token}`,
        },
      }
    )
      .then((res) => {
        // <Notification
        //   title={"Success"}
        //   message={res.data.message}
        //   type={"success"}
        // />;
        // console.log('UPDATE', res)
      })
      .catch((error) => {
        console.log("ERROR", error);
        // NotificationManager.error(error.data.message, null, 800);
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.General" />}
        />
        <div className="row">
          <div className="col-md-4">
            <form className="">
              <h1>TRANSACTIONS FEE</h1>
              <ul>
                <li>
                  <label htmlFor="PHONE">Fee (%)</label>
                  <input
                    type="text"
                    name="transactionFee"
                    maxLength="100"
                    value={this.state.transactionFee}
                    onChange={this._handleChange}
                    style={{ textAlign: "center" }}
                  />
                </li>
                <li>
                  <button className="btn btn-green" onClick={this._updateFee}>
                    UPDATE
                  </button>
                </li>
              </ul>
            </form>
          </div>
          <div className="col-md-4">
            <form className="">
              <h1>TOTAL AMOUNT LIMIT</h1>
              <ul>
                <li>
                  <label htmlFor="PHONE">AMOUNT ($)</label>
                  <input
                    type="NUMBER"
                    name="totalAmountLimit"
                    maxLength="100"
                    value={this.state.totalAmountLimit}
                    onChange={this._handleChange}
                    style={{ textAlign: "center" }}
                  />
                </li>
                <li>
                  <button className="btn btn-green" onClick={this._updateFee}>
                    UPDATE
                  </button>
                </li>
              </ul>
            </form>
          </div>
          <div className="col-md-4">
            <form className="">
              <h1>CREDIT FEE</h1>
              <ul>
                <li>
                  <label htmlFor="PHONE">CREDIT FEE (%)</label>
                  <input
                    type="text"
                    name="creditFree"
                    maxLength="100"
                    value={this.state.creditFree}
                    onChange={this._handleChange}
                    style={{ textAlign: "center" }}
                  />
                </li>
                <li>
                  <button className="btn btn-green" onClick={this._updateFee}>
                    UPDATE
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userReducer.User,
});

export default connect(mapStateToProps)(General);
