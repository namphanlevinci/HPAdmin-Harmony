import React, { Component } from "react";
import URL from "../url/url";
import axios from "axios";

class StateComponent extends Component {
  state = {
    CountryState: null
  };
  componentDidMount() {
    axios
      .get(URL + "/state")
      .then(res => {
        this.setState({ CountryState: res.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleState = event => {
    const StateId = event.target.value;
    this.props.getStateId(StateId);
  };
  render() {
    const { CountryState } = this.state;
    const mapState =
      CountryState !== null
        ? CountryState.map(e => {
            return (
              <option key={e.stateId} value={e.stateId}>
                {e.name}
              </option>
            );
          })
        : null;
    return (
      <select
        onChange={this.handleState}
        setValue={this.handlePrevState}
        defaultValue={this.props.setvalue}
      >
        <option value="" selected disabled hidden>
          {this.props.setvalue}
        </option>
        {mapState}
      </select>
    );
  }
}

export default StateComponent;
