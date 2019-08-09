import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgressLoading = props => {
  return (
    props.loading && (
      <div>
        <CircularProgress color="secondary" />
      </div>
    )
  );
};

export default ProgressLoading;
