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
import Checkbox from "@material-ui/core/Checkbox";
import DefaultAvatar from "../../../../avatar.png";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import AccorditionSevice from "@/components/AccorditionService";
import check_box from "@/assets/images/check_box.png";
import check_box_empty from "@/assets/images/check_box_empty.png";

function General(props) {
  const {
    uploadImage,
    setFieldValue,
    showPin,
    handleShowPin,
    handleConfirmPin,
    showConfirmPin,
    merchantState,
    isSelectAllCategories,
    initValue: { isActive, roles, isDisabled, isUpload },
    categories = [],
    selectAllCategories = () => { },
    selectCategories = () => { },
    selectServiceOfCategories = () => { },
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
        <Grid item xs={12} md={12}>
          <InputField name={`address.street`} label="Address" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputField
            name={`address.city`}
            label="City"
            fullWidth
            style={{ paddingTop: "6px" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            name={`address.state`}
            label="State"
            data={merchantState}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomNumberField
            style={{ paddingTop: "6px" }}
            name={`address.zip`}
            label="Zip Code"
            fullWidth
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
          <InputField
            name="email"
            label="Contact Email"
            fullWidth
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <InputField
                name="pin"
                label="Pin*"
                fullWidth
                autoComplete="new-password"
                type={showPin ? "text" : "password"}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setFieldValue('pin', e.target.value);
                  }
                }}
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
                label="Confirm Pin*"
                fullWidth
                type={showConfirmPin ? "text" : "password"}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setFieldValue('confirmPin', e.target.value);
                  }
                }}
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
          </Grid>
        </Grid>
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

          {isUpload ? (
            <div style={{ paddingTop: "10px" }}>
              <LinearProgress />
            </div>
          ) : (
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
                onChange={(e) => uploadImage(e, setFieldValue)}
              />
            )}
        </Grid>

        <Grid style={{ marginTop: 15 }} item xs={12} md={12}>
          <div style={{ fontSize: '1.25rem', fontWeight:'500', color : '#1366AE' }}>Services</div>
          <div style={{ fontSize: '1.1rem', fontWeight:'400', color : '#404040',marginTop: 10, marginBottom: 20 }}>
              Assign services this staff can be perform
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 22 }}>
            <img
              onClick={selectAllCategories}
              style={{ width: 25, height: 25 }}
              src={isSelectAllCategories ? check_box : check_box_empty}
            />
            <span style={{ fontSize: "1.1rem", marginLeft: 10, fontWeight: "500", color: "#1366AE" }}>
              Select all
            </span>
          </div>
          {
            categories.map((cate) => {
              return (
                <AccorditionSevice
                  category={cate}
                  key={cate.categoryId + "assignService"}
                  selectServiceOfCategories={selectServiceOfCategories}
                  selectCategories={selectCategories}
                />
              )
            })
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default General;

const role = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Staff",
    label: "Staff",
  },
  {
    value: "Manager",
    label: "Manager",
  },
];
