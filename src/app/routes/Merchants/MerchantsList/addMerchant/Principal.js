import React, { Component } from "react";
import { Formik, Form, FieldArray } from "formik";
import { config } from "../../../../../url/url";
import { IoIosClose } from "react-icons/io";

import axios from "axios";
import defaultImage from "./hpadmin2.png";
import ErrorMessage from "../../MerchantProfile/Detail/Service/error-message";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import TextField from "@material-ui/core/TextField";
import LinearIndeterminate from "../../../../../util/linearProgress";
import InputCustom from "./custom-input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import CustomStateSelect from "../../../../../util/CustomStateSelect";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "nprogress/nprogress.css";
import "react-placeholder/lib/reactPlaceholder.css";

const upFile = config.url.upFile;

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileId: 0,
      loading: false,
      progress: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
  }

  handleUploadImage = (e, setFieldValue, name) => {
    e.stopPropagation();
    e.preventDefault();

    const previewImage =
      name === "principalInfo.0.fileId"
        ? "principalInfo.0.imageUrl"
        : "principalInfo.1.imageUrl";

    const file = e?.target?.files[0];

    if (!file?.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.props.warningNotify(
        "Image type is not supported, Please choose another image "
      );
    } else {
      this.setState({ progress: true });
      let formData = new FormData();
      formData.append("Filename3", file);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post(upFile, formData, config)
        .then((res) => {
          setFieldValue(name, res.data.data.fileId);
          let reader = new FileReader();
          reader.onloadend = () => {
            setFieldValue(previewImage, reader.result);
          };
          reader.readAsDataURL(file);
          this.setState({ progress: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    // ValidationSchema
    const validationSchema = Yup.object().shape({
      principalInfo: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string().required("First Name cannot be empty!"),
          lastName: Yup.string().required("Required"),
          position: Yup.string().required("Required"),
          ownership: Yup.string().required("Required"),
          mobilePhone: Yup.string().required("Required"),
          ssn: Yup.string().required("Required"),
          dateOfBirth: Yup.string()
            .required("Please Enter Birth date")
            .nullable(),
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
            initialValues={
              // this.props.Info.principalInfo
              {
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
                    dateOfBirth: null,
                    email: "",
                    driverLicense: "",
                    stateIssued: "",
                    fileId: "",
                    progress: false,
                  },
                ],
              }
            }
            onSubmit={(values, { setSubmitting }) => {
              this.props.handleNext();
              this.props.setDataPrincipal(values?.principalInfo);
            }}
          >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
              <Form className="principal-form">
                <FieldArray
                  name="principalInfo"
                  render={(arrayHelpers) => (
                    <div>
                      <h2 style={{ color: "#4251af", fontWeight: "400" }}>
                        Principal Information
                      </h2>
                      {values.principalInfo &&
                      values.principalInfo.length > 0 ? (
                        values.principalInfo.map((principal, index) => {
                          const principalImage = principal?.imageUrl;
                          const principalState =
                            principal.addressPrincipal?.state;
                          const driverLicenseState = principal?.stateIssued;
                          const principalBirthday = principal?.dateOfBirth;
                          // const firstName = principal?.firstName;
                          return (
                            <div key={index}>
                              <div className="row align-items-center  add-merchant-div">
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
                                  <TextField
                                    name={`principalInfo.${index}.firstName`}
                                    values={`principalInfo.${index}.firstName`}
                                    label="First Name*"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.firstName`,
                                        e.target.value
                                      )
                                    }
                                  />

                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.firstName`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <TextField
                                    name={`principalInfo.${index}.lastName`}
                                    values={`principalInfo.${index}.lastName`}
                                    label="Last Name*"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.lastName`,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.lastName`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <TextField
                                    name={`principalInfo.${index}.position`}
                                    values={`principalInfo.${index}.position`}
                                    label="Title/Position*"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.position`,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.position`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <TextField
                                    name={`principalInfo.${index}.ownership`}
                                    values={`principalInfo.${index}.ownership`}
                                    label="Ownership* (%)"
                                    margin="normal"
                                    type="number"
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.ownership`,
                                        e.target.value
                                      )
                                    }
                                  />

                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.ownership`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <MaterialUiPhoneNumber
                                    onlyCountries={["us", "vn"]}
                                    label="Home Phone"
                                    fullWidth
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
                                  <MaterialUiPhoneNumber
                                    onlyCountries={["us", "vn"]}
                                    fullWidth
                                    label="Mobile Phone*"
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
                                  <TextField
                                    name={`principalInfo.${index}.addressPrincipal.address`}
                                    values={`principalInfo.${index}.addressPrincipal.address`}
                                    label="Address*"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.addressPrincipal.address`,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.addressPrincipal.address`}
                                    />
                                  </div>
                                </div>

                                <div className="col-4">
                                  <TextField
                                    name={`principalInfo.${index}.addressPrincipal.city`}
                                    values={`principalInfo.${index}.addressPrincipal.city`}
                                    label="City*"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.addressPrincipal.city`,
                                        e.target.value
                                      )
                                    }
                                  />

                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.addressPrincipal.city`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <CustomStateSelect
                                    initialValue={principalState}
                                    label="State Issued*"
                                    handleChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.addressPrincipal.state`,
                                        e.target.value
                                      )
                                    }
                                  />

                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.addressPrincipal.state`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <FormControl
                                    style={{ width: "100%", marginTop: "16px" }}
                                  >
                                    <InputLabel htmlFor="formatted-text-mask-input">
                                      Zip Code*
                                    </InputLabel>
                                    <Input
                                      values={`principalInfo.${index}.addressPrincipal.zip`}
                                      onChange={(e) =>
                                        setFieldValue(
                                          `principalInfo.${index}.addressPrincipal.zip`,
                                          e.target.value
                                        )
                                      }
                                      name={`principalInfo.${index}.addressPrincipal.zip`}
                                      id="custom-tax-input"
                                      inputProps={{
                                        block: [5],
                                        numericOnly: true,
                                      }}
                                      inputComponent={InputCustom}
                                    />
                                  </FormControl>

                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.addressPrincipal.zip`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <FormControl
                                    style={{ width: "100%", marginTop: "10px" }}
                                  >
                                    <InputLabel htmlFor="formatted-text-mask-input">
                                      Year at This Address*
                                    </InputLabel>
                                    <Input
                                      name={`principalInfo.${index}.yearAtThisAddress`}
                                      values={`principalInfo.${index}.yearAtThisAddress`}
                                      onChange={(e) =>
                                        setFieldValue(
                                          `principalInfo.${index}.yearAtThisAddress`,
                                          e.target.value
                                        )
                                      }
                                      id="custom-tax-input"
                                      inputProps={{
                                        block: [2],
                                        numericOnly: true,
                                      }}
                                      inputComponent={InputCustom}
                                    />
                                  </FormControl>
                                </div>
                                <div className="col-4">
                                  <FormControl
                                    style={{ width: "100%", marginTop: "16px" }}
                                  >
                                    <InputLabel htmlFor="formatted-text-mask-input">
                                      Social Security Number* (SSN)
                                    </InputLabel>
                                    <Input
                                      values={`principalInfo.${index}.ssn`}
                                      name={`principalInfo.${index}.ssn`}
                                      onChange={(e) => [
                                        e.persist(),
                                        setFieldValue(
                                          `principalInfo.${index}.ssn`,
                                          e.target.value
                                        ),
                                      ]}
                                      id="custom-tax-input"
                                      inputProps={{
                                        block: [3, 2, 4],
                                        numericOnly: true,
                                      }}
                                      inputComponent={InputCustom}
                                    />
                                  </FormControl>

                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.ssn`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                      <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        fullWidth
                                        label="Date Of Birth*"
                                        value={principalBirthday}
                                        name={`principalInfo.${index}.dateOfBirth`}
                                        onChange={(e) =>
                                          setFieldValue(
                                            `principalInfo.${index}.dateOfBirth`,
                                            e
                                          )
                                        }
                                      />
                                    </Grid>
                                  </MuiPickersUtilsProvider>
                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.dateOfBirth`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <TextField
                                    name={`principalInfo.${index}.email`}
                                    values={`principalInfo.${index}.email`}
                                    label="Email Address*"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.email`,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.email`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <TextField
                                    name={`principalInfo.${index}.driverLicense`}
                                    values={`principalInfo.${index}.driverLicense`}
                                    label="Driver License Number*"
                                    margin="normal"
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.driverLicense`,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.driverLicense`}
                                    />
                                  </div>
                                </div>
                                <div className="col-4">
                                  <CustomStateSelect
                                    label="State*"
                                    onChange={(e) =>
                                      setFieldValue(
                                        `principalInfo.${index}.stateIssued`,
                                        e.target.value
                                      )
                                    }
                                    name={driverLicenseState}
                                    initialValue={driverLicenseState}
                                  />

                                  <div className="input-feedback">
                                    <ErrorMessage
                                      name={`principalInfo.${index}.stateIssued`}
                                    />
                                  </div>
                                </div>

                                <div className="col-12">
                                  <div className="form-group">
                                    <label style={{ margin: "10px 0px" }}>
                                      Driver License Picture*
                                    </label>
                                    <br />
                                    <div className="Upload">
                                      <div style={{ display: "flex" }}>
                                        {principalImage ? (
                                          <div
                                            className="driver-image"
                                            style={{
                                              backgroundImage: `url("${principalImage}")`,
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
                                      </div>
                                      {this.state.progress ? (
                                        <div
                                          style={{
                                            width: "250px",
                                            paddingTop: "10px",
                                          }}
                                        >
                                          <LinearIndeterminate />
                                        </div>
                                      ) : null}
                                      <div className="input-feedback">
                                        <ErrorMessage
                                          name={`principalInfo.${index}.fileId`}
                                        />
                                      </div>
                                      <input
                                        type="file"
                                        className="custom-input"
                                        accept="image/gif,image/jpeg, image/png"
                                        style={{
                                          width: "28%",
                                          marginTop: "10px",
                                        }}
                                        name={`principalInfo.${index}.fileId`}
                                        onChange={(e) =>
                                          this.handleUploadImage(
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
                          + Add Principal
                        </p>
                      )}
                      <div
                        style={{
                          marginTop: "15px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
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
                            style={{
                              backgroundColor: "#4251af",
                              color: "white",
                            }}
                            disabled={this.state.progress ? true : false}
                          >
                            Next
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() =>
                              this.props.cancelMerchant.push(
                                "/app/merchants/list"
                              )
                            }
                            className="btn btn-red"
                            style={{ color: "black" }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </Form>
            )}
          </Formik>
        )}
      </div>
    );
  }
}

export default Principal;
