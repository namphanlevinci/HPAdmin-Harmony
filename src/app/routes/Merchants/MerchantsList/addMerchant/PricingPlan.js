import React, { Component } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import "./addMerchant.css";

const PricingPlan = ({ value, handleChangePricingPlan }) => {
  return (
    <div>
      <p className="txtPricingPlan">Package & Pricing</p>
      <p>
        Try Harmony MerchantMerchant free for 3 months , no credit card required
      </p>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label={`PricingPlan`}
          name={`Pricing`}
          value={value}
          onChange={(e) => handleChangePricingPlan(e)}
        >
          <FormControlLabel
            checked={value === 1}
            value={1}
            control={<Radio color="primary" />}
            label="Basic"
          />
          <FormControlLabel
            checked={value === 2}
            value={2}
            control={<Radio color="primary" />}
            label="Medium"
          />
          <FormControlLabel
            checked={value === 3}
            value={3}
            control={<Radio color="primary" />}
            label="Advanced"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PricingPlan;
