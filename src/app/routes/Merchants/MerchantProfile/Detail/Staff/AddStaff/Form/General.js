import React from "react";
import { Grid, Typography } from "@material-ui/core";

import InputField from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";
import CustomNumberField from "../FormFields/CustomNumberField";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import State from "../../../../../../../../util/InitialState";
import Checkbox from "@material-ui/core/Checkbox";
import ReactImageAppear from "react-image-appear";

import { InputAdornment, IconButton } from "@material-ui/core";

function General(props) {
  const {
    uploadFile,
    imagePreviewUrl,
    handleChange,
    setFieldValue,
    showPin,
    handleShowPin,
    handleConfirmPin,
    showConfirmPin,
    initValue: { isActive },
  } = props;
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        General Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <InputField name="firstName" label="First Name*" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputField name="lastName" label="Last Name*" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputField name="displayName" label="Display Name*" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputField name={`address.street`} label="Address" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputField name={`address.city`} label="City" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            name={`address.state`}
            label="State"
            data={State}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomNumberField
            name={`address.zip`}
            label="Zip Code"
            fullWidth
            block="5"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MaterialUiPhoneNumber
            label="Phone"
            name="cellphone"
            onChange={(e) => setFieldValue("cellphone", e)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputField name="email" label="Contact Email" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputField
            name="pin"
            label="Pin"
            fullWidth
            type={showPin ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle pin visibility"
                    onClick={handleShowPin}
                  >
                    {showPin ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputField
            name="confirmPin"
            label="Confirm Pin"
            fullWidth
            type={showConfirmPin ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle pin visibility"
                    onClick={handleConfirmPin}
                  >
                    {showConfirmPin ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            name={`roles.nameRole`}
            label="Role"
            data={role}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            name="isDisabled"
            label="Status"
            data={status}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={isActive}
                control={<Checkbox color="primary" />}
                onChange={(e) => setFieldValue("isActive", e.target.checked)}
                label="Visible on App"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <label>Image</label>

          {imagePreviewUrl !== "" ? (
            <ReactImageAppear
              src={imagePreviewUrl}
              alt="avatar"
              className="staff_avatar"
            />
          ) : (
            <img
              src="http://image.levincitest.com/Service/avatar_20191009_023452.png"
              alt="avatar"
              style={{ borderRadius: "50%" }}
            />
          )}

          <input
            type="file"
            style={{
              marginTop: "20px",
              width: "90%",
              fontWeight: "normal",
              borderBottom: "none",
            }}
            className="custom-input"
            name="imagePreviewUrl"
            id="file"
            onChange={(e) => uploadFile(e, setFieldValue)}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default General;

const role = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "staff",
    label: "Staff",
  },
];

const status = [
  {
    value: "0",
    label: "Active",
  },
  {
    value: "1",
    label: "Inactive",
  },
];
