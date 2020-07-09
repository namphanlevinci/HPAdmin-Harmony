import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { store } from "react-notifications-component";
import { config } from "../../../../url/url";

import Button from "@material-ui/core/Button";
import PhoneInput from "react-phone-input-2";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import Select from "react-select";
import selectState from "../../../../util/selectState";
import axios from "axios";
import * as Yup from "yup";
import ErrorMessage from "./errorMessage";
// import MaskedInput from "react-text-mask";
import LinearProgress from "../../../../util/linearProgress";
import formatPhone from "../../../../util/formatPhone";

import "./MerchantReqProfile.css";
// import "./MerchantsRequest.css";
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
      fullSsn: Yup.string().required("Required"),
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
  principals,
  getData,
  initValue,
  token,
  ViewMerchant_Request,
  history,
}) => {
  const getMerchantById = (ID) => {
    axios
      .get(URL + "/merchant/" + ID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (Number(res.data.codeNumber) === 200) {
          ViewMerchant_Request(res.data.data);
          history.push("/app/merchants/pending/profile");
        }
      });
  };

  // const formatPhone = (Phone) => {
  //   return Phone.replace(/(\d{4})(\d{3})(\d{4})/, "+$1-$2-$3");
  // };

  // const principalPhone = (Phone) => {
  //   if (Phone?.startsWith("1") || Phone?.startsWith("84")) {
  //     return Phone?.replace(/[{( )}]/g, "")?.replace(
  //       /(\d{5})\?(\d{3})\?(\d{4})/,
  //       "+$1-$2-$3"
  //     );
  //   }
  // };

  const editMerchant = (principalInfo) => {
    let PrincipalInfo = principalInfo.PrincipalInfo;
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
        businessPhone: formatPhone(initValue?.phoneBusiness),
        email: initValue?.emailContact,
        firstName: initValue?.firstName,
        lastName: initValue?.lastName,
        position: initValue?.title,
        contactPhone: formatPhone(initValue?.phoneContact),
        businessHourEnd: "11:00 PM",
        businessHourStart: "10:00 AM",
      },
      businessInfo: {},
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

    axios
      .put(URL + `/merchant/${initValue?.ID}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if ((res.status = 200)) {
          store.addNotification({
            title: "Success!",
            message: `${res.data.message}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });
          setTimeout(() => {
            getMerchantById(`${initValue?.ID}`);
          }, 1000);
        } else {
          store.addNotification({
            title: "ERROR!",
            message: "Something went wrong",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
            width: 250,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Formik
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={{ PrincipalInfo: principals }}
        onSubmit={(values) => editMerchant(values)}
        render={({ values, setFieldValue, submitForm }) => (
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
                        const birthDate = moment(
                          PrincipalInfo?.birthDate
                        ).format("MM/DD/YYYY");
                        const SSN = PrincipalInfo?.fullSsn;
                        const stateName = PrincipalInfo?.state?.name;
                        return (
                          <div key={index} className="row ">
                            <div className="col-12">
                              <h3
                                style={{
                                  color: "#4251af",
                                  fontWeight: "400",
                                  float: "left",
                                  marginTop: "10px",
                                }}
                              >
                                Principal {index + 1}
                              </h3>
                            </div>
                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>First Name</label>
                              <Field
                                // className="form-control"
                                placeholder="First Name"
                                name={`PrincipalInfo.${index}.firstName`}
                                values={`PrincipalInfo.${index}.firstName`}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.firstName`}
                              />
                            </div>
                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>Last Name</label>
                              <Field
                                // className="form-control"
                                placeholder="First Name"
                                name={`PrincipalInfo.${index}.lastName`}
                                values={`PrincipalInfo.${index}.lastName`}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.lastName`}
                              />
                            </div>
                            <div
                              className="col-4"
                              style={{ textAlign: "left" }}
                            >
                              <label>Title</label>
                              <Field
                                // className="form-control"
                                placeholder="First Name"
                                name={`PrincipalInfo.${index}.title`}
                                values={`PrincipalInfo.${index}.title`}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.title`}
                              />
                            </div>
                            <div className="col-4" style={styles.div}>
                              <label>Ownership (%)</label>
                              <Field
                                // className="form-control"
                                placeholder="Ownership (%)"
                                name={`PrincipalInfo.${index}.ownerShip`}
                                values={`PrincipalInfo.${index}.ownerShip`}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.ownerShip`}
                              />
                            </div>

                            <div className="col-4" style={styles.div}>
                              <label>Address</label>
                              <Field
                                // className="form-control"
                                placeholder="Address"
                                name={`PrincipalInfo.${index}.address`}
                                values={`PrincipalInfo.${index}.address`}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.address`}
                              />
                            </div>

                            <div className="col-4" style={styles.div}>
                              <label>Social Security Number (SSN)*</label>
                              <Field
                                // className="form-control"
                                placeholder="SSN"
                                name={`PrincipalInfo.${index}.ssn`}
                                values={SSN}
                                maxLength="9"
                              />
                              {/* 
                            <MaskedInput
                              mask={[
                                /[1-9]/,
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                              ]}
                              value={`PrincipalInfo.${index}.fullSsn`}
                              name={`PrincipalInfo.${index}.fullSsn`}
                              onChange={(e) => [
                                setFieldValue(
                                  `principalInfo.${index}.fullSsn`,
                                  e.target.value
                                ),
                              ]}
                            /> */}

                              <ErrorMessage
                                name={`PrincipalInfo.${index}.fullSsn`}
                              />
                            </div>

                            <div className="col-4" style={styles.div}>
                              <label>Home Phone</label>
                              <PhoneInput
                                // className="form-control "
                                placeholder="Home Phone"
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
                            </div>
                            <div className="col-4" style={styles.div}>
                              <label>Mobile Phone</label>
                              <PhoneInput
                                placeholder="Home Phone"
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
                            </div>
                            <div className="col-4" style={styles.div}>
                              <label>Email Address *</label>
                              <Field
                                // className="form-control"
                                placeholder="Address"
                                name={`PrincipalInfo.${index}.email`}
                                values={`PrincipalInfo.${index}.email`}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.email`}
                              />
                            </div>

                            <div className="col-4" style={{ marginTop: "5px" }}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="flex-start">
                                  <label>Date of Birth (mm/dd/yyyy)</label>
                                  <KeyboardDatePicker
                                    style={{ marginTop: "0px" }}
                                    margin="normal"
                                    // id="date-picker-dialog"
                                    // label="Birthday (MM/DD/YYYY)"
                                    format="MM/dd/yyyy"
                                    value={birthDate}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `PrincipalInfo.${index}.birthDate`,
                                        moment(e).format("YYYY-MM-DD")
                                      )
                                    }
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                  />
                                </Grid>
                              </MuiPickersUtilsProvider>
                            </div>
                            <div className="col-4" style={styles.div}>
                              <label>Driver License Number*</label>
                              <Field
                                // className="form-control"
                                placeholder="Driver License Number*"
                                name={`PrincipalInfo.${index}.driverNumber`}
                                values={`PrincipalInfo.${index}.driverNumber`}
                              />
                              <ErrorMessage
                                name={`PrincipalInfo.${index}.driverNumber`}
                              />
                            </div>

                            <div className="col-4" style={styles.div}>
                              <label>State</label>
                              <div>
                                <Select
                                  // value={this.state.state}
                                  onChange={(e) =>
                                    setFieldValue(
                                      `PrincipalInfo.${index}.stateId`,
                                      e.value
                                    )
                                  }
                                  name={`PrincipalInfo.${index}.stateId`}
                                  options={selectState}
                                  defaultValue={{
                                    value: `PrincipalInfo.${index}.stateId`,
                                    label: stateName,
                                  }}
                                />
                                <ErrorMessage
                                  name={`PrincipalInfo.${index}.stateId`}
                                />
                              </div>
                            </div>

                            <div
                              className="col-3"
                              style={{ paddingTop: "10px", textAlign: "left" }}
                            >
                              <label style={{ paddingBottom: "10px" }}>
                                Void Check*
                              </label>{" "}
                              <br />
                              {/* {$imagePreview} */}
                              <img
                                className="pending-image"
                                // style={styles.image}
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
                                // id="file"
                                onChange={(e, name) => [
                                  getData(
                                    e,
                                    setFieldValue,
                                    `PrincipalInfo.${index}.fileId`
                                  ),
                                ]}
                              />
                            </div>
                            <hr />
                          </div>
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
                    <Button type="submit" className="btn btn-green">
                      SAVE
                    </Button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  );
};

export default EditPrincipal;

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
