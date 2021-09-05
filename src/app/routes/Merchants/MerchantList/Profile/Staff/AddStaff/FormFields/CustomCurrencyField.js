import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import CurrencyFormat from "react-currency-format";

function CustomCurrencyInput(props) {
  const { inputRef, ...other } = props;
  return (
    <CurrencyFormat
      {...other}
      thousandSeparator={true}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
}

export default function CustomCurrencyField(props) {

  const [isSubmit, setSubmit] = React.useState(false)

  React.useEffect(() => {
    if (props.isSubmitting) {
      setSubmit(true);
    }
  }, [props.isSubmitting]);

  const { errorText, isSubmitting, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if ((touched && error) || (isSubmit && error)) {
      return error;
    }
  }

  return (
    <TextField
      error={(meta.touched && meta.error && true) || (isSubmit && meta.error)}
      helperText={_renderHelperText()}
      {...field}
      {...rest}
      InputProps={{
        inputComponent: CustomCurrencyInput,
        startAdornment: props.InputProps?.startAdornment,
      }}
    />
  );
}
