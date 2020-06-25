import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import TextField from "@material-ui/core/TextField";
import State from "../../../../../../util/InitialState";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/high-res.css";

const General = ({
  handleSelect,
  handleChange,
  uploadFile,
  toogleVisibility,
  handlePhone,
  state: {
    match,
    firstName,
    lastName,
    displayName,
    street,
    city,
    zip,
    state,
    cellphone,
    email,
    pin,
    confirmPin,
    imagePreviewUrl,
    nameRole,
    isDisabled,
    countryCode,
    showPin,
    showConfirmPin,
  },
  validator,
}) => {
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
  ];

  const status = [
    { value: "0", label: "Active" },
    {
      value: "1",
      label: "Disable",
    },
  ];

  // const phoneCode = [
  //   { value: "+1", label: "+1" },
  //   { value: "+84", label: "+84" },
  // ];
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="firstName"
              label="First Name"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              required
              value={firstName}
              style={styles.input}
            />
            {validator.message("firstName", firstName, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="lastName"
              label="Last Name"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              required
              value={lastName}
              style={styles.input}
            />
            {validator.message("lastName", lastName, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="displayName"
              label="Display name"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              required
              value={displayName}
              style={styles.input}
            />
            {validator.message("displayName", displayName, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="street"
              label="Address"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              value={street}
              style={styles.input}
            />
          </div>
        </div>
        {/* </div> */}
        {/* <div className="row justify-content-center"> */}
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="city"
              label="City"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              value={city}
              style={styles.input}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label>State</label>
            <Select
              name="state"
              options={State}
              onChange={handleSelect}
              value={state}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="zip"
              label="Zip"
              margin="normal"
              type="number"
              fullWidth
              onChange={handleChange}
              value={zip}
              style={{ marginTop: "10px" }}
            />
          </div>
        </div>
        {/* </div> */}
        {/* <div className="row justify-content-center"> */}
        <div className="col-4">
          {/* <div>
            <div
              style={{ width: "50% !important", padding: "8px 20px 0px 0px" }}
            >
              <label>Country Code</label>
              <Select
                options={phoneCode}
                onChange={handleSelect}
                name="countryCode"
                value={countryCode}
              />
            </div>
            <TextField
              name="cellphone"
              label="Cell phone"
              margin="normal"
              type="number"
              fullWidth
              onChange={handleChange}
              value={cellphone}
            /> */}
          <label>Cellphone</label>
          <PhoneInput
            country={"us"}
            placeholder="Phone Number"
            name="cellphone"
            onChange={handlePhone}
          />
          {/* </div> */}
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="email"
              label="Email"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              value={email}
              style={{ marginTop: "9px" }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group" style={styles.pin}>
            <TextField
              name="pin"
              label="PIN Code*"
              margin="normal"
              type={showPin ? "text" : "password"}
              fullWidth
              value={pin}
              onChange={handleChange}
              inputProps={{ maxLength: 4 }}
              style={styles.input}
            />
            {showPin ? (
              <i style={{ cursor: "pointer" }}>
                <FaRegEyeSlash
                  onClick={() => toogleVisibility("showPin", false)}
                />
              </i>
            ) : (
              <i style={{ cursor: "pointer" }}>
                <FaRegEye onClick={() => toogleVisibility("showPin", true)} />
              </i>
            )}
          </div>
          {validator.message("pin", pin, "required|numeric")}
        </div>
        <div className="col-4">
          <div
            className="form-group"
            style={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: "0px",
            }}
          >
            <TextField
              name="confirmPin"
              label="Confirm PIN Code*"
              margin="normal"
              type={showConfirmPin ? "text" : "password"}
              fullWidth
              onChange={handleChange}
              value={confirmPin}
              inputProps={{ maxLength: 4 }}
              style={styles.input}
            />
            {showConfirmPin ? (
              <i style={{ cursor: "pointer" }}>
                <FaRegEyeSlash
                  onClick={() => toogleVisibility("showConfirmPin", false)}
                />
              </i>
            ) : (
              <i style={{ cursor: "pointer" }}>
                <FaRegEye
                  onClick={() => toogleVisibility("showConfirmPin", true)}
                />
              </i>
            )}
          </div>
          {validator.message("confirmPin", confirmPin, "required|numeric")}
          {confirmPin !== pin && !match && (
            <div>
              <p style={{ color: "red", fontSize: "14px", fontWeight: "400" }}>
                PIN code didn't match
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="row ">
        <div className="col-4">
          <div className="form-group">
            <label>Role</label>
            <Select
              options={roles}
              onChange={handleSelect}
              name="nameRole"
              value={nameRole}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label>Status</label>

            <Select
              options={status}
              onChange={handleSelect}
              name="isDisabled"
              value={isDisabled}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <label>Image</label>

          <div className="form-group">
            {imagePreviewUrl !== null ? (
              <img
                src={imagePreviewUrl}
                alt="avatar"
                height={206}
                width={206}
              />
            ) : (
              <img
                src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
                alt="avatar"
                height={206}
                width={206}
              />
            )}
          </div>
          <input
            type="file"
            style={{
              width: "250px",
              fontWeight: "normal",
              borderBottom: "none",
            }}
            name="imagePreviewUrl"
            id="file"
            onChange={(e) => uploadFile(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default General;

const styles = {
  input: {
    marginTop: "0px",
  },
  pin: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: "10px",
  },
};
