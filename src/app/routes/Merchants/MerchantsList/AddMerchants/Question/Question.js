import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { FieldArray } from "formik";
import InputField from "../FormFields/InputField";
import TextField from "@material-ui/core/TextField";

export default function Question(props) {
  const { formField, values } = props;
  console.log("PRINCIPAL PROPS", props);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FieldArray
        name="principalInfo"
        render={(arrayHelpers) => (
          <div>
            {values.principalInfo && values.principalInfo.length > 0 ? (
              values.principalInfo.map((principal, index) => {
                return (
                  <div key={index}>
                    {/* <TextField
                      name={`principalInfo.${index}.firstName`}
                      values={`principalInfo.${index}.firstName`}
                      label="First Name*"
                      margin="normal"
                      fullWidth
                      // onChange={(e) =>
                      //   setFieldValue(
                      //     `principalInfo.${index}.firstName`,
                      //     e.target.value
                      //   )
                      // }
                    /> */}

                    <InputField
                      name={`principalInfo.${index}.firstName`}
                      label={`principalInfo.${index}.firstName.label`}
                      fullWidth
                    />

                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                    >
                      +
                    </button>
                  </div>
                );
              })
            ) : (
              <button type="button" onClick={() => arrayHelpers.push()}>
                ADD
              </button>
            )}
          </div>
        )}
      />
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name={businessName.name}
            label={businessName.label}
            fullWidth
          />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}
