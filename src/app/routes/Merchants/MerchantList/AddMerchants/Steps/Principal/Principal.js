import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { FieldArray } from "formik";
import InputField from "../../FormFields/InputField";
import CustomNumberField from "../../FormFields/CustomNumberField";
import defaultImage from "./hpadmin2.png";
import Button from "@material-ui/core/Button";
import CustomPhoneField from "../../FormFields/CustomPhoneField";
import SelectField from "../../FormFields/SelectField";
import State from "../../../../../../../util/InitialState";
import DatePickerField from "../../FormFields/DatePickerField";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ErrorMessage from "../../FormFields/ErrorMessage";

import "./Principal.css";

export default function Principal(props) {
  const { values, setFieldValue, uploadFile, handleBack } = props;

  return (
    <div>
      <FieldArray name="principalInfo">
        {(arrayHelpers) => (
          <>
            {values.principalInfo && values.principalInfo.length > 0 ? (
              values.principalInfo.map((principal, index) => {
                return (
                  <div key={index} className="page-heading">
                    <div className="principal-title ">
                      <Typography variant="h6" gutterBottom>
                        Principal {index + 1}
                      </Typography>

                      {index === 1 ? (
                        <CancelIcon
                          size={32}
                          onClick={() => arrayHelpers.remove(index)}
                          className="remove-principal"
                        />
                      ) : null}
                    </div>
                    <Grid container spacing={3}>
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
                          name={`principalInfo.${index}.position`}
                          label="Title/Position*"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <CustomNumberField
                          InputLabelProps={{ shrink: true }}
                          name={`principalInfo.${index}.ownership`}
                          label="Ownership* (%)"
                          fullWidth
                          options={{
                            numericOnly: true,
                            blocks: [4],
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <CustomPhoneField
                          label="Home Phone"
                          fullWidth
                          name={`principalInfo.${index}.homePhone`}
                          onChange={(e) =>
                            setFieldValue(`principalInfo.${index}.homePhone`, e)
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
                          name={`principalInfo.${index}.addressPrincipal.address`}
                          label="Address*"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <InputField
                          name={`principalInfo.${index}.addressPrincipal.city`}
                          label="City*"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <SelectField
                          name={`principalInfo.${index}.addressPrincipal.state`}
                          label="State Issued*"
                          data={State}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <CustomNumberField
                          InputLabelProps={{ shrink: true }}
                          name={`principalInfo.${index}.addressPrincipal.zip`}
                          label="Zip Code*"
                          fullWidth
                          options={{
                            numericOnly: true,
                            blocks: [5],
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <CustomNumberField
                          InputLabelProps={{ shrink: true }}
                          name={`principalInfo.${index}.yearAtThisAddress`}
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
                          name={`principalInfo.${index}.dateOfBirth`}
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
                          name={`principalInfo.${index}.driverLicense`}
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
                          label="State*"
                          data={State}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <label>Driver License Picture*</label>

                        <div style={{ width: "100%", marginTop: "10px" }}>
                          {principal.driverImageUrl !== "" ? (
                            <img
                              src={principal.driverImageUrl}
                              alt="avatar"
                              style={{ width: "100%", objectFit: "cover" }}
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
                          accept="image/gif,image/jpeg, image/png"
                          name={`principalInfo.${index}.fileId`}
                          id="file"
                          onChange={(e) =>
                            uploadFile(
                              e,
                              `principalInfo.${index}.driverImageUrl`,
                              setFieldValue
                            )
                          }
                        />
                      </Grid>
                    </Grid>

                    <div>
                      {values.principalInfo.length >= 2 ? null : (
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          style={{ paddingTop: "20px" }}
                        >
                          <Grid item>
                            <AddCircleIcon
                              onClick={() => arrayHelpers.insert(1, "")}
                              className="add-principal"
                            />
                          </Grid>
                          <Grid
                            item
                            onClick={() => arrayHelpers.insert(1, "")}
                            style={{
                              marginBottom: "3px",
                            }}
                            className="add-principal"
                          >
                            ADD PRINCIPAL
                          </Grid>
                        </Grid>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <button type="button" onClick={() => arrayHelpers.push()}>
                ADD
              </button>
            )}
          </>
        )}
      </FieldArray>
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginTop: "15px" }}>
          <Button
            onClick={handleBack}
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
            // disabled={this.state.progress ? true : false}
          >
            Next
          </Button>
        </div>
        <div>
          <Button
            onClick={() =>
              this.props.cancelMerchant.push("/app/merchants/list")
            }
            className="btn btn-red"
            style={{ color: "black" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
