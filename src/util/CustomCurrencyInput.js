import React from "react";
import CurrencyInput from "react-currency-masked-input";

function CustomCurrencyInput(props) {
  const { inputRef, ...other } = props;
  return (
    <CurrencyInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      type="tel"
    />
  );
}

export default CustomCurrencyInput;
