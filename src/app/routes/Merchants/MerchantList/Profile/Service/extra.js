import React from "react";
import { FieldArray, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";

import ErrorMessage from "./error-message";
import Select from "react-select";
import CurrencyInput from 'react-currency-input';
import InputNumber from "./InputNumber";
import { isEmpty } from "lodash";


import "../Detail.css";

const extraClone = {
  description: "",
  duration: "0",
  isDisabled: 0,
  name: "",
  price: "0.00",
  supplyFee: "0.00",
}

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
          {
            values.extras && values.extras.length > 0 ? (
              values.extras.map((extras, index) => {
                const price = extras.price;
                const supplyFee = extras.supplyFee;
                const isDisabled = extras.isDisabled;
                const duration = extras.duration;

                return (
                  <div style={{ marginBottom: 30 }} key={index}>
                    <div
                      key={index}
                      className="row container-add-extra"
                    >
                      <div
                        onClick={() => arrayHelpers.remove(index)}
                        className="btn-close-extra"
                      >
                        <AiOutlineClose style={{ width: 23, height: 23 }} />
                      </div>

                      <div style={{ width: '100%', paddingLeft: 15, paddingRight: 15 }}>

                        <br />
                        <Field
                          placeholder="Extra Name*"
                          style={styles.input}
                          name={`extras.${index}.name`}
                          type="text"
                        />
                        <div className="input-feedback error_message_field">
                          <ErrorMessage name={`extras.${index}.name`} />
                        </div>
                      </div>

                      <div style={{ marginTop: 20, width: '100%', paddingLeft: 15, paddingRight: 15 }}>
                        <label style={{ fontSize: 16, color: "#4251af", fontWeight: '500' }}>
                          Description
                      </label>
                        <br />
                        <Field
                          as="textarea"
                          style={styles.textarea}
                          name={`extras.${index}.description`}
                          type="text"
                          className="input_field"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#fafafa",
                        width: "100%",
                        paddingBottom: 20,
                        paddingLeft: 15, paddingRight: 15
                      }}
                      className="row"
                    >

                      <div style={{ marginTop: 20, width: '100%' }}>
                        <label style={{ fontSize: 16, color: "#4251af", fontWeight: '500' }}>
                          <span className="small-label">Duration* (Min)</span>
                        </label>
                        <div className="input-box">
                          <InputNumber
                            style={styles.input}
                            testName={`extras.${index}.duration`}
                            placeholder=""
                            value={duration}
                            onChange={e => setFieldValue(`extras.${index}.duration`, e.target.value)}
                          />
                          <span className="unit">Min</span>
                        </div>
                        {
                          (duration === "" || !duration) &&
                          <div style={{ color: 'red' }}>
                            Required
                        </div>
                        }
                      </div>

                      <div style={{ marginTop: 20, width: '100%' }}>
                        <label style={{ fontSize: 16, color: "#4251af", fontWeight: '500' }}>
                          Price* ($)
                      </label>
                        <div className="input-box">
                          <CurrencyInput
                            style={styles.input}
                            value={price}
                            onChange={(event, maskedvalue, floatvalue) => [
                              setFieldValue(
                                `extras.${index}.price`,
                                maskedvalue
                              ),
                            ]}
                            name={`extras.${index}.price`}
                            type="tel"
                          />
                          <span className="unit">$</span>
                        </div>
                        <div className="input-feedback error_message_field">
                          <ErrorMessage name={`extras.${index}.price`} />
                        </div>
                      </div>

                      <div style={{ marginTop: 20, width: '100%' }}>
                        <label style={{ fontSize: 16, color: "#4251af", fontWeight: '500' }}>
                          Surcharged
                      </label>
                        <div className="input-box">
                          <CurrencyInput
                            style={styles.input}
                            value={supplyFee}
                            onChange={(event, maskedvalue, floatvalue) => [
                              setFieldValue(
                                `extras.${index}.supplyFee`,
                                maskedvalue
                              ),
                            ]}
                            name={`extras.${index}.supplyFee`}
                            type="tel"
                          />

                          <span className="unit">$</span>
                        </div>
                        <div className="input-feedback error_message_field">
                          <ErrorMessage name={`extras.${index}.supplyFee`} />
                        </div>
                      </div>

                      <div style={{ marginTop: 20, width: '100%' }}>
                        <label style={{ fontSize: 16, color: "#4251af", fontWeight: '500' }}>
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
                            value: isDisabled,
                            label: isDisabled === 0 ? "Active" : "Inactive",
                          }}
                        />

                        <div className="input-feedback error_message_field">
                          <ErrorMessage name={`extras.${index}.isDisabled`} />
                        </div>
                      </div>
                    </div>
                    {
                      values.extras.length - 1 === index ? (
                        <div style={{ textAlign: "left" }}>
                          <p
                            className="btn-add-extra"
                            onClick={() =>
                              arrayHelpers.insert(values.extras.length, extraClone)
                            }
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
                <>
                  <p
                    className="btn-add-extra"
                    onClick={() => arrayHelpers.push(extraClone)}
                  >
                    + Add Extra
              </p>
                </>
              )}
        </div>
      )}
    />
  );
};

const styles = {
  input: {
    backgroundColor: "transparent",
    width: '100%',
    borderBottom: "1px solid #dddddd",
    fontSize: 16
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 3,
    height: 70,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    marginTop: 10
  },
};

export default Extra;
