import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import "./addMerchant.css";

const PricingPlan = ({ value, handleChangePricingPlan }) => {
  return (
    <div>
      <p className="txtPricingPlan">Package & Pricing</p>
      <p>Try Harmony Merchant free for 3 months , no credit card required</p>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label={`PricingPlan`}
          name={`Pricing`}
          value={value}
          onChange={handleChangePricingPlan}
        >
          <FormControlLabel
            // checked={value === 1}
            value="1"
            control={<Radio color="primary" />}
            label="Basic"
          />
          <FormControlLabel
            // checked={value === 2}
            value="2"
            control={<Radio color="primary" />}
            label="Medium"
          />
          <FormControlLabel
            // checked={value === 3}
            value="3"
            control={<Radio color="primary" />}
            label="Advanced"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PricingPlan;
