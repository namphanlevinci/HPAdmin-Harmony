import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    businessName,
    doingBusiness,
    tax,
    address,
    city,
    state,
    zip,
    businessPhone,
    email,
    position,
    firstName,
    lastName,
    contactPhone,
    // principalInfo: [{ firstName, lastName }],
  },
} = checkoutFormModel;
console.log("checkoutFormModel", checkoutFormModel.formField);

export default {
  [businessName.name]: "",
  [doingBusiness.name]: "",
  [tax.name]: "",
  [address.name]: "",
  [city.name]: "",
  [state.name]: "",
  [zip.name]: "",
  [businessPhone.name]: "",
  [email.name]: "",
  [firstName.name]: "",
  [lastName.name]: "",
  [position.name]: "",
  [contactPhone.name]: "",

  // principalInfo: [
  //   {
  //     [firstName.name]: "",
  //     [lastName.name]: "",
  //   },
  // ],
};
