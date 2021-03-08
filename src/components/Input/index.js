import React from "react";
import TextField from "@material-ui/core/TextField";

export default function PriceTextField({ ...props }) {
  const onChange = () => {};
  return (
    <div>
      <TextField
        onChange={() => onChange()}
        // margin="normal"
        fullWidth
        placeholder="$"
        InputProps={{
          startAdornment: (
            <span
              style={{
                paddingRight: "10px",
              }}
            >
              $
            </span>
          ),
        }}
        {...props}
      />
    </div>
  );
}
const priceRegex = /^\d+(,\d{1,2})?$/;
