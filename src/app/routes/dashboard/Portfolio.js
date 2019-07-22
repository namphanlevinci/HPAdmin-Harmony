import React from "react";
import Widget from "components/Widget/index";
// import Button from '@material-ui/core/Button';
import LineIndicator from "./LineIndicator";

const Portfolio = () => {
  return (
    <Widget>
      <h4 className="mb-2 mb-lg-3">Amount users by zip code</h4>

      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <h5 className="text-muted">Realtime update</h5>
          <div className="jr-site-dash">
            <ul className="jr-line-indicator jr-fs-sm">
              <li>
                <LineIndicator width="38%" title="Arlington, MA" title2="8.74" color="success" value="78%"/>
              </li>
              <li>
                <LineIndicator width="18%" title="Lenoir, NC" title2="1.23" color="info" value="18%"/>
              </li>
              <li>
                <LineIndicator width="4%" title="Waldorf, MD" title2="0.71" color="primary" value="4%"/>
              </li>
            </ul>
          </div>
        </div>
        <div>
            <ul className="jr-line-indicator jr-fs-sm">
              <br/>
              <li>
                <LineIndicator width="19%" title="Navarre, FL" title2="0.71" color="primary" value="34%"/>
              </li>
              <li>
                <LineIndicator width="33%" title="Portland, ME" title2="0.71" color="warning" value="29%"/>
              </li>
              <li>
                <LineIndicator width="73%" title="Alabama, U.S" title2="0.71" color="danger" value="42%"/>
              </li>
            </ul>
        </div>
      </div>
    </Widget>
  );
};

export default Portfolio;
