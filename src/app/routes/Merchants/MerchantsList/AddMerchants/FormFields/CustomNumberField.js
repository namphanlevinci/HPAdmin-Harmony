import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Cleave from "cleave.js/react";

function NumberFormatCustom(props) {
  const { inputRef, ...other } = props;
  console.log("PROPS NUMBER", props);

  return (
    <Cleave
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      options={{
        blocks: [2, 7],
        delimiter: "-",
        numericOnly: props?.numericOnly,
      }}
    />
  );
}

export default function CustomNumberField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  console.log("props cha", props);
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
    />
  );
}
