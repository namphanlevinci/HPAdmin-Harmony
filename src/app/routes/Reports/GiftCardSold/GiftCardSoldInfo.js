import React, { Component } from "react";
import PropTypes from "prop-types";

class GiftCardSoldInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      loadingComp: false,
    };
  }
  goBack = () => {
    this.props.history.push("/app/reports/gift-card-sold");
  };

  render() {
    return <div>hihivcl</div>;
  }
}

GiftCardSoldInfo.propTypes = {};

export default GiftCardSoldInfo;
