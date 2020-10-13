import React from "react";
import { Formik, Form, FieldArray } from "formik";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { config } from "../../../../../url/url";
import { GET_MERCHANT_BY_ID } from "../../../../../actions/merchants/actions";
import { CustomTitle } from "../../../../../util/CustomText";
import { TextField, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import axios from "axios";
import * as Yup from "yup";
import ErrorMessage from "../errorMessage";
import CustomSelect from "../../../../../util/getState";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputCustom from "../../MerchantsList/addMerchant/custom-input";

import LinearProgress from "../../../../../util/linearProgress";

import "../MerchantReqProfile.css";
import "bootstrap/js/src/collapse.js";
import "react-phone-input-2/lib/high-res.css";

const URL = config.url.URL;

// ValidationSchema
const validationSchema = Yup.object().shape({
  PrincipalInfo: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
      ownerShip: Yup.string().required("Required"),
      // homePhone: Yup.string().required("Required"),
      mobilePhone: Yup.string().required("Required"),
      // yearAtThisAddress: Yup.string().required("Required"),
      ssn: Yup.string().required("Required"),
      birthDate: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      driverNumber: Yup.string().required("Required"),
      stateId: Yup.string().required("Required"),

      address: Yup.string().required("Required"),
      // city: Yup.string().required("Required"),
      // state: Yup.string().required("Required"),
      // zip: Yup.string().required("Required"),
    })
  ),
});

