import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CustomNumberField from "../FormFields/CustomNumberField";

function License(props) {
  const { handleChange } = props;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        License
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <CustomNumberField
            name="driverlicense"
            label="Driver License"
            fullWidth
            options={{
              numericOnly: true,
              blocks: [20],
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomNumberField
            name="socialSecurityNumber"
            onChange={handleChange}
            label="Social Security Number"
            fullWidth
            options={{
              blocks: [3, 2, 4],
              delimiter: "-",
              numericOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomNumberField
            name="professionalLicense"
            label="Professional License"
            options={{
              numericOnly: true,
              blocks: [20],
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default License;
