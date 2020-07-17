import React from "react";
import { css } from "@emotion/core";

import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 45%;
`;

const Loader = ({ isLoading }) => (
  <div>
    <ScaleLoader
      css={override}
      color={"#4251af"}
      height={50}
      width={4}
      radius={2}
      margin={2}
      loading={isLoading}
    />
  </div>
);

export default Loader;
