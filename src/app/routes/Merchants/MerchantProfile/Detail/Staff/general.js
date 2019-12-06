import React from "react";
import TextField from "@material-ui/core/TextField";
import StateID from "../../../../../../util/getState";
const General = ({
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
    imagePreviewUrl
  },
  validator
}) => {
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
              required
              value={street}
            />
            {validator.message("street", street, "required|string")}
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
              required
              value={city}
            />
            {validator.message("city", street, "required|string")}
          </div>
        </div>
        <div className="col-3">
          <label>State</label>
          <div className="form-group" style={{ marginTop: "15px" }}>
            <select
              name="state"
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              <StateID />
            </select>
            {validator.message("state", state, "required|string")}
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
              required
              value={zip}
            />
            {validator.message("zip", zip, "required|numeric")}
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="cellphone"
              label="Cell phone"
              margin="normal"
              type="number"
              fullWidth
              onChange={handleChange}
              required
              value={cellphone}
            />
            {validator.message("cellphone", cellphone, "required|numeric")}
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
              required
              value={email}
            />
            {validator.message("email", email, "required|email")}
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
              required
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
              required
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
            <select
              onChange={handleChange}
              name="nameRole"
              style={{ width: "100%", height: "40px" }}
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label>Status</label>
            <select
              onChange={handleChange}
              name="isDisabled"
              style={{ width: "100%", height: "40px" }}
            >
              <option value="0">Active</option>
              <option value="1">Disable</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="form-group">
            {imagePreviewUrl !== null ? (
              <img
                src={imagePreviewUrl}
                alt="avatar"
                height={256}
                width={256}
              />
            ) : (
              <img
                src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
                alt="avatar"
                height={256}
                width={256}
              />
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label>Upload staff avatar:</label>
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
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
