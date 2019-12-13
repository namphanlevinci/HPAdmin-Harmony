import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

import "./addMerchant.css";

const Bank = ({ value, handleChange, uploadFile }) => {
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
            <div class="Upload">
              <div className="void-Image">
                <img src={value.imagePreviewUrl} alt="void" />;
              </div>
              <input type="file" class="upload" onChange={e => uploadFile(e)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
