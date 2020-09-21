export default {
  formId: "checkoutForm",

  formField: {
    // General Information
    businessName: {
      name: "businessName",
      label: "Legal Business Name*",
      requiredErrorMsg: "Business Name is required",
    },
    doingBusiness: {
      name: "doingBusiness",
      label: "Doing Business As* (DBA)",
      requiredErrorMsg: "Doing business name is required",
    },
    tax: {
      name: "tax",
      label: "Federal Tax ID*",
      requiredErrorMsg: "Tax is required",
    },
    address: {
      name: "address",
      label: "Business Address* (no P.O. Boxes)",
      requiredErrorMsg: "Business address is required",
    },
    city: {
      name: "city",
      label: "City",
      requiredErrorMsg: "City is required",
    },
    state: {
      name: "state",
      label: "State Issued*",
      requiredErrorMsg: "State is required",
    },
    zip: {
      name: "zip",
      label: "Zip Code*",
      requiredErrorMsg: "Zip code is required",
    },
    businessPhone: {
      name: "businessPhone",
      label: "Business Phone Number",
    },
    contactPhone: {
      name: "contactPhone",
      label: "Contact Phone Number*",
      requiredErrorMsg: "Contact phone number is required",
    },
    email: {
      name: "email",
      label: "Email Contact*",
      requiredErrorMsg: "Email is required",
    },
    firstName: {
      name: "firstName",
      label: "First Name*",
      requiredErrorMsg: "First name is required",
    },
    lastName: {
      name: "lastName",
      label: "Last Name*",
      requiredErrorMsg: "Last name is required",
    },
    position: {
      name: "position",
      label: "Title/Position*",
      requiredErrorMsg: "Title/Position is required",
    },

    // firstName: {
    //   name: "firstName",
    //   label: "First name*",
    //   requiredErrorMsg: "First name is required",
    // },
    // lastName: {
    //   name: "lastName",
    //   label: "Last name*",
    //   requiredErrorMsg: "Last name is required",
    // },
    // address1: {
    //   name: "address1",
    //   label: "Address Line 1*",
    //   requiredErrorMsg: "Address Line 1 is required",
    // },
    // address2: {
    //   name: "address2",
    //   label: "Address Line 2",
    // },
    // city: {
    //   name: "city",
    //   label: "City*",
    //   requiredErrorMsg: "City is required",
    // },
    // state: {
    //   name: "state",
    //   label: "State/Province/Region",
    // },
    // zipcode: {
    //   name: "zipcode",
    //   label: "Zipcode*",
    //   requiredErrorMsg: "Zipcode is required",
    //   invalidErrorMsg: "Zipcode is not valid (e.g. 70000)",
    // },
    // country: {
    //   name: "country",
    //   label: "Country*",
    //   requiredErrorMsg: "Country is required",
    // },
    // useAddressForPaymentDetails: {
    //   name: "useAddressForPaymentDetails",
    //   label: "Use this address for payment details",
    // },
    // nameOnCard: {
    //   name: "nameOnCard",
    //   label: "Name on card*",
    //   requiredErrorMsg: "Name on card is required",
    // },
    // cardNumber: {
    //   name: "cardNumber",
    //   label: "Card number*",
    //   requiredErrorMsg: "Card number is required",
    //   invalidErrorMsg: "Card number is not valid (e.g. 4111111111111)",
    // },
    // expiryDate: {
    //   name: "expiryDate",
    //   label: "Expiry date*",
    //   requiredErrorMsg: "Expiry date is required",
    //   invalidErrorMsg: "Expiry date is not valid",
    // },
    // cvv: {
    //   name: "cvv",
    //   label: "CVV*",
    //   requiredErrorMsg: "CVV is required",
    //   invalidErrorMsg: "CVV is invalid (e.g. 357)",
    // },

    // Principal
    principalInfo: [
      {
        firstName: {
          name: "firstName",
          label: "First Name*",
          requiredErrorMsg: "First name is required",
        },
        lastName: {
          name: "lastName",
          label: "Last Name*",
          requiredErrorMsg: "Last name is required",
        },
        position: {
          name: "position",
          label: "Position*",
          requiredErrorMsg: "Position is required",
        },
        // ownership: "",
        // homePhone: "",
        // mobilePhone: "",
        // addressPrincipal: {
        //   address: "",
        //   city: "",
        //   state: "",
        //   zip: "",
        // },
        // yearAtThisAddress: 0,
        // ssn: "",
        // dateOfBirth: null,
        // email: "",
        // driverLicense: "",
        // stateIssued: "",
        // fileId: "",
        // progress: false,
      },
    ],
  },
};
