import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import { InputAdornment } from "@material-ui/core";
import CustomCurrencyField from "../FormFields/CustomCurrencyField";

function Salary(props) {
  const {
    setFieldValue,
    initValue: { productSalary, salary, tipFee },
  } = props;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Salary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={salary.perHour.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) => [
                  setFieldValue("salary.perHour.isCheck", e.target.checked),
                  setFieldValue("salary.commission.isCheck", !e.target.checked),
                  setFieldValue("salary.commission.value", (0).toFixed(2)),
                ]}
                label="Salary Per Hour"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            name="salary.perHour.value"
            onChange={(e, i) => setFieldValue("salary.perHour.value", i)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            disabled={!salary.perHour.isCheck}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={salary.commission.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) => [
                  setFieldValue("salary.commission.isCheck", e.target.checked),
                  setFieldValue("salary.perHour.isCheck", !e.target.checked),
                  setFieldValue("salary.perHour.value", (0).toFixed(2)),
                ]}
                label="Salary Commission"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            name="salary.commission.value"
            onChange={(e, i) => [setFieldValue("salary.commission.value", i)]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
            disabled={!salary.commission.isCheck}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(
                    `productSalary.commission.isCheck`,
                    e.target.checked
                  )
                }
                label="Product Commission"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            name="productSalary.commission.value"
            onChange={(e, i) => [
              setFieldValue("productSalary.commission.value", i),
              console.log("i", e.target),
              console.log("i", i),
            ]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
            disabled={!productSalary.commission.isCheck}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={tipFee.percent.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) => [
                  setFieldValue("tipFee.percent.isCheck", e.target.checked),
                  setFieldValue(
                    "tipFee.fixedAmount.isCheck",
                    !e.target.checked
                  ),
                  setFieldValue("tipFee.fixedAmount.value", (0).toFixed(2)),
                ]}
                label="Tip Percent"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            name="tipFee.percent.value"
            onChange={(e, i) => [setFieldValue("tipFee.percent.value", i)]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
            disabled={!tipFee.percent.isCheck}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={tipFee.fixedAmount.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) => [
                  setFieldValue("tipFee.fixedAmount.isCheck", e.target.checked),
                  setFieldValue("tipFee.percent.isCheck", !e.target.checked),
                  setFieldValue("tipFee.percent.value", (0).toFixed(2)),
                ]}
                label="Tip Fixed Amount"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            name="tipFee.fixedAmount.value"
            onChange={(e, i) => [setFieldValue("tipFee.fixedAmount.value", i)]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            disabled={!tipFee.fixedAmount.isCheck}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={true}
                control={<Checkbox color="primary" />}
                label="Payout With Cash"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            name="cashPercent"
            onChange={(e, i) => [setFieldValue("cashPercent", i)]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Salary;
