import React, { Component } from "react";
import { connect } from "react-redux";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import URL, { upfileUrl } from "../../../../../url/url";
import {
  ViewProfile_Merchants,
  GetMerchant_byID
} from "../../../../../actions/merchants/actions";

class EditBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fileId: "",
      routingNumber: "",
      accountNumber: "",
      Token: "",
      //~ preview image
      imagePreviewUrl: ""
    };
  }
  async componentDidMount() {
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
    const data = this.props.MerchantProfile.businessBank;
    if (data !== null) {
      this.setState({
        name: data.name,
        fileId: data.fileId,
        routingNumber: data.routingNumber,
        accountNumber: data.accountNumber,
        newFileId: null
      });
    }
  }

  _handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  _uploadFile = e => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
    // handle upload image
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    axios
      .post(upfileUrl, formData, config)
      .then(res => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch(err => {
        console.log(err);
      });
  };
  _goBack = () => {
    this.props.history.push("/app/merchants/profile/bank");
  };
  _update = () => {
    const ID = this.props.MerchantProfile.businessBank.businessBankId;
    const IDMerchant = this.props.MerchantProfile.merchantId;
    let token = JSON.parse(this.state.Token);
    const config = {
      headers: { Authorization: "bearer " + token.token }
    };
    const { name, fileId, routingNumber, accountNumber } = this.state;
    axios
      .put(
        URL + "/merchant/businessbank/" + ID,
        { name, fileId, routingNumber, accountNumber },
        config
      )
      .then(res => {
        if (res.data.message === "Update bank completed") {
          NotificationManager.success("Success", null, 800);
          setTimeout(() => {
            this.props.GetMerchant_byID(IDMerchant);
          }, 1500);
          setTimeout(() => {
            this.props.ViewProfile_Merchants(this.props.getMerchant.Data);
            this.props.history.push("/app/merchants/profile/bank");
          }, 2500);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const e = this.props.MerchantProfile;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img className="bankVoid" src={imagePreviewUrl} alt="void" />
      );
    } else {
      $imagePreview = (
        <img className="bankVoid" src={e.businessBank.imageUrl} alt="void" />
      );
    }

    const renderOldImg =
      e.businessBank !== null ? (
        e.businessBank.imageUrlOldFiles !== null ? (
          <div className="col-md-12" style={{ paddingTop: "10px" }}>
            <h4>Old Void Check*</h4>
            {e.businessBank.imageUrlOldFiles.map((e, index) => {
              return (
                <img
                  key={index}
                  className="bankVoid"
                  src={`${e}`}
                  alt="void check"
                  style={{ padding: "10px" }}
                />
              );
            })}
          </div>
        ) : null
      ) : null;

    return (
      <div className="react-transition swipe-up GeneralContent">
        <NotificationContainer />
        <h2>Bank Information</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>Bank Name*</h4>
              <input
                name="name"
                value={this.state.name}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>ABA Routing Number*</h4>
              <input
                style={{ width: "250px" }}
                name="routingNumber"
                value={this.state.routingNumber}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Checking Account Number (DDA)*</h4>
              <input
                style={{ width: "250px" }}
                name="accountNumber"
                value={this.state.accountNumber}
                onChange={this._handleChange}
              ></input>
            </div>
            <div className="col-md-4">
              <h4>Void Check*</h4>
              {$imagePreview}
              <div>
                <label>Upload new Void Check:</label>
                <input
                  type="file"
                  style={{ width: "250px !important", border: "none" }}
                  name="image"
                  id="file"
                  onChange={e => this._uploadFile(e)}
                ></input>
              </div>
            </div>
            {renderOldImg}
          </div>
        </div>
        <br />

        <div className="SettingsContent GeneralContent">
          <Button className="btn btn-green" onClick={this._update}>
            SAVE
          </Button>
          <Button className="btn btn-red" onClick={this._goBack}>
            CANCEL
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MerchantProfile: state.ViewProfile_Merchants,
  InfoUser_Login: state.User,
  getMerchant: state.getMerchant
});
const mapDispatchToProps = dispatch => ({
  ViewProfile_Merchants: payload => {
    dispatch(ViewProfile_Merchants(payload));
  },
  GetMerchant_byID: ID => {
    dispatch(GetMerchant_byID(ID));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(EditBank);
