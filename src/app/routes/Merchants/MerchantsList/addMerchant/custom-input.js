import React from "react";

import Cleave from "cleave.js/react";

function InputCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <Cleave
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      options={{
        blocks: props?.block,
        delimiter: "-",
        numericOnly: props?.numericOnly,
      }}
    />
  );
}

export default InputCustom;
