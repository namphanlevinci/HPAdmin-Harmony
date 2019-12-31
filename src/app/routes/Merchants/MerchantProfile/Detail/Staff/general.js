import React from "react";
import TextField from "@material-ui/core/TextField";
import State from "../../../../../../util/InitialState";
import Select from "react-select";

const General = ({
  handleSelect,
  handleChange,
  uploadFile,
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
    countryCode
  },
  validator
}) => {
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" }
  ];

  const status = [
    { value: "0", label: "Active" },
    {
      value: "1",
      label: "Disable"
    }
  ];

  const phoneCode = [
    { value: "+1", label: "+1" },
    { value: "+84", label: "+84" }
  ];
  return (
    <div className="container">
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
            />
            {validator.message("lastName", lastName, "required|string")}
          </div>
        </div>
        <div className="col-8">
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
            />
            {validator.message("displayName", displayName, "required|string")}
          </div>
        </div>
        <div className="col-8">
          <div className="form-group">
            <TextField
              name="street"
              label="Address"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              value={street}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-3">
          <div className="form-group">
            <TextField
              name="city"
              label="City"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              value={city}
            />
          </div>
        </div>
        <div className="col-3">
          <div className="form-group" style={{ marginTop: "10px" }}>
            <label>State</label>
            <Select
              name="state"
              options={State}
              onChange={handleSelect}
              value={state}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="form-group">
            <TextField
              name="zip"
              label="Zip"
              margin="normal"
              type="number"
              fullWidth
              onChange={handleChange}
              value={zip}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", padding: "8px 20px 0px 0px" }}>
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
            />
          </div>
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
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="pin"
              label="PIN Code"
              margin="normal"
              type="password"
              fullWidth
              value={pin}
              onChange={handleChange}
              inputProps={{ maxLength: 4 }}
            />
            {validator.message("pin", pin, "required|numeric")}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="confirmPin"
              label="Confirm PIN Code"
              margin="normal"
              type="password"
              fullWidth
              onChange={handleChange}
              value={confirmPin}
              inputProps={{ maxLength: 4 }}
            />
            {validator.message("confirmPin", confirmPin, "required|numeric")}
            {confirmPin !== pin && !match && (
              <div>
                <p
                  style={{ color: "red", fontSize: "14px", fontWeight: "400" }}
                >
                  PIN code didn't match
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
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
        <div className="col-8">
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
              borderBottom: "none"
            }}
            name="imagePreviewUrl"
            id="file"
            onChange={e => uploadFile(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default General;
