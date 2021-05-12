import React from "react";
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: { color: "#0764b0" },
  notchedOutline: {
    border: "none",
    borderBottom: "1px solid #DDDDDD",
    borderRadius: 0,
  },
}));
export default function SearchComponent(props) {
  const classes = useStyles();
  const { value , width = '400px' } = props;
  return (
    <FormControl style={{ width }}>
      <OutlinedInput
        classes={{ notchedOutline: classes.notchedOutline }}
        style={{ height: 36 }}
        inputProps={{
          style: {
            padding: "14px 0",
            border: "none",
          },
        }}
        placeholder="Search.."
        {...props}
        endAdornment={
          <InputAdornment position="end">
            {
              value && value.length > 0 ?
                <IconButton edge="end" style={{ padding: 3 }}>
                  <DeleteIcon
                    onClick={props?.onClickIcon}
                  />
                </IconButton>
                :
                <IconButton edge="end" style={{ padding: 3 }}>
                  <SearchIcon
                    onClick={() => { }}
                    classes={{ root: classes.root }}
                  />
                </IconButton>
            }
          </InputAdornment>
        }
        labelWidth={0}
      />
    </FormControl>
  );
}
