// Dev
// const URL = "https://dev.harmonypayment.com/api";
// export const config.upFile =
//   "https://dev.harmonypayment.com/api/file?category=service";

// PRODUCT ADMIN
// const URL = "https://admin.harmonypayment.com/api";
// export const config.upFile =
//   "https://admin.harmonypayment.com/api/file?category=product";

// STAGING
// const URL = "https://admin.stage.harmonypayment.com/api";
// export const config.upFile =
//   "https://admin.stage.harmonypayment.com/api/file?category=service";

const prod = {
  url: {
    // URL: "https://admin.harmonypayment.com/api",
    // upFile: "https://admin.harmonypayment.com/api/file?category=product",
    URL: "https://admin.stage.harmonypayment.com/api",
    upFile: "https://admin.stage.harmonypayment.com/apifile?category=service",
  },
};

const dev = {
  url: {
    URL: "https://dev.harmonypayment.com/api",
    upFile: "https://dev.harmonypayment.com/api/file?category=service",
    // URL: "https://admin.stage.harmonypayment.com/api",
    // upFile: "https://admin.stage.harmonypayment.com/apifile?category=service",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
