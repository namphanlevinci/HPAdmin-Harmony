import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const switchColor = (status) => {
  switch (status) {
    case "complete":
      return "#4CAF50";
    case "waiting":
      return "#0764B0";
    case "inprogress":
      return "#40D1FF";
    default:
      return "#CCCCCC";
  }
};
const useStyles = makeStyles((theme) => ({
  button: {
    height: 32,
    width: 100,
    borderRadius: 18,
    textTransform: "capitalize",
    color: "#fff",
    backgroundColor: (props) => switchColor(props.status),
    "&:hover": {
      color: (props) => switchColor(props.status),
    },
  },
}));

function Status({ ...props }) {
  const classes = useStyles({ ...props });
  return (
    <Button
      className={classes.button}
      variant="text"
      color="default"
      {...props}
    />
  );
}

export default Status;
