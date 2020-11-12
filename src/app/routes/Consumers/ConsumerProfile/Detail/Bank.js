import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";

import "../../../Merchants/MerchantList/MerchantProfile.css";
import "../../../Merchants/PendingList/MerchantReqProfile.css";
import "./Consumer.css";
class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const e = this.props.ConsumerProfile.banks;
    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={this.props.pageTransition}
      >
        <div className="content general-content">
          {e.map((i) => {
            return (
              <div className="container" key={i.bankAcountId}>
                <h2>Bank Information</h2>
                <div className="row" style={{ paddingTop: "25px" }}>
                  <div className="col-md-4">
                    <label style={styles.label}>Bank Name:</label>
                    <p>{i.accountHolderName}</p>
                  </div>
                  <div className="col-md-4">
                    <label style={styles.label}>Routing Number:</label>
                    <p>{i.routingNumber}</p>
                  </div>
                  <div className="col-md-4">
                    <label style={styles.label}>Account Number:</label>
                    <p>{i.accountNumber}</p>
                  </div>
                  <div className="col-md-4">
                    <label style={styles.label}>Address:</label>
                    <p>{i.address}</p>
                  </div>
                  <div className="col-md-4">
                    <label style={styles.label}>State:</label>
                    <p>{i.stateName}</p>
                  </div>
                  <div className="col-md-4">
                    <label style={styles.label}>City:</label>
                    <p>{i.city}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => ({
  ConsumerProfile: state.ConsumerReducer.Consumer,
});

export default connect(mapStateToProps)(Bank);

const styles = {
  p: { fontWeight: 400, color: "black" },
  Form: {
    marginTop: "10px",
  },
  btnDiv: {
    marginTop: "10px",
  },
  label: {
    fontSize: "13px",
  },
};
