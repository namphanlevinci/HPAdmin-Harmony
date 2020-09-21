import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import Cleave from "cleave.js/react";

function NumberFormatCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <Cleave
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      options={{
        blocks: [props.blocks],
        delimiter: props?.delimiter,
        numericOnly: props?.numericOnly,
      }}
    />
  );
}

export default function CustomNumberField(props) {
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
        inputComponent: NumberFormatCustom,
      }}
      inputProps={{
        blocks: props.block,
      }}
    />
  );
}
