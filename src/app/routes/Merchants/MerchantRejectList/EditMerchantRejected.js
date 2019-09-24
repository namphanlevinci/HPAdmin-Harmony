import React, { Component } from "react";
import {
  getAll_Merchants,
  ViewProfile_Merchants,
  UpdateMerchant_Infor,
  GetMerchant_byID
} from "../../../../actions/merchants/actions";
import { ViewMerchant_Rejected_Merchants } from "../../../../actions/merchants/actions";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import ContainerHeader from "components/ContainerHeader/index";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Redirect } from "react-router-dom";
import "../MerchantProfile/MerchantProfile.css";
import "../MerchantsRequest/MerchantReqProfile.css";
import "../MerchantsRequest/MerchantsRequest.css";
import "./EditMerchant.css";
import Button from "@material-ui/core/Button";

class EditMerchantRejected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      businessName: "",
      email: "",
      cellphone: "",
      address: "",
      city: "",
      stateId: ""
    };
  }

  componentDidMount = () => {
    const data = this.props.MerchantProfile;
    this.setState({
      businessName: data.businessName,
      email: data.email,
      cellphone: data.cellPhone,
      address: data.address,
      city: data.city,
      stateId: data.stateId
    });
  };

  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  _goBack = () => {
    this.props.history.push("/app/merchants/rejected-profile");
  };

  _update = () => {
    const ID = this.props.MerchantProfile.merchantId;
    const {
      businessName,
      email,
      cellphone,
      address,
      city,
      stateId
    } = this.state;
    const payload = {
      ID,
      businessName,
      email,
      cellphone,
      address,
      city,
      stateId
    };
    this.props.updateMerchant(payload);
    setTimeout(() => {
      this.props.GetMerchant_byID(ID);
    }, 1000);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UpdateStatus !== this.props.UpdateStatus) {
      NotificationManager.success(this.props.UpdateStatus.Data.message);
    }
    if (nextProps.getMerchant !== this.props.getMerchant) {
      this.props.ViewMerchant_Rejected_Merchants(this.props.getMerchant.Data);
      this.props.history.push("/app/merchants/rejected-profile");
      // console.log("HERE 2", this.props.getMerchant.Data);
    }
  }

  render() {
    const e = this.props.MerchantProfile;
    const renderEdit =
      e.merchantId !== undefined ? (
        <div className="content GeneralContent react-transition swipe-right">
          <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="sidebar.dashboard.editRejectedMerchant" />}
          />
          <div className="PendingLBody RejectedInfo">
            <h2>General Information</h2>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h4>Legal Business Name*</h4>
                  <input
                    name="businessName"
                    value={this.state.businessName}
                    onChange={this._handleChange}
                  ></input>
                </div>

                <div className="col-md-6">
                  <h4>Phone*</h4>
                  <input
                    name="cellphone"
                    value={this.state.cellphone}
                    onChange={this._handleChange}
                  ></input>
                </div>
                <div className="col-md-6">
                  <h4>Address*</h4>
                  <input
                    name="address"
                    value={this.state.address}
                    onChange={this._handleChange}
                  ></input>
                </div>
                <div className="col-md-6">
                  <h4>City*</h4>
                  <input
                    name="city"
                    value={this.state.city}
                    onChange={this._handleChange}
                  ></input>
                </div>
                <div className="col-md-6">
                  <h4>State*</h4>
                  <input
                    name="stateId"
                    value={this.state.stateId}
                    onChange={this._handleChange}
                  ></input>
                </div>
                {/* <hr /> */}
                <div className="col-md-6">
                  <h4>Contact Email Address*</h4>
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={this._handleChange}
                  ></input>
                </div>
              </div>
              <div className="SettingsContent GeneralContent">
                <Button className="btn btn-green" onClick={this._update}>
                  SAVE
                </Button>
                <Button className="btn btn-red" onClick={this._goBack}>
                  CANCEL
                </Button>
              </div>
            </div>
            <NotificationContainer />
          </div>
        </div>
      ) : (
        <Redirect to="/app/merchants/rejected-request" />
      );

    return <div>{renderEdit}</div>;
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  UpdateStatus: state.updateMerchant_Infor,
  getMerchant: state.getMerchant
});
const mapDispatchToProps = dispatch => {
  return {
    getAll_Merchants: () => {
      dispatch(getAll_Merchants());
    },
    ViewProfile_Merchants: payload => {
      dispatch(ViewProfile_Merchants(payload));
    },
    updateMerchant: payload => {
      dispatch(UpdateMerchant_Infor(payload));
    },
    GetMerchant_byID: ID => {
      dispatch(GetMerchant_byID(ID));
    },
    ViewMerchant_Rejected_Merchants: payload => {
      dispatch(ViewMerchant_Rejected_Merchants(payload));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMerchantRejected);
