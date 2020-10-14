import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import {
  UPDATE_MERCHANT_PRINCIPAL,
  GET_MERCHANT_BY_ID,
} from "../../../../../../actions/merchants/actions";
import { WARNING_NOTIFICATION } from "../../../../../../actions/notifications/actions";

import { Grid, Button, TextField } from "@material-ui/core";

import CustomSelect from "../../../../../../util/getState";
import LinearProgress from "../../../../../../util/linearProgress";
import moment from "moment";
import axios from "axios";
import Cleave from "cleave.js/react";
import MaterialUiPhoneNumber from "material-ui-phone-number";

import "./principal.styles.scss";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";

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
      stateName: "",
      email: "",
      imagePreviewUrl: "",
      loading: false,
    };
  }

  async componentDidMount() {
    const data = this.props.principalData;
    await this.setState({
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
    let file = e?.target?.files[0];

    if (file?.name.match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
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
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };
  _goBack = () => {
    this.props.history.push("/app/merchants/profile/principal/info");
  };
  updatePrincipal = () => {
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
  };

  render() {
    const e = this.props.principalData;

    let { imagePreviewUrl } = this.state;

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          style={{ width: "100%", height: "70%" }}
          alt="service 1"
        />
      );
    } else {
      $imagePreview = (
        <img
          src={e.imageUrl}
          style={{ width: "100%", height: "70%" }}
          alt="service"
        />
      );
    }

    return (
      <div className="react-transition swipe-up  principal-container container-fluid">
        <h2 style={styles.h2}>Principal Information</h2>
        {this.state.loading && (
          <Grid container spacing={3} className="edit-principal">
            <Grid item xs={4}>
              <TextField
                label="Name*"
                fullWidth
                name="name"
                value={e.firstName + " " + e.lastName}
                onChange={this._handleChange}
                disabled
                style={styles.input}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Title/Position*"
                name="Title"
                value={e.title}
                onChange={this._handleChange}
                disabled
                style={styles.input}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Ownership* (%)"
                fullWidth
                name="name"
                value={e.ownerShip}
                onChange={this._handleChange}
                disabled
                style={styles.input}
              />
            </Grid>
            <Grid item xs={4}>
              <MaterialUiPhoneNumber
                label="Home Phone"
                fullWidth
                onlyCountries={["us", "vn"]}
                name="HomePhone"
                autoFormat="true"
                value={this.state.HomePhone}
                onChange={(e) => this.setState({ HomePhone: e })}
              />
            </Grid>
            <Grid item xs={4}>
              <MaterialUiPhoneNumber
                fullWidth
                label="Mobile Phone*"
                onlyCountries={["us", "vn"]}
                name="MobilePhone"
                value={this.state.MobilePhone}
                onChange={(e) => this.setState({ MobilePhone: e })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Email Address*"
                fullWidth
                name="email"
                value={this.state.email}
                onChange={this._handleChange}
                style={styles.input}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="City*"
                fullWidth
                name="city"
                value={e?.city}
                onChange={this._handleChange}
                style={styles.input}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="State*"
                fullWidth
                name="state"
                value={e?.state?.name}
                onChange={this._handleChange}
                style={styles.input}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Zip"
                name="state"
                value={e?.zip}
                onChange={this._handleChange}
                style={styles.input}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Address*"
                fullWidth
                name="Address"
                value={this.state.Address}
                onChange={this._handleChange}
                style={styles.input}
              />
            </Grid>
            <Grid item xs={4}>
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
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Date of Birth* (mm/dd/yyyy)*"
                name="birthday"
                value={moment(e.birthDate).format("MM/DD/YYYY")}
                onChange={this._handleChange}
                disabled
                style={styles.input}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Driver License Number*"
                fullWidth
                name="DriverNumber"
                value={this.state.DriverNumber}
                onChange={this._handleChange}
                style={styles.input}
              />
            </Grid>
            <Grid item xs={4}>
              <label>State Issued*</label>
              <CustomSelect
                name="state"
                initialValue={this.state.StateId}
                handleChange={(e) => this.setState({ StateId: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} lg={3}>
              <label>Driver License Picture*</label> <br />
              {$imagePreview}
              <div style={{ width: "100%", margin: "10px 0" }}>
                {this.state.loadingProgress ? <LinearProgress /> : null}
              </div>
              <input
                type="file"
                name="image"
                id="file"
                className="custom-input"
                accept="image/gif,image/jpeg, image/png"
                onChange={(e) => this.uploadFile(e)}
              />
            </Grid>
            <Grid item xs={12} style={{ paddingTop: "5px" }}>
              <Button className="btn btn-green" onClick={this.updatePrincipal}>
                SAVE
              </Button>
              <Button className="btn btn-red" onClick={this._goBack}>
                CANCEL
              </Button>
            </Grid>
          </Grid>
        )}
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
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
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

// const formatPhoneNumber = (value) => {
//   if (!value?.toString()?.startsWith("+")) return (value = "+".concat(value));
// };
