import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { businessName, doingBusiness, tax, address, principalInfo },
} = checkoutFormModel;
console.log("checkoutFormModel", checkoutFormModel);
export default {
  [businessName.name]: "",
  [doingBusiness.name]: "",
  [tax.name]: "",
  [address.name]: "",
  [principalInfo?.firstName?.name]: "",
  [principalInfo?.lastName?.name]: "",
  [principalInfo?.position?.name]: "",
};
