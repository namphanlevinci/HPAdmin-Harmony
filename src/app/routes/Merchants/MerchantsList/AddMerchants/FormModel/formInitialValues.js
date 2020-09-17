import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { businessName, doingBusiness, tax, address, principalInfo },
} = checkoutFormModel;
console.log("checkoutFormModel", checkoutFormModel.formField);

export default {
  [businessName.name]: "",
  [doingBusiness.name]: "",
  [tax.name]: "",
  [address.name]: "",
  [principalInfo]: "",
  [principalInfo.lastName?.name]: "",
  [principalInfo.position?.name]: "",
};
