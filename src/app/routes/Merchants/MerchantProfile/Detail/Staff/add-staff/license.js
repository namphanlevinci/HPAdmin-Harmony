import React from "react";
import TextField from "@material-ui/core/TextField";
import InputCustom from "../../../../MerchantsList/addMerchant/custom-input";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

const License = ({
  validator,
  handleChange,
  state: { driverlicense, socialSecurityNumber, professionalLicense },
}) => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="form-group">
          <TextField
            name="driverlicense"
            label="Driver License"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            // required
            value={driverlicense}
          />
          {/* {validator.message(
            "driverlicense",
            driverlicense,
            "required|numeric"
          )} */}
        </div>
      </div>
      <div className="col-12">
        <div className="form-group">
          <FormControl style={{ width: "100%", marginTop: "10px" }}>
            <InputLabel htmlFor="formatted-text-mask-input">
              Social Security Number
            </InputLabel>
            <Input
              name="socialSecurityNumber"
              label="Social Security Number"
              margin="normal"
              type="text"
              fullWidth
              onChange={handleChange}
              value={socialSecurityNumber}
              id="custom-ssn-input"
              inputProps={{
                block: [3, 2, 4],
                numericOnly: true,
              }}
              inputComponent={InputCustom}
            />
          </FormControl>

          {/* {validator.message(
            "socialSecurityNumber",
            socialSecurityNumber,
            "required|numeric"
          )} */}
        </div>
      </div>
      <div className="col-12">
        <div className="form-group">
          <TextField
            name="professionalLicense"
            label="Professional License"
            margin="normal"
            type="text"
            fullWidth
            onChange={handleChange}
            // required
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
