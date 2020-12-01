import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
function Password({
  values: { errorPassword, errorConfirmPassword, errorConfirmPasswordMsg },
  errors,
  touched,
  setFieldValue,
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2 style={styles.h2}>New Password</h2>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          onChange={(e) => setFieldValue(`newPassword`, Number(e.target.value))}
          error={errorPassword}
          helperText={errorPassword && "New password is required"}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={(e) =>
            setFieldValue(`confirmPassword`, Number(e.target.value))
          }
          error={errorConfirmPassword}
          helperText={errorConfirmPassword && errorConfirmPasswordMsg}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default Password;

const styles = {
  div: {
    paddingTop: "10px",
  },
  input: {
    width: "30%",
  },
  icon: {
    cursor: "pointer",
  },
  h2: {
    fontWeight: "500",
    color: "#0764B0",
    paddingBottom: "0px",
  },
  p: {
    color: "red",
    fontWeight: "400",
  },
};
