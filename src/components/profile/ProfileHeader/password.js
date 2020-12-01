import React from "react";
import TextField from "@material-ui/core/TextField";

function Password({
  values: {
    errorCurrentPassword,
    errorPassword,
    errorConfirmPassword,
    errorConfirmPasswordMsg,
  },
  handleChange,
}) {
  return (
    <div style={styles.div}>
      <h2 style={styles.h2}>Current Password</h2>
      <div className="row">
        <div className="col-12">
          <div style={{ display: "flex" }}>
            <TextField
              label="Current Password"
              type="password"
              name="currentPassword"
              error={errorCurrentPassword}
              helperText={
                errorCurrentPassword && "Current password is required"
              }
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
      </div>
      <h2 style={styles.h2}>New Password</h2>
      <div className="row">
        <div className="col-12">
          <div style={{ display: "flex" }}>
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        <div className="col-12" style={styles.div}>
          <div>
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
const styles = {
  div: {
    paddingTop: "10px",
  },
  input: {
    width: "40%",
  },
  icon: {
    cursor: "pointer",
  },
  h2: {
    fontWeight: "500",
    color: "#0764B0",
  },
  p: {
    color: "red",
    fontWeight: "400",
  },
};
