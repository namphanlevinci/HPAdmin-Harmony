import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../Merchants/MerchantProfile/MerchantProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantReqProfile.css";
import "../../../Merchants/MerchantsRequest/MerchantsRequest.css";
import { NotificationContainer } from "react-notifications";
import Button from "@material-ui/core/Button";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  _toggleEdit = () => {
    this.setState({ edit: true });
  };
  render() {
    const e = this.props.MerchantProfile;
    const renderGeneral =
      e.email !== undefined ? (
        <div className="react-transition swipe-right">
          <div className="container">
            <h2>General Information</h2>
            <div className="row">
              <div className="col-md-3">
                <h4>First Name</h4>
                <p>{e.firstName !== null ? e.firstName : null}</p>
              </div>
              <div className="col-md-3">
                <h4>Last Name</h4>
                <p>{e.lastName !== null ? e.lastName : null}</p>
              </div>
              <div className="col-md-12">
                <h4>Phone Number</h4>
                <p>{e.phone !== null ? e.phone : null}</p>
              </div>
              <div className="col-md-12">
                <h4>Email</h4>
                <p>{e.email !== null ? e.email : null}</p>
              </div>
            </div>
            <div className="SettingsContent GeneralContent">
              <Button
                style={{
                  fontSize: "16px",
                  padding: "5px 30px",
                  color: "white",
                  backgroundColor: "#3f51b5"
                }}
                onClick={this._toggleEdit}
              >
                EDIT
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/app/consumers/list" />
      );
    return (
      <div className="content GeneralContent">
        {renderGeneral}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User
});

export default connect(mapStateToProps)(General);
