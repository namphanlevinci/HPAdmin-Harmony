import * as Yup from "yup";
import moment from "moment";

export default [
  // General
  Yup.object().shape({
    businessName: Yup.string().required("Business name is required"),
    doingBusiness: Yup.string().required("Doing Business name is required"),
    tax: Yup.string().required("Tax number is required"),
  }),

  Yup.object().shape({
    principalInfo: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string().required("First Name cannot be empty!"),
        lastName: Yup.string().required("Required"),
        // position: Yup.string().required("Required"),
        // ownership: Yup.string().required("Required"),
        // mobilePhone: Yup.string().required("Required"),
        // ssn: Yup.string().required("Required"),
        // dateOfBirth: Yup.string()
        //   .required("Please Enter Birth date")
        //   .nullable(),
        // email: Yup.string().required("Required"),
        // driverLicense: Yup.string().required("Required"),
        // stateIssued: Yup.string().required("Required"),
        // fileId: Yup.string().required("Required"),
        // addressPrincipal: Yup.object().shape({
        //   address: Yup.string().required("Required"),
        //   city: Yup.string().required("Required"),
        //   state: Yup.string().required("Required"),
        //   zip: Yup.string().required("Required"),
        // }),
      })
    ),
  }),
];
