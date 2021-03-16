import React from "react";
import CurrencyInput from "react-currency-masked-input";
import CurrencyFormat from "react-currency-format";

// function CustomCurrencyInput(props) {
//   const { inputRef, ...other } = props;
//   return (
//     <CurrencyInput
//       {...other}
//       ref={(ref) => {
//         console.log("REFF", ref);
//         inputRef(ref ? ref.inputElement : null);
//       }}
//     />
//   );
// }
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

export default CustomCurrencyInput;
