import React from "react";
import TextField from "@material-ui/core/TextField";
import defaultImage from "./hpadmin2.png";

import "./addMerchant.css";

const Bank = ({ value, handleChange, uploadFile }) => {
  console.log("Value", value);
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <TextField
              name="bankName"
              value={value.bankName}
              id="cardHolder1"
              label="Bank Name"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <TextField
              name="accountHolderName"
              value={value.accountHolderName}
              id="cardHolder2"
              label="Account Holder Name"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <TextField
              name="routingNumber"
              value={value.routingNumber}
              id="cardHolder3"
              label="ABA Routing Number"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <TextField
              name="accountNumber"
              value={value.accountNumber}
              id="cardHolder4"
              label="Checking Account Number (DDA)"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <label>
              Void Check* <br />
              {/* Please upload photos of void check */}
            </label>
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
              </div>
              <input
                type="file"
                className="upload"
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
