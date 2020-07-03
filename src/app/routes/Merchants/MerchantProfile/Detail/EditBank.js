import React, { Component } from "react";
import { connect } from "react-redux";
import URL, { upFileUrl } from "../../../../../url/url";
import {
  ViewProfile_Merchants,
  GetMerchant_byID,
} from "../../../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";

import Button from "@material-ui/core/Button";
import axios from "axios";

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
      imagePreviewUrl: "",
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
        accountHolderName: data.accountHolderName,
        newFileId: null,
      });
    }
  }

  _handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  _uploadFile = (e) => {
    e.preventDefault();

    // handle preview Image
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    // handle upload image
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFileUrl, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch((err) => {
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
      headers: { Authorization: "bearer " + token.token },
    };
    const {
      name,
      fileId,
      routingNumber,
      accountNumber,
      accountHolderName,
    } = this.state;
    axios
      .put(
        URL + "/merchant/businessbank/" + ID,
        { name, fileId, routingNumber, accountNumber, accountHolderName },
        config
      )
      .then((res) => {
        if (res.data.message === "Update bank completed") {
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
            width: 250,
          });
          setTimeout(() => {
            this.props.GetMerchant_byID(IDMerchant);
          }, 1500);
          setTimeout(() => {
            this.props.ViewProfile_Merchants(this.props.getMerchant.Data);
            this.props.history.push("/app/merchants/profile/bank");
          }, 2500);
        }
      })
      .catch((err) => {
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
        <img className="bankVoid" src={e?.businessBank?.imageUrl} alt="void" />
      );
    }

    const renderOldImg = (
      <div className="col-12" style={{ paddingTop: "10px" }}>
        <label>Old Void Check*</label> <br />
        {e.businessBank?.imageUrlOldFiles.map((e, index) => {
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
    );

    return (
      <div className="react-transition swipe-up GeneralContent">
        <h2 style={styles.h2}>Bank Information</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <label>Bank Name*</label>
              <input
                name="name"
                value={this.state.name}
                onChange={this._handleChange}
              />
            </div>
            <div className="col-3">
              <label>Account Holder Name*</label>
              <input
                style={{ width: "250px" }}
                name="accountHolderName"
                value={this.state.accountHolderName}
                onChange={this._handleChange}
                style={styles.input}
              />
            </div>
            <div className="col-3">
              <label>Routing Number(ABA)*</label>
              <input
                style={{ width: "250px" }}
                name="routingNumber"
                value={this.state.routingNumber}
                onChange={this._handleChange}
                style={styles.input}
              />
            </div>
            <div className="col-3">
              <label>Account Number (DDA)*</label>
              <input
                name="accountNumber"
                value={this.state.accountNumber}
                onChange={this._handleChange}
                style={styles.input}
              />
            </div>
            <div className="col-4" style={{ paddingTop: "20px" }}>
              <label>Void Check*</label> <br />
              {$imagePreview}
              <div>
                <input
                  style={{ paddingTop: "20px" }}
                  type="file"
                  name="image"
                  id="file"
                  onChange={(e) => this._uploadFile(e)}
                />
              </div>
            </div>
            {renderOldImg}
          </div>
        </div>
        <br />
        <div className=" ">
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

const mapStateToProps = (state) => ({
  MerchantProfile: state.ViewProfile_Merchants,
  userLogin: state.userReducer.User,
  getMerchant: state.getMerchant,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
  GetMerchant_byID: (ID) => {
    dispatch(GetMerchant_byID(ID));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditBank);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
  input: {
    marginBottom: "10px",
  },
};
