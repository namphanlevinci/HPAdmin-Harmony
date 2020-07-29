import React from "react";
import TextField from "@material-ui/core/TextField";
import PhoneInput from "react-phone-input-2";
import selectState from "../../../../../util/selectState";
import Select from "react-select";
import InputCustom from "./custom-input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import "react-phone-input-2/lib/high-res.css";

const General = ({
  handleChange,
  value,
  validator,
  handleNumber,
  handleSelect,
  handlePhone,
}) => {
  return (
    <div className="general-container">
      <h1>General Information</h1>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="businessName"
              label="Legal Business Name*"
              margin="normal"
              type="text"
              fullWidth
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
              label="Doing Business As* (DBA)"
              type="text"
              autoComplete="doingBusiness"
              margin="normal"
              fullWidth
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
            {/* <TextField
              name="tax"
              label="Federal Tax ID*"
              type="text"
              margin="normal"
              fullWidth
              onChange={handleChange}
              value={value.tax}
              inputProps={{ maxLength: 9 }}
            /> */}

            <FormControl style={{ width: "100%", marginTop: "16px" }}>
              <InputLabel htmlFor="formatted-text-mask-input">
                Federal Tax ID*
              </InputLabel>
              <Input
                value={value.tax}
                onChange={handleChange}
                name="tax"
                id="custom-tax-input"
                inputProps={{
                  block: [2, 7],
                  numericOnly: true,
                }}
                inputComponent={InputCustom}
              />
            </FormControl>

            {validator.message("tax", value.tax, "required|string")}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="address"
              label="Business Address* (no P.O. Boxes)"
              margin="normal"
              type="text"
              fullWidth
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
              label="City*"
              type="text"
              margin="normal"
              fullWidth
              onChange={handleChange}
              value={value.city}
            />
            {validator.message("city", value.city, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <label>State Issued*</label>
          <div>
            <Select
              // value={this.state.state}
              onChange={handleSelect}
              name="state"
              options={selectState}
            />
            {validator.message("state", value.state, "required|string")}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <FormControl style={{ width: "100%", marginTop: "16px" }}>
              <InputLabel htmlFor="formatted-text-mask-input">
                Zip Code*
              </InputLabel>
              <Input
                value={value.zip}
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

            {validator.message("zip", value.zip, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="email"
              label="Email Contact*"
              type="email"
              margin="normal"
              fullWidth
              onChange={handleChange}
              value={value.email}
            />
            {validator.message("email", value.email, "required|email")}
          </div>
        </div>
        <div className="col-4">
          <div style={{ width: "100%" }}>
            <label>Business Phone Number*</label>
            <PhoneInput
              style={{ marginTop: "10px" }}
              country={"us"}
              placeholder="Business Phone Number"
              name="businessPhone"
              value={value.businessPhone}
              onChange={(e) => handlePhone(e, "businessPhone")}
            />

            {validator.message(
              "businessPhone",
              value.businessPhone,
              "required|string"
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <TextField
                name="firstName"
                label="First Name*"
                type="text"
                margin="normal"
                fullWidth
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
                label="Last Name*"
                type="text"
                margin="normal"
                fullWidth
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
                label="Title/Position*"
                type="text"
                margin="normal"
                fullWidth
                onChange={handleChange}
                value={value.position}
              />
              {validator.message("position", value.position, "required|string")}
            </div>
          </div>
          <div className="col-6">
            <div>
              <label>Contact Phone Number*</label>
              <PhoneInput
                country={"us"}
                style={{ marginTop: "10px" }}
                placeholder="Contact Phone Number"
                name="contactPhone"
                value={value.contactPhone}
                onChange={(e) => handlePhone(e, "contactPhone")}
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
