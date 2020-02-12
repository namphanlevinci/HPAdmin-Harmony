import React, { Component } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { upfileUrl } from "../../../../../url/url";

import axios from "axios";
import defaultImage from "./hpadmin2.png";
import ErrorMessage from "../../MerchantProfile/Detail/Service/error-message";
import Button from "@material-ui/core/Button";

import * as Yup from "yup";

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: "",
      fileId: ""
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
          onSubmit={
            (values, { resetForm }) => [
              console.log("VALUES", values),
              this.props.handlePrincipal(values),
              resetForm({})
            ]

            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            // }, 500)
          }
          render={({ values }) => (
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
                              <Field
                                name={`principalInfo.${index}.addressPrincipal.state`}
                                values={`principalInfo.${index}.addressPrincipal.state`}
                                placeholder="State"
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
                              <h4>Date of Birth (mm/dd/yyyy)</h4>
                              <Field
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
                              <Field
                                name={`principalInfo.${index}.stateIssued`}
                                values={`principalInfo.${index}.stateIssued`}
                                placeholder="State"
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
                                <div class="Upload">
                                  {$imagePreview}
                                  <input
                                    type="file"
                                    class="upload"
                                    onChange={e => this._handleImageChange(e)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <p
                            className="add-remove-principal"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            - Remove Principal
                          </p>
                          {values.principalInfo.length >= 2 ? null : (
                            <p
                              className="add-remove-principal"
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                            >
                              + Add Principal
                            </p>
                          )}
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
