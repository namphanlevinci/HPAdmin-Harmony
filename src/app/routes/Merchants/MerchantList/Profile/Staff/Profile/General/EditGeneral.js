import React, { Component } from "react";
import { connect } from "react-redux";
import { config } from "../../../../../../../../url/url";
import { WARNING_NOTIFICATION } from "../../../../../../../../constants/notificationConstants";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { CustomTitle } from "../../../../../../../../util/CustomText";
import { updateStaffByID } from "../../../../../../../../actions/merchantActions";

import InputCustom from "../../../../../../../../util/CustomInput";
import * as Yup from "yup";
import CustomStateSelect from "../../../../../../../../util/CustomStateSelect";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "../../../../../../../../util/linearProgress";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import AccorditionSevice from "@/components/AccorditionService";
import check_box from "@/assets/images/check_box.png";
import check_box_empty from "@/assets/images/check_box_empty.png";


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
      categories: [],
      isSelectAllCategories: false,
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
        categories: data?.categories || [],
        isSelectAllCategories : this.checkAllCategories(),
      },
      () => this.setState({ loading: true })
    );
  }

  checkAllCategories = () => {
    let flag = true;
    const data = this.props.Staff;
    const { categories } = data;

    for (let i = 0; i < categories.length; i++) {
      const staffServices = categories[i].staffServices ? categories[i].staffServices : [];
      for (let j = 0; j < staffServices.length; j++) {
        if (staffServices[j].selected === false) {
          flag = false;
          return false;
        }
      }
    }

    return flag;
  }

  showPin = () => {
    this.setState({ showPin: !this.state.showPin });
  };

  uploadFile = (e, setFieldValue) => {
    e.preventDefault();
    let file = e?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
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

  selectAllCategories = () => {
    let { categories, isSelectAllCategories } = this.state;
    let status = !isSelectAllCategories;
    categories = categories.map((cate) => ({
      ...cate,
      selected: status,
      staffServices:
        cate.staffServices
          .filter(sv => sv.categoryId === cate.categoryId)
          .map((sv) => ({
            ...sv,
            selected: status,
          }))
    }));

    this.setState({
      isSelectAllCategories: status,
      categories,
    });
  }

  selectCategories = (category) => {
    let { categories } = this.state;
    const { selected, categoryId } = category;
    categories = categories.map((cate) => ({
      ...cate,
      selected: cate.categoryId === categoryId ? !selected : cate.selected,
      staffServices:
        cate.staffServices
          .filter(sv => sv.categoryId === cate.categoryId)
          .map((sv) => ({
            ...sv,
            selected: sv.categoryId === categoryId ? !selected : sv.selected
          }))
    }));
    this.setState({ categories });
  }

  selectServiceOfCategories = (service) => {
    let { categories } = this.state;
    const { selected, categoryId, serviceId } = service;

    categories = categories.map(cate => {
      let { staffServices } = cate;
      return ({
        ...cate,
        selected: this.checkStatuCategory(staffServices, selected, categoryId, cate),
        staffServices:
          cate.staffServices
            .filter(sv => sv.categoryId === cate.categoryId)
            .map((sv) => ({
              ...sv,
              selected: sv.serviceId === serviceId ? !selected : sv.selected
            }))
      })
    })
    this.setState({ categories });
  }

  checkStatuCategory = (staffServices = [], selected, categoryId, cate) => {
    if (cate.categoryId === categoryId) {
      let status = !selected;
      if (status) {
        return true
      } else {
        const arrTrue = staffServices.filter(sv => sv.selected === true);
        if (arrTrue.length === 1) {
          return false
        }
      }
    }
    return cate.selected;
  }

  render() {
    let { imagePreviewUrl, loading, showP, categories, isSelectAllCategories } = this.state;
    const { merchantState } = this.props;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <Avatar style={{ width: 130, height: 130, marginTop: 30, objectFit: 'contain' }} src={imagePreviewUrl} className="avatar_last" />;
    } else {
      $imagePreview = (
        <Avatar style={{ width: 130, height: 130, marginTop: 30, objectFit: 'contain', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="avatar_last" src={this.state?.imageUrl} />
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
              const StaffID = this.props.Staff.staffId;
              const MerchantID = this.props.MerchantData.merchantId;

              const { categories } = this.state;

              const payload = {
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
                categories,
                MerchantID,
                StaffID,
                path: "/app/merchants/staff/general",
              };

              this.props.updateStaffByID(payload);
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
                  <Grid item xs={6} md={12}>
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
                      style={{ paddingTop: "5px" }}
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
                      style={{ paddingTop: "5px" }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <CustomStateSelect
                      label="State"
                      name="stateId"
                      initialValue={values.stateId}
                      data={merchantState}
                      handleChange={(state) =>
                        setFieldValue("stateId", state.target.value)
                      }
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

                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={4}>
                        <MaterialUiPhoneNumber
                          label="Cell Phone"
                          onlyCountries={["us", "vn"]}
                          name="cellphone"
                          value={values.phone}
                          onChange={(e) => setFieldValue(`cellphone`, e)}
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
                    </Grid>
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <TextField
                      label="Create PIN*"
                      name="pin"
                      type={showP ? "text" : "password"}
                      value={values?.pin}
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === '' || re.test(e.target.value)) {
                          setFieldValue('pin', e.target.value);
                        }
                      }}
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

                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={4}>
                        <FormControl style={{ width: "100%" }}>
                          <InputLabel>Role</InputLabel>
                          <Select
                            fullWidth
                            value={values.roleName}
                            onChange={(e) =>
                              setFieldValue(`roleName`, e.target.value)
                            }
                          >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Staff">Staff</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <FormControl style={{ width: "100%" }}>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={values.isDisabled}
                            onChange={(e) =>
                              setFieldValue(`isDisabled`, e.target.value)
                            }
                          >
                            <MenuItem value={0}>Available</MenuItem>
                            <MenuItem value={1}>Disabled</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
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

                  <Grid style={{ marginTop: 15 }} item xs={12} md={12}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '500', color: '#1366AE' }}>Services</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '400', color: '#404040', marginTop: 10, marginBottom: 20 }}>
                      Assign services this staff can be perform
                    </div>
                    <div
                      style={{ display: 'flex', alignItems: 'center', marginBottom: 22 }}>
                      <img
                        onClick={this.selectAllCategories}
                        style={{ width: 25, height: 25 }}
                        src={isSelectAllCategories ? check_box : check_box_empty}
                      />
                      <span style={{ fontSize: "1.1rem", marginLeft: 10, fontWeight: "500", color: "#1366AE" }}>
                        Select all
                      </span>
                    </div>
                    {
                      categories &&
                      categories.length > 0 &&
                      categories.map((cate) => {
                        return (
                          <AccorditionSevice
                            category={cate}
                            key={cate.categoryId + "assignService"}
                            selectServiceOfCategories={this.selectServiceOfCategories}
                            selectCategories={this.selectCategories}
                          />
                        )
                      })
                    }
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
  Staff: state.staffById.data,
  MerchantData: state.merchant.merchant,
  merchantState: state.merchantState.data
});

const mapDispatchToProps = (dispatch) => ({
  warningNotify: (message) => {
    dispatch(WARNING_NOTIFICATION(message));
  },
  updateStaffByID: (payload) => {
    dispatch(updateStaffByID(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneral);

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  displayName: Yup.string().required("Display name is required"),
  pin: Yup.string().min(4).max(4).required("Pin code is required"),
});
