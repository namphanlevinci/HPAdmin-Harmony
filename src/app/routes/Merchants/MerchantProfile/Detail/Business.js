import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox } from "@material-ui/core";
import "../MerchantProfile.css";
import "../../PendingList/MerchantReqProfile.css";

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const e = this.props.MerchantProfile;
    const renderQuestion =
      e.business !== undefined ? (
        e.business.map((e) => {
          return (
            <div className="col-md-6" key={e.businessId}>
              <h4>{e.question}</h4>
              <Checkbox checked={e.answer === false} />
              No <Checkbox checked={e.answer === true} /> Yes
              <h5>Answer: {e.answerReply} </h5>
            </div>
          );
        })
      ) : (
        <h4>&nbsp;- NO BUSINESS INFORMATION</h4>
      );
    return (
      <div className="react-transition swipe-up">
        <h2>Business Information</h2>
        <div className="container">
          <div className="row justify-content-between">{renderQuestion}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  MerchantProfile: state.MerchantReducer.MerchantData,
  userLogin: state.userReducer.User,
});

export default connect(mapStateToProps)(Business);
