import React, { Component } from 'react';
import "./style.scss";

export default class Button extends Component {
    render() {
        const { isDisabled = false, onClick = () => { } } = this.props;
        return (
            <div
                onClick={!isDisabled ? onClick : () => { }}
                className={isDisabled ? "container_pagination_button_inactive" : "container_pagination_button"}>
                {this.props.children}
            </div>
        )
    }
}
