import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={204}
    viewBox="0 0 476 124"
    backgroundColor="#e7dfdf"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="8" rx="3" ry="3" width="588" height="12" />
    <rect x="0" y="26" rx="3" ry="3" width="52" height="12" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="12" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="12" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="12" />
  </ContentLoader>
);

export default MyLoader;
