import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import {
  ViewProfile_Merchants,
  UPDATE_MERCHANT_PRINCIPAL,
  GET_MERCHANT_BY_ID,
} from "../../../../../../actions/merchants/actions";
import { store } from "react-notifications-component";

import LinearProgress from "../../../../../../util/linearProgress";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import axios from "axios";
import Cleave from "cleave.js/react";
import Select from "react-select";
import selectState from "../../../../../../util/selectState";
import PhoneInput from "react-phone-input-2";

import "./principal.styles.scss";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";
import "react-phone-input-2/lib/high-res.css";

const URL = config.url.URL;
const upFile = config.url.upFile;

class EditPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HomePhone: "",
      MobilePhone: "",
      Address: "",
      StateId: "",
      DriverNumber: "",
      FileId: "",
      Token: "",
      stateName: "",
      email: "",
      imagePreviewUrl: "",
      loading: false,
    };
  }

  async componentDidMount() {
    const Token = localStorage.getItem("User_login");
    await this.setState({ Token: Token });
    const data = this.props.principalData;
    if (data !== null) {
      this.setState({
        HomePhone: data?.homePhone,
        MobilePhone: data?.mobilePhone,
        Address: data?.address,
        StateId: data?.stateId,
        DriverNumber: data?.driverNumber,
        FileId: data?.fileId,
        stateName: data?.state?.name,
        email: data?.email,
        loading: true,
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
        this.setState({ FileId: res.data.data.fileId });
        let reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            loadingProgress: false,
          });
        };
        reader.readAsDataURL(file);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  _goBack = () => {
    this.props.history.push("/app/merchants/profile/principal/info");
  };
  _update = () => {
    const principalID = this.props.principalData.principalId;
    const ID = this.props.MerchantProfile.merchantId;

    const {
      Address,
      FileId,
      DriverNumber,
      HomePhone,
      MobilePhone,
      StateId,
      email,
    } = this.state;

    const payload = {
      Address,
      FileId,
      DriverNumber,
      HomePhone,
      MobilePhone,
      StateId,
      email,
      ID,
      principalID,
    };

    this.props.UPDATE_MERCHANT_PRINCIPAL(payload);

    // Axios.put(
    //   URL + "/merchant/principal/" + principalID,
    //   {
    //     Address,
    //     FileId,
    //     DriverNumber,
    //     HomePhone,
    //     MobilePhone,
    //     StateId,
    //     email,
    //   },
    //   config
    // )
    //   .then((res) => {
    //     // Server trả về sai lỗi chính tả
    //     if (Number(res.data.codeNumber) === 200) {
    //       store.addNotification({
    //         title: "SUCCESS!",
    //         message: "Update principal completed",
    //         type: "success",
    //         insert: "top",
    //         container: "top-right",
    //         animationIn: ["animated", "fadeIn"],
    //         animationOut: ["animated", "fadeOut"],
    //         dismiss: {
    //           duration: 5000,
    //           onScreen: true,
    //         },
    //         width: 250,
    //       });
    //       setTimeout(() => {
    //         const payload = { ID, path: "/app/merchants/profile/principal" };
    //         this.props.GET_MERCHANT_BY_ID(payload);
    //       }, 1500);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  render() {
    const e = this.props.principalData;

    let { imagePreviewUrl } = this.state;

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "260px", height: "200px" }}
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={e.imageUrl}
          style={{ width: "260px", height: "200px" }}
          alt="service"
        />
      );
    }

    const renderPrincipal =
      e !== null ? (
        <React.Fragment>
          <div className="row">
            <div className="col-4">
              <label>Name*</label>
              <input
                name="name"
                value={e.firstName + " " + e.lastName}
                onChange={this._handleChange}
                disabled
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Title/Position*</label>
              <input
                name="Title"
                value={e.title}
                onChange={this._handleChange}
                disabled
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Ownership* (%)</label>
              <input
                name="name"
                value={e.ownerShip}
                onChange={this._handleChange}
                disabled
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Home Phone</label>

              <PhoneInput
                name="HomePhone"
                value={this.state.HomePhone}
                onChange={(e) => this.setState({ HomePhone: e })}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Mobile Phone*</label>
              <PhoneInput
                name="MobilePhone"
                value={this.state.MobilePhone}
                onChange={(e) => this.setState({ MobilePhone: e })}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Address*</label>
              <input
                name="Address"
                value={this.state.Address}
                onChange={this._handleChange}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Social Security Number* (SSN)</label>

              <Cleave
                name="ssn"
                value={e.ssn}
                onChange={this._handleChange}
                style={styles.input}
                options={{
                  blocks: [3, 2, 4],
                  delimiter: "-",
                  numericOnly: true,
                }}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Date of Birth* (mm/dd/yyyy)*</label>
              <input
                name="birthday"
                value={moment(e.birthDate).format("MM/DD/YYYY")}
                onChange={this._handleChange}
                disabled
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Email Address*</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this._handleChange}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>Driver License Number*</label>
              <input
                name="DriverNumber"
                value={this.state.DriverNumber}
                onChange={this._handleChange}
                style={styles.input}
              />
            </div>
            <div className="col-4">
              <label>State Issued*</label>

              {this.state.loading && (
                <Select
                  onChange={(e) => this.setState({ StateId: e.value })}
                  name="state"
                  options={selectState}
                  defaultValue={{
                    value: this.state.StateId,
                    label: this.state.stateName,
                  }}
                />
              )}
            </div>
            <div className="col-12">
              <label>Driver License Picture</label> <br />
              {$imagePreview}
              <div style={{ width: "30%", marginTop: "15px" }}>
                {this.state.loadingProgress ? <LinearProgress /> : null}
              </div>
            </div>
          </div>
          <div style={{ width: "30%" }}>
            <input
              type="file"
              style={{ width: "250px !important" }}
              name="image"
              id="file"
              className="custom-input"
              onChange={(e) => this.uploadFile(e)}
            />
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Button className="btn btn-green" onClick={this._update}>
              SAVE
            </Button>
            <Button className="btn btn-red" onClick={this._goBack}>
              CANCEL
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <label>&nbsp;- NO PRINCIPAL INFORMATION</label>
      );
    return (
      <div className="react-transition swipe-up general-content principal-container container-fuild">
        <h2 style={styles.h2}>Principal Information</h2>
        <div className="edit-principal">{renderPrincipal}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  principalData: state.MerchantReducer.PrincipalData,
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});
const mapDispatchToProps = (dispatch) => ({
  UPDATE_MERCHANT_PRINCIPAL: (payload) => {
    dispatch(UPDATE_MERCHANT_PRINCIPAL(payload));
  },
  GET_MERCHANT_BY_ID: (ID) => {
    dispatch(GET_MERCHANT_BY_ID(ID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPrincipal);

const styles = {
  h2: {
    paddingBottom: "10px",
  },
  input: {
    marginBottom: "10px",
  },
};
