import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { FieldArray } from "formik";
import InputField from "../FormFields/InputField";

export default function Question(props) {
  const { formField } = props;
  console.log("props", props);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <FieldArray
        name={formField.principalInfo}
        render={(arrayHelpers) => (
          <div>
            {formField.principalInfo && formField.principalInfo.length > 0 ? (
              formField.principalInfo.map((principal, index) => {
                return (
                  <div key={index}>
                    <InputField
                      name={principal.firstName.name}
                      label={principal.firstName.label}
                      fullWidth
                    />
                    <InputField
                      name={principal.lastName.name}
                      label={principal.lastName.label}
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
              <button type="button" onClick={() => arrayHelpers.push("")}>
                {/* show this when user has removed all friends from the list */}
                Add a friend
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
