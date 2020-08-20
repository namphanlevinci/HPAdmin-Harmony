import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_CONSUMER } from "../../../../../actions/consumer/actions";

import SimpleReactValidator from "simple-react-validator";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import "../../../Merchants/MerchantProfile/Detail/Detail.css";
import "./Consumer.css";

class EditGeneral extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required!",
      },
    });
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

  componentDidMount() {
    const data = this.props.ConsumerProfile;
    this.setState({
      ID: data?.userId,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.phone,
      limitAmount: data?.limitAmount,
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

  submitUpdate = () => {
    if (this.validator.allValid()) {
      this.props.UPDATE_CONSUMER(this.state, this.state.ID);
    } else {
      this.validator.showMessages();

      this.forceUpdate();
    }
  };

  _goBack = () => {
    this.props.history.push("/app/consumers/profile/general");
  };
  render() {
    const renderGeneral = (
      <div className="react-transition swipe-right consumer__general">
        <div className="container-fluid">
          <h2>General Information</h2>
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-sm-4 col-md-3">
              <TextField
                type="text"
                label="First Name*"
                name="firstName"
                value={this.state.firstName}
                onChange={this._handleChange}
              />

              {
                <p className="required">
                  {this.validator.message(
                    "firstName",
                    this.state.firstName,
                    "required"
                  )}
                </p>
              }
            </div>
            <div className="col-sm-4 col-md-3">
              <TextField
                label="Last Name*"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this._handleChange}
              />

              {
                <p className="required">
                  {this.validator.message(
                    "lastName",
                    this.state.lastName,
                    "required"
                  )}
                </p>
              }
            </div>

            <div className="col-sm-12 col-md-6">
              <div>
                <TextField
                  label="Contact Email*"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this._handleChange}
                />
                {
                  <p className="required">
                    {this.validator.message(
                      "email",
                      this.state.email,
                      "required|email"
                    )}
                  </p>
                }
              </div>
            </div>
            <div className="col-sm-4 col-md-3" style={{ paddingTop: "10px" }}>
              <label style={{ fontSize: "13px" }}>Phone Number*</label>
              <div>
                <input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this._handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="SettingsContent general-content"
          style={{ marginTop: "20px" }}
        >
          <Button className="btn btn-green" onClick={this.submitUpdate}>
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
  ConsumerProfile: state.ConsumerReducer.Consumer,
  userLogin: state.userReducer.User,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_CONSUMER: (payload, id) => {
    dispatch(UPDATE_CONSUMER(payload, id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);
