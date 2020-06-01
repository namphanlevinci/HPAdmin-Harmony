import React, { Component } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import URL, { upFileUrl } from "../../../../../url/url";
import { store } from "react-notifications-component";
import { IoIosClose } from "react-icons/io";
import {
  MuiPickersUtilsProvider,
  // KeyboardDatePicker,
} from "@material-ui/pickers";
// import { DatePicker } from "@material-ui/pickers";

import { KeyboardDatePicker } from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import axios from "axios";
import defaultImage from "./hpadmin2.png";
import ErrorMessage from "../../MerchantProfile/Detail/Service/error-message";
import Button from "@material-ui/core/Button";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";

import Select from "react-select";
import selectState from "../../../../../util/selectState";
import MaskedInput from "react-text-mask";

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

  formatPhone = (Phone) => {
    if (Phone.startsWith("1")) {
      return Phone.replace(/[{( )}]/g, "").replace(
        /(\d{4})\-?(\d{3})\-?(\d{4})/,
        "+$1-$2-$3"
      );
    }
    if (Phone.startsWith("84"))
      return Phone.replace(/[{( )}]/g, "").replace(
        /(\d{5})\-?(\d{3})\-?(\d{4})/,
        "+$1-$2-$3"
      );
  };

  render() {
    const countryCode = [
      { value: "+1", label: "+1" },
      { value: "+84", label: "+84" },
    ];
    // ValidationSchema
    const validationSchema = Yup.object().shape({
      principalInfo: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          position: Yup.string().required("Required"),
          ownership: Yup.string().required("Required"),
          // homePhone: Yup.string().required("Required"),
          mobilePhone: Yup.string().required("Required"),
          // yearAtThisAddress: Yup.string().required("Required"),
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
            enableReinitialize={true}
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
                  dateOfBirth: new Date(),
                  email: "",
                  driverLicense: "",
                  stateIssued: "",
                  fileId: "",
                },
              ],
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.props.handleNext();
              this.props.setDataPrincipal(values?.principalInfo);
            }}
            render={({ values, setFieldValue, isSubmitting }) => (
              <Form className="principal-form">
                <FieldArray
                  name="principalInfo"
                  render={(arrayHelpers) => (
                    <div>
                      <h1 style={{ color: "#4251af" }}>
                        Principal Information
                      </h1>
                      {values.principalInfo &&
                      values.principalInfo.length > 0 ? (
                        values.principalInfo.map((principal, index) => {
                          const PrincipalImage = principal?.imageUrl;
                          return (
                            <div key={index}>
                              <div className="row align-items-center justify-content-center add-merchant-div">
                                <div className="col-12 add-merchant-title">
                                  <h2 style={{ color: "rgb(66, 81, 175)" }}>
                                    Principal {index + 1}
                                  </h2>
                                  {index === 1 ? (
                                    <IoIosClose
                                      size={32}
                                      onClick={() => arrayHelpers.remove(index)}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    />
                                  ) : null}
                                </div>

                                <div className="col-4">
                                  <label>First Name</label>
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
                                  <label>Last Name</label>
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
                                  <label>Position</label>
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
                                  <label style={{ marginTop: "10px" }}>
                                    Ownership
                                  </label>
                                  <Field
                                    style={{ marginTop: "10px" }}
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
                                    // style={{ marginTop: "10px" }}
                                    country={"us"}
                                    placeholder="Home Phone Number"
                                    name={`principalInfo.${index}.mobilePhone`}
                                    value={values.homePhone}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.homePhone`,
                                        this.formatPhone(e)
                                      )
                                    }
                                  />
                                  {/* <div
                                    className="row form-group"
                                    style={{ marginTop: "10px" }}
                                  >
                                    <div className="col-5">
                                      <label> Code</label>
                                      <Select
                                        options={countryCode}
                                        defaultValue={{
                                          label: "+1",
                                        }}
                                        name="businessPhoneCode"
                                        // onChange={handleCountryCode}
                                      />
                                    </div>
                                    <div
                                      className="col-7"
                                      style={styles.phoneInput}
                                    >
                                      <label>Home Phone</label>
                                      <MaskedInput
                                        mask={[
                                          /[1-9]/,
                                          /\d/,
                                          /\d/,
                                          "-",
                                          /\d/,
                                          /\d/,
                                          /\d/,
                                          "-",
                                          /\d/,
                                          /\d/,
                                          /\d/,
                                          /\d/,
                                        ]}
                                        className="form-control"
                                        style={{ padding: "8px 0px" }}
                                        guide={false}
                                        name={`principalInfo.${index}.mobilePhone`}
                                        onChange={(e) =>
                                          setFieldValue(
                                            `principalInfo.${index}.homePhone`,
                                            e
                                          )
                                        }
                                      />
                                    </div>
                                  </div> */}
                                </div>
                                <div className="col-4">
                                  <label>Mobile Phone</label>
                                  <PhoneInput
                                    // style={{ marginTop: "10px" }}
                                    country={"us"}
                                    placeholder="Business Phone Number"
                                    name={`principalInfo.${index}.mobilePhone`}
                                    value={values.mobilePhone}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.mobilePhone`,
                                        this.formatPhone(e)
                                      )
                                    }
                                  />
                                  {/* <div
                                    className="row form-group"
                                    style={{ marginTop: "10px" }}
                                  >
                                    <div className="col-5">
                                      <label> Code</label>
                                      <Select
                                        options={countryCode}
                                        defaultValue={{
                                          label: "+1",
                                        }}
                                        name="businessPhoneCode"
                                        // onChange={handleCountryCode}
                                      />
                                    </div>
                                    <div
                                      className="col-6"
                                      style={styles.phoneInput}
                                    >
                                      <label>Mobile Phone</label>
                                      <MaskedInput
                                        mask={[
                                          /[1-9]/,
                                          /\d/,
                                          /\d/,
                                          "-",
                                          /\d/,
                                          /\d/,
                                          /\d/,
                                          "-",
                                          /\d/,
                                          /\d/,
                                          /\d/,
                                          /\d/,
                                        ]}
                                        className="form-control"
                                        style={{ padding: "8px 0px" }}
                                        guide={false}
                                        name={`principalInfo.${index}.mobilePhone`}
                                        onChange={(e) =>
                                          setFieldValue(
                                            `principalInfo.${index}.mobilePhone`,
                                            e
                                          )
                                        }
                                      />
                                    </div>
                                  </div> */}

                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.mobilePhone`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <label>Address</label>
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
                                  <label>City</label>
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
                                  <label>State</label>
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
                                  <label>Zip</label>
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
                                  <label>Social security Number (SSN)</label>
                                  {/* <Field
                                    name={`principalInfo.${index}.ssn`}
                                    values={`principalInfo.${index}.ssn`}
                                    placeholder="SSN"
                                  /> */}
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
                                    // className="form-control"
                                    // style={{ padding: "8px 0px" }}
                                    guide={false}
                                    values={`principalInfo.${index}.ssn`}
                                    name={`principalInfo.${index}.ssn`}
                                    onChange={(e) => [
                                      e.persist(),
                                      setFieldValue(
                                        `principalInfo.${index}.ssn`,
                                        e.target.value
                                      ),
                                      // console.log("e", e.target.value),
                                    ]}
                                  />
                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.ssn`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <label>Date of Birth (mm/dd/yyyy)</label>
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
                                  <label>Email Address*</label>
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
                                  <label>Driver License Number*</label>
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
                                  <label>State Issued*</label>
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
                                    <label style={{ marginBottom: "10px" }}>
                                      Driver License Picture*
                                    </label>
                                    <br />
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
                                        className="custom-input"
                                        style={{
                                          width: "26%",
                                          marginTop: "10px",
                                        }}
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
                                  </div>
                                </div>
                              </div>
                              <div style={{ display: "flex" }}>
                                {values.principalInfo.length >= 2 ? null : (
                                  <p
                                    className="add-remove-principal"
                                    onClick={() => arrayHelpers.insert(1, "")} // insert an empty string at a position
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
                          + Add Principal 222
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
const styles = {
  phoneInput: {
    padding: "0px 0px",
    // marginTop: "3px",
  },
};
