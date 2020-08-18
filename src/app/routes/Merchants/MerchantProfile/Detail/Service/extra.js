import React from "react";
import { FieldArray, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";

import ErrorMessage from "./error-message";
import Select from "react-select";
import CurrencyInput from "react-currency-masked-input";

import "../Detail.css";

const extraStatus = [
  { value: 0, label: "Active" },
  { value: 1, label: "Inactive" },
];

const colourStyles = {
  control: (styles) => ({
    ...styles,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    backgroundColor: "transparent",
  }),
  input: (styles) => ({
    ...styles,
    borderWidth: 0,
    fontSize: 16,
    paddingLeft: 0,
    backgroundColor: "transparent",
  }),
  placeholder: (styles) => ({ ...styles }),
  // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
};

const Extra = ({
  setFieldValue,
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
  loading,
}) => {
  return (
    <FieldArray
      name="extras"
      validateOnChange
      render={(arrayHelpers) => (
        <div>
          {values.extras && values.extras.length > 0 ? (
            values.extras.map((extras, index) => {
              const price = extras.price;
              const supplyFee = extras.supplyFee;
              return (
                <div style={{ marginBottom: 40 }} key={index}>
                  <div
                    style={{
                      backgroundColor: "#fafafa",
                      width: "80%",
                      position: "relative",
                    }}
                    key={index}
                    className="row"
                  >
                    <div
                      onClick={() => arrayHelpers.remove(index)}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "red",
                      }}
                    >
                      <AiOutlineClose />
                    </div>

                    <div className="col-10">
                      <label
                        style={{
                          fontSize: 14,
                          color: "#4251af",
                          fontWeight: "600",
                          letterSpacing: 0.3,
                        }}
                      >
                        New Extra
                      </label>
                      <br />
                      <Field
                        placeholder="Extra Name*"
                        style={styles.input}
                        name={`extras.${index}.name`}
                        type="text"
                      />
                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.name`} />
                      </div>
                    </div>
                    <div className="col-10" style={{ marginTop: 20 }}>
                      <label style={{ fontSize: 14, color: "#4251af" }}>
                        Description
                      </label>
                      <br />
                      <Field
                        as="textarea"
                        style={styles.textarea}
                        name={`extras.${index}.description`}
                        type="text"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#fafafa",
                      width: "80%",
                      paddingBottom: 20,
                    }}
                    className="row"
                  >
                    <div className="col-10" style={{ marginTop: 20 }}>
                      <label style={{ fontSize: 14, color: "#4251af" }}>
                        <span className="small-label">Duration* (Min)</span>
                      </label>
                      <div className="input-box">
                        <Field
                          style={styles.input}
                          name={`extras.${index}.duration`}
                          type="number"
                        />
                        <span className="unit">Min</span>
                      </div>
                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.duration`} />
                      </div>
                    </div>
                    <div className="col-10" style={{ marginTop: 20 }}>
                      <label style={{ fontSize: 14, color: "#4251af" }}>
                        Price* ($)
                      </label>
                      <div className="input-box">
                        <CurrencyInput
                          style={styles.input}
                          value={price}
                          onChange={(value, masked) => [
                            setFieldValue(`extras.${index}.price`, masked),
                          ]}
                          name={`extras.${index}.price`}
                          type="tel"
                        />
                        <span className="unit">$</span>
                      </div>
                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.price`} />
                      </div>
                    </div>
                    <div className="col-10" style={{ marginTop: 20 }}>
                      <label style={{ fontSize: 14, color: "#4251af" }}>
                        Surcharged
                      </label>
                      <div className="input-box">
                        <CurrencyInput
                          style={styles.input}
                          value={supplyFee}
                          onChange={(value, masked) => [
                            setFieldValue(`extras.${index}.supplyFee`, masked),
                          ]}
                          name={`extras.${index}.supplyFee`}
                          type="tel"
                        />

                        <span className="unit">$</span>
                      </div>
                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.supplyFee`} />
                      </div>
                    </div>
                    <div className="col-10" style={{ marginTop: 20 }}>
                      <label style={{ fontSize: 14, color: "#4251af" }}>
                        Status*
                      </label>
                      <Select
                        styles={colourStyles}
                        options={extraStatus}
                        onChange={(selectOptions) => {
                          setFieldValue(
                            `extras.${index}.isDisabled`,
                            selectOptions.value
                          );
                        }}
                        defaultValue={{
                          value: `extras.${index}.isDisabled`,
                          label: "Active",
                        }}
                      />

                      <div className="input-feedback">
                        <ErrorMessage name={`extras.${index}.isDisabled`} />
                      </div>
                    </div>
                  </div>
                  {values.extras.length - 1 === index ? (
                    <div style={{ textAlign: "left" }}>
                      <p
                        style={{
                          marginLeft: -15,
                          color: "#4251af",
                          fontWeight: "600",
                          fontSize: 14,
                          marginTop: 30,
                          cursor: "pointer",
                          letterSpacing: 0.3,
                        }}
                        onClick={() => arrayHelpers.insert(1, "")}
                      >
                        + Add Extra
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          ) : (
            <p className="extra-btn" onClick={() => arrayHelpers.push("")}>
              + Add Extra
            </p>
          )}
        </div>
      )}
    />
  );
};

const styles = {
  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 3,
    height: 70,
    backgroundColor: "white",
    width: "100%",
  },
};

export default Extra;
