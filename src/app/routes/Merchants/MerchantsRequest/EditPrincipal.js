import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import URL, { upfileUrl } from "../../../../url/url";

import PhoneInput from "react-phone-input-2";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import Select from "react-select";
import selectState from "../../../../util/selectState";
import axios from "axios";
import "./MerchantReqProfile.css";

const EditPrincipal = ({
  principals,
  getData,
  newFileID,
  imagePreviewUrlPrincipal,
}) => {
  return (
    // <h1>YEET</h1>
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{ principal: principals }}
        onSubmit={(values) => console.log("Values", values)}
        render={({ values, setFieldValue }) => (
          <Form>
            <FieldArray
              name="principal"
              render={(arrayHelpers) => (
                <div>
                  {values.principal && values.principal.length > 0 ? (
                    values.principal.map((principal, index) => {
                      // console.log("PRINCIPAL MAPPP", principal);
                      // Image
                      let imagePreviewUrl = imagePreviewUrlPrincipal;
                      let $imagePreview = null;
                      if (imagePreviewUrl) {
                        $imagePreview = (
                          <img
                            className="bankVoid"
                            src={imagePreviewUrl}
                            alt="void"
                            style={styles.image}
                          />
                        );
                      } else {
                        $imagePreview = (
                          <img
                            className="bankVoid"
                            style={styles.image}
                            src={principal?.imageUrl}
                            alt="void"
                          />
                        );
                      }

                      const homePhone = principal?.homePhone.replace(/-/g, "");
                      const mobilePhone = principal?.mobilePhone.replace(
                        /-/g,
                        ""
                      );
                      const birthDate = moment(principal?.birthDate).format(
                        "MM/DD/YYYY"
                      );

                      const stateName = principal?.state?.name;
                      return (
                        <div key={index} className="row ">
                          <div className="col-12">
                            <h3 style={{ color: "#4251af", fontWeight: "500" }}>
                              Principal {index + 1}
                            </h3>
                          </div>
                          <div className="col-4">
                            <label>First Name</label>
                            <Field
                              className="form-control"
                              placeholder="First Name"
                              name={`principal.${index}.firstName`}
                              values={`principal.${index}.firstName`}
                            />
                          </div>
                          <div className="col-4">
                            <label>Last Name</label>
                            <Field
                              className="form-control"
                              placeholder="First Name"
                              name={`principal.${index}.lastName`}
                              values={`principal.${index}.lastName`}
                            />
                          </div>
                          <div className="col-4">
                            <label>Title</label>
                            <Field
                              className="form-control"
                              placeholder="First Name"
                              name={`principal.${index}.lastName`}
                              values={`principal.${index}.lastName`}
                            />
                          </div>
                          <div className="col-4" style={styles.div}>
                            <label>Ownership (%)</label>
                            <Field
                              className="form-control"
                              placeholder="Ownership (%)"
                              name={`principal.${index}.ownerShip`}
                              values={`principal.${index}.ownerShip`}
                            />
                          </div>

                          <div className="col-4" style={styles.div}>
                            <label>Address</label>
                            <Field
                              className="form-control"
                              placeholder="Address"
                              name={`principal.${index}.address`}
                              values={`principal.${index}.address`}
                            />
                          </div>

                          <div className="col-4" style={styles.div}>
                            <label>Social Security Number (SSN)*</label>
                            <Field
                              className="form-control"
                              placeholder="Address"
                              name={`principal.${index}.fullSsn`}
                              values={`principal.${index}.fullSsn`}
                            />
                          </div>

                          <div className="col-4" style={styles.div}>
                            <label>Home Phone</label>
                            <PhoneInput
                              className="form-control "
                              placeholder="Home Phone"
                              name={`principal.${index}.homePhone`}
                              value={homePhone}
                              onChange={(e) =>
                                setFieldValue(`principal.${index}.homePhone`, e)
                              }
                            />
                          </div>
                          <div className="col-4" style={styles.div}>
                            <label>Mobile Phone</label>
                            <PhoneInput
                              placeholder="Home Phone"
                              name={`principal.${index}.mobilePhone`}
                              value={mobilePhone}
                              onChange={(e) =>
                                setFieldValue(
                                  `principal.${index}.mobilePhone`,
                                  e
                                )
                              }
                            />
                          </div>
                          <div className="col-4" style={styles.div}>
                            <label>Email Address *</label>
                            <Field
                              className="form-control"
                              placeholder="Address"
                              name={`principal.${index}.email`}
                              values={`principal.${index}.email`}
                            />
                          </div>

                          <div className="col-4" style={{ marginTop: "5px" }}>
                            {/* <label > Birthday</label> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Grid container justify="space-around">
                                <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  label="Birthday (MM/DD/YYYY)"
                                  format="MM/dd/yyyy"
                                  value={birthDate}
                                  onChange={(e) =>
                                    setFieldValue(
                                      `principal.${index}.birthDate`,
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
                              className="form-control"
                              placeholder="Driver License Number*"
                              name={`principal.${index}.driverNumber`}
                              values={`principal.${index}.driverNumber`}
                            />
                          </div>

                          <div className="col-4" style={styles.div}>
                            <label>State</label>
                            <Select
                              // value={this.state.state}
                              onChange={(e) =>
                                setFieldValue(
                                  `principal.${index}.stateId`,
                                  e.value
                                )
                              }
                              name={`principal.${index}.stateId`}
                              options={selectState}
                              defaultValue={{
                                value: `principal.${index}.stateId`,
                                label: stateName,
                              }}
                            />
                          </div>

                          <div className="col-3" style={{ paddingTop: "10px" }}>
                            <label>Void Check*</label> <br />
                            {$imagePreview}
                          </div>
                          <div
                            className="col-9"
                            style={{ paddingTop: "10px", float: "left" }}
                          >
                            <label>Upload new Void Check:</label>
                            <input
                              type="file"
                              style={styles.imageInput}
                              name={`principal.${index}.fileId`}
                              id="file"
                              // onChange={(e, index) =>
                              //   uploadFile(
                              //     e,
                              //     setFieldValue,
                              //     `principal.${index}.fileId`
                              //   )
                              // }
                              onChange={(e, name) => [
                                getData(
                                  e,
                                  setFieldValue,
                                  `principal.${index}.fileId`
                                ),
                              ]}
                            />
                          </div>
                          <hr />
                          {/* <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </button>
                        1
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </button> */}
                        </div>
                      );
                    })
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      {/* show this when user has removed all friends from the list */}
                      Add a friend
                    </button>
                  )}
                  <div>
                    <button type="submit">Submit</button>
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
  },
  image: {
    width: "250px",
    height: "200px",
  },
  imageInput: {
    border: "none",
  },
};
