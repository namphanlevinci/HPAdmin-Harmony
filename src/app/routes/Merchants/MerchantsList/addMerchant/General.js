import React from "react";
import TextField from "@material-ui/core/TextField";

const General = ({
  stepIndex,
  handleChange,
  touched,
  handleBlur,
  values,
  errors
}) => {
  return (
    <div>
      <h1>General Information</h1>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="legalBusinessName"
              label="Legal Business Name"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              required
            />
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
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="taxCode"
              label="Tax ID"
              type="text"
              autoComplete="current-password"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3 mx-auto">
          <div className="form-group">
            <TextField
              name="address"
              label="DBA Address"
              margin="normal"
              type="text"
              fullWidth
              required
              onChange={handleChange}
            />
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
            />
          </div>
        </div>
        <div className="col-3">
          <div className="form-group">
            <TextField
              name="state"
              label="State"
              type="text"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <TextField
              name="zip"
              label="Zip"
              type="number"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <label>Country Code*</label>
          <div className="">
            <select
              style={{ padding: "10px", width: "100%" }}
              onChange={handleChange}
            >
              <option value="+1">+1</option>
              <option value="+84">+84</option>
            </select>
          </div>
        </div>
        <div className="col-5">
          <div className="form-group">
            <TextField
              name="phoneNumberBusiness"
              label="Phone number"
              type="number"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
            />
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
            />
          </div>
        </div>
        <div className="col-md-4">
          <label>Contact Name*</label>
          <div className="form-group">
            <TextField
              name="firstName"
              label="First Name"
              type="text"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-5">
          <label style={{ color: "white" }}>Last Name*</label>
          <div className="form-group">
            <TextField
              name="lastName"
              label="Last Name"
              type="text"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-9">
          <label>Title/Position*</label>
          <div className="form-group">
            <TextField
              name="position"
              label="Position"
              type="text"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-3">
          <label>Contact Phone Number*</label>
          <div className="">
            <select
              style={{ padding: "10px", width: "100%" }}
              onChange={handleChange}
            >
              <option value="+1">+1</option>
              <option value="+84">+84</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <label style={{ color: "white" }}>Business Phone Number*</label>
          <div className="form-group">
            <TextField
              name="phoneNumberContact"
              label="Phone number"
              type="number"
              margin="normal"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
