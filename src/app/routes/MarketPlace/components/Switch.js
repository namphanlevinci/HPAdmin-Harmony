import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const CustomSwitch = withStyles({
  switchBase: {
    color: "white",
    "&$checked": {
      color: "white",
    },
    "&$checked + $track": {
      backgroundColor: "#0764B0",
      opacity: 1,
    },
  },
  checked: {},
  track: {},
})(Switch);
export default CustomSwitch;
