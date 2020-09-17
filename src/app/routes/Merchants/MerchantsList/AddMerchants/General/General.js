import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";

export default function General(props) {
  const {
    formField: { businessName, doingBusiness, tax, address },
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name={businessName.name}
            label={businessName.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={doingBusiness.name}
            label={doingBusiness.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
