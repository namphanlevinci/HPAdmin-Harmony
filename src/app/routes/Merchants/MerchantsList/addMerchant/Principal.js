import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, FieldArray } from "formik";
import axios from "axios";
import { upfileUrl } from "../../../../../url/url";
import defaultImage from "./hpadmin2.png";
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
        console.log("RES IMAGE", res);
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

    return (
      <div className="principal-container">
        <Formik
          // enableReinitialize={true}
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
          onSubmit={values =>
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500)
          }
          render={({ values }) => (
            <Form className="principal-form">
              <FieldArray
                name="principalInfo"
                render={arrayHelpers => (
                  <div>
                    {values.principalInfo && values.principalInfo.length > 0 ? (
                      values.principalInfo.map((friend, index) => (
                        <div key={index}>
                          <h2>Prinncipal Information</h2>
                          <div className="row align-items-center justify-content-center">
                            <div className="col-4">
                              <h4>First Name</h4>
                              <Field
                                placeholder="Doe"
                                name={`principalInfo.${index}.firstName`}
                                values={`principalInfo.${index}.firstName`}
                              />
                            </div>
                            <div className="col-4">
                              <h4>Last Name</h4>
                              <Field
                                name={`principalInfo.${index}.lastName`}
                                placeholder="Last name"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Position</h4>
                              <Field
                                name={`principalInfo.${index}.position`}
                                placeholder="Position"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Ownership</h4>
                              <Field
                                name={`principalInfo.${index}.ownership`}
                                placeholder="Ownership"
                                type="number"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Home Phone</h4>
                              <Field
                                name={`principalInfo.${index}.homePhone`}
                                placeholder="Home Phone"
                                type="number"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Mobile Phone</h4>
                              <Field
                                name={`principalInfo.${index}.mobilePhone`}
                                placeholder="Mobile Phone"
                                type="number"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Address</h4>
                              <Field
                                name={`principalInfo.${index}.addressPrincipal.address`}
                                placeholder="address"
                              />
                            </div>

                            <div className="col-4">
                              <h4>City</h4>
                              <Field
                                name={`principalInfo.${index}.addressPrincipal.city`}
                                placeholder="city"
                              />
                            </div>
                            <div className="col-4">
                              <h4>State</h4>
                              <Field
                                name={`principalInfo.${index}.addressPrincipal.state`}
                                placeholder="state"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Zip</h4>
                              <Field
                                name={`principalInfo.${index}.addressPrincipal.zip`}
                                placeholder="zip"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Social security Number (SSN)</h4>
                              <Field
                                name={`principalInfo.${index}.ssn`}
                                placeholder="ssn"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Date of Birth (mm/dd/yyyy)</h4>
                              <Field
                                name={`principalInfo.${index}.dateOfBirth`}
                                placeholder="dateOfBirth"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Email Address*</h4>
                              <Field
                                name={`principalInfo.${index}.email`}
                                placeholder="email"
                              />
                            </div>
                            <div className="col-4">
                              <h4>Driver License Number*</h4>
                              <Field
                                name={`principalInfo.${index}.driverLicense`}
                                placeholder="driverLicense"
                              />
                            </div>
                            <div className="col-4">
                              <h4>State Issued*</h4>
                              <Field
                                name={`principalInfo.${index}.stateIssued`}
                                placeholder="stateIssued"
                              />
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
                          <a
                            className="add-remove-principal"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            - Remove Principal
                          </a>
                          {values.principalInfo.length >= 2 ? null : (
                            <a
                              className="add-remove-principal"
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                            >
                              + Add Principal
                            </a>
                          )}
                        </div>
                      ))
                    ) : (
                      <a
                        className="add-remove-principal"
                        onClick={() => arrayHelpers.push("")}
                      >
                        + Add Principal
                      </a>
                    )}
                    {/* <div>
                      <button type="submit">Submit</button>
                    </div> */}
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
