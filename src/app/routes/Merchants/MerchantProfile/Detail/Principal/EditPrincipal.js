import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../url/url";
import {
  UPDATE_MERCHANT_PRINCIPAL,
  GET_MERCHANT_BY_ID,
} from "../../../../../../actions/merchants/actions";
import { WARNING_NOTIFICATION } from "../../../../../../actions/notifications/actions";

import { Grid, Button, TextField } from "@material-ui/core";
import {
  CustomText,
  CustomTextLabel,
  CustomTitle,
} from "../../../../../../util/CustomText";
import { Formik } from "formik";

import CustomSelect from "../../../../../../util/getState";
import LinearProgress from "../../../../../../util/linearProgress";
import moment from "moment";
import axios from "axios";
import * as Yup from "yup";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import NumberFormat from "react-number-format";

import "./principal.styles.scss";
import "../../MerchantProfile.css";
import "../../../MerchantsRequest/MerchantReqProfile.css";
import "../../../MerchantsRequest/MerchantsRequest.css";

const upFile = config.url.upFile;

class EditPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    const data = this.props.principalData;
    await this.setState({
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

  uploadFile = (e, setFieldValue) => {
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
          setFieldValue(`fileId`, res.data.data.fileId);
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
        <CustomTitle value="Principal Information" />
        {this.state.loading && (
          <Formik
            initialValues={this.props.principalData}
            validationSchema={validationPrincipal}
            onSubmit={(values, { setSubmitting }) => {
              const principalID = this.props.principalData.principalId;
              const ID = this.props.MerchantProfile.merchantId;

              this.props.UPDATE_MERCHANT_PRINCIPAL({
                ...values,
                principalID,
                ID,
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} className="edit-principal">
                  <Grid item xs={4}>
                    <CustomTextLabel value="Name*" />
                    <CustomText value={e.firstName + " " + e.lastName} />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextLabel value="Title/Position*" />
                    <CustomText value={e.title} />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextLabel value="Ownership* (%)" />
                    <CustomText value={`${e.ownerShip}%`} />
                  </Grid>
                  <Grid item xs={4}>
                    <MaterialUiPhoneNumber
                      label="Home Phone"
                      fullWidth
                      onlyCountries={["us", "vn"]}
                      name="homePhone"
                      autoFormat="true"
                      value={values.homePhone}
                      onChange={(e) => setFieldValue(`homePhone`, e)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MaterialUiPhoneNumber
                      fullWidth
                      label="Mobile Phone*"
                      onlyCountries={["us", "vn"]}
                      name="mobilePhone"
                      value={values.mobilePhone}
                      onChange={(e) => setFieldValue(`mobilePhone`, e)}
                      error={errors.mobilePhone && touched.mobilePhone}
                      helperText={
                        errors.mobilePhone && touched.mobilePhone
                          ? errors.mobilePhone
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Email Address*"
                      fullWidth
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      style={styles.input}
                      error={errors.email && touched.email}
                      helperText={
                        errors.email && touched.email ? errors.email : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Address*"
                      fullWidth
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      style={styles.input}
                      error={errors.address && touched.address}
                      helperText={
                        errors.address && touched.address ? errors.address : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="City*"
                      fullWidth
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      style={styles.input}
                      error={errors.city && touched.city}
                      helperText={
                        errors.city && touched.city ? errors.city : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CustomSelect
                      label="State Issued*"
                      name="stateId"
                      initialValue={values.stateId}
                      handleChange={(e) =>
                        setFieldValue(`stateId`, e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      label="Zip"
                      name="zip"
                      type="number"
                      value={values.zip}
                      onChange={handleChange}
                      style={styles.input}
                      error={errors.zip && touched.zip}
                      helperText={errors.zip && touched.zip ? errors.zip : ""}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <CustomTextLabel value="Social Security Number* (SSN)" />
                    <NumberFormat
                      value={e.ssn}
                      displayType={"text"}
                      style={styles.input}
                      disabled
                      thousandSeparator={true}
                      format="***-**-####"
                      mask="_"
                      renderText={(value) => <p>{value}</p>}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextLabel value="Date of Birth* (mm/dd/yy)" />
                    <CustomText
                      value={moment(e.birthDate).format("MM/DD/YYYY")}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="Driver License Number*"
                      fullWidth
                      name="driverNumber"
                      value={values.driverNumber}
                      onChange={handleChange}
                      style={styles.input}
                      type="number"
                      error={errors.driverNumber && touched.driverNumber}
                      helperText={
                        errors.driverNumber && touched.driverNumber
                          ? errors.driverNumber
                          : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={3} lg={3}>
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
                      onChange={(e) => this.uploadFile(e, setFieldValue)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ paddingTop: "5px" }}>
                    <Button
                      className="btn btn-green"
                      type="submit"
                      // onClick={this.updatePrincipal}
                      disabled={isSubmitting}
                    >
                      SAVE
                    </Button>
                    <Button className="btn btn-red" onClick={this._goBack}>
                      CANCEL
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
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

const validationPrincipal = Yup.object().shape({
  address: Yup.string().required("Address is required").nullable(),
  driverNumber: Yup.string()
    .required("Driver license number is required")
    .nullable(),
  city: Yup.string().required("City is required").nullable(),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required")
    .nullable(),

  mobilePhone: Yup.string().required("Mobile phone is required").nullable(),
  zip: Yup.string()
    .required("Zip code is required")
    .max(5, "max 5 digit")
    .nullable(),
});
