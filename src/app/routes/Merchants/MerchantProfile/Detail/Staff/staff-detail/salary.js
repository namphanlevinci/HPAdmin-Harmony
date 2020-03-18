import React, { Component } from "react";
import { connect } from "react-redux";

export class salary extends Component {
  render() {
    return (
      <div>
        <h2>Soon</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(salary);
