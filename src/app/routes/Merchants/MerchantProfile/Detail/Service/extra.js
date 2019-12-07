import React from "react";
import { FieldArray, Field } from "formik";

const Extra = ({ handleBlur, handleChange, values }) => (
  <FieldArray
    name="extras"
    validateOnChange
    render={arrayHelpers => (
      <div>
        {values.extras && values.extras.length > 0 ? (
          values.extras.map((extras, index) => (
            <div key={index} className="row">
              <div className="col-8">
                <label>Extra Name*</label>
                <br />
                <input
                  name={`extras.${index}.name`}
                  type="text"
                  onChange={handleChange(`extras.${index}.name`)}
                  onBlur={handleBlur}
                />
              </div>
              <div className="col-8">
                <label>Description</label>
                <br />
                <input
                  name={`extras.${index}.description`}
                  type="text"
                  onChange={handleChange(`extras.${index}.description`)}
                  onBlur={handleBlur}
                />
              </div>
              <div className="row">
                <div className="col-4">
                  <label>
                    Duration <span className="small-label"> (Minutes)</span>
                  </label>
                  <Field name={`extras.${index}.duration`} type="number" />
                </div>
                <div className="col-4">
                  <label>Price ($)</label>
                  <Field name={`extras.${index}.price`} type="number" />
                </div>
                <div className="col-8">
                  <label>Status</label>
                  <select
                    name={`extras.${index}.isDisabled`}
                    onChange={handleChange}
                  >
                    <option value="0" checked>
                      Status
                    </option>
                    <option value="0" checked>
                      Active
                    </option>
                    <option value="1">Disable</option>
                  </select>
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
            </div>
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
