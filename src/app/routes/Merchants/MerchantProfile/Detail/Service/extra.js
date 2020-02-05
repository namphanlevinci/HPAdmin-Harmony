import React from "react";
import { FieldArray, Field, getIn, Form } from "formik";
import ErrorMessage from "./error-message";
import Select from "react-select";
import { Divider, Button, TextField } from "@material-ui/core";

const extraStatus = [
  { value: 0, label: "Active" },
  { value: 1, label: "Disable" }
];

const Extra = ({
  setFieldValue,
  handleBlur,
  handleChange,
  values,
  touched,
  errors
}) => (
  <Form noValidate autoComplete="off">
    <FieldArray
      name="extras"
      validateOnChange
      render={arrayHelpers => (
        <div>
          {values.extras && values.extras.length > 0 ? (
            values.extras.map((extras, index) => {
              const extraName = `extras.${index}.name`;
              const touchedExtraName = getIn(touched, extraName);
              const errorExtraName = getIn(errors, extraName);

              const duration = `extras.${index}.duration`;
              const touchedDuration = getIn(touched, duration);
              const errorDuration = getIn(errors, duration);

              const price = `extras.${index}.price`;
              const touchedprice = getIn(touched, price);
              const errorPrice = getIn(errors, price);
              return (
                <React.Fragment>
                  <div key={index} className="row">
                    <div className="col-8">
                      <label>Extra Name*</label>
                      <br />
                      <Field name={`extras.${index}.name`} type="text" />
                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.name`} />
                      </div>

                      {/* <TextField
                        margin="normal"
                        variant="outlined"
                        label="First name"
                        name={extraName}
                        value={extras.extraName}
                        helperText={
                          touchedExtraName && errorExtraName
                            ? errorExtraName
                            : ""
                        }
                        error={Boolean(touchedExtraName && errorExtraName)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      /> */}
                    </div>
                    <div className="col-8">
                      <label>Description</label>
                      <br />
                      <Field name={`extras.${index}.description`} type="text" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <label>
                        Duration*{" "}
                        <span className="small-label"> (Minutes)</span>
                      </label>
                      <Field name={`extras.${index}.duration`} type="number" />
                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.duration`} />
                      </div>
                    </div>
                    <div className="col-4">
                      <label>Price* ($)</label>
                      <Field name={`extras.${index}.price`} type="number" />
                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.price`} />
                      </div>
                    </div>
                    <div className="col-8">
                      <label>Status</label>
                      <Select
                        options={extraStatus}
                        onChange={selectOptions => {
                          setFieldValue(
                            `extras.${index}.isDisabled`,
                            selectOptions.value
                          );
                        }}
                      />

                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.isDisabled`} />
                      </div>
                    </div>
                    <div className="col-8" style={{ display: "flex" }}>
                      <p
                        className="extra-btn"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        - Remove Extra
                      </p>
                      <p
                        className="extra-btn"
                        onClick={() => arrayHelpers.insert(index, "")}
                      >
                        + Add Extra
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <p className="extra-btn" onClick={() => arrayHelpers.push("")}>
              Add Extra
            </p>
          )}
        </div>
      )}
    />
  </Form>
);

export default Extra;
