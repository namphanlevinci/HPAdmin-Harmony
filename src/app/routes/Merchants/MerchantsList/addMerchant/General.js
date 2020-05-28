import React from "react";
import TextField from "@material-ui/core/TextField";
import StateID from "../../../../../util/getState";
import PhoneInput from "react-phone-input-2";
import selectState from "../../../../../util/selectState";
import Select from "react-select";
import MaskedInput from "react-text-mask";

import "react-phone-input-2/lib/high-res.css";

const countryCode = [
  { value: "+1", label: "+1" },
  { value: "+84", label: "+84" },
];

const General = ({
  handleChange,
  value,
  validator,
  handleNumber,
  handleSelect,
  handleCountryCode,
}) => {
  return (
    <div className="general-container">
      <h1>General Information</h1>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="businessName"
              label="Legal Business Name"
              margin="normal"
              type="text"
              fullWidth
              required
              onChange={handleChange}
              value={value.businessName}
            />
            {validator.message(
              "businessName",
              value.businessName,
              "required|string"
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="doingBusiness"
              label="DBA"
              type="text"
              autoComplete="doingBusiness"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
              value={value.doingBusiness}
            />
            {validator.message(
              "doingBusiness",
              value.doingBusiness,
              "required|string"
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="tax"
              label="Federal Tax ID"
              type="text"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
              value={value.tax}
            />
            {validator.message("tax", value.tax, "required|string")}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="address"
              label="DBA Address"
              margin="normal"
              type="text"
              fullWidth
              required
              onChange={handleChange}
              value={value.address}
            />
            {validator.message("address", value.address, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="city"
              label="City"
              type="text"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
              value={value.city}
            />
            {validator.message("city", value.city, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <label>State</label>
          <div>
            <Select
              // value={this.state.state}
              onChange={handleSelect}
              name="state"
              options={selectState}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="zip"
              label="Zip"
              type="number"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
              value={value.zip}
            />
            {validator.message("zip", value.zip, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <div style={{ width: "100%" }}>
            {/* <label>Business Phone Number</label>
            <PhoneInput
              style={{ marginTop: "10px" }}
              country={"us"}
              placeholder="Business Phone Number"
              name="businessPhone"
              value={value.businessPhone}
              onChange={(e) => handleNumber(e, "businessPhone")}
            />

            {validator.message(
              "businessPhone",
              value.businessPhone,
              "required|string"
            )} */}
            <div className="row form-group" style={{ marginTop: "10px" }}>
              <div className="col-5">
                <label> Code</label>
                <Select
                  options={countryCode}
                  defaultValue={{
                    label: `${value.businessPhoneCode}`,
                  }}
                  name="businessPhoneCode"
                  onChange={handleCountryCode}
                />
              </div>
              <div className="col-7" style={styles.phoneInput}>
                <label> Business Phone Number</label>
                <MaskedInput
                  mask={[
                    /[1-9]/,
                    /\d/,
                    /\d/,
                    "-",

                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  className="form-control"
                  style={{ padding: "8px 0px" }}
                  guide={false}
                  name="businessPhone"
                  onChange={handleNumber}
                />
                {validator.message(
                  "businessPhone",
                  value.businessPhone,
                  "required|string"
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="email"
              label="Email"
              type="email"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
              value={value.email}
            />
            {validator.message("email", value.email, "required|email")}
          </div>
        </div>
      </div>
      <div>
        <h1>Representative Information</h1>
        <div className="row  justify-content-center">
          <div className="col-6">
            <div className="form-group">
              <TextField
                name="firstName"
                label="First Name"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={handleChange}
                value={value.firstName}
              />
              {validator.message(
                "firstName",
                value.firstName,
                "required|string"
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <TextField
                name="lastName"
                label="Last Name"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={handleChange}
                value={value.lastName}
              />
              {validator.message("lastName", value.lastName, "required|string")}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="form-group">
              <TextField
                name="position"
                label="Position"
                type="text"
                margin="normal"
                fullWidth
                required
                onChange={handleChange}
                value={value.position}
              />
              {validator.message("position", value.position, "required|string")}
            </div>
          </div>
          <div className="col-6">
            <div>
              {/* <label>Phone Number</label> */}
              {/* <PhoneInput
                country={"us"}
                style={{ marginTop: "10px" }}
                placeholder="Phone Number"
                name="contactPhone"
                value={value.contactPhone}
                onChange={(e) => handleNumber(e, "contactPhone")}
              />
              {validator.message(
                "contactPhone",
                value.contactPhone,
                "required|string"
              )} */}
              <div className="row form-group" style={{ marginTop: "10px" }}>
                <div className="col-5">
                  <label>Code</label>
                  <Select
                    options={countryCode}
                    defaultValue={{
                      label: `${value.contactPhoneCode}`,
                    }}
                    name="contactPhoneCode"
                    onChange={handleCountryCode}
                  />
                </div>
                <div className="col-7" style={styles.phoneInput}>
                  <label> Contact Phone Number</label>
                  <MaskedInput
                    mask={[
                      /[1-9]/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                    className="form-control"
                    style={{ padding: "8px 0px" }}
                    guide={false}
                    name="contactPhone"
                    onChange={handleNumber}
                  />
                  {validator.message(
                    "contactPhone",
                    value.contactPhone,
                    "required|string"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;

const styles = {
  phoneInput: {
    padding: "0px 0px",
    // marginTop: "3px",
  },
};
