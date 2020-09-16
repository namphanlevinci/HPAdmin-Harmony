import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import TextField from "@material-ui/core/TextField";
// import Select from "react-select";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputCustom from "../../../../MerchantsList/addMerchant/custom-input";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import ReactImageAppear from "react-image-appear";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import CustomSelect from "../../../../../../../util/getState";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import "react-phone-input-2/lib/high-res.css";

const General = ({
  handleMISelect,
  handleSelect,
  handleChange,
  uploadFile,
  toggleVisibility,
  handleCheckBox,
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
    isActive,
    progressLoading,
  },
  validator,
}) => {
  // const { errorMessages, fields,  } = validator;
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-4">
          <TextField
            name="firstName"
            label="First Name*"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            value={firstName}
            style={styles.input}
          />

          {validator.message("firstName", firstName, "required|string")}
        </div>
        <div className="col-4">
          <TextField
            name="lastName"
            label="Last Name*"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            value={lastName}
            style={styles.input}
          />
          {validator.message("lastName", lastName, "required|string")}
        </div>
        <div className="col-4">
          <TextField
            name="displayName"
            label="Display Name*"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            value={displayName}
            style={styles.input}
          />
          {validator.message("displayName", displayName, "required|string")}
        </div>
        <div className="col-4">
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
        <div className="col-4">
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
        <div className="col-4">
          <CustomSelect
            name="state"
            label="State*"
            initialValue={state}
            handleChange={handleMISelect}
            margin="normal"
          />
        </div>
        <div className="col-4">
          <FormControl style={{ width: "100%", marginTop: "16px" }}>
            <InputLabel shrink htmlFor="formatted-text-mask-input">
              Zip Code
            </InputLabel>
            <Input
              value={zip}
              onChange={handleChange}
              name="zip"
              id="custom-zip-input"
              inputProps={{
                block: [5],
                numericOnly: true,
              }}
              inputComponent={InputCustom}
            />
          </FormControl>
        </div>

        <div className="col-4">
          <MaterialUiPhoneNumber
            label="Phone"
            name="cellphone"
            value={cellphone}
            onChange={handlePhone}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="col-4">
          <TextField
            name="email"
            label="Contact Email"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            value={email}
          />
        </div>
      </div>
      <div className="row">
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
              name="pin"
              label="Create PIN*"
              margin="large"
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
                  onClick={() => toggleVisibility("showPin", false)}
                />
              </i>
            ) : (
              <i style={{ cursor: "pointer" }}>
                <FaRegEye onClick={() => toggleVisibility("showPin", true)} />
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
              label="Confirm PIN*"
              margin="large"
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
                  onClick={() => toggleVisibility("showConfirmPin", false)}
                />
              </i>
            ) : (
              <i style={{ cursor: "pointer" }}>
                <FaRegEye
                  onClick={() => toggleVisibility("showConfirmPin", true)}
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
      <div className="row" style={{ paddingTop: "15px" }}>
        <div className="col-4">
          <div className="form-group">
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Role</InputLabel>
              <Select
                name="nameRole"
                value={nameRole}
                onChange={handleMISelect}
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="isDisabled"
                value={isDisabled}
                onChange={handleMISelect}
              >
                <MenuItem value="0">Active</MenuItem>
                <MenuItem value="1">Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="col-4">
          <label></label>
          <div className="form-group">
            <FormControl component="fieldset">
              {/* <FormLabel component="legend"></FormLabel> */}
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="true"
                  checked={isActive}
                  control={<Checkbox color="primary" />}
                  onChange={handleCheckBox("isActive")}
                  label="Visible on app"
                  labelPlacement="end"
                  // margin="normal"
                />
              </FormGroup>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <label>Image</label>

          <div className="form-group">
            {imagePreviewUrl !== "" ? (
              <ReactImageAppear
                src={imagePreviewUrl}
                alt="avatar"
                className="staff_avatar"
              />
            ) : (
              <img
                src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
                alt="avatar"
                height={250}
                width={250}
                style={{ borderRadius: "50%" }}
              />
            )}

            {/* {progressLoading ? (
              <div style={{ width: "34%", paddingTop: "10px" }}>
                <LinearProgress />
              </div>
            ) : null} */}
          </div>
          <input
            type="file"
            style={{
              width: "34%",
              fontWeight: "normal",
              borderBottom: "none",
            }}
            className="custom-input"
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
