import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMerchantGeneralById } from "../../../../../../actions/merchantActions";
import { Formik, Form } from "formik";
import {
  Grid,
  Button,
  MenuItem,
  Select,
  FormControl,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { CustomTitle } from "../../../../../../util/CustomText";

import * as Yup from "yup";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import CustomSelect from "../../../../../../util/getState";
import InputCustom from "../../../../../../util/CustomInput";
import CustomNumberField from "../../AddMerchants/FormFields/CustomNumberField";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  goBack = () => {
    this.props.history.push("/app/merchants/profile/general");
  };

  componentDidMount() {
    const data = this.props.MerchantProfile.general;
    this.setState({ data: data, loading: true });
  }

  render() {
    const { merchantState } = this.props;
    return (
      <div className="content  react-transition swipe-right">
        <div className="container-fluid">
          {this.state.loading && (
            <Formik
              initialValues={this.state.data}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const ID = this.props.MerchantProfile.general.generalId;
                const path = "/app/merchants/profile/general";
                const payload = { ...values, ID, path };
                this.props.updateMerchantGeneralById(payload);
              }}
            >
              {({ errors, touched, handleChange, values, setFieldValue }) => (
                <Form>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <CustomTitle value="General Information" />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <TextField
                        name="legalBusinessName"
                        label="Legal Business Name*"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.legalBusinessName}
                        error={
                          errors.legalBusinessName && touched.legalBusinessName
                        }
                        helperText={
                          errors.legalBusinessName && touched.legalBusinessName
                            ? errors.legalBusinessName
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <TextField
                        name="doBusinessName"
                        label="Doing Business As* (DBA)"
                        type="text"
                        autoComplete="doingBusiness"
                        fullWidth
                        onChange={handleChange}
                        value={values.doBusinessName}
                        error={errors.doBusinessName && touched.doBusinessName}
                        helperText={
                          errors.doBusinessName && touched.doBusinessName
                            ? errors.doBusinessName
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        label=" Federal Tax ID*"
                        value={values.tax}
                        onChange={handleChange}
                        fullWidth
                        name="tax"
                        InputProps={{
                          inputComponent: InputCustom,
                        }}
                        inputProps={{
                          block: [2, 7],
                        }}
                        error={errors?.tax && touched?.tax}
                        helperText={
                          errors?.tax && touched?.tax ? errors?.tax : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="address"
                        label="Business Address* (no P.O. Boxes)"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.address}
                        error={errors?.address && touched?.address}
                        helperText={
                          errors?.address && touched?.address
                            ? errors?.address
                            : ""
                        }
                        style={styles.TextField}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <TextField
                        name="city"
                        label="City*"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.city}
                        error={errors?.city && touched?.city}
                        helperText={
                          errors?.city && touched?.city ? errors?.city : ""
                        }
                        style={styles.TextField}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <CustomSelect
                        name="state"
                        label="State*"
                        initialValue={values.stateId}
                        data={merchantState}
                        handleChange={(e) =>
                          setFieldValue(`stateId`, e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Zip Code*"
                        value={values.zip}
                        onChange={handleChange}
                        fullWidth
                        name="zip"
                        InputProps={{
                          inputComponent: InputCustom,
                        }}
                        inputProps={{
                          block: [5],
                          numericOnly: true,
                        }}
                        error={errors?.zip && touched?.zip}
                        helperText={
                          errors?.zip && touched?.zip ? errors?.zip : ""
                        }
                        style={styles.TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name={`dbaAddress.Address`}
                        label="DBA Address*"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.dbaAddress?.Address}
                        error={
                          errors?.dbaAddress?.Address &&
                          touched?.dbaAddress?.Address
                        }
                        helperText={
                          errors?.dbaAddress?.Address &&
                            touched?.dbaAddress?.Address
                            ? errors?.dbaAddress?.Address
                            : ""
                        }
                        style={styles.TextField}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <TextField
                        name={`dbaAddress.City`}
                        label="City*"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.dbaAddress.City}
                        error={
                          errors?.dbaAddress?.City && touched?.dbaAddress?.City
                        }
                        helperText={
                          errors?.dbaAddress?.City && touched?.dbaAddress?.City
                            ? errors?.dbaAddress?.City
                            : ""
                        }
                        style={styles.TextField}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <CustomSelect
                        name={`dbaAddress.State`}
                        label="State*"
                        initialValue={values.dbaAddress?.State}
                        handleChange={(e) =>
                          setFieldValue(`dbaAddress.State`, e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        label="Zip Code*"
                        value={values.dbaAddress?.Zip}
                        onChange={handleChange}
                        fullWidth
                        name={`dbaAddress.Zip`}
                        InputProps={{
                          inputComponent: InputCustom,
                        }}
                        inputProps={{
                          block: [5],
                          numericOnly: true,
                        }}
                        error={
                          errors?.dbaAddress?.Zip && touched?.dbaAddress?.Zip
                        }
                        helperText={
                          errors?.dbaAddress?.Zip && touched?.dbaAddress?.Zip
                            ? errors?.dbaAddress?.Zip
                            : ""
                        }
                        style={styles.TextField}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <TextField
                        name="emailContact"
                        label="Email Contact*"
                        type="email"
                        fullWidth
                        onChange={handleChange}
                        value={values.emailContact}
                        error={errors?.emailContact && touched?.emailContact}
                        helperText={
                          errors?.emailContact && touched?.emailContact
                            ? errors?.emailContact
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <MaterialUiPhoneNumber
                        onlyCountries={["us", "vn"]}
                        placeholder="Business Phone Number"
                        label="Business Phone Number*"
                        name="phoneBusiness"
                        value={values.phoneBusiness}
                        onChange={(phone) =>
                          setFieldValue(`phoneBusiness`, phone)
                        }
                        error={errors?.phoneBusiness && touched?.phoneBusiness}
                        helperText={
                          errors?.phoneBusiness && touched?.phoneBusiness
                            ? errors?.phoneBusiness
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={6} md={3}>
                          <TextField
                            name="firstName"
                            label="First Name*"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={values.firstName}
                            error={errors?.firstName && touched?.firstName}
                            helperText={
                              errors?.firstName && touched?.firstName
                                ? errors?.firstName
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField
                            name="lastName"
                            label="Last Name*"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={values.lastName}
                            error={errors?.lastName && touched?.lastName}
                            helperText={
                              errors?.lastName && touched?.lastName
                                ? errors?.lastName
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField
                            name="title"
                            label="Title/Position*"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            value={values.title}
                            error={errors?.title && touched?.title}
                            helperText={
                              errors?.title && touched?.title
                                ? errors?.title
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <MaterialUiPhoneNumber
                            onlyCountries={["us", "vn"]}
                            label="Contact Phone Number*"
                            placeholder="Business Phone Number"
                            name="phoneContact"
                            value={values.phoneContact}
                            onChange={(phone) =>
                              setFieldValue(`phoneContact`, phone)
                            }
                            error={
                              errors?.phoneContact && touched?.phoneContact
                            }
                            helperText={
                              errors?.phoneContact && touched?.phoneContact
                                ? errors?.phoneContact
                                : ""
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <TextField
                        style={{ paddingTop: "5px" }}
                        name="reviewLink"
                        label="Review Link"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.reviewLink}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel>Send Review Link Option</InputLabel>
                        <Select
                          name="sendReviewLinkOption"
                          value={values?.sendReviewLinkOption}
                          onChange={handleChange}
                        >
                          <MenuItem value="auto">Automatic</MenuItem>
                          <MenuItem value="off">Off</MenuItem>
                          <MenuItem value="manual">Manual</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={6} md={4}>
                          <CustomNumberField
                            InputLabelProps={{ shrink: true }}
                            name="latitude"
                            label="Latitude"
                            fullWidth
                            options={
                              {
                                // delimiters: ["."],
                                // blocks: [2, 20],
                              }
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <CustomNumberField
                            InputLabelProps={{ shrink: true }}
                            name="longitude"
                            label="Longitude"
                            fullWidth
                            options={
                              {
                                // delimiters: ["."],
                                // blocks: [3, 20],
                              }
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ paddingTop: "20px" }}>
                      <Button className="btn btn-green" type="submit">
                        SAVE
                      </Button>
                      <Button className="btn btn-red" onClick={this.goBack}>
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  merchantState: state.merchantState.data,
});
const mapDispatchToProps = (dispatch) => ({
  updateMerchantGeneralById: (payload) => {
    dispatch(updateMerchantGeneralById(payload));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(General);

const styles = {
  TextField: {
    paddingTop: "6px",
  },
};

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const validationSchema = Yup.object().shape({
  legalBusinessName: Yup.string().required("Business name is required"),
  doBusinessName: Yup.string().required("Doing Business name is required"),
  tax: Yup.string().required("Tax number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string().required("Zip is required"),
  dbaAddress: Yup.object().shape({
    Address: Yup.string().required("Address is required"),
    City: Yup.string().required("City is required"),
    Zip: Yup.string().required("Zip is required"),
  }),
  emailContact: Yup.string()
    .email("Email is not valid")
    .required("Email is required"),
  phoneBusiness: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Business phone is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  title: Yup.string().required("Title/Position is required"),
  phoneContact: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Phone is required"),

  latitude: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(true)
    .required("Latitude is required"),

  longitude: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(true)
    .required("Longitude is required"),
});
