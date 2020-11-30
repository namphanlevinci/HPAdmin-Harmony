import React from "react";
import { TextField, Grid } from "@material-ui/core";
import MaterialUiPhoneNumber from "material-ui-phone-number";

import "react-phone-number-input/style.css";

const General = ({
  handleChange,
  handlePhone,
  data: { phone, email, address, birthDate, password, loading },
}) => {
  return (
    <div>
      <h2 style={styles.h2}>Contact Information</h2>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <MaterialUiPhoneNumber
            onlyCountries={["us", "vn"]}
            label="Phone"
            value={phone}
            onChange={handlePhone}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Address"
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Email"
            fullWidth
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

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
    color: "#0764B0",
  },
};
