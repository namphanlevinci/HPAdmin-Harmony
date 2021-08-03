import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import InputField from "../../FormFields/InputField";
import CustomNumberField from "../../FormFields/CustomNumberField";
import SelectField from "../../FormFields/SelectField";
import State from "../../../../../../../util/InitialState";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import { merchantTypes } from "@/util/merchantType";

export default function General(props) {
  const {
    values: { generalInfo, sameAsBusiness, type },
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setFieldError,
    merchantState
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        General Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <InputField
            name={`generalInfo.businessName`}
            label="Legal Business Name*"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputField
            name={`generalInfo.doingBusiness`}
            label="Doing Business As* (DBA)"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name={`type`}
            label="Merchant type*"
            data={merchantTypes}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomNumberField
            InputLabelProps={{ shrink: true }}
            name={`generalInfo.tax`}
            label="Federal Tax ID*"
            options={{
              blocks: [2, 7],
              delimiter: "-",
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={`generalInfo.businessAddress.address`}
            label="Business Address* (no P.O. Boxes)"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField
            name={`generalInfo.businessAddress.city`}
            label="City*"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            name={`generalInfo.businessAddress.state`}
            label="State*"
            data={merchantState}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomNumberField
            InputLabelProps={{ shrink: true }}
            name={`generalInfo.businessAddress.zip`}
            label="Zip Code*"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="true"
                checked={sameAsBusiness}
                control={<Checkbox color="primary" />}
                onChange={(e) =>
                  handleSameAddress(
                    `sameAsBusiness`,
                    e.target.checked,
                    setFieldValue,
                    generalInfo,
                    setFieldError
                  )
                }
                label="Same as Business Address"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={`generalInfo.dbaAddress.address`}
            label="DBA Address*"
            onBlur={handleBlur}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField
            name={`generalInfo.dbaAddress.city`}
            label="City*"
            onBlur={handleBlur}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            name={`generalInfo.dbaAddress.state`}
            label="State*"
            onBlur={handleBlur}
            data={merchantState}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomNumberField
            InputLabelProps={{ shrink: true }}
            name={`generalInfo.dbaAddress.zip`}
            label="Zip Code*"
            onBlur={handleBlur}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField
            name={`generalInfo.email`}
            label="Email Contact*"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <MaterialUiPhoneNumber
            onlyCountries={["us", "vn"]}
            label="Business Phone Number*"
            value={generalInfo.businessPhone}
            name={`generalInfo.businessPhone`}
            onChange={(e) => setFieldValue("generalInfo.businessPhone", e)}
            fullWidth
            error={
              touched.generalInfo?.businessPhone &&
              Boolean(errors.generalInfo?.businessPhone)
            }
            helperText={
              touched.generalInfo?.businessPhone
                ? errors.generalInfo?.businessPhone
                : ""
            }
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <InputField
            name={`generalInfo.firstName`}
            label="First Name*"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField
            name={`generalInfo.lastName`}
            label="Last Name*"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField
            name={`generalInfo.position`}
            label="Title/Position*"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MaterialUiPhoneNumber
            onlyCountries={["us", "vn"]}
            label="Contact Phone Number*"
            value={generalInfo.contactPhone}
            name={`generalInfo.contactPhone`}
            onChange={(e) => setFieldValue("generalInfo.contactPhone", e)}
            fullWidth
            error={
              touched.generalInfo?.contactPhone &&
              Boolean(errors.generalInfo?.contactPhone)
            }
            helperText={
              touched.generalInfo?.contactPhone
                ? errors.generalInfo?.contactPhone
                : ""
            }
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );

  async function handleSameAddress(name, value, setFieldValue, generalInfo) {
    await setFieldValue(name, value);

    if (value) {
      setFieldValue(
        "generalInfo.dbaAddress.address",
        generalInfo.businessAddress.address
      );

      setFieldValue(
        "generalInfo.dbaAddress.city",
        generalInfo.businessAddress.city
      );
      setFieldValue(
        "generalInfo.dbaAddress.state",
        generalInfo.businessAddress.state
      );
      setFieldValue(
        "generalInfo.dbaAddress.zip",
        generalInfo.businessAddress.zip
      );
    } else {
      setFieldValue("generalInfo.dbaAddress.address", "");
      setFieldValue("generalInfo.dbaAddress.city", "");
      setFieldValue("generalInfo.dbaAddress.state", "");
      setFieldValue("generalInfo.dbaAddress.zip", "");
    }
  }
}
