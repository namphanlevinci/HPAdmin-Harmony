import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_STAFF } from "../../../../../../../../actions/merchants/actions";
import { config } from "../../../../../../../../url/url";
import { WARNING_NOTIFICATION } from "../../../../../../../../actions/notifications/actions";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  Grid,
  CardMedia,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { CustomTitle } from "../../../../../../../../util/CustomText";

import InputCustom from "../../../../../MerchantsList/addMerchant/custom-input";
import * as Yup from "yup";
import Select from "react-select";
import selectState from "../../../../../../../../util/selectState";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "../../../../../../../../util/linearProgress";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import "react-phone-input-2/lib/high-res.css";
import "../../Staff.styles.scss";

const upFile = config.url.upFile;

export class EditGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPin: true,
      loading: false,
      loadingProgress: false,
    };
  }

  componentDidMount() {
    const data = this.props.Staff;
    this.setState(
      {
        firstName: data?.firstName,
        lastName: data?.lastName,
        displayName: data?.displayName,
        address: data?.address,
        city: data?.city,
        stateId: data?.stateId,
        stateName: data?.stateName,
        phone: data?.phone,
        email: data?.email,
        pin: data?.pin,
        roleName: data?.roleName,
        isDisabled: data?.isDisabled,
        isActive: data?.isActive,
        zip: data?.zip,
        imageUrl: data?.imageUrl,
        fileId: data?.fileId,
      },
      () => this.setState({ loading: true })
    );
  }
  showPin = () => {
    this.setState({ showPin: !this.state.showPin });
  };

  uploadFile = (e, setFieldValue) => {
    e.preventDefault();
    let file = e?.target?.files[0];

    if (file?.name.match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      this.setState({ loadingProgress: true });
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
    } else {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  render() {
    const status = [
      { label: "Available", value: "0" },
      { label: "Disable", value: "1" },
    ];

    const roles = [
      { label: "Admin", value: "1" },
      { label: "Staff", value: "3" },
    ];

    let { imagePreviewUrl, loading, showP } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <CardMedia
          src={imagePreviewUrl}
          component="img"
          style={{ borderRadius: "50%" }}
        />
      );
    } else {
      $imagePreview = (
        <CardMedia
          component="img"
          src={this.state?.imageUrl}
          style={{ borderRadius: "50%" }}
        />
      );
    }

    return (
      <>
        {loading && (
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const state = this.state;
              const data = this.props.Staff;
              const staffId = this.props.Staff.staffId;
              const MerchantId = this.props.MerchantData.merchantId;

              const body = {
                ...values,
                cashPercent: data?.cashPercent,

                address: {
                  street: values.address,
                  city: values.city,
                  state: values.stateId,
                  zip: values.zip,
                },

                confirmPin: state.values,

                isDisabled: Number(values.isDisabled),
                driverLicense: data.driverLicense,
                socialSecurityNumber: data.socialSecurityNumber,
                professionalLicense: data?.professionalLicense,
                workingTime: data.workingTimes,
                tipFee: data.tipFees,
                salary: data.salaries,
                productSalary: data.productSalaries,
                Roles: {
                  NameRole: values.roleName,
                },
                MerchantId,
              };
              const payload = {
                body,
                staffId,
                MerchantId,
                path: "/app/merchants/staff/general",
              };

              this.props.UPDATE_STAFF(payload);
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
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={3} className="container-fluid">
                  <Grid item xs={12} className="header">
                    <CustomTitle value="General Information" />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <TextField
                      name="firstName"
                      label="First Name*"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.firstName}
                      error={errors.firstName && touched.firstName}
                      helperText={
                        errors.firstName && touched.firstName
                          ? errors.firstName
                          : ""
                      }
                      inputProps={{
                        maxLength: 20,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      name="lastName"
                      label="Last Name*"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.lastName}
                      error={errors.lastName && touched.lastName}
                      helperText={
                        errors.lastName && touched.lastName
                          ? errors.lastName
                          : ""
                      }
                      inputProps={{
                        maxLength: 20,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      name="displayName"
                      label="Display Name*"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.displayName}
                      error={errors.displayName && touched.displayName}
                      helperText={
                        errors.displayName && touched.displayName
                          ? errors.displayName
                          : ""
                      }
                      inputProps={{
                        maxLength: 20,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      name="address"
                      label="Address"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.address}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      name="city"
                      label="City"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.city}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <label>State</label>
                    <Select
                      defaultValue={{
                        label: values.stateName,
                        value: values.stateId,
                      }}
                      options={selectState}
                      onChange={(e) => setFieldValue(`stateId`, e.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="zip"
                      label="Zip Code"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      value={values.zip}
                      InputProps={{
                        inputComponent: InputCustom,
                      }}
                      inputProps={{
                        block: [5],
                        numericOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <MaterialUiPhoneNumber
                      label="Cell Phone"
                      onlyCountries={["us", "vn"]}
                      name="cellphone"
                      value={values.phone}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      name="email"
                      label="Contact Email"
                      type="email"
                      fullWidth
                      onChange={handleChange}
                      value={values.email}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      label="Create PIN*"
                      name="pin"
                      type={showP ? "text" : "password"}
                      value={values?.pin}
                      onChange={handleChange}
                      fullWidth
                      error={errors.pin && touched.pin}
                      helperText={errors.pin && touched.pin ? errors.pin : ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.setState({ showP: !this.state.showP })
                              }
                            >
                              {this.state.showP ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </p>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        maxLength: 4,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={true}
                          checked={values?.isActive}
                          control={<Checkbox color="primary" />}
                          label="Visible on App"
                          labelPlacement="end"
                          onClick={(e) =>
                            setFieldValue(`isActive`, e.target.checked)
                          }
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <label>Role</label>
                    <Select
                      defaultValue={{
                        label: values.roleName,
                        value: values.roles,
                      }}
                      options={roles}
                      onChange={(e) => setFieldValue(`roles`, e.label)}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <label>Status</label>
                    <Select
                      defaultValue={{
                        label:
                          values.isDisabled === 0 ? "Available" : "Disable",
                        value: values.isDisabled,
                      }}
                      options={status}
                      onChange={(e) => setFieldValue(`isDisabled`, e.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid item xs={3} lg={3}>
                      <label>Avatar</label> <br />
                      {$imagePreview}
                      <div style={{ width: "100%", marginTop: "15px" }}>
                        {this.state.loadingProgress ? <LinearProgress /> : null}
                      </div>
                      <input
                        type="file"
                        name="image"
                        id="file"
                        className="custom-input"
                        accept="image/gif,image/jpeg, image/png"
                        onChange={(e) => this.uploadFile(e, setFieldValue)}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Button className="btn btn-green" type="submit">
                      SAVE
                    </Button>
                    <Button
                      className="btn btn-red"
                      onClick={() =>
                        this.props.history.push("/app/merchants/staff/general")
                      }
                    >
                      CANCEL
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  Staff: state.MerchantReducer.StaffData,
  MerchantData: state.MerchantReducer.MerchantData,
});

const mapDispatchToProps = (dispatch) => ({
  UPDATE_STAFF: (payload) => {
    dispatch(UPDATE_STAFF(payload));
  },
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  displayName: Yup.string().required("Display name is required"),
  pin: Yup.string().required("Pin code is required"),
});
