import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgressLoading = (props) => {
  return (
    props.loading && (
      <div>
        <CircularProgress
          color="secondary"
          size={props.size ? props.size : "40"}
        />
      </div>
    )
  );
};

export default ProgressLoading;
