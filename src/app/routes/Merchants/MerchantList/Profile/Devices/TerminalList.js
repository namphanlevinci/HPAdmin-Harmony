import React, { Component } from 'react';
import { dataTerminal } from "./data";

export default class TerminalList extends Component {
    render() {
        const { selectedValue } = this.props;
        return (
            <div className="terminal-list-container">
                {
                    dataTerminal.map((value, key) => {
                        return (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.props.onSelectTerminal(value);
                                }}
                                key={key} className={selectedValue == value ? 'terminal-device-selected' : 'terminal-device'}>
                                {value}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
