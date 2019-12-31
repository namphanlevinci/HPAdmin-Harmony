import React from "react";
import TextField from "@material-ui/core/TextField";

const License = ({
  validator,
  handleChange,
  state: { driverlicense, socialSecurityNumber, professionalLicense }
}) => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-8">
        <div className="form-group">
          <TextField
            name="driverlicense"
            label="Driver License"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            required
            value={driverlicense}
          />
          {/* {validator.message(
            "driverlicense",
            driverlicense,
            "required|numeric"
          )} */}
        </div>
      </div>
      <div className="col-8">
        <div className="form-group">
          <TextField
            name="socialSecurityNumber"
            label="Social Security Number"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            required
            value={socialSecurityNumber}
          />
          {/* {validator.message(
            "socialSecurityNumber",
            socialSecurityNumber,
            "required|numeric"
          )} */}
        </div>
      </div>
      <div className="col-8">
        <div className="form-group">
          <TextField
            name="professionalLicense"
            label="Professional License"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            required
            value={professionalLicense}
          />
          {/* {validator.message(
            "professionalLicense",
            professionalLicense,
            "required|numeric"
          )} */}
        </div>
      </div>
    </div>
  </div>
);

export default License;
