import React, { Component } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import URL, { upFileUrl } from "../../../../../url/url";
import { store } from "react-notifications-component";
import { IoIosClose } from "react-icons/io";

import axios from "axios";
import defaultImage from "./hpadmin2.png";
import ErrorMessage from "../../MerchantProfile/Detail/Service/error-message";
import Button from "@material-ui/core/Button";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";

import Select from "react-select";
import selectState from "../../../../../util/selectState";

import "react-phone-input-2/lib/high-res.css";

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileId: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("reloading");
  }

  _handleImageChange = (e, setFieldValue, name) => {
    e.stopPropagation();
    e.preventDefault();
    let reader = new FileReader();

    const previewImage =
      name === "principalInfo.0.fileId"
        ? "principalInfo.0.imageUrl"
        : "principalInfo.1.imageUrl";

    // console.log("name", name);

    const file = e.target.files[0];
    reader.onloadend = () => {
      setFieldValue(previewImage, reader.result);
    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("Filename3", file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(upFileUrl, formData, config)
      .then((res) => {
        setFieldValue(name, res.data.data.fileId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    // console.log("niggaaaaaaaa");
    // ValidationSchema
    let validationSchema = Yup.object().shape({
      principalInfo: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          position: Yup.string().required("Required"),
          ownership: Yup.string().required("Required"),
          // homePhone: Yup.string().required("Required"),
          mobilePhone: Yup.string().required("Required"),
          yearAtThisAddress: Yup.string().required("Required"),
          ssn: Yup.string().required("Required"),
          dateOfBirth: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          driverLicense: Yup.string().required("Required"),
          stateIssued: Yup.string().required("Required"),
          fileId: Yup.string().required("Required"),

          addressPrincipal: Yup.object().shape({
            address: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            state: Yup.string().required("Required"),
            zip: Yup.string().required("Required"),
          }),
        })
      ),
    });

    return (
      <div className="principal-container">
        {this.state.loading && (
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
                    zip: "",
                  },
                  yearAtThisAddress: 0,
                  ssn: "",
                  dateOfBirth: "",
                  email: "",
                  driverLicense: "",
                  stateIssued: "",
                  fileId: "",
                },
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
                    zip: "",
                  },
                  yearAtThisAddress: 0,
                  ssn: "",
                  dateOfBirth: "",
                  email: "",
                  driverLicense: "",
                  stateIssued: "",
                  fileId: "",
                },
              ],
            }}
            onSubmit={(values, { setSubmitting }) => {
              // console.log("THIS SUPER STATE", this.props.Info);
              this.props.handleNext();
              this.props.setDataPrincipal(values?.principalInfo);
            }}
            render={({ values, setFieldValue }) => (
              <Form className="principal-form">
                <FieldArray
                  name="principalInfo"
                  render={(arrayHelpers) => (
                    <div>
                      {values.principalInfo &&
                      values.principalInfo.length > 0 ? (
                        values.principalInfo.map((principal, index) => {
                          const PrincipalImage = principal?.imageUrl;
                          return (
                            <div key={index}>
                              <h1 style={{ color: "#4251af" }}>
                                Principal Information
                              </h1>
                              <div className="row align-items-center justify-content-center add-merchant-div">
                                <div className="col-12 add-merchant-title">
                                  <IoIosClose
                                    size={32}
                                    onClick={() => arrayHelpers.remove(index)}
                                    style={{
                                      cursor: "pointer",
                                      position: "absolute",
                                    }}
                                  />
                                </div>
                                <div className="col-4">
                                  <h4>First Name</h4>
                                  <Field
                                    placeholder="First Name"
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
                                    placeholder="Last Name"
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
                                  <label>Ownership</label>
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
                                  <label>Home Phone</label>
                                  <PhoneInput
                                    style={{ marginTop: "10px" }}
                                    country={"us"}
                                    placeholder="Home Phone Number"
                                    name={`principalInfo.${index}.mobilePhone`}
                                    value={values.homePhone}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.homePhone`,
                                        e
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-4">
                                  <h4>Mobile Phone</h4>
                                  <PhoneInput
                                    style={{ marginTop: "10px" }}
                                    country={"us"}
                                    placeholder="Business Phone Number"
                                    name={`principalInfo.${index}.mobilePhone`}
                                    value={values.mobilePhone}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.mobilePhone`,
                                        e
                                      )
                                    }
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
                                  <Select
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.addressPrincipal.state`,
                                        e.value
                                      )
                                    }
                                    name={`principalInfo.${index}.addressPrincipal.state`}
                                    options={selectState}
                                  />

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
                                  <Select
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.stateIssued`,
                                        e.value
                                      )
                                    }
                                    name={`principalInfo.${index}.stateIssued`}
                                    options={selectState}
                                  />
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
                                      {PrincipalImage ? (
                                        <div
                                          className="driver-image"
                                          style={{
                                            backgroundImage: `url("${PrincipalImage}")`,
                                          }}
                                        />
                                      ) : (
                                        <div
                                          className="driver-image"
                                          style={{
                                            backgroundImage: `url("${defaultImage}")`,
                                          }}
                                        />
                                      )}

                                      <div className="input-feedback">
                                        <ErrorMessage
                                          name={`principalInfo.${index}.fileId`}
                                        />
                                      </div>
                                      <input
                                        type="file"
                                        className="upload"
                                        name={`principalInfo.${index}.fileId`}
                                        onChange={(e) =>
                                          this._handleImageChange(
                                            e,
                                            setFieldValue,
                                            `principalInfo.${index}.fileId`
                                          )
                                        }
                                      />
                                    </div>
                                    {}
                                  </div>
                                </div>
                              </div>
                              <div style={{ display: "flex" }}>
                                {/* <p
                                  className="add-remove-principal"
                                  onClick={() => arrayHelpers.remove(index)} // remove a principal from the list
                                >
                                  - Remove Principal
                                </p> */}
                                {values.principalInfo.length >= 2 ? null : (
                                  <p
                                    className="add-remove-principal"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    } // insert an empty string at a position
                                  >
                                    + Add Principal
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p
                          href={null}
                          className="add-remove-principal"
                          onClick={() => [arrayHelpers.push("")]}
                        >
                          + Add Principal
                        </p>
                      )}
                      <div style={{ marginTop: "15px" }}>
                        <Button
                          onClick={() => this.props.handleBack()}
                          className="btn btn-red"
                          style={{ color: "black" }}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="btn btn-red"
                          style={{ backgroundColor: "#4251af", color: "white" }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </Form>
            )}
          />
        )}
      </div>
    );
  }
}

export default Principal;
