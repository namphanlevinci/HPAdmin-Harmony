import React from "react";
import TextField from "@material-ui/core/TextField";
import MaterialUiPhoneNumber from "material-ui-phone-number";

import "react-phone-number-input/style.css";

const General = ({
  handleChange,
  handlePhone,
  data: { phone, email, address, birthDate, password, loading },
}) => {
  console.log("handlePhone", handlePhone);
  console.log("handleChange", handleChange);
  return (
    <div>
      <h2 style={styles.h2}>Contact Information</h2>

      <div className="row">
        <div className="col-3">
          <MaterialUiPhoneNumber
            onlyCountries={["us", "vn"]}
            label="Phone"
            value={phone}
            onChange={handlePhone}
            fullWidth
          />
        </div>
        <div className="col-4">
          <TextField
            label="Address"
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="col-5">
          <TextField
            label="Email"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
      </div>

      <h2 style={styles.h2}>Basic Information</h2>

      <div>
        <div style={{ display: "inline" }}>
          <label>Date of Birth: </label>
        </div>
        <div style={{ display: "inline", paddingLeft: "15px" }}>
          <form noValidate>
            {loading && (
              <TextField
                id="date"
                type="date"
                name="birthDate"
                defaultValue={birthDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default General;

const styles = {
  h2: {
    fontWeight: "500",
    color: "#4251af",
  },
};
