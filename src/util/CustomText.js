import React from "react";

import { Typography } from "@material-ui/core";

const CustomTitle = ({ value }) => {
  return (
    <Typography variant="h6" gutterBottom className="content__title">
      {value}
    </Typography>
  );
};

const CustomTextLabel = ({ value }) => (
  <Typography variant="subtitle1" className="content__label">
    {value}
  </Typography>
);

const CustomText = ({ value }) => (
  <Typography variant="subtitle1" className="content__text">
    {value}
  </Typography>
);

export { CustomTitle, CustomTextLabel, CustomText };
