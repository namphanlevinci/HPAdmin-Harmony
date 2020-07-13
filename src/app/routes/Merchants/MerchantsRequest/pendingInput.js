import React from "react";
import "./MerchantsRequest.css";

const pendingInput = ({
  label,
  name,
  onChangeInput,
  type,
  initValue,
  styles,
  inputStyles,
  validator,
}) => (
  <div className={styles ? styles : "col-4"} style={{ paddingTop: "10px" }}>
    <label>{label}</label>
    <input
      name={name}
      onChange={onChangeInput}
      value={initValue ? initValue : ""}
      type={type ? type : "text"}
      className={inputStyles ? `${inputStyles} ` : ""}
      placeholder={label}
      required
    />
    <span style={{ color: "red", fontSize: "16px", fontWeight: "400px" }}>
      {validator?.message(name, initValue, "required")}
    </span>
  </div>
);

export default pendingInput;
