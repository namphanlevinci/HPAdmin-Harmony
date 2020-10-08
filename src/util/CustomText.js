import React from "react";

import { Typography } from "@material-ui/core";

const CustomTitle = ({ value, className }) => {
  return (
    <Typography
      variant="h6"
      className={className ? `${className}  content__title` : "content__title"}
    >
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

const CustomText = ({ value, styles }) => (
  <Typography
    variant="subtitle1"
    className="content__text"
    style={styles ? styles : null}
  >
    {value}
  </Typography>
);

const CustomTableHeader = ({ value, styles }) => (
  <Typography
    variant="subtitle1"
    className="table__header"
    style={styles ? styles : null}
  >
    {value}
  </Typography>
);

export { CustomTitle, CustomTextLabel, CustomText, CustomTableHeader };
