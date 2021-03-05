import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectRoot: {
    padding: 10,
  },
}));

export default function CustomSelect({ valuesArr, ...props }) {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
      <Select
        classes={{ root: classes.selectRoot }}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label="Status"
        {...props}
      >
        {valuesArr.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
