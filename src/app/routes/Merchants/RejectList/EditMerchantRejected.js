import React, { Component } from "react";
import { updateMerchantGeneralById } from "../../../../actions/merchantActions";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Button, Grid } from "@material-ui/core";
import { CustomTitle } from "../../../../util/CustomText";

import State from "../../../../util/InitialState";
import * as Yup from "yup";
import IntlMessages from "../../../../util/IntlMessages";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import SimpleReactValidator from "simple-react-validator";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import InputCustom from "../../../../util/CustomInput";
import TextField from "@material-ui/core/TextField";
import SelectField from "../MerchantList/AddMerchants/FormFields/SelectField";

import "./EditMerchant.css";

class EditMerchantRejected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      emailContact: "",
      legalBusinessName: "",
      tax: "",
      address: "",
      city: "",
      stateId: "",
      phoneBusiness: "",
      zip: "",
      phoneContact: "",
      firstName: "",
      lastName: "",
      title: "",
      doBusinessName: "",
      stateName: "",
      loading: false,
    };
    this.validator = new SimpleReactValidator({
      messages: {
        default: "Required",
      },
    });
  }

  componentDidMount() {
    const data = this.props.MerchantProfile?.general;

    this.setState({
      emailContact: data.emailContact,
      legalBusinessName: data.legalBusinessName,
      tax: data.tax,
      address: data.address,
      city: data.city,
      stateId: data.stateId,
      phoneBusiness: data.phoneBusiness,
      zip: data.zip,
      phoneContact: data.phoneContact,
      firstName: data.firstName,
      lastName: data.lastName,
      title: data.title,
      doBusinessName: data.doBusinessName,

      dbaAddress: {
        Address: data?.dbaAddress?.Address,
        City: data?.dbaAddress?.City,
        State: data?.dbaAddress?.State,
        Zip: data?.dbaAddress?.Zip,
      },

      loading: true,
    });
  }

  goBack = () => {
    this.props.history.push("/app/merchants/rejected/profile");
  };

  render() {
    const { merchantState } = this.props;
    return (
      <div className="content general-content react-transition swipe-right">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.editRejectedMerchant" />}
          disableBreadcrumb={true}
        />
        <div className="content-body reject-info page-heading">
          {this.state.loading && (
            <Formik
              initialValues={this.state}
              validationSchema={validateSchema}
              onSubmit={(values, { setSubmitting }) => {
                const ID = this.props.MerchantProfile?.general?.generalId;
                const merchantId = this.props.MerchantProfile.merchantId;

                const payload = {
                  ...values,
                  ID,
                  merchantId,
                  path: "/app/merchants/rejected/profile",
                };

                this.props.updateMerchantGeneralById(payload);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,

                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <CustomTitle value="General Information" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name="legalBusinessName"
                        label="Legal Business Name*"
                        margin="normal"
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
                    <Grid item xs={4}>
                      <TextField
                        name="doBusinessName"
                        label="Doing Business As* (DBA)"
                        type="text"
                        margin="normal"
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
                    <Grid item xs={4}>
                      <TextField
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={values.tax}
                        onChange={handleChange}
                        label="Federal Tax ID*"
                        name="tax"
                        fullWidth
                        startAdornment
                        inputProps={{
                          block: [2, 7],
                        }}
                        InputProps={{
                          inputComponent: InputCustom,
                        }}
                        error={errors.tax && touched.tax}
                        helperText={errors.tax && touched.tax ? errors.tax : ""}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="address"
                        label="Business Address* (no P.O. Boxes)"
                        margin="normal"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.address}
                        error={errors.address && touched.address}
                        helperText={
                          errors.address && touched.address
                            ? errors.address
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name="city"
                        label="City*"
                        type="text"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={values.city}
                        error={errors.city && touched.city}
                        helperText={
                          errors.city && touched.city ? errors.city : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectField
                        name="stateId"
                        margin="normal"
                        label="State*"
                        initialValue={values.stateId}
                        data={merchantState}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={values.zip}
                        onChange={handleChange}
                        label="Zip Code*"
                        name="zip"
                        fullWidth
                        startAdornment
                        InputProps={{
                          inputComponent: InputCustom,
                        }}
                        error={errors.zip && touched.zip}
                        helperText={errors.zip && touched.zip ? errors.zip : ""}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name={`dbaAddress.Address`}
                        label="DBA Address*"
                        margin="normal"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.dbaAddress?.Address}
                        error={
                          errors.dbaAddress?.Address &&
                          touched.dbaAddress?.Address
                        }
                        helperText={
                          errors.dbaAddress?.Address &&
                            touched.dbaAddress?.Address
                            ? errors.dbaAddress?.Address
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name={`dbaAddress.City`}
                        label="City*"
                        type="text"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={values.dbaAddress?.City}
                        error={
                          errors.dbaAddress?.City && touched.dbaAddress?.City
                        }
                        helperText={
                          errors.dbaAddress?.City && touched.dbaAddress?.City
                            ? errors.dbaAddress?.City
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <SelectField
                        name={`dbaAddress.State`}
                        margin="normal"
                        label="State*"
                        initialValue={values.dbaAddress?.State}
                        handleChange={(e) =>
                          setFieldValue(`dbaAddress.State`, e.target.value)
                        }
                        data={merchantState}
                        fullWidth
                        error={
                          errors.dbaAddress?.State && touched.dbaAddress?.State
                        }
                        helperText={
                          errors.dbaAddress?.State && touched.dbaAddress?.State
                            ? errors.dbaAddress?.State
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={values.dbaAddress.Zip}
                        onChange={handleChange}
                        label="Zip Code*"
                        name={`dbaAddress.Zip`}
                        fullWidth
                        startAdornment
                        InputProps={{
                          inputComponent: InputCustom,
                        }}
                        error={
                          errors.dbaAddress?.Zip && touched.dbaAddress?.Zip
                        }
                        helperText={
                          errors.dbaAddress?.Zip && touched.dbaAddress?.Zip
                            ? errors.dbaAddress?.Zip
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name="emailContact"
                        label="Email Contact*"
                        type="email"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={values.emailContact}
                        error={errors.emailContact && touched.emailContact}
                        helperText={
                          errors.emailContact && touched.emailContact
                            ? errors.emailContact
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <MaterialUiPhoneNumber
                        onlyCountries={["us", "vn"]}
                        label="Business Phone Number*"
                        margin="normal"
                        name="phoneBusiness"
                        value={values.phoneBusiness}
                        onChange={(e) => setFieldValue("phoneBusiness", e)}
                        error={errors.phoneBusiness && touched.phoneBusiness}
                        helperText={
                          errors.phoneBusiness && touched.phoneBusiness
                            ? errors.phoneBusiness
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={3}>
                      <TextField
                        name="firstName"
                        label="First Name*"
                        type="text"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={values.firstName}
                        error={errors.firstName && touched.firstName}
                        helperText={
                          errors.firstName && touched.firstName
                            ? errors.firstName
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        name="lastName"
                        label="Last Name*"
                        type="text"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={values.lastName}
                        error={errors.lastName && touched.lastName}
                        helperText={
                          errors.lastName && touched.lastName
                            ? errors.lastName
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        name="title"
                        label="Title/Position*"
                        type="text"
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        value={values.title}
                        error={errors.title && touched.title}
                        helperText={
                          errors.title && touched.title ? errors.title : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <MaterialUiPhoneNumber
                        onlyCountries={["us", "vn"]}
                        label="Contact Phone Number*"
                        margin="normal"
                        name="phoneContact"
                        value={values.phoneContact}
                        onChange={(e) => setFieldValue("phoneContact", e)}
                        error={errors.phoneContact && touched.phoneContact}
                        helperText={
                          errors.phoneContact && touched.phoneContact
                            ? errors.phoneContact
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-green"
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  MerchantProfile: state.merchant.merchant,
  merchantState: state.merchantState.data
});
const mapDispatchToProps = (dispatch) => ({
  updateMerchantGeneralById: (payload) => {
    dispatch(updateMerchantGeneralById(payload));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMerchantRejected);

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const validateSchema = Yup.object().shape({
  legalBusinessName: Yup.string().required("Business name is required"),
  doBusinessName: Yup.string().required("Doing Business name is required"),
  tax: Yup.string().required("Tax number is required"),

  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  stateId: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip is required"),

  dbaAddress: Yup.object().shape({
    Address: Yup.string().required("Address is required"),
    City: Yup.string().required("City is required"),
    State: Yup.string().required("State is required"),
    Zip: Yup.string().required("Zip is required"),
  }),

  emailContact: Yup.string()
    .email("Email is not valid")
    .required("Email is required"),
  phoneBusiness: Yup.string()
    .matches(phoneRegExp, "Business phone is not valid")
    .required("Business phone is required"),

  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  title: Yup.string().required("Title/Position is required"),
  phoneContact: Yup.string()
    .matches(phoneRegExp, "Contact phone is not valid")
    .required("Contact phone is required"),
});
