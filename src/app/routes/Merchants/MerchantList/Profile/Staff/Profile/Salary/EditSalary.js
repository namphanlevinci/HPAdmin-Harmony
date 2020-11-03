import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStaffByID } from "../../../../../../../../actions/merchantActions";
import { Formik, Form, FieldArray } from "formik";
import { CustomTitle } from "../../../../../../../../util/CustomText";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CustomCurrencyInput from "../../../../../../../../util/CustomCurrencyInput";
import CustomCurrencyField from "../../AddStaff/FormFields/CustomCurrencyField";

import * as Yup from "yup";
import {
  InputAdornment,
  Grid,
  Checkbox,
  Button,
  Input,
  TextField,
} from "@material-ui/core";

class EditSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const Salary = this.props.Staff;
    const salaries = Salary?.salaries;
    const tipFees = Salary?.tipFees;
    const productSalaries = Salary?.productSalaries;

    this.setState({
      salaryValue: salaries?.perHour?.value,
      salaryIsCheck: salaries?.perHour?.isCheck,
      commIsCheck: salaries?.commission?.isCheck,
      commValue: salaries?.commission?.value,
      tipValue: tipFees?.percent?.value,
      tipIsCheck: tipFees?.percent?.isCheck,
      fixValue: tipFees?.fixedAmount?.value,
      fixIsCheck: tipFees?.fixedAmount?.isCheck,
      prodCommValue: productSalaries?.commission?.value,
      prodCommIsCheck: productSalaries?.commission?.isCheck,
      cashPercent: Salary?.cashPercent,
      loading: true,
    });
  }

  handleCheckBox = (event, setFieldValue) => {
    const { checked, name } = event.target;

    setFieldValue(`${name}`, checked);
    if (name === "salaryIsCheck" && checked === true) {
      setFieldValue(`commIsCheck`, false);
      setFieldValue(`commValue`, [
        {
          form: (0).toFixed(2),
          to: (0).toFixed(2),
          commission: (0).toFixed(2),
        },
      ]);
    }
    if (name === "commIsCheck" && checked === true) {
      setFieldValue(`salaryIsCheck`, false);
      setFieldValue(`salaryValue`, (0).toFixed(2));
    }
    if (name === "tipIsCheck" && checked === true) {
      setFieldValue(`fixIsCheck`, false);
      setFieldValue(`fixValue`, (0).toFixed(2));
    }
    if (name === "fixIsCheck" && checked === true) {
      setFieldValue(`tipIsCheck`, false);
      setFieldValue(`tipValue`, (0).toFixed(2));
    }
  };

  handleUpdateStaff = (values) => {
    const data = this.props.Staff;
    const StaffID = this.props.Staff.staffId;
    const MerchantID = this.props.MerchantData.merchantId;

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      cashPercent: values?.cashPercent,
      isActive: data.isActive,
      address: {
        street: data.address,
        city: data.city,
        state: data.stateId,
        zip: data.zip,
      },
      cellphone: data.phone,
      email: data.email,
      pin: data.pin,
      confirmPin: data.pin,
      fileId: data.fileId,
      isDisabled: Number(data.isDisabled),
      driverLicense: data.driverLicense,
      socialSecurityNumber: data.socialSecurityNumber,
      professionalLicense: data?.professionalLicense,
      workingTime: data.workingTimes,
      tipFee: {
        fixedAmount: {
          isCheck: values?.fixIsCheck,
          value: values?.fixValue,
        },
        percent: {
          isCheck: values?.tipIsCheck,
          value: values?.tipValue,
        },
      },
      salary: {
        commission: {
          isCheck: values?.commIsCheck,
          value: values?.commValue,
        },
        perHour: {
          isCheck: values?.salaryIsCheck,
          value: values?.salaryValue,
        },
      },
      productSalary: {
        commission: {
          isCheck: values?.prodCommIsCheck,
          value: values?.prodCommValue,
        },
      },
      Roles: {
        NameRole: data.roleName,
      },
      StaffID,
      MerchantID,
      path: "/app/merchants/staff/salary",
    };

    this.props.updateStaffByID(payload);
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        {loading && (
          <Formik
            initialValues={this.state}
            validationSchema={salarySchema}
            onSubmit={(values, { setSubmitting }) => {
              this.handleUpdateStaff(values);
            }}
          >
            {({
              setFieldValue,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} noValidate>
                <div className="container Salary">
                  <CustomTitle value="Salary" />

                  <Grid container spacing={1} style={{ paddingTop: "10px" }}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="checkbox">
                          <Checkbox
                            name="salaryIsCheck"
                            checked={values?.salaryIsCheck}
                            onChange={(e) =>
                              this.handleCheckBox(e, setFieldValue)
                            }
                            inputProps={{
                              "aria-label": "primary checkbox",
                            }}
                          />
                          <label>Salary Per Hour</label>
                        </div>
                        <Input
                          name="salaryValue"
                          type="tel"
                          separator="."
                          style={styles.input}
                          value={values?.salaryValue}
                          disabled={values?.commIsCheck ? true : false}
                          onChange={(e, masked) =>
                            setFieldValue(`salaryValue`, masked)
                          }
                          inputComponent={CustomCurrencyInput}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} style={{ paddingTop: 10 }}>
                      <div className="checkbox">
                        <Checkbox
                          name="commIsCheck"
                          checked={values?.commIsCheck}
                          onChange={(e) =>
                            this.handleCheckBox(e, setFieldValue)
                          }
                          inputProps={{
                            "aria-label": "primary checkbox",
                          }}
                        />
                        <label>Salary By Incomes</label>
                      </div>
                    </Grid>
                    <FieldArray
                      name="commValue"
                      render={(arrayHelpers) => (
                        <Grid item xs={12}>
                          {values?.commValue && values?.commValue.length > 0 ? (
                            values?.commValue?.map((commValue, index) => {
                              return (
                                <Grid
                                  container
                                  spacing={1}
                                  key={index}
                                  className={index !== 0 && "salary_padding"}
                                >
                                  <Grid item xs={4}>
                                    <CustomCurrencyField
                                      name={`commValue.${index}.from`}
                                      onChange={(e, masked) =>
                                        setFieldValue(
                                          `commValue.${index}.from`,
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
                                      disabled={
                                        values?.salaryIsCheck ? true : false
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <CustomCurrencyField
                                      name={`commValue.${index}.to`}
                                      onChange={(e, masked) =>
                                        setFieldValue(
                                          `commValue.${index}.to`,
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
                                      disabled={
                                        values?.salaryIsCheck ? true : false
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <CustomCurrencyField
                                      name={`commValue.${index}.commission`}
                                      onChange={(e, masked) =>
                                        setFieldValue(
                                          `commValue.${index}.commission`,
                                          masked
                                        )
                                      }
                                      label="Salary Percent"
                                      style={styles.textField}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            %
                                          </InputAdornment>
                                        ),
                                      }}
                                      disabled={
                                        values?.salaryIsCheck ? true : false
                                      }
                                    />
                                  </Grid>
                                  {index !== 0 && (
                                    <Grid item xs={1}>
                                      <DeleteForeverIcon
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        className="delete_icon"
                                      />
                                    </Grid>
                                  )}
                                  {values?.commValue.length - 1 === index && (
                                    <Grid>
                                      <p
                                        style={{
                                          marginLeft: 35,
                                          color: "#4251af",
                                          fontWeight: "600",
                                          fontSize: 14,
                                          marginTop: 30,
                                          cursor: "pointer",
                                          letterSpacing: 0.3,
                                        }}
                                        onClick={() =>
                                          arrayHelpers.insert(1, "")
                                        }
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
                                  color: "#4251af",
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
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="checkbox">
                        <Checkbox
                          name="prodCommIsCheck"
                          checked={values?.prodCommIsCheck}
                          onChange={(e) =>
                            this.handleCheckBox(e, setFieldValue)
                          }
                          value="true"
                          inputProps={{
                            "aria-label": "primary checkbox",
                          }}
                        />
                        <label>Product Commission</label>
                      </div>

                      <Input
                        type="tel"
                        name="prodCommValue"
                        value={values?.prodCommValue}
                        separator="."
                        style={styles.input}
                        disabled={values?.prodCommIsCheck ? false : true}
                        onChange={(e, masked) =>
                          setFieldValue(`prodCommValue`, masked)
                        }
                        inputComponent={CustomCurrencyInput}
                        startAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: "10px" }}>
                      <CustomTitle value="Tip Fee" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="checkbox">
                        <Checkbox
                          name="tipIsCheck"
                          checked={values?.tipIsCheck}
                          onChange={(e) =>
                            this.handleCheckBox(e, setFieldValue)
                          }
                          inputProps={{
                            "aria-label": "primary checkbox",
                          }}
                        />
                        <label>Tip Percent</label>
                      </div>

                      <Input
                        type="tel"
                        name="tipValue"
                        value={values?.tipValue}
                        style={styles.input}
                        separator="."
                        disabled={values?.fixIsCheck ? true : false}
                        onChange={(e, masked) =>
                          setFieldValue(`tipValue`, masked)
                        }
                        inputComponent={CustomCurrencyInput}
                        startAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="checkbox">
                        <Checkbox
                          name="fixIsCheck"
                          checked={values?.fixIsCheck}
                          onChange={(e) =>
                            this.handleCheckBox(e, setFieldValue)
                          }
                          inputProps={{
                            "aria-label": "primary checkbox",
                          }}
                        />
                        <label>Tip Fixed Amount</label>
                      </div>

                      <Input
                        style={styles.input}
                        name="fixValue"
                        type="tel"
                        separator="."
                        value={values?.fixValue}
                        disabled={values?.tipIsCheck ? true : false}
                        onChange={(e, masked) =>
                          setFieldValue(`fixValue`, masked)
                        }
                        inputComponent={CustomCurrencyInput}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: 10 }}>
                      <CustomTitle value="Payout with Cash" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        style={styles.input}
                        name="cashPercent"
                        value={values?.cashPercent}
                        onChange={(e, masked) =>
                          setFieldValue(`cashPercent`, masked)
                        }
                        min="0"
                        max="100"
                        type="tel"
                        separator="."
                        label="Percent"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                          ),
                          inputComponent: CustomCurrencyInput,
                        }}
                      />
                    </Grid>
                  </Grid>

                  <div style={styles.div}>
                    <Button className="btn btn-green" type="submit">
                      SAVE
                    </Button>
                    <Button
                      className="btn btn-red"
                      onClick={() =>
                        this.props.history.push("/app/merchants/staff/salary")
                      }
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    );
  }
}

const salarySchema = Yup.object().shape({
  commValue: Yup.array().of(
    Yup.object().shape({
      commIsCheck: Yup.boolean(),
      from: Yup.string().when("commIsCheck", {
        is: (commIsCheck) => true,
        then: Yup.string().required("Required"),
      }),
      to: Yup.string().when("commIsCheck", {
        is: (commIsCheck) => true,
        then: Yup.string().required("Required"),
      }),
      commission: Yup.string().when("commIsCheck", {
        is: (commIsCheck) => true,
        then: Yup.string().required("Required"),
      }),
    })
  ),
});

const mapStateToProps = (state) => ({
  Staff: state.staffById.data,
  MerchantData: state.MerchantReducer.MerchantData,
});

const mapDispatchToProps = (dispatch) => ({
  updateStaffByID: (payload) => {
    dispatch(updateStaffByID(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSalary);

const styles = {
  div: {
    paddingTop: "20px",
  },
  input: {
    width: "90%",
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
};
