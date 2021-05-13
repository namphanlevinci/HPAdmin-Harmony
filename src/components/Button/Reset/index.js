import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LoopIcon from "@material-ui/icons/Loop";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "none",
    fontWeight: 600,
    textTransform: "none",
    margin: 0,
    color: "#0764b0",
  },
  loopIcon: {
    transform: "rotate(90deg)",
    fontWeight: 600,
    color: "#0764b0",
  },
}));

function ResetButton({ ...props }) {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      startIcon={<LoopIcon className={classes.loopIcon} />}
      {...props}
    />
  );
}

export default ResetButton;
