import * as Yup from "yup";
import moment from "moment";
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    businessName,
    doingBusiness,
    tax,
    address,
    principalInfo: { firstName, lastName, position },
  },
} = checkoutFormModel;

// const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

export default [
  // General
  Yup.object().shape({
    [businessName.name]: Yup.string().required(
      `${businessName.requiredErrorMsg}`
    ),
    [doingBusiness.name]: Yup.string().required(
      `${doingBusiness.requiredErrorMsg}`
    ),
  }),

  // Principal
  Yup.object().shape({
    principalInfo: Yup.array().of(
      Yup.object().shape({
        [firstName?.name]: Yup.string().required(
          `${firstName?.requiredErrorMsg}`
        ),
        [lastName?.name]: Yup.string().required(
          `${lastName?.requiredErrorMsg}`
        ),
        [position?.name]: Yup.string().required(
          `${position?.requiredErrorMsg}`
        ),
      })
    ),
  }),
];
