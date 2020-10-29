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
  // Business Information
  businessInfo: {
    question1: {
      isAccept: "false",
      desc: "",
      question:
        "Has Merchant been previously identified by Visa/Mastercard Risk Programs?",
    },
    question2: {
      isAccept: "false",
      desc: "",
      question:
        "Has Merchant or any associated principal and/or owners disclosed below filed bankruptcy or been subject to any involuntary bankruptcy?",
    },
    question3: {
      isAccept: "false",
      desc: "",
      question: "Will product(s) or service(s) be sold outside of US?",
    },
    question4: {
      isAccept: "false",
      desc: "",
      question: "Has a processor ever terminated your Merchant account?",
    },
    question5: {
      isAccept: "false",
      desc: "",
      question: "Have you ever accepted Credit/Debit cards before?",
    },
  },
  // Bank Information
  bankInfo: {
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    fileId: "",
    accountHolderName: "",
    bankImageUrl: "",
  },

  // Principal Information
  principalInfo: [
    {
      firstName: "",
      lastName: "",
      position: "",
      ownership: "",
      homePhone: "",
      mobilePhone: "",
      addressPrincipal: {
        address: "",
        city: "",
        state: "",
        zip: "",
      },
      yearAtThisAddress: 0,
      ssn: "",
      dateOfBirth: null,
      email: "",
      driverLicense: "",
      stateIssued: "",
      fileId: "",
      driverImageUrl: "",
    },
  ],
  // Pricing Plan
  packagePricing: 1,
};
