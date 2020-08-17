import React from "react";
import TextField from "@material-ui/core/TextField";
import PhoneInput from "react-phone-input-2";
import InputCustom from "./custom-input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomSelect from "../../../../../util/getState";
import FormGroup from "@material-ui/core/FormGroup";

import "react-phone-input-2/lib/high-res.css";

const General = ({
  handleChange,
  value,
  validator,
  handlePhone,
  handleCheckBox,
  handleSelect,
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
                  // numericOnly: true,
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
        <div className="col-3">
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
        <div className="col-3">
          <div style={{ marginTop: "16px" }}>
            <CustomSelect
              name="state"
              label="State Issued*"
              initialValue={value.state}
              handleChange={handleSelect}
            />
          </div>
          {validator.message("state", value.state, "required|integer")}
        </div>
        <div className="col-2">
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

            {validator.message("zip", value.zip, "required|integer")}
          </div>
        </div>
      </div>

      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={value.sameAsBA}
                onChange={handleCheckBox}
                defaultValue="true"
                name="sameAsBA"
                color="primary"
                value="true"
              />
            }
            label="Same as Business Address"
          />
        </FormGroup>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="dbaAddress"
              label="DBA Address*"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              value={value.dbaAddress}
            />
            {validator.message("dbaAddress", value.dbaAddress, "required")}
          </div>
        </div>
        <div className="col-3">
          <div className="form-group">
            <TextField
              name="dbaCity"
              label="City*"
              type="text"
              margin="normal"
              fullWidth
              onChange={handleChange}
              value={value.dbaCity}
            />
            {validator.message("dbaCity", value.dbaCity, "required")}
          </div>
        </div>
        <div className="col-3">
          <div style={{ marginTop: "16px" }}>
            <CustomSelect
              name="dbaState"
              label="State Issued*"
              initialValue={value.dbaState}
              handleChange={handleSelect}
            />
            {validator.message("dbaState", value.dbaState, "required")}
          </div>
        </div>
        <div className="col-2">
          <div className="form-group">
            <FormControl style={{ width: "100%", marginTop: "16px" }}>
              <InputLabel htmlFor="formatted-text-mask-input">
                Zip Code*
              </InputLabel>
              <Input
                value={value.dbaZip}
                onChange={handleChange}
                name="dbaZip"
                id="custom-zip-input"
                inputProps={{
                  block: [5],
                  numericOnly: true,
                }}
                inputComponent={InputCustom}
              />
            </FormControl>
            {validator.message("dbaZip", value.dbaZip, "required")}
          </div>
        </div>
      </div>

      <div className="row">
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
          <div style={{ width: "80%" }}>
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
