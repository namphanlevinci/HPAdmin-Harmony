export default {
  // General
  lastName: "",
  firstName: "",
  displayName: "",
  address: {
    street: "",
    city: "",
    state: 0,
    zip: "",
  },
  cellphone: "",
  email: "",
  pin: "",
  confirmPin: "",
  roles: {
    nameRole: "",
  },
  isActive: true,
  isDisabled: 0,
  fileId: 0,
  // Work Time
  workingTime: {
    Monday: {
      timeStart: "09:30 AM",
      timeEnd: "07:00 PM",
      isCheck: true,
    },
    Tuesday: {
      timeStart: "09:30 AM",
      timeEnd: "07:00 PM",
      isCheck: true,
    },
    Wednesday: {
      timeStart: "09:30 AM",
      timeEnd: "07:00 PM",
      isCheck: true,
    },
    Thursday: {
      timeStart: "09:30 AM",
      timeEnd: "07:00 PM",
      isCheck: true,
    },
    Friday: {
      timeStart: "09:30 AM",
      timeEnd: "07:00 PM",
      isCheck: true,
    },
    Saturday: {
      timeStart: "09:30 AM",
      timeEnd: "07:00 PM",
      isCheck: true,
    },
    Sunday: {
      timeStart: "09:30 AM",
      timeEnd: "07:00 PM",
      isCheck: true,
    },
  },
  // Salary
  tipFee: {
    percent: {
      value: 0,
      isCheck: false,
    },
    fixedAmount: {
      value: 0,
      isCheck: false,
    },
  },
  salary: {
    perHour: {
      isCheck: false,
      value: 0,
    },
    commission: {
      isCheck: false,
      value: 0,
    },
  },
  productSalary: {
    commission: {
      value: 0,
      isCheck: false,
    },
  },
  cashPercent: 0,
  // License
  driverlicense: "",
  socialSecurityNumber: "",
  professionalLicense: "",
};
