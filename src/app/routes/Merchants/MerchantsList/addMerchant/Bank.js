import React from "react";
import TextField from "@material-ui/core/TextField";
import defaultImage from "./hpadmin2.png";

import "./addMerchant.css";

const Bank = ({ value, handleChange, uploadFile }) => {
  console.log("Value", value);
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="bankName"
              value={value.bankName}
              id="cardHolder"
              label="Bank Name"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="routingNumber"
              value={value.routingNumber}
              id="cardHolder"
              label="ABA Number"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <TextField
              name="accountNumber"
              value={value.accountNumber}
              id="cardHolder"
              label="DDA Number"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <lable>
              Void Check* <br />
              Please upload photos of void check
            </lable>
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
                onChange={e => uploadFile(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
