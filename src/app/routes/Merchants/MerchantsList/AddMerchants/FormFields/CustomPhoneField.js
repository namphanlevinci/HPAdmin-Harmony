import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import Cleave from "cleave.js/react";
import MaterialUiPhoneNumber from "material-ui-phone-number";

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

export default function CustomPhoneField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  return (
    <MaterialUiPhoneNumber
      type="text"
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      {...field}
      {...rest}
    />
  );
}
