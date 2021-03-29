import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const CustomButton = withStyles({
  root: {
    background: (props) => (props.blue ? "#0764b0" : "#fffff"),
    "&:hover": {
      color: "#707070",
    },
    borderRadius: 2,
    borderStyle: "solid",
    border: 1,
    borderColor: "#CCCCCC",
    color: (props) => (props.blue ? "#fff" : "#707070"),
    height: 36,
    width: "fit-content",
    padding: "0 30px",
  },
  label: {
    textTransform: "capitalize",
    fontSize: 17,
  },
})(Button);

function NewButton({ ...otherProps }) {
  return <CustomButton {...otherProps} />;
}

export default NewButton;
