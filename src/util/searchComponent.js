import React from "react";
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

export default function SearchComponent(props) {
  return (
    <FormControl>
      <OutlinedInput
        inputProps={{
          style: {
            padding: 14,
          },
        }}
        placeholder="Search.."
        {...props}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <SearchIcon onClick={props?.onClickIcon} />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={0}
      />
    </FormControl>
  );
}
