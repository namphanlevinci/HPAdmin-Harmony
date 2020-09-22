import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import CurrencyInput from "react-currency-masked-input";

function CurrencyFormat(props) {
  const { inputRef, ...other } = props;

  return (
    <CurrencyInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      separator="."
    />
  );
}

export default function CustomCurrencyField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  return (
    <TextField
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      {...field}
      {...rest}
      InputProps={{
        inputComponent: CurrencyFormat,
        startAdornment: props.InputProps?.startAdornment,
      }}
    />
  );
}