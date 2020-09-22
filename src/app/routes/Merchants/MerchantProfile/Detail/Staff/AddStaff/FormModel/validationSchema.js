import * as Yup from "yup";

export default [
  // General
  Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    displayName: Yup.string().required("Display name is required"),
    pin: Yup.string().max(4).required("Pin code is required"),
    confirmPin: Yup.string()
      .max(4)
      .required("Confirm pin cannot be empty")
      .test("match", "pin do not match", function (pinConfirm) {
        return pinConfirm === this.parent.pin;
      }),
  }),
  // Yup.object().shape({
  //   lastName: Yup.string().required("Business name is required"),
  // }),
  // Yup.object().shape({}),
];
