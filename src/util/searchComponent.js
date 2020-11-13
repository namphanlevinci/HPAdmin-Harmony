import React from "react";
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  // TextField,
} from "@material-ui/core";
// import { DebounceInput } from "react-debounce-input";

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
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={0}
      />
    </FormControl>
  );
}

// function CustomDebounceInput(props) {
//   const { inputRef, ...other } = props;

//   return (
//     <DebounceInput
//       minLength={2}
//       debounceTimeout={300}
//       ref={(ref) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//     />
//   );
// }
