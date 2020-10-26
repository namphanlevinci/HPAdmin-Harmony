// Dev
// const URL = "https://dev.harmonypayment.com/api";
// export const upFile =
//   "https://dev.harmonypayment.com/api/file?category=service";

// STAGING
// const URL = "https://staging.harmonypayment.com/api";
// export const upFileUrl =
//   "https://staging.harmonypayment.com/api/file?category=service";

// STAGING 2
// const URL = "https://admin.stage.harmonypayment.com/api";
// export const upFileUrl =
//   "https://admin.stage.harmonypayment.com/api/file?category=service";

// PRODUCT ADMIN
// const URL = "https://admin.harmonypayment.com/api";
// export const upFileUrl =
//   "https://admin.harmonypayment.com/api/file?category=product";

// Bruh2

const prod = {
  url: {
    // URL: "https://admin.stage.harmonypayment.com/api",
    // upFile: "https://admin.stage.harmonypayment.com/api/file?category=service",
    URL: "https://admin.stage.harmonypayment.com/api",
    upFile: "https://admin.stage.harmonypayment.com/api/file?category=product",
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
