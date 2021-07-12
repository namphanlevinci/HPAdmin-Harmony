import React, { Component } from 'react';
import moment from "moment";
import "./style.scss";

export default class Detail extends Component {
    render() {
        const { history = [] } = this.props;

        return (
            <div className="invoice-block">
                <h4>History</h4>
                {
                    history.length > 0 &&
                    <div className="invoice-block-group">
                        {
                            history.map(h => (
                                <div
                                    key={h.checkoutHistoryId + "history"}
                                    className="invoice-block-group-rowDetail"
                                >
                                    <div>{moment(h.createdAt).format("MM/DD/YYYY hh:mm A")}</div>
                                    <div>{h.message}</div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        )
    }
}
