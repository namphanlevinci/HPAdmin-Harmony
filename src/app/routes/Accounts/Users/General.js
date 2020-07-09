import React from "react";
import TextField from "@material-ui/core/TextField";

const General = ({
  data: { phone, email, address, birthDate, password, loading },
  handleChange,
}) => {
  return (
    <div>
      <h2 style={styles.h2}>Contact Information</h2>
      <div className="row">
        <div className="col-4">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
      </div>

      <h2 style={styles.h2}>Basic Information</h2>

      <div>
        <div style={{ display: "inline" }}>
          <label>Birthday: </label>
        </div>
        <div style={{ display: "inline", paddingLeft: "15px" }}>
          <form noValidate>
            {loading && (
              <TextField
                id="date"
                type="date"
                name="birthDate"
                defaultValue={birthDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default General;

const styles = {
  h2: {
    fontWeight: "500",
    color: "#4251af",
  },
};
