import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../url/url";
import { UPDATE_MERCHANT_BANK } from "../../../../../actions/merchants/actions";

import LinearProgress from "../../../../../util/linearProgress";
import SimpleReactValidator from "simple-react-validator";

import "../MerchantProfile.css";
import "../../MerchantsRequest/MerchantReqProfile.css";
import "../../MerchantsRequest/MerchantsRequest.css";

import Button from "@material-ui/core/Button";
import axios from "axios";

const upFile = config.url.upFile;

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
      loadingProgress: false,
    };
    this.validator = new SimpleReactValidator({
      messages: { default: "Required" },
    });
  }
  async componentDidMount() {
    const data = this.props.MerchantProfile.businessBank;
    this.setState({
      name: data?.name,
      fileId: data?.fileId,
      routingNumber: data?.routingNumber,
      accountNumber: data?.accountNumber,
      accountHolderName: data?.accountHolderName,
      newFileId: null,
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
  uploadFile = (e) => {
    e.preventDefault();
    // handle preview Image
    let file = e.target.files[0];
    this.setState({ loadingProgress: true });
    // handle upload image
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFile, formData, config)
      .then((res) => {
        this.setState({ fileId: res.data.data.fileId });
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            loadingProgress: false,
          });
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };
  goBack = () => {
    this.props.history.push("/app/merchants/profile/bank");
  };
  updateBank = () => {
    const businessBankId = this.props.MerchantProfile.businessBank
      .businessBankId;
    const ID = this.props.MerchantProfile.merchantId;
    const {
      name,
      fileId,
      routingNumber,
      accountNumber,
      accountHolderName,
    } = this.state;

    const payload = {
      name,
      fileId,
      routingNumber,
      accountNumber,
      accountHolderName,
      businessBankId,
      ID,
    };

    if (this.validator.allValid()) {
      this.props.UPDATE_MERCHANT_BANK(payload);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
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

    return (
      <div className="react-transition swipe-up general-content">
        <div className="container-fluid">
          <h2 style={styles.h2}>Bank Information</h2>
          <div className="row">
            <div className="col-3">
              <label>Account Holder Name*</label>
              <input
                name="accountHolderName"
                value={this.state.accountHolderName}
                onChange={this._handleChange}
                style={styles.input}
              />
              {
                <p style={styles.p}>
                  {this.validator.message(
                    "accountHolderName",
                    this.state.accountHolderName,
                    "required|string"
                  )}
                </p>
              }
            </div>
            <div className="col-3">
              <label>Bank Name*</label>
              <input
                name="name"
                value={this.state.name}
                onChange={this._handleChange}
                style={styles.input}
              />
              {
                <p style={styles.p}>
                  {this.validator.message(
                    "name",
                    this.state.name,
                    "required|string"
                  )}
                </p>
              }
            </div>

            <div className="col-3">
              <label> Routing Number* (ABA)</label>
              <input
                name="routingNumber"
                value={this.state.routingNumber}
                onChange={this._handleChange}
                style={styles.input}
              />
              {
                <p style={styles.p}>
                  {this.validator.message(
                    "routingNumber",
                    this.state.routingNumber,
                    "required"
                  )}
                </p>
              }
            </div>
            <div className="col-3">
              <label>Account Number* (DDA)</label>
              <input
                name="accountNumber"
                value={this.state.accountNumber}
                onChange={this._handleChange}
                style={styles.input}
              />
              {
                <p style={styles.p}>
                  {this.validator.message(
                    "accountNumber",
                    this.state.accountNumber,
                    "required"
                  )}
                </p>
              }
            </div>
            <div className="col-3" style={{ paddingTop: "20px" }}>
              <label>Void Check*</label> <br />
              {$imagePreview}
              <div style={{ width: "100%", marginTop: "15px" }}>
                {this.state.loadingProgress ? <LinearProgress /> : null}
              </div>
              <input
                type="file"
                name="image"
                id="file"
                className="custom-input"
                onChange={(e) => this.uploadFile(e)}
              />
            </div>
          </div>
        </div>
        <br />
        <div className=" ">
          <Button className="btn btn-green" onClick={this.updateBank}>
            SAVE
          </Button>
          <Button className="btn btn-red" onClick={this.goBack}>
            CANCEL
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
  getMerchant: state.getMerchant,
});
const mapDispatchToProps = (dispatch) => ({
  UPDATE_MERCHANT_BANK: (payload) => {
    dispatch(UPDATE_MERCHANT_BANK(payload));
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
  p: {
    color: "red",
    fontSize: "18px",
  },
};
