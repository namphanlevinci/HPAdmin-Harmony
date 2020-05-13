import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
// import JssProvider from "react-jss/lib/JssProvider";
// import { createGenerateClassName, jssPreset } from "@material-ui/styles";

import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@material-ui/core/styles";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Configure JSS
// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

// function RTL(props) {
//   return (
//     <JssProvider jss={jss} generateClassName={generateClassName}>
//       {props.children}
//     </JssProvider>
//   );
// }

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

export default RTL;
