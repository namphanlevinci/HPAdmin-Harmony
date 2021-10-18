import React, { Component } from 'react'
import "./style.css";

export default class Index extends Component {
    render() {
        const { onPress = () => { }, icon = require("../../assets/images/column.png"), className, title = "Column", style } = this.props;
        return (
            <div onClick={onPress} style={style} className="iconButton">
                <img src={icon} />
                <span>{title}</span>
            </div>
        )
    }
}
