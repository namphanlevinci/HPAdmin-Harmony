import React from "react";
import TextField from "@material-ui/core/TextField";
import defaultImage from "./hpadmin2.png";

import "./addMerchant.css";

const Bank = ({ value, handleChange, uploadFile, validator }) => {
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="bankName"
              value={value.bankName}
              id="cardHolder1"
              label="Bank Name*"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
            {validator.message("bankName", value.bankName, "required|string")}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="accountHolderName"
              value={value.accountHolderName}
              id="cardHolder2"
              label="Account Holder Name*"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
            {validator.message(
              "accountHolderName",
              value.accountHolderName,
              "required|string"
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="routingNumber"
              value={value.routingNumber}
              id="cardHolder3"
              label="ABA Routing Number*"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
            {validator.message(
              "routingNumber",
              value.routingNumber,
              "required|string"
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="accountNumber"
              value={value.accountNumber}
              id="cardHolder4"
              label="Checking Account Number (DDA)*"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
            {validator.message(
              "accountNumber",
              value.accountNumber,
              "required|string"
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <label style={{ paddingBottom: "5px" }}>Void Check* </label>
            <div className="Upload">
              <div className="void-Image">
                <img
                  src={
                    value.imagePreviewUrl === ""
                      ? defaultImage
                      : value.imagePreviewUrl
                  }
                  alt="void"
                />
                {validator.message("fileId", value.fileId, "required|integer")}
              </div>
              <input
                type="file"
                style={{ marginTop: "10px", width: "250px" }}
                className="custom-input"
                onChange={(e) => uploadFile(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
