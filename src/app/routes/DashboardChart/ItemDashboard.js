import React, { Component } from 'react';
import "./style.css";

export default class Itemdashboard extends Component {
    render() {
        const {
            title = "Appointment booked via Consumer"
        } = this.props;
        return (
            <div className="itemDashboard">
                <div className="itemDashboard_header">
                    {title}
                </div>

                <div className="itemDashboard_content">
                    <div className="itemDashboard_number">
                        240
                    </div>
                    <div className="itemDashboard_percent">
                        16% previous day
                    </div>
                </div>
            </div>
        )
    }
}
