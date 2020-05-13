import React from "react";
import { Field, getIn } from "formik";

const ErrorMessage = ({ name }) => (
  // <Field
  //   name={name}
  //   render={({ form }) => {
  //     const error = getIn(form.errors, name);
  //     const touch = getIn(form.touched, name);
  //     return touch && error ? (
  //       <span style={{ marginLeft: "10px", color: "red" }}>{error}</span>
  //     ) : null;
  //   }}
  // />

  <Field name={name}>
    {({ field, form, meta }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? (
        <span style={{ marginLeft: "10px", color: "red" }}>{error}</span>
      ) : null;
    }}
  </Field>
);

export default ErrorMessage;
