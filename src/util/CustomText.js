import React from "react";

import { Typography } from "@material-ui/core";

const CustomTitle = ({ value }) => {
  return (
    <Typography variant="h6" className="content__title">
      {value}
    </Typography>
  );
};

const CustomTextLabel = ({ value, styles }) => (
  <Typography
    variant="subtitle1"
    className="content__label"
    style={styles ? styles : null}
  >
    {value}
  </Typography>
);

const CustomText = ({ value }) => (
  <Typography variant="subtitle1" className="content__text">
    {value}
  </Typography>
);

export { CustomTitle, CustomTextLabel, CustomText };
