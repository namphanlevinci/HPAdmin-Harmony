import React from "react";
import { FieldArray, Field } from "formik";
import ErrorMessage from "./error-message";

const Extra = ({ handleBlur, handleChange, values }) => (
  <FieldArray
    name="extras"
    validateOnChange
    render={arrayHelpers => (
      <div>
        {values.extras && values.extras.length > 0 ? (
          values.extras.map((extras, index) => (
            <React.Fragment>
              <div key={index} className="row">
                <div className="col-8">
                  <label>Extra Name*</label>
                  <br />
                  <Field name={`extras.${index}.name`} type="text" />
                  <div className="input-feedback">
                    <ErrorMessage name={`extras.${index}.name`} />
                  </div>
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
                    Duration* <span className="small-label"> (Minutes)</span>
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
                  <select
                    name={`extras.${index}.isDisabled`}
                    onChange={handleChange}
                  >
                    <option value="">Status</option>
                    <option
                      value="0"
                      selected={
                        `extras.${index}.isDisabled` === 0 ? true : false
                      }
                    >
                      Active
                    </option>
                    <option
                      value="1"
                      selected={
                        `extras.${index}.isDisabled` === 1 ? true : false
                      }
                    >
                      Disable
                    </option>
                  </select>
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
          ))
        ) : (
          <p className="extra-btn" onClick={() => arrayHelpers.push("")}>
            Add Extra
          </p>
        )}
      </div>
    )}
  />
);

export default Extra;
