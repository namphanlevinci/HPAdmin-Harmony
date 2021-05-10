import React from "react";
import { Grid } from "@material-ui/core";
import { FieldArray } from "formik";
import { InputAdornment } from "@material-ui/core";
import { CustomTitle } from "../../../../../../../../util/CustomText";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import CustomCurrencyField from "../FormFields/CustomCurrencyField";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function Salary(props) {
  const {
    setFieldValue,
    initValue: { productSalary, salary, tipFee },
  } = props;

  const { value: commissionValue } = salary.commission;
  return (
    <div>
      <CustomTitle value="Salary" styles={{ padding: "15px 0px" }} />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={salary.perHour.isCheck}
                control={<Checkbox color="primary" />}
                onChange={(e) => [
                  setFieldValue("salary.perHour.isCheck", e.target.checked),
                  setFieldValue("salary.commission.isCheck", !e.target.checked),
                  setFieldValue("salary.commission.value", [
                    {
                      from: (0).toFixed(2),
                      to: (0).toFixed(2),
                      commission: (0).toFixed(2),
                    },
                  ]),
                ]}
                label="Salary Per Hour"
              />
            </FormGroup>
          </FormControl>{" "}
          <br />
          <CustomCurrencyField
            style={styles.input}
            name="salary.perHour.value"
            onChange={(e, i) => {
              setFieldValue("salary.perHour.value", e.target.value)
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            disabled={!salary.perHour.isCheck}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <FieldArray
          name={`salary.commission.value`}
          render={(arrayHelpers) => (
            <Grid item xs={12}>
              {commissionValue && commissionValue.length > 0 ? (
                commissionValue.map((commission, index) => {
                  return (
                    <Grid
                      container
                      spacing={2}
                      key={index}
                      className={index !== 0 && "salary_padding"}
                    >
                      <Grid item xs={4}>
                        <CustomCurrencyField
                          fullWidth
                          name={`salary.commission.value.${index}.from`}
                          onChange={(e, masked) =>
                            setFieldValue(
                              `salary.commission.value.${index}.from`,
                              masked
                            )
                          }
                          label="From"
                          style={styles.textField}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                          disabled={salary?.perHour?.isCheck ? true : false}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomCurrencyField
                          name={`salary.commission.value.${index}.to`}
                          onChange={(e, masked) =>
                            setFieldValue(
                              `salary.commission.value.${index}.to`,
                              masked
                            )
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                          style={styles.textField}
                          label="To"
                          disabled={salary?.perHour?.isCheck ? true : false}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CustomCurrencyField
                          name={`salary.commission.value.${index}.commission`}
                          onChange={(e, masked) =>
                            setFieldValue(
                              `salary.commission.value.${index}.commission`,
                              masked
                            )
                          }
                          label="Salary percented (%)"
                          style={styles.textField}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            ),
                          }}
                          disabled={salary?.perHour?.isCheck ? true : false}
                        />
                      </Grid>
                      {index !== 0 && (
                        <Grid item xs={1}>
                          <DeleteForeverIcon
                            onClick={() => arrayHelpers.remove(index)}
                            className="delete_icon"
                          />
                        </Grid>
                      )}
                      {salary?.commission?.value.length - 1 === index && (
                        <Grid>
                          <p
                            style={{
                              marginLeft: 35,
                              color: "#0764B0",
                              fontWeight: "600",
                              fontSize: 14,
                              marginTop: 30,
                              cursor: "pointer",
                              letterSpacing: 0.3,
                            }}
                            onClick={() => arrayHelpers.insert(index + 1, "")}
                          >
                            + Add more
                          </p>
                        </Grid>
                      )}
                    </Grid>
                  );
                })
              ) : (
                  <Grid>
                    <p
                      style={{
                        marginLeft: 35,
                        color: "#0764B0",
                        fontWeight: "600",
                        fontSize: 14,
                        marginTop: 30,
                        cursor: "pointer",
                        letterSpacing: 0.3,
                      }}
                      onClick={() => arrayHelpers.push("")}
                    >
                      + Add more
                  </p>
                  </Grid>
                )}
            </Grid>
          )}
        />
        <Grid item xs={12}>
          <CustomTitle value="Product Salary" />
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
            style={styles.input}
            name="productSalary.commission.value"
            onChange={(e, i) => [
              setFieldValue("productSalary.commission.value", e.target.value),
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
      <Grid item xs={12} style={styles.title}>
        <CustomTitle value="Tip Fee" />
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
            label="Percent"
            style={styles.input}
            name="tipFee.percent.value"
            onChange={(e, i) => [setFieldValue("tipFee.percent.value", e.target.value)]}
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
            label="Amount"
            style={styles.input}
            name="tipFee.fixedAmount.value"
            onChange={(e, i) => [setFieldValue("tipFee.fixedAmount.value", e.target.value)]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            disabled={!tipFee.fixedAmount.isCheck}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTitle value="Payout by Cash" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCurrencyField
            label="Percent"
            style={styles.input}
            name="cashPercent"
            onChange={(e, i) => [setFieldValue("cashPercent", e.target.value)]}
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

const styles = {
  div: {
    paddingTop: "20px",
  },
  input: {
    width: "95%",
    float: "right",
  },
  textField: {
    paddingLeft: "3%",
    width: "90%",
    float: "right",
  },
  icon: {
    cursor: "pointer",
  },
  title: {
    padding: "20px 0px",
  },
};

export default Salary;
