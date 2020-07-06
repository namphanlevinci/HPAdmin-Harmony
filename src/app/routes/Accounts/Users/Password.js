import React from "react";
// import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

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
      <h2>New Password</h2>
      <div className="row">
        <div className="col-4">
          <label>New Password</label>
          <div style={{ display: "flex" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              //   value={password}
              onChange={handleChange}
              //   style={styles.input}
            />
          </div>
          {<p style={styles.p}>{error}</p>}
        </div>
        <div className="col-5">
          <label>Confirm Password</label>
          <div>
            <input
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
    fontWeight: "400",
  },
  p: {
    color: "red",
    fontWeight: "400",
  },
};
