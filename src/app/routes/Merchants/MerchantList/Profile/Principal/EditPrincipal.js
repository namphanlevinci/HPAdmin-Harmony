import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "@/url/url";
import { updateMerchantPrincipalById } from "@/actions/merchantActions";
import { WARNING_NOTIFICATION } from "@/constants/notificationConstants";
import { Grid, Button, TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { CustomTitle } from "@/util/CustomText";
import { Formik } from "formik";

import InputCustom from "@/util/CustomInput";
import CustomSelect from "@/util/getState";
import LinearProgress from "@/util/linearProgress";
import moment from "moment";
import axios from "axios";
import * as Yup from "yup";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import DateFnsUtils from "@date-io/date-fns";
import CustomNumberField from "../../AddMerchants/FormFields/CustomNumberField";

import "./principal.styles.scss";
import "../../MerchantProfile.css";
import "../../../PendingList/MerchantReqProfile.css";

const upFile = config.url.upFile;

class EditPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: null,
    };
  }

  async componentDidMount() {
    await this.setState({
      loading: true,
    });
  }

  uploadFile = (e, setFieldValue) => {
    e.preventDefault();
    // handle preview Image
    let file = e?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
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
              imageUrl: res.data.data.url
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
  goBack = () => {
    this.props.history.push("/app/merchants/profile/principal/info");
  };

  render() {
    const e = this.props.principalData;
    const { merchantState } = this.props;

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
          src={e?.imageUrl}
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
              const path = "/app/merchants/profile/principal/info";
              const payload = {
                ...values, principalID, ID, path,
                imageUrl: this.state.imageUrl ? this.state.imageUrl : values.imageUrl
              };
              this.props.updateMerchantPrincipalById(payload);
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
                  <Grid item xs={2}>
                    <TextField
                      label="First name*"
                      fullWidth
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      style={styles.input}
                      error={errors.firstName && touched.firstName}
                      helperText={
                        errors.firstName && touched.firstName ? errors.firstName : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      label="Last name*"
                      fullWidth
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      style={styles.input}
                      error={errors.lastName && touched.lastName}
                      helperText={
                        errors.lastName && touched.lastName ? errors.lastName : ""
                      }
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="Title/Position*"
                      fullWidth
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      style={styles.input}
                      error={errors.title && touched.title}
                      helperText={
                        errors.title && touched.title ? errors.title : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomNumberField
                      InputLabelProps={{ shrink: true }}
                      name={`ownerShip`}
                      label="Ownership* (%)"
                      fullWidth
                      value={values.ownerShip}
                      onChange={handleChange}
                      options={{
                        numericOnly: true,
                        blocks: [4],
                      }}
                      style={{ marginTop: 6 }}
                      error={errors.ownerShip && touched.ownerShip}
                      helperText={
                        errors.ownerShip && touched.ownerShip ? errors.ownerShip : ""
                      }
                    />
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
                      label="State"
                      name="stateId"
                      initialValue={values.stateId}
                      data={merchantState}
                      handleChange={(e) =>
                        setFieldValue(`stateId`, e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      label="Zip Code*"
                      name="zip"
                      value={values.zip}
                      onChange={e => setFieldValue(`zip`, e.target.value)}
                      style={styles.input}
                      error={errors.zip && touched.zip}
                      helperText={errors.zip && touched.zip ? errors.zip : ""}
                      InputProps={{
                        inputComponent: InputCustom,
                      }}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <CustomNumberField
                      style={{ marginTop : 6 }}
                      InputLabelProps={{ shrink: true }}
                      name={`ssn`}
                      label="Social Security Number* (SSN)"
                      value={values.ssn}
                      onChange={e => setFieldValue(`ssn`, e.target.value)}
                      fullWidth
                      options={{
                        numericOnly: true,
                        blocks: [3, 2, 4],
                        delimiter: "-",
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        style={{ marginTop: 6.1 }}
                        disableToolbar
                        disableFuture
                        label="Date of Birth* (mm/dd/yy)"
                        variant="inline"
                        format="MM/dd/yyyy"
                        placeholder="MM/DD/YYYY"
                        value={moment(values.birthDate).format('MM/DD/YYYY')}
                        onChange={(date) => {
                          console.log({ date })
                          setFieldValue("birthDate", date)
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        autoOk={true}
                        fullWidth
                        error={touched.birthDate && Boolean(errors.birthDate)}
                        helperText={touched.birthDate ? errors.birthDate : ""}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      label="Driver License Number*"
                      fullWidth
                      name="driverNumber"
                      value={values.driverNumber}
                      onChange={handleChange}
                      style={styles.input}
                      type="text"
                      error={errors.driverNumber && touched.driverNumber}
                      helperText={
                        errors.driverNumber && touched.driverNumber
                          ? errors.driverNumber
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <CustomSelect
                      label="State Issued*"
                      name="stateIssued"
                      initialValue={values.stateIssued}
                      data={merchantState}
                      handleChange={(e) =>
                        setFieldValue(`stateIssued`, e.target.value)
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
                      disabled={isSubmitting}
                    >
                      SAVE
                    </Button>
                    <Button className="btn btn-red" onClick={this.goBack}>
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
  principalData: state.updateMerchantPrincipal.principal,
  MerchantProfile: state.merchant.merchant,
  merchantState: state.merchantState.data
});
const mapDispatchToProps = (dispatch) => ({
  updateMerchantPrincipalById: (payload) => {
    dispatch(updateMerchantPrincipalById(payload));
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
    marginTop: "6px",
  },
};
const driverNumberRegExp = /^[a-zA-Z0-9]*$/;
const validationPrincipal = Yup.object().shape({
  address: Yup.string().required("Address is required").nullable(),
  driverNumber: Yup.string()
    .matches(driverNumberRegExp, "Driver license number  is not valid")
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
    .nullable(),
  firstName: Yup.string().required("First name is required").nullable(),
  lastName: Yup.string().required("Last name is required").nullable(),
  ssn: Yup.string().required("ssn is required").nullable(),
  ownerShip: Yup.string().required("OwnerShip is required").nullable(),
  title: Yup.string().required("Title is required").nullable(),
  birthDate: Yup.string()
    .required("Birthday is required")
    .test("is-greater", "Your birthday can not be later than current day",
      function (value) {
        return moment().isSameOrAfter(moment(value));
      })
    .nullable(),
});
