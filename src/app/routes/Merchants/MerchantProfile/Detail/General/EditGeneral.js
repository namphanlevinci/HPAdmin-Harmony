import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ViewProfile_Merchants,
  UPDATE_MERCHANT,
  GET_MERCHANT_BY_ID,
} from "../../../../../../actions/merchants/actions";
import { Formik, Form } from "formik";
import { Grid, Button, TextField } from "@material-ui/core";
import * as Yup from "yup";
import { CustomTitle } from "../../../../../../util/CustomText";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import CustomSelect from "../../../../../../util/getState";
import InputCustom from "../../../MerchantsList/addMerchant/custom-input";

class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  _goBack = () => {
    this.props.history.push("/app/merchants/profile/general");
  };

  componentDidMount() {
    const data = this.props.MerchantProfile.general;

    this.setState({ data: data, loading: true });
  }

  render() {
    return (
      <div className="content  react-transition swipe-right">
        <div className="container-fluid">
          {this.state.loading && (
            <Formik
              initialValues={this.state.data}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const ID = this.props.MerchantProfile.general.generalId;
                this.props.updateMerchant({ ...values, ID });
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
                    <Grid item xs={6} md={4}>
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
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
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
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <CustomSelect
                        name="state"
                        label="State Issued*"
                        initialValue={values.stateId}
                        handleChange={(e) =>
                          setFieldValue(`stateId`, e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
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
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
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
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
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
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <CustomSelect
                        name={`dbaAddress.State`}
                        label="State Issued*"
                        initialValue={values.dbaAddress?.State}
                        handleChange={(e) =>
                          setFieldValue(`dbaAddress.State`, e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
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
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
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
                    <Grid item xs={6} md={6}>
                      <MaterialUiPhoneNumber
                        onlyCountries={["us", "vn"]}
                        placeholder="Business Phone Number"
                        label="Business Phone*"
                        name="phoneBusiness"
                        value={values.phoneBusiness}
                        onChange={(phone) =>
                          setFieldValue(`phoneBusiness`, phone)
                        }
                      />
                    </Grid>

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
                          errors?.title && touched?.title ? errors?.title : ""
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
                        error={errors?.phoneContact && touched?.phoneContact}
                        helperText={
                          errors?.phoneContact && touched?.phoneContact
                            ? errors?.phoneContact
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: "20px" }}>
                      <Button className="btn btn-green" type="submit">
                        SAVE
                      </Button>
                      <Button className="btn btn-red" onClick={this._goBack}>
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
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
  getMerchant: state.getMerchant,
});
const mapDispatchToProps = (dispatch) => ({
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload));
  },
  updateMerchant: (payload) => {
    dispatch(UPDATE_MERCHANT(payload));
  },
  GET_MERCHANT_BY_ID: (ID) => {
    dispatch(GET_MERCHANT_BY_ID(ID));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(General);

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
  phoneBusiness: Yup.string().required("Business phone number is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  title: Yup.string().required("Title/Position is required"),
  phoneContact: Yup.string().required("Contact phone number is required"),
});
