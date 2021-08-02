import * as Yup from "yup";
// import moment from "moment";
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default [
  // General
  Yup.object().shape({
    type: Yup.string().required("Merchant type is required"),
    generalInfo: Yup.object().shape({
      businessName: Yup.string().required("Business name is required"),
      doingBusiness: Yup.string().required("Doing Business name is required"),
      tax: Yup.string().required("Tax number is required"),

      businessAddress: Yup.object().shape({
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zip: Yup.string().required("Zip is required"),
      }),

      dbaAddress: Yup.object().shape({
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zip: Yup.string().required("Zip is required"),
        address: Yup.string().required("Address is required"),
      }),

      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      businessPhone: Yup.string()
        .matches(phoneRegExp, "Business phone number is not valid")
        .required("Business phone number is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last name is required"),
      position: Yup.string().required("Position is required"),
      contactPhone: Yup.string()
        .matches(phoneRegExp, "Contact phone number is not valid")
        .required("Contact phone number is required"),
    }),
  }),

  // Business Information
  Yup.object().shape({}),
  // Bank Information
  Yup.object().shape({
    bankInfo: Yup.object().shape({
      bankName: Yup.string().required("Bank name is required"),
      routingNumber: Yup.string().required("Routing number is required"),
      accountNumber: Yup.string().required("Account number is required"),
      fileId: Yup.string().required("Void check image is required"),
      accountHolderName: Yup.string().required(
        "Account holder name is required"
      ),
    }),
  }),

  Yup.object().shape({
    principalInfo: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string().required("First name is  required"),
        lastName: Yup.string().required("Last name is required"),
        position: Yup.string().required("Title/Position is required"),
        ownership: Yup.string().required("Ownership is required"),
        mobilePhone: Yup.string()
          .matches(phoneRegExp, "Mobile phone number is not valid")
          .required("Mobile phone is required"),
        ssn: Yup.string().required("Social security number is required"),
        dateOfBirth: Yup.string()
          .required("Date of birth is required")
          .nullable(),
        email: Yup.string()
          .email("Please enter a valid email")
          .required("Email is required"),
        driverLicense: Yup.string().required(
          "Driver license number is required"
        ),
        stateIssued: Yup.string().required("State issued is required"),
        fileId: Yup.string().required("Driver license image is required"),
        addressPrincipal: Yup.object().shape({
          address: Yup.string().required("Address is required"),
          city: Yup.string().required("City is required"),
          state: Yup.string().required("State is required"),
          zip: Yup.string().required("Zip code is required"),
        }),
      })
    ),
  }),
];
