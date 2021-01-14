import React from "react";
import { TextField, Grid } from "@material-ui/core";
import MaterialUiPhoneNumber from "material-ui-phone-number";

import "react-phone-number-input/style.css";

const General = ({
  handleChange,
  values: { phone, email, address, birthDate, loading },
  errors,
  touched,
  setFieldValue,
}) => {
  return (
    <div>
      <h2 style={styles.h2}>Contact Information</h2>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MaterialUiPhoneNumber
            onlyCountries={["us", "vn"]}
            label="Phone"
            name="phone"
            value={phone}
            onChange={(e) => setFieldValue("phone", e)}
            fullWidth
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone ? errors.phone : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Address"
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            fullWidth
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address ? errors.address : ""}
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
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email ? errors.email : ""}
          />
        </Grid>
      </Grid>

      <h2 style={styles.h2}>Basic Information</h2>

      <div>
        <div style={{ display: "inline" }}>
          <label>Date of Birth: </label>
        </div>
        <div style={{ display: "inline", paddingLeft: "15px" }}>
          <br />
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
              error={touched.birthDate && Boolean(errors.birthDate)}
              helperText={touched.birthDate ? errors.birthDate : ""}
            />
          )}
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
