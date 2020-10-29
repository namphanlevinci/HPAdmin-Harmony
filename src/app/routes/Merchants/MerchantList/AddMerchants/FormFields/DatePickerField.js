import React, { useState, useEffect } from "react";
import { useField } from "formik";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

export default function DatePickerField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const newDate = moment(value).format("MM/DD/YYYY");
      setSelectedDate(newDate);
    }
  }, [value]);

  function _onChange(date) {
    const newDate = moment(date).format("MM/DD/YYYY");

    if (date) {
      setSelectedDate(newDate);
      try {
        const newDate = moment(date).format("MM/DD/YYYY");
        setValue(newDate);
      } catch (error) {
        setValue(newDate);
      }
    } else {
      setValue(newDate);
    }
  }

  return (
    <Grid container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          {...field}
          {...props}
          value={selectedDate}
          onChange={_onChange}
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
