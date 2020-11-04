import React from "react";
import { Grid } from "@material-ui/core";
import {
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { CustomTitle } from "../../../../../../../../util/CustomText";

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
import DefaultAvatar from "../../../../avatar.png";
import Avatar from "@material-ui/core/Avatar";

function General(props) {
  const {
    uploadFile,
    setFieldValue,
    showPin,
    handleShowPin,
    handleConfirmPin,
    showConfirmPin,
    initValue: { isActive, roles, isDisabled },
  } = props;

  return (
    <div>
      <CustomTitle
        value=" General Information"
        styles={{ padding: "15px 0px" }}
      />

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
            options={{
              blocks: [5],
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MaterialUiPhoneNumber
            onlyCountries={["us", "vn"]}
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
            inputProps={{ maxLength: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle pin visibility"
                    onClick={handleShowPin}
                  >
                    {showPin ? (
                      <Visibility style={{ fontSize: 18 }} />
                    ) : (
                      <VisibilityOff style={{ fontSize: 18 }} />
                    )}
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
            inputProps={{ maxLength: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle pin visibility"
                    onClick={handleConfirmPin}
                  >
                    {showConfirmPin ? (
                      <Visibility style={{ fontSize: 18 }} />
                    ) : (
                      <VisibilityOff style={{ fontSize: 18 }} />
                    )}
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
            value={roles.nameRole}
            label="Role"
            data={role}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="isDisabled"
              value={isDisabled}
              fullWidth
              onChange={(e) => {
                setFieldValue("isDisabled", e.target.value);
              }}
            >
              <MenuItem value={0}>Active</MenuItem>
              <MenuItem value={1}>Inactive</MenuItem>
            </Select>
          </FormControl>
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
        <Grid item xs={12} md={4} lg={3}>
          <label>Image</label>
          <br />

          <Avatar
            src={
              props.initValue.staffAvatar
                ? props.initValue.staffAvatar
                : DefaultAvatar
            }
            alt="avatar"
            className="avatar_last"
          />

          <input
            type="file"
            style={{
              marginTop: "20px",
              width: "100%",
              fontWeight: "normal",
              borderBottom: "none",
            }}
            className="custom-input"
            accept="image/gif,image/jpeg, image/png"
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
