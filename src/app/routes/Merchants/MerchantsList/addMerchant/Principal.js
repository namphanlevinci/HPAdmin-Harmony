import React, { Component } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import URL, { upfileUrl } from "../../../../../url/url";
import { store } from "react-notifications-component";

import axios from "axios";
import defaultImage from "./hpadmin2.png";
import ErrorMessage from "../../MerchantProfile/Detail/Service/error-message";
import Button from "@material-ui/core/Button";
import StateID from "../../../../../util/getState";

import * as Yup from "yup";

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: "",
      fileId: 0
    };
  }

  _handleImageChange = e => {
    e.stopPropagation();
    e.preventDefault();

    let reader = new FileReader();

    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    axios
      .post(upfileUrl, formData, config)
      .then(res => {
        // console.log("RES IMAGE", res);
        this.setState({ fileId: res.data.data.fileId });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <div>
          <div
            className="driver-image"
            style={{ backgroundImage: `url("${imagePreviewUrl}")` }}
          />
        </div>
      );
    } else {
      $imagePreview = (
        <div
          className="driver-image"
          style={{ backgroundImage: `url("${defaultImage}")` }}
        ></div>
      );
    }
    console.log("AM I GETTING RE-RENDER");

    // ValidationSchema
    const validationSchema = Yup.object().shape({
      principalInfo: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          position: Yup.string().required("Required"),
          ownership: Yup.string().required("Required"),
          homePhone: Yup.string().required("Required"),
          mobilePhone: Yup.string().required("Required"),
          yearAtThisAddress: Yup.string().required("Required"),
          ssn: Yup.string().required("Required"),
          dateOfBirth: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          driverLicense: Yup.string().required("Required"),
          stateIssued: Yup.string().required("Required"),

          addressPrincipal: Yup.object().shape({
            address: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            state: Yup.string().required("Required"),
            zip: Yup.string().required("Required")
          })
        })
      )
    });

    return (
      <div className="principal-container">
        <Formik
          // enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={{
            principalInfo: [
              {
                firstName: "",
                lastName: "",
                position: "",
                ownership: "",
                homePhone: "",
                mobilePhone: "",
                addressPrincipal: {
                  address: "",
                  city: "",
                  state: "",
                  zip: ""
                },
                yearAtThisAddress: 0,
                ssn: "",
                dateOfBirth: "",
                email: "",
                driverLicense: "",
                stateIssued: "",
                fileId: this.state.fileId
              }
            ]
          }}
          onSubmit={(values, { setSubmitting }) => {
            // console.log("VALUES", values);
            // console.log("THIS SUPER STATE", this.props.Info);

            const data = this.props.Info;
            axios
              .post(URL + "/merchant", {
                generalInfo: {
                  businessName: data?.businessName,
                  doingBusiness: data?.doingBusiness,
                  tax: data?.tax,
                  businessAddress: {
                    address: data?.address,
                    city: data?.city,
                    state: data?.state,
                    zip: data?.zip
                  },
                  businessPhone: data?.businessPhoneCode + data?.businessPhone,
                  email: data?.email,
                  firstName: data?.firstName,
                  lastName: data?.lastName,
                  position: data?.position,
                  contactPhone: data?.contactPhoneCode + data?.contactPhone
                },
                businessInfo: {
                  question1: {
                    isAccept: data?.isAccept1,
                    desc: "",
                    question: data?.question1
                  },
                  question2: {
                    isAccept: data?.isAccept2,
                    desc: "",
                    question: data?.question2
                  },
                  question3: {
                    isAccept: data?.isAccept3,
                    desc: "",
                    question: data?.question3
                  },
                  question4: {
                    isAccept: data?.isAccept4,
                    desc: "",
                    question: data?.question4
                  },
                  question5: {
                    isAccept: data?.isAccept5,
                    desc: "",
                    question: data?.question5
                  }
                },
                bankInfo: {
                  bankName: data?.bankName,
                  routingNumber: data?.routingNumber,
                  accountNumber: data?.accountNumber,
                  fileId: data?.fileId
                },
                principalInfo: values?.principalInfo
              })
              .then(res => {
                console.log("RESULT ADD MERCHANT", res);

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
                      onScreen: true
                    },
                    width: 250
                  });
                  setTimeout(() => {
                    this.props.history.push("/app/merchants/list");
                  }, 1500);
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
                      onScreen: true
                    },
                    width: 250
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
          }}
          render={({ values, setFieldValue }) => (
            <Form className="principal-form">
              <FieldArray
                name="principalInfo"
                render={arrayHelpers => (
                  <div>
                    {values.principalInfo && values.principalInfo.length > 0 ? (
                      values.principalInfo.map((principal, index) => (
                        <div key={index}>
                          <h2>Prinncipal Information</h2>
                          <div className="row align-items-center justify-content-center">
                            <div className="col-4">
                              <h4>First Name</h4>
                              <Field
                                placeholder="First name"
                                name={`principalInfo.${index}.firstName`}
                                values={`principalInfo.${index}.firstName`}
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.firstName`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Last Name</h4>
                              <Field
                                name={`principalInfo.${index}.lastName`}
                                values={`principalInfo.${index}.lastName`}
                                placeholder="Last name"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.lastName`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Position</h4>
                              <Field
                                name={`principalInfo.${index}.position`}
                                values={`principalInfo.${index}.position`}
                                placeholder="Position"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.position`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Ownership</h4>
                              <Field
                                name={`principalInfo.${index}.ownership`}
                                values={`principalInfo.${index}.ownership`}
                                placeholder="Ownership (%)"
                                type="number"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.ownership`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Home Phone</h4>
                              <Field
                                name={`principalInfo.${index}.homePhone`}
                                values={`principalInfo.${index}.homePhone`}
                                placeholder="Home Phone"
                                type="number"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.homePhone`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Mobile Phone</h4>
                              <Field
                                name={`principalInfo.${index}.mobilePhone`}
                                placeholder="Mobile Phone"
                                type="number"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.mobilePhone`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Address</h4>
                              <Field
                                name={`principalInfo.${index}.addressPrincipal.address`}
                                values={`principalInfo.${index}.addressPrincipal.address`}
                                placeholder="Address"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.addressPrincipal.address`}
                                />
                              </div>
                            </div>

                            <div className="col-4">
                              <h4>City</h4>
                              <Field
                                name={`principalInfo.${index}.addressPrincipal.city`}
                                values={`principalInfo.${index}.addressPrincipal.city`}
                                placeholder="City"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.addressPrincipal.city`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>State</h4>

                              <select
                                name={`principalInfo.${index}.addressPrincipal.state`}
                                style={{ padding: "11px", width: "100%" }}
                                onChange={e =>
                                  setFieldValue(
                                    `principalInfo.${index}.addressPrincipal.state`,
                                    e.target.value
                                  )
                                }
                              >
                                <StateID />
                              </select>
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.addressPrincipal.state`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Zip</h4>
                              <Field
                                name={`principalInfo.${index}.addressPrincipal.zip`}
                                values={`principalInfo.${index}.addressPrincipal.zip`}
                                placeholder="Zip"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.addressPrincipal.zip`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Social security Number (SSN)</h4>
                              <Field
                                name={`principalInfo.${index}.ssn`}
                                values={`principalInfo.${index}.ssn`}
                                placeholder="SSN"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.ssn`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Date of Birth</h4>
                              <Field
                                type="date"
                                name={`principalInfo.${index}.dateOfBirth`}
                                values={`principalInfo.${index}.dateOfBirth`}
                                placeholder="MM/DD/YYYY"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.dateOfBirth`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Email Address*</h4>
                              <Field
                                name={`principalInfo.${index}.email`}
                                values={`principalInfo.${index}.email`}
                                placeholder="Email"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.email`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>Driver License Number*</h4>
                              <Field
                                name={`principalInfo.${index}.driverLicense`}
                                values={`principalInfo.${index}.driverLicense`}
                                placeholder="Driver License"
                              />
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.driverLicense`}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <h4>State Issued*</h4>
                              <select
                                name={`principalInfo.${index}.stateIssued`}
                                style={{ padding: "11px", width: "100%" }}
                                onChange={e =>
                                  setFieldValue(
                                    `principalInfo.${index}.stateIssued`,
                                    e.target.value
                                  )
                                }
                              >
                                <StateID />
                              </select>
                              <div className="input-feedback">
                                <ErrorMessage
                                  name={`principalInfo.${index}.stateIssued`}
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="form-group">
                                <h4>
                                  Driver License Picture* <br />
                                </h4>
                                <div className="Upload">
                                  {$imagePreview}
                                  <input
                                    type="file"
                                    className="upload"
                                    onChange={e => this._handleImageChange(e)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <p
                            className="add-remove-principal"
                            onClick={() => arrayHelpers.remove(index)} // remove a principal from the list
                          >
                            - Remove Principal
                          </p>
                          {values.principalInfo.length >= 2 ? null : (
                            <p
                              className="add-remove-principal"
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                            >
                              + Add Principal
                            </p> */}
                          {/* )} */}
                        </div>
                      ))
                    ) : (
                      <p
                        href={null}
                        className="add-remove-principal"
                        onClick={() => arrayHelpers.push("")}
                      >
                        + Add Principal
                      </p>
                    )}
                    <div style={{ marginTop: "15px" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#0764b0", color: "white" }}
                      >
                        Submit
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
  }
}

export default Principal;
