const prod = {
  url: {
    URL: "https://admin.stage.harmonypayment.com/api",
    upFile: "https://admin.stage.harmonypayment.com/api/file?category=product",
  },
};

const dev = {
  url: {
    URL: "https://dev.harmonypayment.com/api",
    upFile: "https://dev.harmonypayment.com/api/file?category=service",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
