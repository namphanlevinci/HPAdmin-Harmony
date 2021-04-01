import React from "react";
import TextField from "@material-ui/core/TextField";
import { at } from "lodash";
import { useField } from "formik";

export default function NumberLetterInput({ ...props }) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }
  return (
    <div>
      <TextField
        fullWidth
        type="text"
        error={meta.touched && meta.error && true}
        helperText={_renderHelperText()}
        {...field}
        {...rest}
        {...props}
      />
    </div>
  );
}
// const priceRegex = /^\d+(,\d{1,2})?$/;
