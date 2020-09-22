import * as Yup from "yup";

export default {
  sameAsBusiness: false,
  // General
  generalInfo: {
    businessName: "",
    doingBusiness: "",
    tax: "",
    businessAddress: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    dbaAddress: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },

    businessPhone: "",
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    contactPhone: "",
  },
};
