import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import { InputAdornment, IconButton } from "@material-ui/core";
import CustomCurrencyField from "../FormFields/CustomCurrencyField";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
function Salary(props) {
  const {
    handleChange,
    setFieldValue,

    initValue: { productSalary, salary, tipFee },
  } = props;
  console.log("initValue", props.initValue);

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
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(`salary.perHour.isCheck`, e.target.checked)
                }
                label="Salary Per Hour"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            name="salary.perHour.value"
            onChange={(e, i) => setFieldValue("salary.perHour.value", i)}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">$</InputAdornment>
            //   ),
            // }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  setFieldValue(`salary.commission.isCheck`, e.target.checked)
                }
                label="Salary Commission"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            name="salary.commission.value"
            onChange={(e, i) => [
              setFieldValue("salary.commission.value", i),
              console.log("i", e.target),
              console.log("i", i),
            ]}
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
