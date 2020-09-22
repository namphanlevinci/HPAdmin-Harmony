import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";
import CustomNumberField from "../FormFields/CustomNumberField";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputCustom from "../../addMerchant/custom-input";

export default function General(props) {
  const {
    formField: { businessName, doingBusiness, tax, address },
    handleChange,
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        General Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <InputField
            name={businessName.name}
            label={businessName.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField
            name={doingBusiness.name}
            label={doingBusiness.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomNumberField
            name={tax.name}
            label={tax.label}
            options={{
              numericOnly: true,
              blocks: [2, 7],
            }}
            fullWidth
          />

          <FormControl style={{ width: "100%", marginTop: "16px" }}>
            <InputLabel htmlFor="formatted-text-mask-input">
              Federal Tax ID*
            </InputLabel>
            <Input
              onChange={handleChange}
              name="tax"
              id="custom-tax-input"
              inputProps={{
                block: [2, 7],
                // numericOnly: true,
              }}
              inputComponent={InputCustom}
            />
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
