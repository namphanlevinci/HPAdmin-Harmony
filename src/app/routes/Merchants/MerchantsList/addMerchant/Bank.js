import React from "react";
import TextField from "@material-ui/core/TextField";
import defaultImage from "./hpadmin2.png";
import LinearIndeterminate from "../../../../../util/linearProgress";
import InputCustom from "./custom-input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import "./addMerchant.css";

const Bank = ({ value, handleChange, uploadFile, validator }) => {
  return (
    <div>
      <div className="row">
        <div className="col-3">
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
        <div className="col-3">
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

        <div className="col-3">
          <div className="form-group">
            {/* <TextField
              name="routingNumber"
              value={value.routingNumber}
              id="cardHolder3"
              label=" Routing Number* (ABA)"
              margin="normal"
              fullWidth
              onChange={handleChange}
            /> */}

            <FormControl style={{ width: "100%", marginTop: "16px" }}>
              <InputLabel htmlFor="formatted-text-mask-input">
                Routing Number* (ABA)
              </InputLabel>
              <Input
                value={value.routingNumber}
                onChange={handleChange}
                name="routingNumber"
                id="custom-routingNumber-input"
                inputProps={{
                  block: [12],
                  numericOnly: true,
                }}
                inputComponent={InputCustom}
              />
            </FormControl>

            {validator.message(
              "routingNumber",
              value.routingNumber,
              "required|string"
            )}
          </div>
        </div>
        <div className="col-3">
          <div className="form-group">
            {/* <TextField
              name="accountNumber"
              value={value.accountNumber}
              id="cardHolder4"
              label="Account Number* (DDA)"
              margin="normal"
              fullWidth
              onChange={handleChange}
            /> */}

            <FormControl style={{ width: "100%", marginTop: "16px" }}>
              <InputLabel htmlFor="formatted-text-mask-input">
                Account Number* (DDA)
              </InputLabel>
              <Input
                value={value.accountNumber}
                onChange={handleChange}
                name="accountNumber"
                id="custom-accountNumber-input"
                inputProps={{
                  block: [12],
                  numericOnly: true,
                }}
                inputComponent={InputCustom}
              />
            </FormControl>

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
                {value?.progress ? (
                  <div style={{ width: "250px", paddingTop: "10px" }}>
                    <LinearIndeterminate />
                  </div>
                ) : null}
                {validator.message("fileId", value.fileId, "required|integer")}
              </div>
              <input
                type="file"
                style={{ marginTop: "10px", width: "250px" }}
                className="custom-input"
                accept="image/gif,image/jpeg, image/png"
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
