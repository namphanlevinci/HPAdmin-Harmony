import React from "react";

const pendingInput = ({
  label,
  name,
  onChangeInput,
  type,
  initValue,
  styles,
}) => (
  <div className={styles ? styles : "col-4"} style={{ paddingTop: "10px" }}>
    <label>{label}</label>
    <input
      name={name}
      onChange={onChangeInput}
      value={initValue}
      type={type ? type : "text"}
      className="form-control"
      placeholder={label}
      required
    />
  </div>
);

export default pendingInput;
