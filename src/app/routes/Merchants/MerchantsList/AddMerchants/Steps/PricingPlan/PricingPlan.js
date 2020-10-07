import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";

function PricingPlan(props) {
  const { values, setFieldValue } = props;
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Package & Pricing
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        <p>Try Harmony Merchant free for 3 months , no credit card required</p>
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          aria-label={`PricingPlan`}
          name={`Pricing`}
          value={values.packagePricing}
          onChange={(e) =>
            setFieldValue("packagePricing", Number(e.target.value))
          }
        >
          <FormControlLabel
            // checked={value === 1}
            value={1}
            control={<Radio color="primary" />}
            label="Basic"
          />
          <FormControlLabel
            // checked={value === 2}
            value={2}
            control={<Radio color="primary" />}
            label="Medium"
          />
          <FormControlLabel
            // checked={value === 3}
            value={3}
            control={<Radio color="primary" />}
            label="Advanced"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default PricingPlan;
