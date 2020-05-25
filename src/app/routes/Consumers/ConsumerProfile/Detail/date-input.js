import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  underline: {
    "&:before": {
      borderBottom: "2px solid white",
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "2px solid white",
    },
    "&:after": {
      borderBottom: "3px solid white",
    },
  },
  disabled: {},
  focused: {},
  error: {},
});

const DateInput = ({ fromDate }) => {
  const classes = useStyles();

  return (
    <Input
      type="date"
      className="date-picker"
      style={styles.input}
      classes={classes}
      placeholder="placeholder"
      onChange={fromDate}
    />
  );
};

export default DateInput;

const styles = {
  input: {
    width: "100%",
    fontWeight: "500",
    color: "#000000",
    fontSize: "16px",
    borderRadius: "4px",
  },
};
