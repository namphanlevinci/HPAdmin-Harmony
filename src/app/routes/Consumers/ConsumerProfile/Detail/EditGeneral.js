import React, { Component } from "react";
import { connect } from "react-redux";
import { ViewProfile_Merchants } from "../../../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import Button from "@material-ui/core/Button";
import axios from "axios";
import URL from "../../../../../url/url";

import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import "../../../Merchants/MerchantProfile/Detail/Detail.css";
class EditGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      limitAmount: "",
      ID: "",
      Token: "",
    };
  }

  async componentDidMount() {
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
    const data = this.props.MerchantProfile;
    this.setState({
      ID: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      limitAmount: data.limitAmount,
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
  _Update = () => {
    const { ID, firstName, lastName, phone, email, limitAmount } = this.state;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token },
    };
    axios
      .put(
        URL + "/user/update/" + ID,
        {
          firstName,
          lastName,
          phone,
          email,
          limitAmount,
        },
        config
      )
      .then(async (res) => {
        if (res.data.message === "Success") {
          store.addNotification({
            title: "SUCCESS!",
            message: `${res.data.message}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          setTimeout(() => {
            axios.get(URL + "/user/" + this.state.ID, config).then((res) => {
              if (res.data.data !== null) {
                this.props.ViewProfile_Merchants(res.data.data);
                this.props.history.push("/app/consumers/profile/general");
              }
            });
          }, 1500);
        } else {
          store.addNotification({
            title: "ERROR!",
            message: `${res.data.message}`,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        }
      });
  };
  _goBack = () => {
    this.props.history.push("/app/consumers/profile/general");
  };
  render() {
    // const e = this.props.MerchantProfile;
    const renderGeneral = (
      <div className="react-transition swipe-right">
        <div className="container-fluid">
          <h2>General Information</h2>
          <div className="row">
            <div className="col-3">
              <h4>First Name</h4>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this._handleChange}
              />
            </div>
            <div className="col-3">
              <h4>Last Name</h4>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this._handleChange}
              />
            </div>
            <div className="col-3">
              <h4>Phone Number</h4>
              <div>
                <input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this._handleChange}
                />
              </div>
            </div>
            <div className="col-3">
              <h4>Email</h4>
              <div>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this._handleChange}
                />
              </div>
            </div>
          </div>
          <h2 style={{ marginTop: "15px" }}>
            Daily transactions limit (unit $)
          </h2>
          <label>
            The HarmonyPay system will alert any user and pervent any use
            involved monetary transfer or transfers that are:
          </label>
          <label>
            a. More than $10,000 in total from either cash-in or cash-out.
          </label>
          <br />
          <label>b. Is conducted by the same person.</label>
          <br />
          <label>c. Is conducted on the same business day.</label>
          <br />
          <div style={{ marginTop: "3px" }}>
            <input
              type="text"
              name="limitAmount"
              value={this.state.limitAmount}
              onChange={this._handleChange}
              className="col-3"
            />
          </div>
        </div>

        <div
          className="SettingsContent GeneralContent"
          style={{ marginTop: "20px" }}
        >
          <Button className="btn btn-green" onClick={this._Update}>
            SAVE
          </Button>
          <Button className="btn btn-red" onClick={this._goBack}>
            CANCEL
          </Button>
        </div>
      </div>
    );

    return <div className="content">{renderGeneral}</div>;
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);
