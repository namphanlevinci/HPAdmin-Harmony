import React from "react";
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles({
  root: { width: "100%", padding: 0, marginTop: 10 },
  iConRoot: { fontSize: "2rem", color: "#166db5" },
});
export default function SendComponent(props) {
  const classes = useStyles();

  return (
    <FormControl
      classes={{
        root: classes.root,
      }}
    >
      <OutlinedInput
        inputProps={{
          style: {
            padding: 14,
          },
        }}
        placeholder="Type a comment"
        {...props}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <SendIcon
                onClick={props?.onClickIcon}
                classes={{ root: classes.iConRoot }}
              />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={0}
      />
    </FormControl>
  );
}