const EditPrincipal = ({
  checkValid,
  principals,
  getData,
  initValue,
  token,
  GetMerchantByID,
  history,
  SuccessNotification,
  FailureNotification,
  WarningNotification,
  handleSubmit,
  handleSubmitFail,
}) => {
  const getMerchantById = (ID) => {
    const payload = { ID, path: "/app/merchants/pending/profile" };
    GetMerchantByID(payload);
  };

  const editMerchant = (principalInfo) => {
    handleSubmit();
    let PrincipalInfo = principalInfo.PrincipalInfo;
    const isValid = checkValid();
    const body = {
      generalInfo: {
        businessName: initValue?.legalBusinessName,
        doingBusiness: initValue?.doBusinessName,
        tax: initValue?.tax,
        businessAddress: {
          address: initValue?.address,
          city: initValue?.city,
          state: initValue?.stateId,
          zip: initValue?.zip,
        },
        businessPhone: initValue?.phoneBusiness,
        email: initValue?.emailContact,
        firstName: initValue?.firstName,
        lastName: initValue?.lastName,
        position: initValue?.title,
        contactPhone: initValue?.phoneContact,
        businessHourEnd: "11:00 PM",
        businessHourStart: "10:00 AM",
        dbaAddress: {
          Address: initValue?.dbaAddress,
          City: initValue?.dbaCity,
          State: initValue?.dbaState,
          Zip: initValue?.dbaZip,
        },
      },
      businessInfo: initValue?.business,
      bankInfo: {
        bankName: initValue?.bankName,
        routingNumber: initValue?.routingNumber,
        accountNumber: initValue?.accountNumber,
        accountHolderName: initValue?.accountHolderName,
        fileId: initValue.fileId ? initValue.fileId : 0,
      },
      PrincipalInfo,
      packagePricing: "3",
      currentRate: {
        TransactionsFee: 15,
        DiscountRate: 10,
      },
    };

    if (isValid) {
      axios
        .put(URL + `/merchant/${initValue?.ID}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if ((res.status = 200)) {
            SuccessNotification(res.data.message);
            setTimeout(() => {
              getMerchantById(`${initValue?.ID}`);
            }, 1000);
          } else {
            handleSubmitFail();
            FailureNotification(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      handleSubmitFail();
      WarningNotification("Please Enter Required Information");
    }
  };
  return (
    <div>
      <Formik
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={{ PrincipalInfo: principals }}
        onSubmit={(values) => editMerchant(values)}
      >
        {({
          values,
          setFieldValue,
          submitForm,
          handleChange,
          isSubmitting,
        }) => (
          <Form>
            <FieldArray
              name="PrincipalInfo"
              render={(arrayHelpers) => (
                <div>
                  {values.PrincipalInfo && values.PrincipalInfo.length > 0
                    ? values.PrincipalInfo.map((PrincipalInfo, index) => {
                        const homePhone = PrincipalInfo?.homePhone?.replace(
                          /-/g,
                          ""
                        );
                        const mobilePhone = PrincipalInfo?.mobilePhone?.replace(
                          /-/g,
                          ""
                        );
                        const firstName = PrincipalInfo?.firstName;
                        const lastName = PrincipalInfo?.lastName;
                        const title = PrincipalInfo?.title;
                        const ownerShip = PrincipalInfo?.ownerShip;
                        const address = PrincipalInfo?.address;
                        const DateOfBirth = moment(
                          PrincipalInfo?.DateOfBirth
                        ).format("MM/DD/YYYY");

                        const SSN = PrincipalInfo?.ssn;
                        const email = PrincipalInfo?.email;
                        const driverNumber = PrincipalInfo?.driverNumber;
                        const stateId = PrincipalInfo?.stateId;
                        return (
                          <Grid container spacing={3} key={index}>
                            <Grid item xs={12}>
                              <CustomTitle value={`Principal ${index + 1}`} />
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "left" }}>
                              <TextField
                                name={`PrincipalInfo.${index}.firstName`}
                                defaultValue={firstName}
                                label="First Name*"
                                margin="normal"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                              />

                              <ErrorMessage
                                name={`PrincipalInfo.${index}.firstName`}
                              />
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "left" }}>
                              <TextField
                                name={`PrincipalInfo.${index}.lastName`}
                                defaultValue={lastName}
                                label="Last Name*"
                                margin="normal"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.lastName`}
                              />
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "left" }}>
                              <TextField
                                name={`PrincipalInfo.${index}.title`}
                                defaultValue={title}
                                label="Title/Position*"
                                margin="normal"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.title`}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl
                                style={{ width: "100%", marginTop: "16px" }}
                              >
                                <InputLabel htmlFor="formatted-text-mask-input">
                                  Ownership* (%)
                                </InputLabel>
                                <Input
                                  name={`PrincipalInfo.${index}.ownerShip`}
                                  value={ownerShip}
                                  label="Ơwnership* (%)"
                                  margin="normal"
                                  type="text"
                                  fullWidth
                                  onChange={handleChange}
                                  startAdornment
                                  inputProps={{
                                    block: [3],
                                    numericOnly: true,
                                  }}
                                  inputComponent={InputCustom}
                                />
                              </FormControl>

                              <ErrorMessage
                                name={`PrincipalInfo.${index}.ownerShip`}
                              />
                            </Grid>

                            <Grid item xs={4}>
                              <TextField
                                name={`PrincipalInfo.${index}.address`}
                                defaultValue={address}
                                label="Address*"
                                margin="normal"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.address`}
                              />
                            </Grid>

                            <Grid item xs={4}>
                              <FormControl
                                style={{ width: "100%", marginTop: "16px" }}
                              >
                                <InputLabel htmlFor="formatted-text-mask-input">
                                  Social Security Number* (SSN)
                                </InputLabel>
                                <Input
                                  name={`PrincipalInfo.${index}.ssn`}
                                  value={SSN}
                                  label="Social Security Number* (SSN)"
                                  margin="normal"
                                  onChange={handleChange}
                                  startAdornment
                                  inputProps={{
                                    block: [3, 2, 4],
                                    numericOnly: true,
                                  }}
                                  inputComponent={InputCustom}
                                />
                              </FormControl>
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.ssn`}
                              />
                            </Grid>

                            <Grid item xs={4} style={styles.div}>
                              <MaterialUiPhoneNumber
                                onlyCountries={["us", "vn"]}
                                label="Home Phone"
                                fullWidth
                                name={`PrincipalInfo.${index}.homePhone`}
                                value={homePhone}
                                country="us"
                                onChange={(e) =>
                                  setFieldValue(
                                    `PrincipalInfo.${index}.homePhone`,
                                    e
                                  )
                                }
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.homePhone`}
                              />
                            </Grid>
                            <Grid item xs={4} style={styles.div}>
                              <MaterialUiPhoneNumber
                                onlyCountries={["us", "vn"]}
                                label="Mobile Phone*"
                                fullWidth
                                name={`PrincipalInfo.${index}.mobilePhone`}
                                value={mobilePhone}
                                onChange={(e) =>
                                  setFieldValue(
                                    `PrincipalInfo.${index}.mobilePhone`,
                                    e
                                  )
                                }
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.mobilePhone`}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                name={`PrincipalInfo.${index}.email`}
                                defaultValue={email}
                                label="Email Address*"
                                margin="normal"
                                type="email"
                                fullWidth
                                onChange={handleChange}
                              />

                              <ErrorMessage
                                name={`PrincipalInfo.${index}.email`}
                              />
                            </Grid>

                            <Grid item xs={4} style={{ marginTop: "12px" }}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="flex-start">
                                  <KeyboardDatePicker
                                    label="Date of Birth* (mm/dd/yyyy)"
                                    style={{ marginTop: "0px" }}
                                    margin="normal"
                                    fullWidth
                                    format="MM/dd/yyyy"
                                    value={DateOfBirth}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `PrincipalInfo.${index}.DateOfBirth`,
                                        moment(e).format("YYYY-MM-DD")
                                      )
                                    }
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                  />
                                </Grid>
                              </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={4} style={styles.div}>
                              <FormControl style={{ width: "100%" }}>
                                <InputLabel htmlFor="formatted-text-mask-input">
                                  Driver License Number*
                                </InputLabel>
                                <Input
                                  name={`PrincipalInfo.${index}.driverNumber`}
                                  value={driverNumber}
                                  margin="normal"
                                  type="text"
                                  fullWidth
                                  onChange={handleChange}
                                  startAdornment
                                  inputProps={{
                                    block: [13],
                                    numericOnly: true,
                                  }}
                                  inputComponent={InputCustom}
                                />
                              </FormControl>

                              <ErrorMessage
                                name={`PrincipalInfo.${index}.driverNumber`}
                              />
                            </Grid>
                            <Grid item xs={4} style={styles.div}>
                              <CustomSelect
                                name="stateId"
                                label="State Issued*"
                                initialValue={stateId}
                                handleChange={(e) =>
                                  setFieldValue(
                                    `PrincipalInfo.${index}.stateId`,
                                    e.target.value
                                  )
                                }
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.stateId`}
                              />
                            </Grid>

                            <Grid
                              item
                              xs={4}
                              style={{ paddingTop: "10px", textAlign: "left" }}
                            >
                              <label style={{ paddingBottom: "10px" }}>
                                Driver License Picture*
                              </label>{" "}
                              <br />
                              <img
                                className="pending-image"
                                style={{ width: "100%" }}
                                src={PrincipalInfo?.imageUrl}
                                alt="void"
                              />
                              <div style={{ width: "100%", marginTop: "5px" }}>
                                {initValue?.progressPrincipal ? (
                                  <LinearProgress />
                                ) : null}
                              </div>
                              <input
                                type="file"
                                style={styles.imageInput}
                                className="custom-input"
                                name={`PrincipalInfo.${index}.fileId`}
                                accept="image/gif,image/jpeg, image/png"
                                onChange={(e, name) => [
                                  getData(
                                    e,
                                    setFieldValue,
                                    `PrincipalInfo.${index}.fileId`
                                  ),
                                ]}
                              />
                            </Grid>
                            <hr />
                          </Grid>
                        );
                      })
                    : // <p
                      //   href={null}
                      //   style={styles?.addBtn}
                      //   onClick={() => [arrayHelpers.push("")]}
                      // >
                      //   + ADD PRINCIPAL
                      // </p>
                      null}
                  <div className="content-body">
                    <Button
                      className="btn btn-red"
                      onClick={() =>
                        history.push("/app/merchants/pending/profile")
                      }
                    >
                      BACK
                    </Button>
                    <Button
                      type="submit"
                      className="btn btn-green"
                      disabled={initValue.isSubmitting}
                    >
                      {initValue.isSubmitting && (
                        <CircularProgress
                          style={{ color: "white", marginRight: "8px" }}
                          size={15}
                          thickness={4}
                        />
                      )}
                      SAVE
                    </Button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  GET_MERCHANT_BY_ID: (payload) => {
    dispatch(GET_MERCHANT_BY_ID(payload));
  },
});

export default withRouter(connect(null, mapDispatchToProps)(EditPrincipal));
const styles = {
  label: { paddingTop: "10px" },
  div: {
    marginTop: "10px",
    textAlign: "left",
  },
  image: {
    width: "250px",
    height: "200px",
  },
  imageInput: {
    border: "none",
    marginTop: "10px",
  },
  addBtn: {
    color: "#4251af",
    fontWeight: "500",
    padding: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
