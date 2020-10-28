import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgressLoading = (props) => {
  return (
    props.loading && (
      <div className="loading">
        <CircularProgress
          color="secondary"
          className="loader"
          size={props.size ? props.size : "40"}
        />
      </div>
    )
  );
};

export default ProgressLoading;
