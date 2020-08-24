import React from "react";
import TextField from "@material-ui/core/TextField";

function Password({
  data: { password, showPassword, error, confirmError },
  handleChange,
  handleShowPassword,
}) {
  return (
    <div style={styles.div}>
      {/* <h2 style={styles.h2}>Current Password</h2>
      <label>Password</label>
      <div style={{ display: "flex" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleChange}
          style={styles.input}
        />
        <span>
          {showPassword ? (
            <RiEyeLine
              onClick={handleShowPassword}
              style={styles.icon}
              size={20}
            />
          ) : (
            <RiEyeOffLine
              onClick={handleShowPassword}
              style={styles.icon}
              size={20}
            />
          )}
        </span>
      </div> */}
      <h2 style={styles.h2}>New Password</h2>
      <div className="row">
        <div className="col-4">
          <div style={{ display: "flex" }}>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              onChange={handleChange}
            />
          </div>
          {<p style={styles.p}>{error}</p>}
        </div>
        <div className="col-5">
          <div>
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              //   value={password}
              onChange={handleChange}
              //   style={styles.input}
            />
            {/* <span>
              {showPassword ? (
                <RiEyeLine
                  onClick={handleShowPassword}
                  style={styles.icon}
                  size={20}
                />
              ) : (
                <RiEyeOffLine
                  onClick={handleShowPassword}
                  style={styles.icon}
                  size={20}
                />
              )}
            </span> */}
          </div>
          {<p style={styles.p}>{confirmError}</p>}
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
    width: "30%",
  },
  icon: {
    cursor: "pointer",
  },
  h2: {
    fontWeight: "500",
    color: "#4251af",
  },
  p: {
    color: "red",
    fontWeight: "400",
  },
};
