import React from "react";
import TextField from "@material-ui/core/TextField";
import StateID from "../../../../../util/getState";
const General = ({ handleChange, value, validator }) => {
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
              label="Tax ID"
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
        <div className="col-3">
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
        <div className="col-md-3">
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
        <div className="col-3">
          <label>State</label>
          <div>
            <select
              name="state"
              style={{ padding: "11px", width: "100%" }}
              onChange={handleChange}
            >
              <StateID />
            </select>
          </div>
        </div>
        <div className="col-3">
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
      </div>
      <div className="row">
        <div className="col-3">
          <label>Country Code*</label>
          <div>
            <select
              name="businessPhoneCode"
              style={{ padding: "10px", width: "100%" }}
            >
              <option
                checked={value.businessPhoneCode === +1 ? true : false}
                value="+1"
              >
                +1
              </option>
              <option
                checked={value.businessPhoneCode === +84 ? true : false}
                value="+84"
              >
                +84
              </option>
            </select>
          </div>
        </div>
        <div className="col-5">
          <div className="form-group">
            <TextField
              name="businessPhone"
              label="Phone number"
              type="number"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
              value={value.businessPhone}
            />
            {validator.message(
              "businessPhone",
              value.businessPhone,
              "required|string"
            )}
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
        <div className="row">
          <div className="col-4">
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
          <div className="col-4">
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
          <div className="col-4">
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
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-2">
            <div className="">
              <label>Country Code</label>
              <select
                name="contactPhoneCode"
                onChange={handleChange}
                style={{ padding: "10px", width: "100%" }}
              >
                <option
                  checked={value.contactPhoneCode === +1 ? true : false}
                  value="+1"
                >
                  +1
                </option>
                <option
                  checked={value.contactPhoneCode === +84 ? true : false}
                  value="+84"
                >
                  +84
                </option>
              </select>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <TextField
                name="contactPhone"
                label="Phone number"
                type="number"
                margin="normal"
                fullWidth
                required
                onChange={handleChange}
                value={value.contactPhone}
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
  );
};

export default General;
