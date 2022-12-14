import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { config } from "@/url/url";
import { getMerchantByID } from "@/actions/merchantActions";
import { TextField, Grid, Button } from "@material-ui/core";
import { WARNING_NOTIFICATION } from "@/constants/notificationConstants";
import { updateMerchantPendingByID } from "@/actions/merchantActions";
import { Formik, Form, FieldArray } from "formik";
import { CustomTitle } from "@/util/CustomText";
import * as Yup from "yup";
import { Typography } from "@material-ui/core";

import defaultImage from "./hpadmin2.png";
import ContainerHeader from "@components/ContainerHeader/index";
import IntlMessages from "@/util/IntlMessages";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import InputField from "../MerchantList/AddMerchants/FormFields/InputField";
import CustomNumberField from "../MerchantList/AddMerchants/FormFields/CustomNumberField";
import CustomPhoneField from "../MerchantList/AddMerchants/FormFields/CustomPhoneField";
import ErrorMessage from "../MerchantList/AddMerchants/FormFields/ErrorMessage";
import SelectField from "../MerchantList/AddMerchants/FormFields/SelectField";
import DatePickerField from "../MerchantList/AddMerchants/FormFields/DatePickerField";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import State from "@/util/InitialState";
import moment from "moment";
import axios from "axios";
import LinearProgress from "@/util/linearProgress";
import CustomSelect from "@/util/getState";
import InputCustom from "@/util/CustomInput";
import update from "immutability-helper";
import { merchantTypes } from "@/util/merchantType";
import del_principal from "../../../../assets/images/del_principal.png";

import "./MerchantReqProfile.css";
import "bootstrap/js/src/collapse.js";

const upFile = config.url.upFile;

class EditPendingMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      progress: false,
      progressPrincipal: false,
      isSubmitting: false,
    };
  }

  uploadFile = (e, setFieldValue, name, imageUrlName) => {
    e.preventDefault();
    let file = e?.target?.files[0];

    if (file?.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tga)$/)) {
      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          let reader = new FileReader();
          reader.onloadend = () => {
            setFieldValue(name, res.data.data.fileId);
            setFieldValue(imageUrlName, reader.result);
          };
          reader.readAsDataURL(file);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.WARNING_NOTIFICATION(
        "Image type is not supported, Please choose another image "
      );
    }
  };

  componentDidMount() {
    const Profile = this.props.Profile;
    var BusinessQuestionObject = Profile?.business.reduce(
      (obj, item, index) =>
        Object.assign(obj, {
          [`question${index + 1}`]: {
            isAccept: item?.answer,
            desc: item?.answerReply,
            question: item?.question,
          },
        }),
      {}
    );

    let newPrincipalState = update(Profile, {
      principals: {
        $apply: (b) =>
          b.map((item, ii) => {
            return {
              ...item,
              DateOfBirth: moment(item.birthDate).format("MM/DD/YYYY"),
            };
          }),
      },
    });

    this.setState(
      {
        ID: Profile?.merchantId,
        generalInfo: Profile?.general,
        businessInfo: BusinessQuestionObject,
        bankInfo: Profile?.businessBank,
        principalInfo: newPrincipalState.principals,
        currentRate: {
          TransactionsFee: 15,
          DiscountRate: 10,
        },
        packagePricing: "3",
        type: Profile.type
      },
      () => this.setState({ loading: true })
    );
  }

  goBack = () => {
    this.props.history.push("/app/merchants/pending/profile");
  };


  render() {
    const e = this.props.Profile;
    const { merchantState } = this.props;

    return (
      <div className=" content-list ">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="sidebar.dashboard.editPendingMerchant" />}
          disableBreadcrumb={true}
        />
        <div className="content-body page-heading">
          <div className="header col-12">
            <h3>{"HP-" + e.merchantId}</h3>
          </div>

          <hr />
          <div className="content react-transition swipe-right">
            {
              this.state.loading && (
                <>
                  <Formik
                    initialValues={this.state}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                      const { generalInfo, bankInfo } = values;
                      setErrors();
                      const newBankInfo = {
                        ...bankInfo,
                        bankName: bankInfo?.name,
                      };
                      const newGeneralInfo = {
                        ...generalInfo,
                        businessName: generalInfo?.legalBusinessName,
                        doingBusiness: generalInfo?.doBusinessName,

                        businessAddress: {
                          address: generalInfo?.address,
                          city: generalInfo?.city,
                          state: generalInfo?.stateId,
                          zip: generalInfo?.zip,
                        },
                        businessPhone: generalInfo?.phoneBusiness,
                        email: generalInfo?.emailContact,

                        position: generalInfo?.title,
                        contactPhone: generalInfo?.phoneContact,
                        businessHourEnd: "11:00 PM",
                        businessHourStart: "10:00 AM",
                      };
                      const payload = {
                        ...values,
                        generalInfo: newGeneralInfo,
                        bankInfo: newBankInfo,
                        path: "/app/merchants/pending/profile",
                      };

                      this.props.updateMerchantPendingByID(payload);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                      setErrors,
                      /* and other goodies */
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Grid container spacing={6}>
                          <Grid item xs={12}>
                            <CustomTitle value="General Information" />
                          </Grid>
                          <Grid item xs={3}>
                            <InputField
                              name={`generalInfo.legalBusinessName`}
                              label="Legal Business Name*"
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={3}>
                            <InputField
                              name={`generalInfo.doBusinessName`}
                              label="Doing Business As* (DBA)"
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={3}>
                            <CustomSelect
                              name={`type`}
                              label="Merchant type*"
                              initialValue={
                                values?.type
                              }
                              data={merchantTypes}
                              handleChange={(e) =>
                                setFieldValue(
                                  `type`,
                                  e.target.value
                                )
                              }
                            />
                          </Grid>

                          <Grid item xs={3}>
                            <TextField
                              InputLabelProps={{ shrink: true }}
                              label="Federal Tax ID*"
                              value={values.generalInfo.tax}
                              onChange={handleChange}
                              fullWidth
                              name={`generalInfo.tax`}
                              InputProps={{
                                inputComponent: InputCustom,
                              }}
                              inputProps={{
                                block: [2, 7],
                              }}
                              error={
                                errors?.generalInfo?.tax &&
                                touched?.generalInfo?.tax
                              }
                              helperText={
                                errors?.generalInfo?.tax &&
                                  touched?.generalInfo?.tax
                                  ? errors?.generalInfo?.tax
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputField
                              style={styles.input}
                              name={`generalInfo.address`}
                              label="Business Address* (no P.O. Boxes)"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <InputField
                              style={styles.input}
                              name={`generalInfo.city`}
                              label="City*"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <CustomSelect
                              name="state"
                              label="State*"
                              initialValue={values.generalInfo.stateId}
                              data={merchantState}
                              handleChange={(e) =>
                                setFieldValue(
                                  `generalInfo.stateId`,
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              style={styles.input}
                              InputLabelProps={{ shrink: true }}
                              label="Zip Code*"
                              value={values.generalInfo.zip}
                              onChange={handleChange}
                              fullWidth
                              name={`generalInfo.zip`}
                              InputProps={{
                                inputComponent: InputCustom,
                              }}
                              error={
                                errors?.generalInfo?.zip &&
                                touched?.generalInfo?.zip
                              }
                              helperText={
                                errors?.generalInfo?.zip &&
                                  touched?.generalInfo?.zip
                                  ? errors?.generalInfo?.zip
                                  : ""
                              }
                            />
                          </Grid>

                          {/* // DBA ADDRESS */}
                          <Grid item xs={12}>
                            <InputField
                              style={styles.input}
                              name={`generalInfo.dbaAddress.Address`}
                              label="DBA Address*"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <InputField
                              style={styles.input}
                              name={`generalInfo.dbaAddress.City`}
                              label="City*"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <CustomSelect
                              name={`generalInfo.dbaAddress.State`}
                              label="State*"
                              initialValue={
                                values?.generalInfo?.dbaAddress?.State
                              }
                              data={merchantState}
                              handleChange={(e) =>
                                setFieldValue(
                                  `generalInfo.dbaAddress.State`,
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              style={styles.input}
                              InputLabelProps={{ shrink: true }}
                              label="Zip Code*"
                              value={values.generalInfo?.dbaAddress.Zip}
                              onChange={handleChange}
                              fullWidth
                              name={`generalInfo.dbaAddress.Zip`}
                              InputProps={{
                                inputComponent: InputCustom,
                              }}
                              error={
                                errors?.generalInfo?.dbaAddress?.Zip &&
                                touched?.generalInfo?.dbaAddress?.Zip
                              }
                              helperText={
                                errors?.generalInfo?.dbaAddress?.Zip &&
                                  touched?.generalInfo?.dbaAddress?.Zip
                                  ? errors?.generalInfo?.dbaAddress?.Zip
                                  : ""
                              }
                            />
                          </Grid>

                          <Grid item xs={4}>
                            <InputField
                              name={`generalInfo.emailContact`}
                              label="Email Contact*"
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={4}>
                            <MaterialUiPhoneNumber
                              fullWidth
                              onlyCountries={["us", "vn"]}
                              label="Business Phone Number*"
                              name="businessPhone"
                              value={values.generalInfo.phoneBusiness}
                              onChange={(phone) =>
                                setFieldValue(`generalInfo.phoneBusiness`, phone)
                              }
                            />
                          </Grid>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={3}>
                            <InputField
                              name={`generalInfo.firstName`}
                              label="First Name*"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <InputField
                              name={`generalInfo.lastName`}
                              label="Last Name*"
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={3}>
                            <InputField
                              name={`generalInfo.title`}
                              label="Title/Position*"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <MaterialUiPhoneNumber
                              onlyCountries={["us", "vn"]}
                              label="Contact Phone Number*"
                              name="phoneContact"
                              value={values.generalInfo.phoneContact}
                              onChange={(phone) =>
                                setFieldValue(`generalInfo.phoneContact`, phone)
                              }
                              error={
                                errors?.generalInfo?.phoneContact &&
                                touched?.generalInfo?.phoneContact
                              }
                              helperText={
                                errors?.generalInfo?.phoneContact &&
                                  touched?.generalInfo?.phoneContact
                                  ? errors?.generalInfo?.phoneContact
                                  : ""
                              }
                            />
                          </Grid>

                          {/* BANK INFORMATION */}
                          <Grid item xs={12}>
                            <CustomTitle value="Bank Information" />
                          </Grid>

                          <Grid item xs={3}>
                            <InputField
                              name={`bankInfo.accountHolderName`}
                              label="Account Holder Name*"
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={3}>
                            <InputField
                              name={`bankInfo.name`}
                              label="Bank Name*"
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={3}>
                            <TextField
                              InputLabelProps={{ shrink: true }}
                              label=" Routing Number* (ABA)"
                              value={values.bankInfo?.routingNumber}
                              onChange={handleChange}
                              fullWidth
                              name={`bankInfo.routingNumber`}
                              InputProps={{
                                inputComponent: InputCustom,
                              }}
                              inputProps={{
                                block: [12],
                                numericOnly: true,
                              }}
                              error={
                                errors?.bankInfo?.routingNumber &&
                                touched?.bankInfo?.routingNumber
                              }
                              helperText={
                                errors?.bankInfo?.routingNumber &&
                                  touched?.bankInfo?.routingNumber
                                  ? errors?.bankInfo?.routingNumber
                                  : ""
                              }
                            />
                          </Grid>

                          <Grid item xs={3}>
                            <TextField
                              InputLabelProps={{ shrink: true }}
                              label=" Account Number* (ABA)"
                              value={values.bankInfo?.accountNumber}
                              onChange={handleChange}
                              fullWidth
                              name={`bankInfo.accountNumber`}
                              InputProps={{
                                inputComponent: InputCustom,
                              }}
                              inputProps={{
                                block: [12],
                                numericOnly: true,
                              }}
                              error={
                                errors?.bankInfo?.accountNumber &&
                                touched?.bankInfo?.accountNumber
                              }
                              helperText={
                                errors?.bankInfo?.accountNumber &&
                                  touched?.bankInfo?.accountNumber
                                  ? errors?.bankInfo?.accountNumber
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sm={4}
                            lg={3}
                            style={{ paddingTop: "10px" }}
                          >
                            <label style={{ paddingBottom: "10px" }}>
                              Void Check*
                          </label>
                            <br />

                            <img
                              className="bankVoid"
                              style={styles.image}
                              src={values.bankInfo?.imageUrl}
                              alt="void"
                            />
                            <div style={{ width: "100%", marginTop: "5px" }}>
                              {this.state.progress ? <LinearProgress /> : null}
                            </div>
                            <input
                              type="file"
                              style={styles.imageInput}
                              name="image"
                              id="file"
                              className="custom-input"
                              accept="image/gif,image/jpeg, image/png"
                              onChange={(e) =>
                                this.uploadFile(
                                  e,
                                  setFieldValue,
                                  "bankInfo.fileId",
                                  "bankInfo.imageUrl"
                                )
                              }
                            />
                          </Grid>

                          {/* PRINCIPAL INFORMATION */}
                          <Grid item xs={12}>
                            <CustomTitle value="Principal Information" />
                          </Grid>

                          <FieldArray name="principalInfo">
                            {(arrayHelpers) => (
                              <div style={{ margin: "0px 23px" }}>
                                {values.principalInfo &&
                                  values.principalInfo.length > 0 ? (
                                    values.principalInfo.map((principal, index) => {
                                      return (
                                        <React.Fragment key={index}>
                                          <Grid
                                            item
                                            xs={12}
                                            className="principal-title"
                                          >
                                            <CustomTitle
                                              styles={{ padding: "10px 0px" }}
                                              value={`Principal ${index + 1}`}
                                            />
                                           
                                          </Grid>
                                          <Grid container spacing={6}>
                                            <Grid item xs={12} sm={4}>
                                              <InputField
                                                name={`principalInfo.${index}.firstName`}
                                                label="Fist Name*"
                                                fullWidth
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <InputField
                                                name={`principalInfo.${index}.lastName`}
                                                label="Last Name*"
                                                fullWidth
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <InputField
                                                name={`principalInfo.${index}.title`}
                                                label="Title/Position*"
                                                fullWidth
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <CustomNumberField
                                                InputLabelProps={{ shrink: true }}
                                                name={`principalInfo.${index}.ownerShip`}
                                                label="Ownership* (%)"
                                                fullWidth
                                                options={{
                                                  numericOnly: true,
                                                  blocks: [3],
                                                }}
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <CustomPhoneField
                                                label="Home Phone"
                                                fullWidth
                                                name={`principalInfo.${index}.homePhone`}
                                                onChange={(e) =>
                                                  setFieldValue(
                                                    `principalInfo.${index}.homePhone`,
                                                    e
                                                  )
                                                }
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <CustomPhoneField
                                                label="Mobile Phone*"
                                                fullWidth
                                                name={`principalInfo.${index}.mobilePhone`}
                                                onChange={(e) =>
                                                  setFieldValue(
                                                    `principalInfo.${index}.mobilePhone`,
                                                    e
                                                  )
                                                }
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <InputField
                                                style={{ paddingTop: '6px' }}
                                                name={`principalInfo.${index}.address`}
                                                label="Address*"
                                                fullWidth
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <InputField
                                                style={{ paddingTop: '6px' }}
                                                name={`principalInfo.${index}.city`}
                                                label="City*"
                                                fullWidth
                                              />
                                            </Grid>

                                            <Grid item xs={12} sm={4}>
                                              <SelectField
                                                name={`principalInfo.${index}.stateId`}
                                                label="State*"
                                                data={merchantState}
                                                fullWidth
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <CustomNumberField
                                                InputLabelProps={{ shrink: true }}
                                                name={`principalInfo.${index}.zip`}
                                                label="Zip Code*"
                                                fullWidth
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <CustomNumberField
                                                InputLabelProps={{ shrink: true }}
                                                name={`principalInfo.${index}.yearAddress`}
                                                label="Year at this Address*"
                                                fullWidth
                                                options={{
                                                  numericOnly: true,
                                                  blocks: [2],
                                                }}
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <CustomNumberField
                                                InputLabelProps={{ shrink: true }}
                                                name={`principalInfo.${index}.ssn`}
                                                label="Social Security Number* (SSN)"
                                                fullWidth
                                                options={{
                                                  numericOnly: true,
                                                  blocks: [3, 2, 4],
                                                  delimiter: "-",
                                                }}
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <DatePickerField
                                                name={`principalInfo.${index}.DateOfBirth`}
                                                label="Date of Birth*"
                                                format="MM/dd/yyyy"
                                                fullWidth
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <InputField
                                                name={`principalInfo.${index}.email`}
                                                label="Email Address*"
                                                fullWidth
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <CustomNumberField
                                                InputLabelProps={{ shrink: true }}
                                                name={`principalInfo.${index}.driverNumber`}
                                                label="Driver License Number*"
                                                fullWidth
                                                options={{
                                                  numericOnly: true,
                                                  blocks: [20],
                                                }}
                                              />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                              <SelectField
                                                name={`principalInfo.${index}.stateIssued`}
                                                onChange={(e) =>
                                                  setFieldValue(
                                                    `principalInfo.${index}.stateIssued`,
                                                    Number(e.target.value)
                                                  )
                                                }
                                                label="State Issued*"
                                                data={merchantState}

                                                fullWidth
                                              />
                                            </Grid>
                                          </Grid>
                                          <Grid container spacing={6}>
                                            <Grid item xs={6} sm={4} lg={3}>
                                              <label>Driver License Picture*</label>

                                              <div
                                                style={{
                                                  width: "100%",
                                                  marginTop: "10px",
                                                }}
                                              >
                                                {principal?.imageUrl ? (
                                                  <img
                                                    src={principal?.imageUrl}
                                                    alt="avatar"
                                                    style={{
                                                      width: "100%",
                                                      objectFit: "cover",
                                                    }}
                                                  />
                                                ) : (
                                                    <img
                                                      src={defaultImage}
                                                      alt="avatar"
                                                      style={{ width: "100%" }}
                                                    />
                                                  )}
                                              </div>
                                              {
                                                <span className="error-message">
                                                  <ErrorMessage
                                                    name={`principalInfo.${index}.fileId`}
                                                  />
                                                </span>
                                              }
                                              <input
                                                type="file"
                                                style={{
                                                  marginTop: "10px",
                                                  width: "100%",
                                                  fontWeight: "normal",
                                                }}
                                                className="custom-input"
                                                name={`principalInfo.${index}.fileId`}
                                                id="file"
                                                accept="image/gif,image/jpeg, image/png"
                                                onChange={(e) =>
                                                  this.uploadFile(
                                                    e,
                                                    setFieldValue,
                                                    `principalInfo.${index}.fileId`,
                                                    `principalInfo.${index}.imageUrl`
                                                  )
                                                }
                                              />
                                            </Grid>
                                          </Grid>

                                          <div>

                                            <Grid
                                              container
                                              direction="row"
                                              alignItems="center"
                                              style={{
                                                marginTop: 40,
                                              }}
                                            >
                                              <Grid item>
                                                <AddCircleIcon
                                                  onClick={() =>
                                                    arrayHelpers.insert(1, "")
                                                  }
                                                  className="add-principal"
                                                />
                                              </Grid>

                                              <Typography
                                                variant="subtitle2"
                                                item
                                                onClick={() =>
                                                  arrayHelpers.insert(1, "")
                                                }
                                                style={{
                                                  marginBottom: "3px",
                                                  fontWeight: "600",
                                                }}
                                                className="add-principal"
                                              >
                                                ADD PRINCIPAL
                                            </Typography>

                                              <ButtonRemovePrincipal
                                                onClick={() => {
                                                  if (window.confirm("Are you sure you want to remove this principal")) {
                                                    arrayHelpers.remove(index)
                                                  }
                                                }}
                                              />
                                            </Grid>
                                          </div>
                                        </React.Fragment>
                                      );
                                    })
                                  ) : (
                                    <div
                                      style={{ display: 'flex' }}
                                    >
                                      <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                      >
                                        <Grid item>
                                          <AddCircleIcon
                                            onClick={() => arrayHelpers.push()}
                                            className="add-principal"
                                          />
                                        </Grid>
                                        <Typography
                                          variant="subtitle2"
                                          item
                                          onClick={() => arrayHelpers.push()}
                                          style={{
                                            marginBottom: "3px",
                                          }}
                                          className="add-principal"
                                        >
                                          ADD PRINCIPAL
                                      </Typography>
                                      </Grid>
                                    </div>
                                  )}
                              </div>
                            )}
                          </FieldArray>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "50px" }}>
                          <Button
                            className="btn btn-red"
                            onClick={() =>
                              this.props.history.push(
                                "/app/merchants/pending/profile"
                              )
                            }
                          >
                            BACK
                        </Button>
                          <Button type="submit" className="btn btn-green">
                            SAVE
                        </Button>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const ButtonRemovePrincipal = ({ onClick = () => { } }) => {
  return (
    <div onClick={onClick} className="btn-remove-principal">
      <img src={del_principal} alt="" />
      <div>Remove</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  Profile: state.merchant.merchant,
  RejectStatus: state.Reject,
  merchantState: state.merchantState.data
});

const mapDispatchToProps = (dispatch) => ({
  getMerchantByID: (payload) => {
    dispatch(getMerchantByID(payload));
  },
  updateMerchantPendingByID: (payload) => {
    dispatch(updateMerchantPendingByID(payload));
  },
  WARNING_NOTIFICATION: (payload) => {
    dispatch(WARNING_NOTIFICATION(payload));
  },
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditPendingMerchant)
);

const styles = {
  image: {
    width: "100%",
    height: "auto",
  },
  imageInput: {
    border: "none",
    marginTop: "10px",
    width: "100%",
  },
  p: {
    color: "red",
    fontSize: "18px",
  },
  input: {
    marginTop: "8px",
  },
};

const validationSchema = Yup.object().shape({
  type: Yup.string().required(),
  generalInfo: Yup.object().shape({
    legalBusinessName: Yup.string()
      .required("Business name is required")
      .nullable(),
    doBusinessName: Yup.string()
      .required("Doing Business name is required")
      .nullable(),
    tax: Yup.string().required("Tax number is required").nullable(),
    address: Yup.string().required("Address is required").nullable(),
    city: Yup.string().required("City is required").nullable(),
    zip: Yup.string().required("Zip is required").nullable(),
    dbaAddress: Yup.object().shape({
      Address: Yup.string().required("Address is required"),
      City: Yup.string().required("City is required"),
      Zip: Yup.string().required("Zip is required"),
    }),
    emailContact: Yup.string()
      .email("Email is not valid")
      .required("Email is required")
      .nullable(),
    phoneBusiness: Yup.string().required("Business phone number is required"),
    firstName: Yup.string().required("First Name is required").nullable(),
    lastName: Yup.string().required("Last name is required").nullable(),
    title: Yup.string().required("Title/Position is required").nullable(),
    phoneContact: Yup.string()
      .required("Contact phone number is required")
      .nullable(),
  }),
  bankInfo: Yup.object().shape({
    name: Yup.string().required("Bank name is required"),
    routingNumber: Yup.string().required("Routing number is required"),
    accountNumber: Yup.string().required("Account number is required"),
    fileId: Yup.string().required("Void check image is required"),
    accountHolderName: Yup.string().required("Account holder name is required"),
  }),
  principalInfo: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("First name is  required"),
      lastName: Yup.string().required("Last name is required"),
      title: Yup.string().required("Title/Position is required"),
      ownerShip: Yup.string().required("Ownership is required"),
      mobilePhone: Yup.string().required("Mobile phone is required"),
      ssn: Yup.string().required("Social security number is required"),
      DateOfBirth: Yup.string()
        .required("Date of birth is required")
        .nullable(),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required")
        .nullable(),
      driverNumber: Yup.string().required("Driver license number is required"),
      stateIssued: Yup.string().required("State issued is required").nullable(),
      fileId: Yup.string().required("Driver license image is required"),
      yearAddress: Yup.string().required("Year at this address is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      stateId: Yup.string().required("State is required"),
      zip: Yup.string().required("Zip code is required"),
    })
  ),
});
