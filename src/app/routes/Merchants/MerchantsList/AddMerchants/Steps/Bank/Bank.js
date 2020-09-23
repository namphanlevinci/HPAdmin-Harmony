import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../../FormFields/InputField";
import CustomNumberField from "../../FormFields/CustomNumberField";
import defaultImage from "./hpadmin2.png";

import "./Bank.css";

function Bank(props) {
  const {
    values: { bankInfo },
    touched,
    errors,
    setFieldValue,
    uploadFile,
  } = props;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Bank Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <InputField
            InputLabelProps={{ shrink: true }}
            name={`bankInfo.accountHolderName`}
            label="Account Holder Name*"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputField
            InputLabelProps={{ shrink: true }}
            name={`bankInfo.bankName`}
            label="Bank Name*"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomNumberField
            InputLabelProps={{ shrink: true }}
            name={`bankInfo.routingNumber`}
            label="Routing Number* (ABA)"
            options={{
              numericOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomNumberField
            InputLabelProps={{ shrink: true }}
            name={`bankInfo.accountNumber`}
            label="Account Number* (DDA)"
            options={{
              numericOnly: true,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <label>Void Check*</label>

          <div style={{ width: "100%", marginTop: "10px" }}>
            {bankInfo.bankImageUrl !== "" ? (
              <img
                src={bankInfo.bankImageUrl}
                alt="avatar"
                style={{ width: "100%", objectFit: "cover" }}
              />
            ) : (
              <img src={defaultImage} alt="avatar" style={{ width: "100%" }} />
            )}
          </div>
          {touched.bankInfo?.fileId && (
            <p className="error-text">{errors.bankInfo?.fileId}</p>
          )}
          <input
            type="file"
            style={{
              marginTop: "10px",
              width: "100%",
              fontWeight: "normal",
            }}
            className={
              "custom-input"
              // touched.bankInfo?.fileId
              //   ? "custom-input file-error"
              //   : "custom-input"
            }
            name={`bankInfo.fileId`}
            id="file"
            onChange={(e) =>
              uploadFile(e, "bankInfo.bankImageUrl", setFieldValue)
            }
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Bank;
