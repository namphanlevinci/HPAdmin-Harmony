import React, { Component } from "react";
import { connect } from "react-redux";

export class workTime extends Component {
  render() {
    return (
      <div>
        <h2>Work Time</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(workTime);
