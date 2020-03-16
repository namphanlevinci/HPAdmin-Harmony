import React, { Component } from "react";
import { connect } from "react-redux";

export class license extends Component {
  render() {
    return (
      <div>
        <h2>Lincense</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(license);
